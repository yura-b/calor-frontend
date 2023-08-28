import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';
import { authorization } from '@/api/config.ts';
import { changeOrderStatusInterface, CreateOrderDto } from '@/api/dto/orders.dto.ts';

export const getOrders = (credential: string | null, emailFilter: string) => {
  if (!credential) return
  return axios.get(`${backendUrl}/order/all/?email=${emailFilter}`, authorization(credential));
};

export const getOrder = (credential: string, id: string) => {
  return axios.get(`${backendUrl}/order/${id}`, authorization(credential));
};

export const changeOrderStatus = (credentials: string, data: changeOrderStatusInterface) => {
  return axios.put(
    `${backendUrl}/order/${data._id}`,
    {
      status: data.orderStatus,
    },
    authorization(credentials)
  );
};

export const createOrder = (order: CreateOrderDto) => {
  return axios.post(`${backendUrl}/order`, order);
};
