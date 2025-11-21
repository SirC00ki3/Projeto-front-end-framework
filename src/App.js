import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MyListPage from './pages/MyListPage';
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
  // Tenta recuperar o usuário salvo. Se não tiver, inicia como null.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('streamflix_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem('streamflix_mylist');
    return savedList ? JSON.parse(savedList) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('streamflix_mylist', JSON.stringify(myList));
  }, [myList]);

  const handleLogin = (email) => {
    const newUser = { email };
    setUser(newUser);
    localStorage.setItem('streamflix_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('streamflix_user');
    setSearchTerm('');
  };

  const addToList = (movie) => {
    if (!myList.some(item => item.id === movie.id)) {
      setMyList((prevList) => [...prevList, movie]);
    }
  };

  const removeFromList = (movieId) => {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId));
  };

  // Agrupa as props para facilitar
  const commonProps = {
    myList,
    searchTerm,
    setSearchTerm,
    user,         // <-- ESSENCIAL: Envia o usuário
    handleLogout  // <-- ESSENCIAL: Envia a função de sair
  };

  // Componente de Rota Protegida (Só deixa passar se tiver user)
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rota Raiz: Se logado -> Home. Se não -> Landing Page */}
          <Route path="/" element={user ? <Navigate to="/browse" /> : <LandingPage />} />
          
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
          
          {/* ROTAS PROTEGIDAS */}
          <Route path="/browse" element={<ProtectedRoute><HomePage {...commonProps} addToList={addToList} /></ProtectedRoute>} />
          <Route path="/movies" element={<ProtectedRoute><MoviesPage {...commonProps} /></ProtectedRoute>} />
          <Route path="/series" element={<ProtectedRoute><SeriesPage {...commonProps} /></ProtectedRoute>} />
          <Route path="/watch/:type/:id" element={<ProtectedRoute><MoviePage {...commonProps} addToList={addToList} removeFromList={removeFromList} /></ProtectedRoute>} />
          <Route path="/mylist" element={<ProtectedRoute><MyListPage {...commonProps} /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;