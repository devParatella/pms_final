import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
import { getUserInfo, logout } from '../User/auth';
// import ModalHelp from '../Modal/ModalHelp';
import LogoPMS from '../../assets/img/LogoPMS.png'
// import NavBar from "./NavBar";
import './Header.css';
const Header = () => {
  const [openMenu, setOpenMenu] = useState({
    cadastro: false,
    movimentacoes: false,
    relatorios: false,
    usuario:false
  });

  const user = getUserInfo();
  if (!user) {
    return <p>User not logged in</p>;
  }

  const toggleDropdown = (menu) => {
    setOpenMenu((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };
  return (
    <>
             
      <header id="header" className="header fixed-top d-flex align-items-center">




        {/* <div className="d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <img src={LogoPMS} alt="Logo-PMS-Hoteleiro" />
            <span> Hoteleiro</span>
          </a>

        </div> */}
        {/* <!-- End Logo --> */}


        <nav className="navbar-macos">
        <div>
<a href="/" >
<img src={LogoPMS} alt="Logo-PMS-Hoteleiro" />
</a>
</div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="/calendario" className="navbar-link">
            <i className="bi bi-grid"></i> Dashboard
          </a>
        </li>

        <li className="navbar-item">
          <a href="/Grid" className="navbar-link">
            <i className="bi bi-grid"></i> Vista Geral
          </a>
        </li>

        {/* Dropdown para Cadastro */}
        <li className="navbar-item dropdown">
          <button className="navbar-link" onClick={() => toggleDropdown('cadastro')}>
            <i className="bi bi-journal-text"></i> Cadastro
            <i className="bi bi-chevron-down"></i>
          </button>
          {openMenu.cadastro && (
            <ul className="dropdown-menu">
              <li><a href="/cadastroReserva">Reservas</a></li>
              <li><a href="/cadastroProduto">Acomodações</a></li>
              <li><a href="/cadastroPagamento">Forma de Pagamento</a></li>
            </ul>
          )}
        </li>

        {/* Dropdown para Movimentações */}
        <li className="navbar-item dropdown">
          <button className="navbar-link" onClick={() => toggleDropdown('movimentacoes')}>
            <i className="bi bi-layout-text-window-reverse"></i> Movimentações
            <i className="bi bi-chevron-down"></i>
          </button>
          {openMenu.movimentacoes && (
            <ul className="dropdown-menu">
              <li><a href="/listaReserva">Listar Reservas</a></li>
              <li><a href="/listaProduto">Listar Acomodações</a></li>
              <li><a href="/listaPagamento">Listar Formas de Pagamento</a></li>
            </ul>
          )}
        </li>

        {/* Dropdown para Relatórios */}
        <li className="navbar-item dropdown">
          <button className="navbar-link" onClick={() => toggleDropdown('relatorios')}>
            <i className="bi bi-file-earmark"></i> Relatórios
            <i className="bi bi-chevron-down"></i>
          </button>
          {openMenu.relatorios && (
            <ul className="dropdown-menu">
              <li><a href="/relatorioReservas">Reservas</a></li>
              <li><a href="/relatorioProdutos">Acomodações</a></li>
              <li><a href="/relatorioFormaDePagamento">Formas de Pagamentos</a></li>
            </ul>
          )}
        </li>
        {/* Dropdown para Usuário */}
        <li className="navbar-item dropdown">
          <button className="navbar-link" onClick={() => toggleDropdown('usuario')}>
            <i className="bi bi-file-earmark"></i> Usuário
            <i className="bi bi-chevron-down"></i>
          </button>
          {openMenu.usuario && (
            <ul className="dropdown-menu">
              <li><a href="/relatorioReservas">Reservas</a></li>
              <li><a href="/relatorioProdutos">Acomodações</a></li>
              <li><a href="/relatorioFormaDePagamento">Formas de Pagamentos</a></li>
            </ul>
          )}
        </li>
        <li className="navbar-item">
          <button className="navbar-link" onClick={logout}>
          <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user.name}
                </span>
            <i className="bi bi-box-arrow-in-right"></i> Sair
          </button>
        </li>
      </ul>
    </nav>





        {/* <NavBar/> */}
        {/* <!-- End Icons Navigation --> */}
      </header>
    </>
  );
};

export default Header;
