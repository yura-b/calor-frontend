import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const subscribe = (email: string) => {
  return axios.put(`${BASE_URL}/emails`, { email });
};
