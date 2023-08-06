import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';

export const getDetails = () => {
  return axios.get(`${backendUrl}/product/details`);
};
