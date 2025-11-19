import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Row from '../components/Row/Row';
import tmdb from '../api/tmdb';
import { API_KEY } from '../api/requests';
import './SeriesPage.css';

function SeriesPage({ myList }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreName, setGenreName] = useState('Todas');
  
  const [popularList, setPopularList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  const [newList, setNewList] = useState([]);

  // IDs de Gêneros específicos para TV (TMDb)
  const genres = [
    { id: '', name: 'Todas' },
    { id: '10759', name: 'Ação e Aventura' },
    { id: '35', name: 'Comédia' },
    { id: '18', name: 'Drama' },
    { id: '10765', name: 'Sci-Fi & Fantasy' },
    { id: '16', name: 'Animação' },
    { id: '9648', name: 'Mistério' },
    { id: '10751', name: 'Kids & Família' },
    { id: '80', name: 'Crime' },
  ];

  const handleGenreChange = (id, name) => {
    setSelectedGenre(id);
    setGenreName(name);
  };

  useEffect(() => {
    async function fetchGenreRows() {
      const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';

      // 1. Séries Populares
      const reqPopular = await tmdb.get(`/discover/tv?api_key=${API_KEY}${genreQuery}&language=pt-BR&sort_by=popularity.desc`);
      setPopularList(reqPopular.data.results);

      // 2. Séries Bem Avaliadas
      const reqTop = await tmdb.get(`/discover/tv?api_key=${API_KEY}${genreQuery}&language=pt-BR&sort_by=vote_average.desc&vote_count.gte=200`);
      setTopRatedList(reqTop.data.results);

      // 3. Novas Séries (Pela data de estreia 'first_air_date')
      const reqNew = await tmdb.get(`/discover/tv?api_key=${API_KEY}${genreQuery}&language=pt-BR&sort_by=first_air_date.desc&vote_count.gte=50`);
      setNewList(reqNew.data.results);
    }

    fetchGenreRows();
  }, [selectedGenre]);

  return (
    <>
      <Header myList={myList} />
      
      <div className="series-page-container">
        <div className="series-header">
          {/* Texto Alterado Aqui 👇 */}
          <h1>Categoria: {genreName}</h1>
          
          <div className="genre-list">
            {genres.map((genre) => (
              <button 
                key={genre.id} 
                className={`genre-button ${selectedGenre === genre.id ? 'active' : ''}`}
                onClick={() => handleGenreChange(genre.id, genre.name)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        <div className="series-rows-area">
          <Row title={selectedGenre ? `Populares em ${genreName}` : "Séries Populares"} movies={popularList} />
          <Row title={selectedGenre ? `Aclamadas pela Crítica em ${genreName}` : "Bem Avaliadas"} movies={topRatedList} />
          <Row title={selectedGenre ? `Novidades de ${genreName}` : "Novos Episódios e Estreias"} movies={newList} />
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default SeriesPage;