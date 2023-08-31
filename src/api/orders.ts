import axios from 'axios';
import { authorization } from '@/api/config.ts';
import { changeOrderStatusInterface, CreateOrderDto } from '@/api/dto/orders.dto.ts';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getOrders = (credential: string | null, emailFilter: string) => {
  if (!credential) return
  return axios.get(`${BASE_URL}/order/all/?email=${emailFilter}`, authorization(credential));
}

export const getOrder = (credential: string, id: string) => {
  return axios.get(`${BASE_URL}/order/${id}`, authorization(credential));
};

export const changeOrderStatus = (credentials: string, data: changeOrderStatusInterface) => {
  return axios.put(
    `${BASE_URL}/order/${data._id}`,
    {
      status: data.orderStatus,
    },
    authorization(credentials)
  );
};

export const createOrder = (order: CreateOrderDto) => {
  return axios.post(`${BASE_URL}/order`, order);
};
