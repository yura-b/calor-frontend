import axios from 'axios';
import { authorization } from '@/api/config.ts';
import { ShippingInfoDto } from './dto/orders.dto';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUsers = (credential, filter: string) => {
  return axios.get(`${BASE_URL}/user/all?name=${filter}`, authorization(credential));
};

export const getUser = (credential: string, id: string) => {
  return axios.get(`${BASE_URL}/user/${id}`, authorization(credential));
};

export const getUserUsingToken = (credentials: string) => {
  return axios.get(`${BASE_URL}/user/token`, authorization(credentials));
};

export const assignAdditionalInfo = (info: ShippingInfoDto) => {
  return axios.put(`${BASE_URL}/user/shipping`, info);
};
export const getShippingById = (access_token: string, id: string) => {
  return axios.get(`${BASE_URL}/user/shipping/${id}`, authorization(access_token));
};
