import React from 'react';
import './Header.css';
import logo from "../../imagens/icons/logo.png";
import { NavLink, Link, useNavigate } from 'react-router-dom'; // Importe useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Recebe searchTerm e setSearchTerm diretamente
function Header({ searchTerm, setSearchTerm, myList }) { 
  const navigate = useNavigate(); // Hook para mudar de página
  
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
    // Ao buscar, vai para a página inicial onde os resultados aparecem
    navigate('/');
  };

  const handleReset = () => {
    if (setSearchTerm) setSearchTerm('');
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" onClick={handleReset}>
            <img src={logo} alt="StreamFlix Logo" className="header__logo" />
        </Link>
        
        <nav className="header__nav">
          <ul>
            <li><NavLink to="/" className={getNavLinkClass} onClick={handleReset} end>Início</NavLink></li> 
            <li><NavLink to="/series" className={getNavLinkClass}>Séries</NavLink></li>
            <li><NavLink to="/movies" className={getNavLinkClass}>Filmes</NavLink></li>
            <li><NavLink to="/new" className={getNavLinkClass}>Novidades</NavLink></li>
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
        
        <Link to="/login" className="header__login-button">Entrar</Link>
      </div>
    </header>
  );
}

export default Header;