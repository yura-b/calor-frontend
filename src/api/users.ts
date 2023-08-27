import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';
import { authorization } from '@/api/config.ts';
import { ShippingInfoDto } from './dto/orders.dto';

export const getUsers = (credential, filter: string) => {
  return axios.get(`${backendUrl}/user/all?name=${filter}`, authorization(credential));
};

export const getUser = (credential: string, id: string) => {
  return axios.get(`${backendUrl}/user/${id}`, authorization(credential));
};

export const getUserUsingToken = (credentials: string) => {
  return axios.get(`${backendUrl}/user/token`, authorization(credentials));
};

export const assignAdditionalInfo = (info: ShippingInfoDto) => {
  return axios.put(`${backendUrl}/user/shipping`, info)
}
export const getShippingById = (access_token: string, id: string) => {
  return axios.get(`${backendUrl}/user/shipping/${id}`, authorization(access_token));
};