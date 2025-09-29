import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Concha</h1>
      <nav className="header__nav">
        <ul>
          <li><a href="#home">Início</a></li>
          <li><a href="#series">Séries</a></li>
          <li><a href="#movies">Filmes</a></li>
          <li><a href="#new">Novidades</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;