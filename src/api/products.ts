import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';

export const getCategories = () => {
  return axios.get(`${backendUrl}/category`)
}

export const getProducts = async () => {
  console.log(1)
  return await axios.get(`${backendUrl}/product`)
};