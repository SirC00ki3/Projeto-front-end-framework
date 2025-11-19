import React, { useState } from 'react';
import './Hero.css';
import tmdb from '../../api/tmdb';
import { API_KEY } from '../../api/requests';
import YouTube from 'react-youtube';

function Hero({ movie, addToList }) {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!movie) {
    return null;
  }

  const backgroundStyle = {
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}")`,
  };

  // Função para buscar e abrir o trailer
  // Função para buscar e abrir o trailer
  const handleWatch = async () => {
    if (trailerUrl) {
      setIsModalOpen(true);
    } else {
      try {
        const response = await tmdb.get(`/movie/${movie.id}/videos?api_key=${API_KEY}`);
        
        // Tenta achar um trailer oficial primeiro
        let video = response.data.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
        
        // Se não achar trailer, pega QUALQUER vídeo do YouTube (Teaser, Clip, etc.)
        if (!video) {
          video = response.data.results.find(vid => vid.site === "YouTube");
        }

        if (video) {
          setTrailerUrl(video.key);
          setIsModalOpen(true);
        } else {
          alert("Desculpe, não encontramos nenhum vídeo para este título.");
        }
      } catch (error) {
        console.error("Erro ao buscar trailer:", error);
      }
    }
  };

  const handleAddToList = () => {
    addToList(movie);
    alert("Filme adicionado à Minha Lista!");
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: { autoplay: 1 },
  };

  return (
    <>
      <section className="hero" style={backgroundStyle}>
        <div className="hero__content">
          <h2 className="hero__title">{movie.title || movie.name}</h2>
          <p className="hero__description">{movie.overview}</p>
          <div className="hero__buttons">
            {/* Botão Assistir agora chama a função handleWatch */}
            <button className="hero__button hero__button--play" onClick={handleWatch}>
              ▶ Assistir
            </button>
            
            <button 
              className="hero__button hero__button--list" 
              onClick={handleAddToList}
            >
              + Minha Lista
            </button>
          </div>
        </div>
      </section>

      {/* Janela do Vídeo (Modal) */}
      {isModalOpen && (
        <div className="hero-video-modal">
          <div className="hero-video-player">
            <YouTube videoId={trailerUrl} opts={opts} />
            <button className="hero-close-button" onClick={() => setIsModalOpen(false)}>X</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;