import React, { useRef } from 'react';
import './Row.css';
import MovieCard from '../MovieCard/MovieCard';

function Row({ title, movies }) {
  const rowRef = useRef(null);

  const handleLeftArrow = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft -= window.innerWidth / 2;
    }
  };

  const handleRightArrow = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft += window.innerWidth / 2;
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      
      <div className="row__container-wrapper">
        {/* Botão Esquerdo */}
        <div className="row--arrowLeft" onClick={handleLeftArrow}>
          ❮
        </div>

        {/* Lista de Filmes */}
        <div className="row__posters" ref={rowRef}>
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Botão Direito */}
        <div className="row--arrowRight" onClick={handleRightArrow}>
          ❯
        </div>
      </div>
    </div>
  );
}

export default Row;