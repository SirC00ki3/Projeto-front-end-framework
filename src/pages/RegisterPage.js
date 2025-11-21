import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Importe Link
import Footer from '../components/Footer/Footer';
import logo from "../imagens/icons/logo.png"; // Importe a logo
import './LoginPage.css';

function RegisterPage({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || '';
  
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Conta criada para: ${email}`);
    if (onLogin) onLogin(email);
    navigate('/browse');
  };

  return (
    <div className="login-page">
      {/* Logo no topo */}
      <div className="login-header">
        <Link to="/">
          <img src={logo} alt="StreamFlix" className="login-logo" />
        </Link>
      </div>

      <div className="login-container">
        <div className="login-box">
          <h2>Crie sua conta</h2>
          <form onSubmit={handleRegister}>
            {/* ... (campos do formulário iguais) ... */}
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email" 
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
            <button type="submit" className="login-button">Cadastrar</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;