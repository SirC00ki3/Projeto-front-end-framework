import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api'; 
import logo from "../imagens/icons/logo.png"; 
import './LoginPage.css';

function RegisterPage({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || '';

  const [email, setEmail] = useState(initialEmail);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Força o navegador a esperar o Django responder
      console.log("Enviando...");
      const resposta = await api.register(username, email, password);
      console.log("Resposta recebida:", resposta);

      // 2. Se passar daqui, é porque o Backend confirmou com sucesso (200 OK)
      await api.login(username, password);
      
      // 3. Esta é a mensagem que deve aparecer. Se aparecer outra, o arquivo não salvou.
      alert(`SUCESSO REAL! Usuário ${username} foi salvo no banco.`);
      
      if (onLogin) onLogin(email); 
      navigate('/browse');
      
    } catch (err) {
      console.error(err);
      // Mostra o erro real se o Django recusar
      const msg = err.message || "Erro desconhecido";
      setError(`FALHA DO BACKEND: ${msg}`);
      alert(`O Backend recusou: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <img src={logo} alt="StreamFlix" className="login-logo" onClick={() => navigate('/')}/>
      </div>
      <div className="login-container">
        <div className="login-box">
          <h2>Criar Conta (Modo Estrito)</h2>
          
          {error && <div style={{color: 'red', padding: '10px', fontWeight: 'bold'}}>{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <input type="text" placeholder="Nome de Usuário" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Verificando com Django...' : 'Cadastrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;