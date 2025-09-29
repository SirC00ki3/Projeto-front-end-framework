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
  const [comedyMovies, setComedyMovies] = useState([]); // Novo estado para Comédia
  const [horrorMovies, setHorrorMovies] = useState([]);  // Novo estado para Terror
  const [romanceMovies, setRomanceMovies] = useState([]); // Novo estado para Romance

  // Efeito para buscar filmes em alta
  useEffect(() => {
    async function fetchTrendingData() {
      const request = await tmdb.get(requests.fetchTrending);
      setTrendingMovies(request.data.results);
    }
    fetchTrendingData();
  }, []);

  // Efeito para buscar filme do banner
  useEffect(() => {
    async function fetchBannerMovie() {
      const request = await tmdb.get(requests.fetchNetflixOriginals);
      const randomMovie = request.data.results[Math.floor(Math.random() * request.data.results.length)];
      setBannerMovie(randomMovie);
    }
    fetchBannerMovie();
  }, []);

  // Efeito para buscar filmes de Comédia
  useEffect(() => {
    async function fetchComedyMovies() {
      const request = await tmdb.get(requests.fetchComedyMovies);
      setComedyMovies(request.data.results);
    }
    fetchComedyMovies();
  }, []);

  // Efeito para buscar filmes de Terror
  useEffect(() => {
    async function fetchHorrorMovies() {
      const request = await tmdb.get(requests.fetchHorrorMovies);
      setHorrorMovies(request.data.results);
    }
    fetchHorrorMovies();
  }, []);

  // Efeito para buscar filmes de Romance
  useEffect(() => {
    async function fetchRomanceMovies() {
      const request = await tmdb.get(requests.fetchRomanceMovies);
      setRomanceMovies(request.data.results);
    }
    fetchRomanceMovies();
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