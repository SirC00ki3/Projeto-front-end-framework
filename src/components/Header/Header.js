import React from 'react';
import './Header.css';
import logo from "../../imagens/icons/logo.png";
import { NavLink, Link } from 'react-router-dom';

// Importa o ícone de lupa do Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Ícone de lupa

function Header({ onSearchSubmit, onSearchChange }) { 
  
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active-link' : 'nav-link';
  };

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="StreamFlix Logo" className="header__logo" />
        
        <nav className="header__nav">
          <ul>
            <li><NavLink to="/" className={getNavLinkClass} end>Início</NavLink></li> 
            <li><NavLink to="/series" className={getNavLinkClass}>Séries</NavLink></li>
            <li><NavLink to="/movies" className={getNavLinkClass}>Filmes</NavLink></li>
            <li><NavLink to="/new" className={getNavLinkClass}>Novidades</NavLink></li>
            <li><NavLink to="/mylist" className={getNavLinkClass}>Minha Lista</NavLink></li>
          </ul>
        </nav>
      </div>

      <div className="header__right">
        <div className="header__search">
          <form onSubmit={onSearchSubmit}>
            <input 
              type="text" 
              placeholder="Buscar filmes..." 
              onChange={(e) => onSearchChange(e.target.value)} 
            />
            {/* Agora o botão de busca tem o ícone de lupa */}
            <button type="submit" aria-label="Buscar"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
        </div>
        
        <Link to="/login" className="header__login-button">Entrar</Link>
      </div>
    </header>
  );
}

export default Header;