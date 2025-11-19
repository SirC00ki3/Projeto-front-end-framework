import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importa o Link
import './MovieCard.css';

function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    // 2. Envolve tudo com o Link apontando para a rota /movie/:id
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <img
          className="movie-card__poster"
          src={imageUrl}
          alt={movie.title || movie.name}
        />
        <div className="movie-card__info">
          <h3 className="movie-card__title">{movie.title || movie.name}</h3>
          <button className="movie-card__button">Detalhes</button>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;