import axios from 'axios';
import { ProductsDto } from '@/api/dto/products.dto.ts';
import { authorization } from '@/api/config.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCategories = () => {
  return axios.get(`${BASE_URL}/category`);
};
export const createProduct = (product: ProductsDto, access_token: string) => {
  return axios.post(`${BASE_URL}/accessories`, product, authorization(access_token));
};

export const getProducts = () => {
  return axios.get(`${BASE_URL}/accessories`);
};
