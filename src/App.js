// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MyListPage from './pages/MyListPage';
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import './App.css';

function App() {
  // ... (mantenha todo o código do state e useEffect igual) ...
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem('streamflix_mylist');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('streamflix_mylist', JSON.stringify(myList));
  }, [myList]);

  const addToList = (movie) => {
    if (!myList.some(item => item.id === movie.id)) {
      setMyList((prevList) => [...prevList, movie]);
    }
  };

  const removeFromList = (movieId) => {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage myList={myList} addToList={addToList} />} />
          <Route path="/movies" element={<MoviesPage myList={myList} />} />
          <Route path="/series" element={<SeriesPage myList={myList} />} />
          
          {/* MUDANÇA AQUI: A rota agora aceita o tipo (tv ou movie) */}
          <Route path="/watch/:type/:id" element={<MoviePage addToList={addToList} removeFromList={removeFromList} myList={myList} />} />
          
          <Route path="/mylist" element={<MyListPage myList={myList} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;