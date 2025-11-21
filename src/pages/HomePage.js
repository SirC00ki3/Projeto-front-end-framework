import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Row from '../components/Row/Row';
import Footer from '../components/Footer/Footer';
import tmdb from '../api/tmdb';
import requests from '../api/requests';

// Recebe props do App.js
function HomePage({ myList, addToList, searchTerm, setSearchTerm }) { 
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Novo estado para controlar carregamento

  // Busca os dados da Home (apenas uma vez)
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
  
  // Efeito de Busca
  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm && searchTerm.trim() !== '') {
        setIsSearching(true); // Começou a buscar
        try {
          const request = await tmdb.get(`${requests.fetchSearch}${searchTerm}`);
          setSearchResults(request.data.results);
        } catch (error) {
          console.error("Erro na busca");
        } finally {
          setIsSearching(false); // Terminou
        }
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    };

    // Debounce para não buscar a cada letra instantaneamente
    const timeoutId = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <>
      <Header 
        myList={myList} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
      />
      
      {/* Se tiver algo digitado na busca, mostramos a ÁREA DE BUSCA */}
      {searchTerm ? (
        <div style={{ marginTop: '100px', minHeight: '80vh', padding: '0 20px' }}>
            {isSearching ? (
                <h2 style={{color: 'white', textAlign: 'center'}}>Pesquisando por "{searchTerm}"...</h2>
            ) : searchResults.length > 0 ? (
                <Row title={`Resultados para "${searchTerm}"`} movies={searchResults} />
            ) : (
                <h2 style={{color: 'white', textAlign: 'center'}}>Nenhum resultado encontrado para "{searchTerm}"</h2>
            )}
        </div>
      ) : (
        /* Se NÃO tiver busca, mostra a HOME PADRÃO */
        <> 
          <Hero movie={bannerMovie} addToList={addToList} />
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