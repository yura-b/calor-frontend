import axios from 'axios';
import { authorization } from '@/api/config.ts';
import { SaveDeliveryPrice } from '@/constants/interfaces/deliveryPrice.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getDeliveryPrices = (access_token: string) => {
  return axios.get(`${BASE_URL}/delivery-price`, authorization(access_token));
};

export const saveDeliveryPrice = (access_token: string, data: SaveDeliveryPrice) => {
  return axios.put(`${BASE_URL}/delivery-price`, data, authorization(access_token));
};
