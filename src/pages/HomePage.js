import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Row from '../components/Row/Row';
import Footer from '../components/Footer/Footer';
import tmdb from '../api/tmdb';
import requests from '../api/requests';

function HomePage({ myList, addToList }) { 
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  
  // Novos estados para a busca
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const trendingRequest = await tmdb.get(requests.fetchTrending);
      setTrendingMovies(trendingRequest.data.results);
      
      const netflixOriginals = await tmdb.get(requests.fetchNetflixOriginals);
      const randomMovie = netflixOriginals.data.results[Math.floor(Math.random() * netflixOriginals.data.results.length)];
      setBannerMovie(randomMovie);

      const comedyRequest = await tmdb.get(requests.fetchComedyMovies);
      setComedyMovies(comedyRequest.data.results);

      const horrorRequest = await tmdb.get(requests.fetchHorrorMovies);
      setHorrorMovies(horrorRequest.data.results);

      const romanceRequest = await tmdb.get(requests.fetchRomanceMovies);
      setRomanceMovies(romanceRequest.data.results);
    }
    fetchMovies();
  }, []);
  
  // Função que faz a busca na API
  const handleSearch = async (e) => {
    e.preventDefault(); // Evita que a página recarregue
    if (searchTerm.trim() === '') {
      setSearchResults([]); // Se estiver vazio, limpa os resultados
      return;
    }
    // Busca na API usando o endpoint de pesquisa
    const request = await tmdb.get(`${requests.fetchSearch}${searchTerm}`);
    setSearchResults(request.data.results);
  };

  return (
    <>
      {/* Passamos as funções de busca para o Header */}
      <Header 
        myList={myList} 
        onSearchSubmit={handleSearch} 
        onSearchChange={setSearchTerm} 
      />
      
      <Hero movie={bannerMovie} addToList={addToList} />
      
      {/* Lógica de Exibição: Se tiver resultados, mostra eles. Se não, mostra as categorias normais */}
      {searchResults.length > 0 ? (
        <div style={{ marginTop: '20px' }}>
            <Row title={`Resultados para "${searchTerm}"`} movies={searchResults} />
        </div>
      ) : (
        <> 
          <div id="trending">
            <Row title="Em Alta Agora" movies={trendingMovies} />
          </div>
          <div id="comedy">
            <Row title="Comédias" movies={comedyMovies} />
          </div>
          <div id="horror">
            <Row title="Terror" movies={horrorMovies} />
          </div>
          <div id="romance">
            <Row title="Romances" movies={romanceMovies} />
          </div>
        </>
      )}
      
      <Footer />
    </>
  );
}

export default HomePage;