import axios from 'axios';
import { ProductsDto } from '@/api/dto/products.dto.ts';
import { authorization } from '@/api/config.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCategories = () => {
  return axios.get(`${BASE_URL}/category`);
};
export const getProductById = (id: string) => {
  return axios.get(`${BASE_URL}/product/${id}`);
};

// export const getAllProducts = () => {
//   return axios.get(`${BASE_URL}/product`);
// };

export const createProduct = (product: ProductsDto, access_token: string) => {
  return axios.post(`${BASE_URL}/accessories`, product, authorization(access_token));
};

export const getProducts = () => {
  return axios.get(`${BASE_URL}/product`);
};

export const getAccessories = () => {
  return axios.get(`${BASE_URL}/accessories`);
};

export const getBoughtProducts = (access_token: string) => {
  return axios.get(`${BASE_URL}/user/purchases`, authorization(access_token));
};

export const getUserReviews = (access_token: string) => {
  return axios.get(`${BASE_URL}/user/reviews`, authorization(access_token));
};

export const saveNewPrice = (access_token: string, newPrice: number, product_id: string) => {
  return axios.patch(`${BASE_URL}/product/price`, { id: product_id, price: newPrice }, authorization(access_token));
};

export const deleteAccessory = (access_token: string, id: string) => {
  return axios.delete(`${BASE_URL}/accessories/${id}`, authorization(access_token));
};
