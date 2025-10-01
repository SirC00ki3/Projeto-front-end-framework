import React from 'react';
import './Header.css';
import logo from "../../imagens/icons/logo.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="StreamFlix Logo" className="header__logo" />
      <div className="header__nav-wrapper">
        <nav className="header__nav">
          <ul>
            <li><a href="#home">Início</a></li>
            <li><a href="#series">Séries</a></li>
            <li><a href="#movies">Filmes</a></li>
            <li><a href="#new">Novidades</a></li>
          </ul>
        </nav>
        <div className="header__search">
          <form>
            <input type="text" placeholder="Buscar filmes..." />
            <button type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </header>
  );
}
export default Header;