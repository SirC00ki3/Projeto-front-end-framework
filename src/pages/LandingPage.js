import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../imagens/icons/logo.png"; // Ajuste o caminho da sua logo se necessário
import './LandingPage.css';

function LandingPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    // Envia o email para a página de cadastro
    navigate('/register', { state: { email: email } });
  };

  return (
    <div className="landing-page">
      <div className="landing-header">
        <img src={logo} alt="Logo" className="landing-logo" />
        <Link to="/login" className="landing-signin-btn">Entrar</Link>
      </div>

      <div className="landing-content">
        <h1>Filmes, séries e muito mais, sem limites</h1>
        <h2>A partir de R$ 20,90. Cancele quando quiser.</h2>
        <h3>Quer assistir? Informe seu email para criar ou reiniciar sua assinatura.</h3>

        <form className="email-signup-form" onSubmit={handleGetStarted}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">
            Vamos lá &gt;
          </button>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;