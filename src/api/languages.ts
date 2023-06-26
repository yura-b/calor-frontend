import axios from 'axios';

export const backendUrl = import.meta.env.VITE_BASE_URL;

export const getTexts = () => {
  return axios.get(`${backendUrl}/text`);
};
