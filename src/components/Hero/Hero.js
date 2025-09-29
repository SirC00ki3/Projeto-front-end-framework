import React from 'react';
import './Hero.css';

function Hero({ movie }) {
  if (!movie) { // Se não houver filme, não renderiza nada
    return null;
  }

  // Constrói a URL da imagem de fundo
  const backgroundStyle = {
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
  };

  return (
    <section className="hero" style={backgroundStyle}>
      <div className="hero__content">
        <h2 className="hero__title">{movie.title || movie.name}</h2>
        <p className="hero__description">{movie.overview}</p>
        <div className="hero__buttons">
          <button className="hero__button hero__button--play">▶ Assistir</button>
          <button className="hero__button hero__button--more">Mais Informações</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;