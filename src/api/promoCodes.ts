import { PromoCodesDto } from '@/api/dto/promoCodes.dto.ts';
import axios from 'axios';
import { authorization } from '@/api/config.ts';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createCoupon = (access_token: string, data: PromoCodesDto) => {
  return axios.post(`${BASE_URL}/discount`, data, authorization(access_token));
};
export const getCoupons = (access_token: string) => {
  return axios.get(`${BASE_URL}/discount/all`, authorization(access_token));
};

export const activateCoupon = (coupon: string, order_ids: string[]) => {
  return axios.post(`${BASE_URL}/discount/activate`, {
    coupon,
    order_ids,
  });
};
