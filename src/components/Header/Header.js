import React from 'react';
import './Header.css';
import logo from "../../imagens/icons/logo.png";
import { NavLink } from 'react-router-dom';

// Recebe as funções de busca como propriedades (props)
function Header({ onSearchSubmit, onSearchChange }) { 
  
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active-link' : 'nav-link';
  };

  return (
    <header className="header">
      <img src={logo} alt="StreamFlix Logo" className="header__logo" />

      <div className="header__nav-wrapper">
        <nav className="header__nav">
          <ul>
            <li><NavLink to="/" className={getNavLinkClass} end>Início</NavLink></li>
            <li><NavLink to="/series" className={getNavLinkClass}>Séries</NavLink></li>
            <li><NavLink to="/movies" className={getNavLinkClass}>Filmes</NavLink></li>
            <li><NavLink to="/new" className={getNavLinkClass}>Novidades</NavLink></li>
            <li><NavLink to="/mylist" className={getNavLinkClass}>Minha Lista</NavLink></li>
          </ul>
        </nav>

        <div className="header__search">
          {/* Conecta o envio do formulário à função onSearchSubmit */}
          <form onSubmit={onSearchSubmit}>
            <input 
              type="text" 
              placeholder="Buscar filmes..." 
              // Conecta a digitação à função onSearchChange
              onChange={(e) => onSearchChange(e.target.value)} 
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;