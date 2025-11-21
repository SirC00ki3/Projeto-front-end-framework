import React from 'react';
import './Header.css';
import logo from "../../imagens/icons/logo.png";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Mantemos todas as props que fizemos funcionar (busca e login)
function Header({ searchTerm, setSearchTerm, user, handleLogout }) { 
  
  const navigate = useNavigate();

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active-link' : 'nav-link';
  };

  const handleInputChange = (e) => {
    if (setSearchTerm) {
      setSearchTerm(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/browse');
  };

  const handleReset = () => {
    if (setSearchTerm) setSearchTerm('');
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    if (handleLogout) {
      handleLogout();
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/browse" onClick={handleReset}>
            <img src={logo} alt="StreamFlix Logo" className="header__logo" />
        </Link>
        
        <nav className="header__nav">
          <ul>
            <li><NavLink to="/browse" className={getNavLinkClass} onClick={handleReset} end>Início</NavLink></li> 
            <li><NavLink to="/series" className={getNavLinkClass}>Séries</NavLink></li>
            <li><NavLink to="/movies" className={getNavLinkClass}>Filmes</NavLink></li>
            {/* A LINHA "NOVIDADES" FOI REMOVIDA DAQUI */}
            <li><NavLink to="/mylist" className={getNavLinkClass}>Minha Lista</NavLink></li>
          </ul>
        </nav>
      </div>

      <div className="header__right">
        <div className="header__search">
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Buscar filmes..." 
              value={searchTerm || ''} 
              onChange={handleInputChange} 
            />
            <button type="submit" aria-label="Buscar"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
        </div>
        
        {user ? (
          <button onClick={onLogoutClick} className="header__logout-button">
            Sair
          </button>
        ) : (
          <Link to="/login" className="header__login-button">Entrar</Link>
        )}
      </div>
    </header>
  );
}

export default Header;