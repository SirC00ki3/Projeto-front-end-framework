import React from 'react';
import './MovieCard.css';

function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
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
  );
}

export default MovieCard;