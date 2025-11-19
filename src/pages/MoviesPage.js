import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Row from '../components/Row/Row';
import tmdb from '../api/tmdb';
import { API_KEY } from '../api/requests';
import './MoviesPage.css';

function MoviesPage({ myList }) {
  // Começa com "Todos" selecionado (ID vazio)
  const [selectedGenre, setSelectedGenre] = useState(''); 
  const [genreName, setGenreName] = useState('Todos');
  
  const [popularList, setPopularList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  const [newList, setNewList] = useState([]);

  const genres = [
    { id: '', name: 'Todos' }, // O ID vazio faz a API buscar geral
    { id: '28', name: 'Ação' },
    { id: '35', name: 'Comédia' },
    { id: '27', name: 'Terror' },
    { id: '10749', name: 'Romance' },
    { id: '878', name: 'Ficção Científica' },
    { id: '18', name: 'Drama' },
    { id: '16', name: 'Animação' },
  ];

  const handleGenreChange = (id, name) => {
    setSelectedGenre(id);
    setGenreName(name);
  };

  useEffect(() => {
    async function fetchGenreRows() {
      // Se o ID for vazio (Todos), a API busca sem filtro de gênero
      const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';

      // 1. Populares
      const reqPopular = await tmdb.get(`/discover/movie?api_key=${API_KEY}${genreQuery}&language=pt-BR&sort_by=popularity.desc`);
      setPopularList(reqPopular.data.results);

      // 2. Bem Avaliados
      const reqTop = await tmdb.get(`/discover/movie?api_key=${API_KEY}${genreQuery}&language=pt-BR&sort_by=vote_average.desc&vote_count.gte=200`);
      setTopRatedList(reqTop.data.results);

      // 3. Lançamentos
      const reqNew = await tmdb.get(`/discover/movie?api_key=${API_KEY}${genreQuery}&language=pt-BR&sort_by=primary_release_date.desc&vote_count.gte=50`);
      setNewList(reqNew.data.results);
    }

    fetchGenreRows();
  }, [selectedGenre]);

  return (
    <>
      <Header myList={myList} />
      
      <div className="movies-page-container">
        <div className="movies-header">
          {/* Texto Alterado */}
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
          {/* Ajuste no título das linhas para ficar mais natural */}
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