import axios from 'axios';

export const backendUrl = 'http://localhost:3000';

export const getTexts = () => {
  return axios.get(`${backendUrl}/text`);
};
