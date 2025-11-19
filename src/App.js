import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MyListPage from './pages/MyListPage';
import './App.css';

function App() {
  // 1. Inicializa o estado lendo do LocalStorage (se existir)
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem('streamflix_mylist');
    return savedList ? JSON.parse(savedList) : [];
  });

  // 2. Toda vez que 'myList' mudar, salva no LocalStorage
  useEffect(() => {
    localStorage.setItem('streamflix_mylist', JSON.stringify(myList));
  }, [myList]);

  const addToList = (movie) => {
    // Verifica se o filme já está na lista para evitar duplicatas
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
          <Route 
            path="/" 
            element={<HomePage myList={myList} addToList={addToList} />} 
          />
          <Route 
            path="/movie/:id" 
            element={<MoviePage addToList={addToList} removeFromList={removeFromList} myList={myList} />} 
          />
          <Route 
            path="/mylist" 
            element={<MyListPage myList={myList} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;