import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';

export const getPageSection = () => {
  return axios.get(`${backendUrl}/manager/pages`)
}