import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';
import { ProductsDto } from '@/api/dto/products.dto.ts';
import { authorization } from '@/api/config.ts';

export const getCategories = () => {
  return axios.get(`${backendUrl}/category`);
};
export const createProduct = (product: ProductsDto, access_token: string) => {
  return axios.post(`${backendUrl}/accessories`, product, authorization(access_token));
};

export const getProducts = () => {
  return axios.get(`${backendUrl}/accessories`);
};
