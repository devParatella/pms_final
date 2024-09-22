// components/ReservationList.js
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { getAllPaymentConditions } from '../../services/paymentConditionService';
import { getAllReservations, updateReservation } from "../../services/reservationService";
import Footer from "../Body/Footer";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import "./ReservationList.css";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [paymentConditions, setPaymentConditions] = useState([]);
  const [updatedReservations, setUpdatedReservations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationsResponse = await getAllReservations();
        const paymentConditionsResponse = await getAllPaymentConditions();

        setReservations(reservationsResponse.data);
        setPaymentConditions(paymentConditionsResponse.data);

        const storedUpdatedReservations = JSON.parse(localStorage.getItem('updatedReservations')) || [];
        setUpdatedReservations(storedUpdatedReservations);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao buscar reservas ou condições de pagamento'
        });
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
  };

  const handleCancel = async (reservationID) => {
    const isConfirmed = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você realmente deseja cancelar esta reserva?',
      icon: 'warning',
      showCancelButton: 'true',
      cancelButtonText: 'Não',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    });

    if (!isConfirmed.isConfirmed) return;

    try {
      const data = {
        status: 'Cancelada',
        cancelled: true
      };

      await updateReservation(reservationID, data);
      const updatedReservationsList = reservations.map(reservation => {
        if (reservation.id === reservationID) {
          return { ...reservation, ...data };
        }
        return reservation;
      });
      setReservations(updatedReservationsList);

      const newUpdatedReservations = [...updatedReservations, reservationID];
      setUpdatedReservations(newUpdatedReservations);
      localStorage.setItem('updatedReservations', JSON.stringify(newUpdatedReservations));

      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Reserva cancelada com sucesso!'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao cancelar reserva.'
      });
    }
  };

  const handleFinish = async (reservationID) => {
    const isConfirmed = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você realmente deseja marcar esta reserva como finalizada?',
      icon: 'warning',
      showCancelButton: 'true',
      cancelButtonText: 'Não',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    });

    if (!isConfirmed.isConfirmed) return;

    try {
      const data = {
        status: 'Finalizada'
      };

      await updateReservation(reservationID, data);
      const updatedReservationsList = reservations.map(reservation => {
        if (reservation.id === reservationID) {
          return { ...reservation, ...data };
        }
        return reservation;
      });
      setReservations(updatedReservationsList);

      const newUpdatedReservations = [...updatedReservations, reservationID];
      setUpdatedReservations(newUpdatedReservations);
      localStorage.setItem('updatedReservations', JSON.stringify(newUpdatedReservations));

      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Reserva marcada como finalizada!'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao marcar reserva como finalizada.'
      });
    }
  };

  const getPaymentConditionName = (id) => {
    const condition = paymentConditions.find(condition => condition.id === id);
    return condition ? condition.name : "Desconhecido";
  };

  const formatDate = (dateString) => {
    const checkin = new Date(dateString);
    const checkout = new Date(dateString);
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedDate = checkin.toLocaleDateString(undefined, optionsDate);
    const formattedTime = checkin.toLocaleTimeString(undefined, optionsTime);
    const formattedDateOut = checkout.toLocaleDateString(undefined, optionsDate);
    const formattedTimeOut = checkout.toLocaleTimeString(undefined, optionsTime);
    return `${formattedDate} às ${formattedTime}, ${formattedDateOut} até ${formattedTimeOut}`;
  };

  return (
    <>
      <body className="">
        <Header onToggleSidebar={toggleSidebar} />
        <NavBar isOpen={isSidebarOpen} />
        <main id="main" className="main">
          <div className="">
            <h1>Listar Reservas</h1>

          </div>
          <div className="reservations-container">
            {reservations.map((reservation) => (
              <div className={`reservation-card ${reservation.cancelled ? 'cancelled' : ''}`} key={reservation.id}>
                <p className="id">ID: {reservation.id} </p>
                <p>Checkin: {formatDate(reservation.checkin)}</p>
                <p>Checkout: {formatDate(reservation.checkout)}</p>
                <p className={`status-view ${reservation.status === 'Cancelada' ? 'cancelled-status' : ''}`}>
                  Status: {reservation.status}
                </p>
                <p className="payment-method">
                  Método de Pagamento: {getPaymentConditionName(reservation.paymentConditionId)}
                </p>
                <p>Diárias Reservadas: {reservation.duration} {reservation.duration === 1 ? "Diária" : "Diárias"}</p>
                <p className="totalValue">Valor Total: R${reservation.totalValue}</p>
                <ul className="products-list">
                  {reservation.Products.map((product) => (
                    <li className="product-item" key={product.id}>
                      <p className="product-name">Ácomodação: {product.name}</p>
                      <p className="hourly-rate">Valor por Diária: R${product.daylyRate}</p>
                    </li>
                  ))}
                </ul>
                <hr />
                <div className="reservation-footer">
                  <div className="reservation-buttons">
                    {reservation.cancelled || updatedReservations.includes(reservation.id) ? (
                      <>
                        <button className="reservation-finish-button finished" disabled>Finalizada</button>
                        <button className="reservation-cancel-button cancelled" disabled>Cancelado</button>
                      </>

                    ) : (
                      <>
                        <button className="reservation-finish-button" onClick={() => handleFinish(reservation.id)}>Finalizar</button>
                        <button className="reservation-cancel-button" onClick={() => handleCancel(reservation.id)}>Cancelar</button>
                      </>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
};

export default ReservationList;