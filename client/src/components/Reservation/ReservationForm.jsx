import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import "./ReservationForm.css";
import { getUserInfo } from "../User/auth";
import RemoveImageButton from "../../assets/img/remove.png";
import Swal from "sweetalert2";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Legend from "../SuiteOverView/Legend";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReservationForm = () => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [duration, setDuration] = useState(0); // Total de diárias
  const [qtdGuest, setQtdGuest] = useState(1);
  const [qtdChild, setQtdChild] = useState(0);
  const [qtdProduct, setQtdProduct] = useState("");
  const [stand, setStand] = useState("Standart");
  const [tipo, setTipo] = useState("Solteiro");
  const [guest, setGuest] = useState("");
  const [requesterName, setRequesterName] = useState(""); // Nome do solicitante
  const [companyName, setCompanyName] = useState(""); // Nome da empresa
  const [phone, setPhone] = useState(""); // Telefone para contato
  const [email, setEmail] = useState(""); // Email para contato
  const [emailVoucher, setEmailVoucher] = useState(false); // Checkbox para envio automático de voucher
  const [eventType, setEventType] = useState(""); // Tipo de evento
  const [observations, setObservations] = useState(""); // Observações
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);
  const [paymentConditionId, setPaymentConditionId] = useState("");
  const [paymentConditions, setPaymentConditions] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Carregar produtos e condições de pagamento ao montar o componente
    axios.get("/products").then((response) => {
      setProducts(response.data);
    });

    axios.get("/payment-conditions").then((response) => {
      setPaymentConditions(response.data);
    });
  }, []);

  useEffect(() => {
    // Atualiza a duração sempre que o checkin ou checkout mudarem
    if (checkin && checkout) {
      handleDurationChange(checkin, checkout);
    }
  }, [checkin, checkout]);

  const handleDurationChange = (checkin, checkout) => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (checkinDate < checkoutDate) {
      const timeDifference = checkoutDate - checkinDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      setDuration(daysDifference);
    } else {
      setDuration(0);
      Swal.fire({
        icon: "warning",
        title: "Atenção!",
        text: "A data de checkout deve ser posterior à data de checkin.",
      });
    }
  };

  const handleAddProduct = () => {
    if (!selectedProduct || !duration || !qtdGuest || !guest || !checkin || !checkout || !paymentConditionId) {
      Swal.fire({
        icon: "warning",
        title: "Atenção!",
        text: "Por favor, preencha todos os campos obrigatórios antes de adicionar a acomodação.",
      });
      return;
    }

    const product = products.find((p) => p.id === parseInt(selectedProduct));
    const paymentCondition = paymentConditions.find(
      (pc) => pc.id === parseInt(paymentConditionId)
    );

    if (product && paymentCondition) {
      const productTotal = product.hourlyRate * duration;
      setAddedProducts([
        ...addedProducts,
        {
          ...product,
          quantity: duration,
          total: productTotal,
          paymentConditionName: paymentCondition.name,
        },
      ]);
      setTotalValue(totalValue + productTotal);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      checkin,
      checkout,
      duration,
      qtdGuest,
      qtdChild,
      guest,
      requesterName,
      companyName,
      phone,
      email,
      emailVoucher,
      eventType,
      observations,
      products: addedProducts,
      paymentConditionId,
      totalValue,
      userId: user.id, // Assumindo que o user já está logado
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/reservations", reservationData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Reserva criada com sucesso!",
      });

      // Limpar campos após submissão bem-sucedida
      setCheckin("");
      setCheckout("");
      setDuration(0);
      setQtdGuest(1);
      setQtdChild(0);
      setGuest("");
      setRequesterName("");
      setCompanyName("");
      setPhone("");
      setEmail("");
      setEmailVoucher(false);
      setEventType("");
      setObservations("");
      setSelectedProduct("");
      setAddedProducts([]);
      setPaymentConditionId("");
      setTotalValue(0);
      gerarPDF(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao criar reserva",
      });
    }
  };

  const handleGuestName = (e) => {
    const value = e.target.value.trim();
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (value === "" || !nameRegex.test(value)) {
      Swal.fire({
        icon: "warning",
        title: "Atenção!",
        text: "Digite um nome válido.",
      });
    } else {
      setGuest(value);
    }
  };

  const handleRemoveProduct = (indexToRemove) => {
    const updatedProducts = [...addedProducts];
    const removedProduct = updatedProducts.splice(indexToRemove, 1);
    setAddedProducts(updatedProducts);
    setTotalValue(totalValue - removedProduct[0].total);
  };

  const gerarPDF = (reservation) => {
    if (!reservation) return;

    function formatDate(dateString) {
      const date = new Date(dateString);
      date.setHours(date.getHours() + 3); // Ajuste para fuso horário
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }

    var docDefinition = {
      content: [
        { text: "Voucher", style: "header" },
        {
          text: `Data de emissão: ${new Date().toLocaleDateString()}`,
          style: "subheader",
        },
        { text: "\n" },
        {
          table: {
            headerRows: 1,
            widths: [20, 125, 125, 50, 50, 90],
            body: [
              [
                { text: "ID", style: "headerTable" },
                { text: "Check-in", style: "headerTable" },
                { text: "Check-out", style: "headerTable" },
                { text: "Duração", style: "headerTable" },
                { text: "Hóspedes", style: "headerTable" },
                { text: "Status", style: "headerTable" },
              ],
              [
                { text: reservation?.id || "-", style: "item" },
                { text: formatDate(reservation?.checkin) || "-", style: "item" },
                { text: formatDate(reservation?.checkout) || "-", style: "item" },
                { text: reservation?.duration || "-", style: "item" },
                { text: reservation?.qtdGuest || "-", style: "item" },
                { text: reservation?.status || "-", style: "item" },
              ],
              [
                { text: "Valor Total", style: "headerTable", colSpan: 5 },
                {}, {}, {}, {},
                { text: `R$ ${(reservation?.totalValue || 0).toFixed(2)}`, style: "item" },
              ],
              [
                {
                  text: `Total de reservas: ${reservation?.repeatCount + 1 || 1}`,
                  colSpan: 6,
                  style: "total",
                },
                {}, {}, {}, {}, {},
              ],
            ],
          },
          style: "tableExample",
        },
        { text: "\n" },
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          alignment: "center",
        },
        total: {
          fontSize: 14,
          bold: true,
          alignment: "right",
          margin: [0, 2, 10, 2],
        },
        headerTable: {
          bold: true,
          fontSize: 13,
          color: "white",
          fillColor: "#2a3f54",
          alignment: "center",
          margin: [0, 4, 0, 4],
        },
        item: {
          margin: [0, 2, 0, 2],
        },
        footer: {
          fontSize: 10,
          margin: [0, 0, 0, 10],
        },
      },
      footer: function (currentPage, pageCount) {
        return {
          text: `Página ${currentPage} de ${pageCount}`,
          alignment: "center",
          style: "footer",
        };
      },
    };

    // Gerar o PDF
    pdfMake.createPdf(docDefinition).open();
  };

  const user = getUserInfo();

  if (!user) {
    return <p>User not logged in</p>;
  }

  return (
    <>
      <div className="container">
        <NavBar />
        <main>
          <div className="pagetitle">
            <h1>Cadastro de Reserva</h1>
            <Legend />
          </div>

          <div className="reservation-form-wrapper">
            <div className="reservation-form-container">
              {/* Formulário principal */}
              <form className="reservation-form-grid" onSubmit={handleSubmit}>
                <div className="reservation-form-group">
                  <label>Check-in</label>
                  <div className="check">
                    <input
                      type="date"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                      required
                    />
                    <div>14:00h</div>
                  </div>
                </div>

                <div className="reservation-form-group">
                  <label>Check-out</label>
                  <div className="check">
                    <input
                      type="date"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      required
                    />
                    <div>12:00h</div>
                  </div>
                </div>

                <div className="reservation-form-group tipoPadrao">
                  <div>
                    <label>Tipo</label>
                    <select
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                    >
                      <option value="single">Solteiro</option>
                      <option value="double">Casal</option>
                      <option value="twin">Duplo</option>
                      <option value="triple">Triplo</option>
                    </select>
                  </div>
                  <div>
                    <label>Padrão</label>
                    <select
                      value={stand}
                      onChange={(e) => setStand(e.target.value)}
                    >
                      <option value="ST">Standard</option>
                      <option value="SL">Super Luxo</option>
                      <option value="RM">Real Master</option>
                    </select>
                  </div>
                </div>

                <div className="reservation-form-group qtd">
                  <div>
                    <label>Disponível</label>
                    <input
                      type="number"
                      placeholder="Inventário"
                      value={qtdProduct}
                      onChange={(e) => setQtdProduct(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Adultos</label>
                    <select
                      value={qtdGuest}
                      onChange={(e) => setQtdGuest(e.target.value)}
                    >
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                    </select>
                  </div>
                  <div>
                    <label>Crianças</label>
                    <select
                      value={qtdChild}
                      onChange={(e) => setQtdChild(e.target.value)}
                    >
                      <option value="0">00</option>
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                    </select>
                  </div>
                  <div>
                    <label>Evento</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      <option value="">Nenhum</option>
                      <option value="casamento">Casamento</option>
                      <option value="conferencia">Conferência</option>
                      <option value="outro">Aniversário</option>
                    </select>
                  </div>
                </div>

                <div className="reservation-form-group">
                  <label>Nome do Hóspede</label>
                  <input
                    type="text"
                    placeholder="Digite o nome completo"
                    value={guest}
                    onChange={handleGuestName}
                  />
                </div>

                <div className="reservation-selected-product">
                  <div className="reservation-form-group">
                    <label>Acomodação</label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="">Selecione uma acomodação</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="product-add-button">
                    <button
                      type="button"
                      onClick={handleAddProduct}
                    >
                      Adicionar à Lista
                    </button>
                  </div>
                </div>

                <div className="reservation-form-group">
                  <label>Nome da Empresa</label>
                  <input
                    type="text"
                    placeholder="Nome da empresa ou agência"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="reservation-form-group contatos">
                  <div>
                    <label>Telefone</label>
                    <input
                      type="text"
                      placeholder="Número de telefone para contato"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="reservation-form-group">
                    <label>E-mail para Contato</label>
                    <input
                      type="email"
                      placeholder="E-mail para envio do voucher"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="reservation-form-group">
                  <label>Forma de Pagamento</label>
                  <select
                    value={paymentConditionId}
                    onChange={(e) =>
                      setPaymentConditionId(parseInt(e.target.value))
                    }
                    required
                  >
                    <option value="">Escolha uma forma de pagamento</option>
                    {paymentConditions.map((condition) => (
                      <option key={condition.id} value={condition.id}>
                        {condition.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mover a parte do valor total e o botão de submissão para o formulário principal */}
                <div className="reservation-total-container">
                  <h3>Valor Total da Reserva: </h3>
                  <p>R$ {totalValue.toFixed(2)}</p>
                  <button type="submit" className="reservation-form-button">
                    Salvar Reserva
                  </button>
                </div>

                <div className="reservation-product-table-container">
                  <table className="reservation-product-table">
                    <thead>
                      <tr>
                        <th className="col-id">ID</th>
                        <th className="col-product">Acomodação</th>
                        <th className="col-value">Valor</th>
                        <th className="col-hours">Diárias</th>
                        <th className="col-total">Total</th>
                        <th className="col-remove"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {addedProducts.map((product, index) => (
                        <tr key={index}>
                          <td className="col-id">{product.id}</td>
                          <td className="col-product">{product.name}</td>
                          <td className="col-value">R$ {product.hourlyRate}</td>
                          <td className="col-hours">{product.quantity}</td>
                          <td className="col-total">
                            R$ {product.total.toFixed(2)}
                          </td>
                          <td className="col-remove">
                            <button
                              type="button"
                              onClick={() => handleRemoveProduct(index)}
                              className="reservation-remove-button"
                            >
                              <img
                                src={RemoveImageButton}
                                alt="Botão de remoção"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="reservation-form-group obs">
                  <label>Observações</label>
                  <textarea
                    placeholder="Digite aqui as observações"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    rows={2}
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ReservationForm;
