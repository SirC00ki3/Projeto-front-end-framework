// CORREÇÃO: Alterado de 'localhost' para '127.0.0.1' para garantir a conexão
const API_URL = 'http://127.0.0.1:8000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token'); 
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const api = {
  // 1. Login
  login: async (username, password) => {
    const res = await fetch(`${API_URL}/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error('Erro no Login');
    const data = await res.json();
    localStorage.setItem('token', data.access); 
    return data;
  },

  // 2. Registro (Ponto 4)
  register: async (username, email, password) => {
    const res = await fetch(`${API_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || JSON.stringify(errorData) || 'Erro ao criar conta');
    }
    return res.json();
  },

  // 3. Listar Filmes
  getMovies: async () => {
    const res = await fetch(`${API_URL}/movies/`, { headers: getHeaders() });
    return res.json();
  },

  // 4. Favoritar
  toggleFavorite: async (id, isFavorite) => {
    const method = isFavorite ? 'DELETE' : 'POST';
    await fetch(`${API_URL}/movies/${id}/favorite/`, {
      method,
      headers: getHeaders()
    });
  }
};