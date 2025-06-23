import axios from 'axios';
import { getToken } from './auth';

const API = 'http://localhost:5000/api/cards';

export const getCards = async () => {
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const getCardById = async (id: string) => {
  const res = await axios.get(`${API}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data.find((c: any) => c._id === id);
};
