// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header'; // Reaproveitamos o Header
import Footer from '../components/Footer/Footer'; // Reaproveitamos o Footer
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login tentado com:", email, password);
    // Aqui entraremos com a lógica de integração com o Django depois.
    // Por enquanto, vamos simular um login redirecionando para a Home.
    navigate('/'); 
  };

  return (
    <div className="login-page">
      {/* Passamos myList vazia só para o header renderizar sem erros */}
      <Header myList={[]} /> 
      
      <div className="login-container">
        <div className="login-box">
          <h2>Entrar</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email ou número de telefone" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="login-button">Entrar</button>
          </form>
          
          <div className="login-footer">
            <p>
              Novo por aqui? <Link to="/register">Assine agora.</Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default LoginPage;