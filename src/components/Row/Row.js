import React from 'react';
import './Row.css';
import MovieCard from '../MovieCard/MovieCard';

function Row({ title, movies }) {
  // O 'title' e 'movies' são as propriedades (props) que serão passadas para este componente.
  return (
    <div className="row">
      <div className="row__container"> {/* Novo contêiner para o conteúdo */}
        <h2 className="row__title">{title}</h2>
        <div className="row__posters">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Row;