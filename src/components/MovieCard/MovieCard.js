import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  
  // Lógica inteligente para descobrir o tipo
  // Se tiver 'title', é movie. Se tiver 'name', é tv.
  const type = movie.title ? 'movie' : 'tv';

  return (
    // O Link agora manda o tipo correto para a URL
    <Link to={`/watch/${type}/${movie.id}`} className="movie-card-link">
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