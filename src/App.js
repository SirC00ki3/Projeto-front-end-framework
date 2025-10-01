import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Row from './components/Row/Row';
import Footer from './components/Footer/Footer';
import tmdb from './api/tmdb';
import requests from './api/requests';

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      // Fetching all movies at once
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

  return (
    <div className="App">
      <Header />
      <Hero movie={bannerMovie} />
      <Row title="Em Alta Agora" movies={trendingMovies} />
      <Row title="Comédias" movies={comedyMovies} />
      <Row title="Terror" movies={horrorMovies} />
      <Row title="Romances" movies={romanceMovies} />
      <Footer />
    </div>
  );
}

export default App;