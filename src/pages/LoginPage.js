import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import logo from "../imagens/icons/logo.png";
import './LoginPage.css';
import { api } from '../api'; // IMPORTANTE: Verifique se o caminho para api.js está correto

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Novo estado para erros
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpa mensagens de erro anteriores

    try {
      // Tenta logar na API Django
      // O primeiro parâmetro é o username. Estamos enviando o email.
      await api.login(email, password);
      
      // Se chegou aqui, o token foi salvo no localStorage (dentro do api.js)
      onLogin(email); 
      navigate('/browse'); 
    } catch (err) {
      // Se a senha estiver errada ou o servidor fora do ar
      setError('Email ou senha incorretos.');
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <Link to="/">
          <img src={logo} alt="StreamFlix" className="login-logo" />
        </Link>
      </div>
      
      <div className="login-container">
        <div className="login-box">
          <h2>Entrar</h2>
          
          {/* Exibe mensagem de erro se houver */}
          {error && <div style={{ color: '#e50914', marginBottom: '15px' }}>{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input 
                type="text" // Mudei para text para aceitar username ou email
                placeholder="Email ou usuário" 
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