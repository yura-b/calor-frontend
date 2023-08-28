import axios from 'axios';
import { authorization } from '@/api/config.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getDetails = (productFilter: string) => {
  return axios.get(`${BASE_URL}/product/details/?productFilter=${productFilter}`);
};

export const changeColorAvailability = (_id: string, access_token: string) => {
  return axios.patch(`${BASE_URL}/product/colors/${_id}`, {}, authorization(access_token));
};
