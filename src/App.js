// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MyListPage from './pages/MyListPage';
import LoginPage from './pages/LoginPage'; // <-- Importe aqui
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
          
          {/* Nova Rota de Login */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/movie/:id" element={<MoviePage addToList={addToList} removeFromList={removeFromList} myList={myList} />} />
          <Route path="/mylist" element={<MyListPage myList={myList} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;