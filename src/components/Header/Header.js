import React from 'react';
import './Header.css';
import logo from "../../imagens/icons/logo.png";
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Recebe novas props: searchTerm e onReset
function Header({ onSearchSubmit, onSearchChange, searchTerm, onReset }) { 
  
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active-link' : 'nav-link';
  };

  return (
    <header className="header">
      <div className="header__left">
        {/* Ao clicar na logo, reseta a busca */}
        <Link to="/" onClick={onReset}>
            <img src={logo} alt="StreamFlix Logo" className="header__logo" />
        </Link>
        
        <nav className="header__nav">
          <ul>
            {/* Ao clicar em Início, reseta a busca */}
            <li><NavLink to="/" className={getNavLinkClass} onClick={onReset} end>Início</NavLink></li> 
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
              // O valor agora é controlado pelo estado da HomePage
              value={searchTerm || ''} 
              onChange={(e) => onSearchChange(e.target.value)} 
            />
            <button type="submit" aria-label="Buscar"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
        </div>
        
        <Link to="/login" className="header__login-button">Entrar</Link>
      </div>
    </header>
  );
}

export default Header;