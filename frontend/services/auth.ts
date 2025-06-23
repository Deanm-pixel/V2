import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API}/login`, { email, password });
  localStorage.setItem('token', res.data.token);
};

export const register = async (username: string, email: string, password: string) => {
  await axios.post(`${API}/register`, { username, email, password });
};

export const getToken = () => localStorage.getItem('token');
