import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';

export const getCategories = () => {
  return axios.get(`${backendUrl}/category`)
}