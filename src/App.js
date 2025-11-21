import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MyListPage from './pages/MyListPage';
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import './App.css';

function App() {
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem('streamflix_mylist');
    return savedList ? JSON.parse(savedList) : [];
  });

  // 1. Estado Global de Busca
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
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

  // Props comuns que vamos passar para todas as páginas
  const commonProps = {
    myList,
    searchTerm,
    setSearchTerm
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Passamos searchTerm e setSearchTerm para todas as páginas */}
          <Route path="/" element={<HomePage {...commonProps} addToList={addToList} />} />
          <Route path="/movies" element={<MoviesPage {...commonProps} />} />
          <Route path="/series" element={<SeriesPage {...commonProps} />} />
          <Route path="/watch/:type/:id" element={<MoviePage {...commonProps} addToList={addToList} removeFromList={removeFromList} />} />
          <Route path="/mylist" element={<MyListPage {...commonProps} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;