import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../api/tmdb';
import { API_KEY } from '../api/requests';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import YouTube from 'react-youtube';
import './MoviePage.css';

// Recebe user e handleLogout
function MoviePage({ addToList, removeFromList, myList, user, handleLogout }) {
  const { type, id } = useParams(); 
  const [content, setContent] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isInList = myList ? myList.some((item) => item.id.toString() === id) : false;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await tmdb.get(`/${type}/${id}?api_key=${API_KEY}&language=pt-BR`);
        setContent(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    }
    fetchData();
  }, [type, id]);

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const response = await tmdb.get(`/${type}/${id}/videos?api_key=${API_KEY}`);
        let video = response.data.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
        if (!video) {
            video = response.data.results.find(vid => vid.site === "YouTube");
        }
        if (video) {
          setTrailerUrl(video.key);
        }
      } catch (error) {
        console.error("Erro ao buscar trailer:", error);
      }
    }
    fetchTrailer();
  }, [type, id]);

  if (!content) {
    return <div className="loading-screen">Carregando...</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${content.backdrop_path || content.poster_path}")`,
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: { autoplay: 1 },
  };

  return (
    <>
      {/* Passa user e handleLogout */}
      <Header myList={myList} user={user} handleLogout={handleLogout} />
      
      <div className="movie-page-container" style={backgroundStyle}>
        <div className="movie-details-card">
          <h1 className="movie-page-title">{content.title || content.name}</h1>
          <p className="movie-page-overview">{content.overview || "Sinopse não disponível em português."}</p>
          
          <div className="movie-meta-info">
            <p className="movie-page-meta">
              Data: {content.release_date || content.first_air_date ? (content.release_date || content.first_air_date).substring(0, 4) : "N/A"}
            </p>
            <p className="movie-page-meta">Nota: {Number(content.vote_average).toFixed(1)}</p>
            {content.number_of_seasons && (
                <p className="movie-page-meta" style={{color: '#46d369'}}>
                    {content.number_of_seasons} Temporada{content.number_of_seasons > 1 ? 's' : ''}
                </p>
            )}
          </div>

          <div className="movie-page-buttons">
            {trailerUrl ? (
              <button className="watch-button" onClick={() => setIsModalOpen(true)}>▶ Assistir Agora</button>
            ) : (
               <button className="watch-button disabled" style={{opacity: 0.5, cursor: 'not-allowed'}}>Sem Trailer</button>
            )}

            {isInList ? (
              <button className="watch-button remove-btn" style={{marginLeft: '15px', backgroundColor: '#555'}} onClick={() => removeFromList(content.id)}>
                Remover da Lista
              </button>
            ) : (
              <button className="watch-button add-btn" style={{marginLeft: '15px', backgroundColor: 'rgba(109, 109, 110, 0.7)'}} onClick={() => addToList(content)}>
                + Minha Lista
              </button>
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