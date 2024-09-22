import React, { useState } from 'react';
import Swal from 'sweetalert2';
// import Header from '../Body/Header';
import { createProduct } from '../../services/productService';
import Footer from '../Body/Footer';
import NavBar from '../Body/NavBar';
import './productForm.css'; // Importação do css

const ProductForm = () => {
  const [product_name, setProduct_name] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null); // Para armazenar o arquivo de imagem
  const [daylyRate, setDaylyRate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificações para garantir que os valores sejam positivos
    if (parseInt(capacity) <= 0) {
      Swal.fire('Erro', 'Por favor, digite um número maior que zero para a capacidade.', 'error');
      return;
    }

    if (parseFloat(daylyRate) <= 0) {
      Swal.fire('Erro', 'Por favor, digite um número maior que zero para o valor por diária.', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('product_name', product_name);
      formData.append('description', description);
      formData.append('capacity', capacity);
      formData.append('location', location);
      formData.append('photo', photo); // Adiciona o arquivo de imagem ao FormData
      formData.append('daylyRate', daylyRate);

      await createProduct(formData);
      Swal.fire('Sucesso', 'Acomodação cadastrada com sucesso!', 'success');
      setProduct_name('');
      setDescription('');
      setCapacity('');
      setLocation('');
      setPhoto(null); // Limpa o estado da foto após o envio
      setDaylyRate('');
    } catch (error) {
      Swal.fire('Erro', 'Erro ao cadastrar Acomodação', 'error');
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file); // Define o arquivo selecionado como estado da foto
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(parseInt(value)) && parseInt(value) > 0)) {
      setCapacity(value);
    } else {
      Swal.fire('Atenção!', 'Digite um número maior que zero para a capacidade.', 'warning');
    }
  };


  const handleDaylyRateChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) > 0)) {
      setDaylyRate(value);
    } else {
      Swal.fire('Atenção!', 'Digite um número maior que zero para o valor por diária.', 'warning');
    }
  };

  const [isSidebarOpen, ] = useState(false); //setIsSidebarOpen



  return (
    <>
      <NavBar isOpen={isSidebarOpen} />
      <main id="main" className="main">

        <div className="product-form-container">
          <form onSubmit={handleSubmit} className="product-form-grid">
            {/* Lado esquerdo - campo de texto */}
            <div className="product-form-left">
              <div className="product-form-group">
                <input
                  type="text"
                  value={product_name}
                  onChange={(e) => setProduct_name(e.target.value)}
                  required
                />
                <label>Nome:</label>
              </div>
              <div className="product-form-group">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label>Descrição:</label>
              </div>
              <div className="product-form-group">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <label>Localização:</label>
              </div>
              <div className="product-form-group">
                <input
                  type="number"
                  value={capacity}
                  onChange={handleCapacityChange}
                  required
                />
                <label>Capacidade:</label>
              </div>
              <div className="product-form-group">
                <input
                  type="number"
                  value={daylyRate}
                  onChange={handleDaylyRateChange}
                  required
                />
                <label>Valor por Diária:</label>
              </div>
            </div>
            {/* Lado direito - área da imagem */}
            <div className="product-form-right">
              <div className="product-preview-container">
                {photo ? (
                  <img
                    className="product-preview-image"
                    src={URL.createObjectURL(photo)}
                    alt="Preview"
                  />
                ) : (
                  <div className="product-preview-placeholder">
                    <i className="bx bxs-cloud-upload icon"></i>
                    <p>Selecione uma imagem</p>
                  </div>
                )}
              </div>
              <div className="product-form-group-image">
                <input
                  type="file"
                  onChange={handlePhotoChange} // Função para lidar com a seleção de arquivo
                  accept="image/*" // Aceitar apenas imagens
                />
              </div>
            </div>
            <button className="product-form-button" type="submit">Cadastrar</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductForm;