import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getTexts = () => {
  return axios.get(`${BASE_URL}/text`);
};
