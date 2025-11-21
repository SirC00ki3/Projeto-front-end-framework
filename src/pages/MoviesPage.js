import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Row from '../components/Row/Row';
import tmdb from '../api/tmdb';
import { API_KEY } from '../api/requests';
import './MoviesPage.css';

// Recebe user e handleLogout
function MoviesPage({ myList, searchTerm, setSearchTerm, user, handleLogout }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreName, setGenreName] = useState('Todos');
  
  const [popularList, setPopularList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  const [newList, setNewList] = useState([]);

  const genres = [
    { id: '', name: 'Todos' },
    { id: '28', name: 'Ação' },
    { id: '35', name: 'Comédia' },
    { id: '27', name: 'Terror' },
    { id: '10749', name: 'Romance' },
    { id: '878', name: 'Ficção' },
    { id: '18', name: 'Drama' },
    { id: '16', name: 'Animação' },
  ];

  const handleGenreChange = (id, name) => {
    setSelectedGenre(id);
    setGenreName(name);
  };

  useEffect(() => {
    async function fetchGenreRows() {
      const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
      const reqPopular = await tmdb.get(`/discover/movie?api_key=${API_KEY}${genreQuery}&language=pt-BR&sort_by=popularity.desc`);
      setPopularList(reqPopular.data.results);
      const reqTop = await tmdb.get(`/discover/movie?api_key=${API_KEY}${genreQuery}&language=pt-BR&sort_by=vote_average.desc&vote_count.gte=200`);
      setTopRatedList(reqTop.data.results);
      const reqNew = await tmdb.get(`/discover/movie?api_key=${API_KEY}${genreQuery}&language=pt-BR&sort_by=primary_release_date.desc&vote_count.gte=50`);
      setNewList(reqNew.data.results);
    }
    fetchGenreRows();
  }, [selectedGenre]);

  return (
    <>
      {/* Passa user e handleLogout para o Header */}
      <Header 
        myList={myList} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        user={user} 
        handleLogout={handleLogout} 
      />
      
      <div className="movies-page-container">
        <div className="movies-header">
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

        <div className="movies-rows-area">
          <Row title={selectedGenre ? `Populares em ${genreName}` : "Filmes Populares"} movies={popularList} />
          <Row title={selectedGenre ? `Aclamados pela Crítica em ${genreName}` : "Aclamados pela Crítica"} movies={topRatedList} />
          <Row title={selectedGenre ? `Novidades de ${genreName}` : "Novidades no Catálogo"} movies={newList} />
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default MoviesPage;