import axios from 'axios';
import { getToken } from './auth';

const API = 'http://localhost:5000/api/comments';

export const getComments = async (cardId: string) => {
  const res = await axios.get(`${API}/${cardId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const addComment = async (cardId: string, text: string) => {
  await axios.post(API, { cardId, text }, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};
