import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../api/tmdb';
import requests, { API_KEY } from '../api/requests';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import YouTube from 'react-youtube';
import './MoviePage.css';

function MoviePage({ addToList, removeFromList, myList }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Verifica se o filme já está na lista (seguro contra undefined)
  const isMovieInList = myList ? myList.some((item) => item.id.toString() === id) : false;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await tmdb.get(`${requests.fetchMovieDetails}${id}?api_key=${API_KEY}&language=pt-BR`);
        setMovie(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    }
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const response = await tmdb.get(`/movie/${id}/videos?api_key=${API_KEY}`);
        const video = response.data.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
        if (video) {
          setTrailerUrl(video.key);
        }
      } catch (error) {
        console.error("Erro ao buscar trailer:", error);
      }
    }
    fetchTrailer();
  }, [id]);

  if (!movie) {
    return <div>Carregando...</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}")`,
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: { autoplay: 1 },
  };

  return (
    <>
      <Header myList={myList} />
      <div className="movie-page-container" style={backgroundStyle}>
        <div className="movie-details-card">
          <h1 className="movie-page-title">{movie.title || movie.name}</h1>
          <p className="movie-page-overview">{movie.overview}</p>
          <p className="movie-page-meta">Nota: {movie.vote_average}</p>
          <div className="movie-page-buttons">
            {trailerUrl && (
              <button className="watch-button" onClick={() => setIsModalOpen(true)}>▶ Assistir Agora</button>
            )}
            {isMovieInList ? (
              <button className="watch-button" style={{marginLeft: '10px', backgroundColor: '#555'}} onClick={() => removeFromList(movie.id)}>Remover da Lista</button>
            ) : (
              <button className="watch-button" style={{marginLeft: '10px', backgroundColor: '#555'}} onClick={() => addToList(movie)}>Minha Lista</button>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <div className="video-modal">
          <div className="video-player">
            <YouTube videoId={trailerUrl} opts={opts} />
            <button className="close-button" onClick={() => setIsModalOpen(false)}>X</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MoviePage;