import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';
import { authorization } from '@/api/config.ts';
import { changeOrderStatusInterface } from '@/api/dto/orders.dto.ts';

export const getOrders = (credential) => {
  return axios.get(`${backendUrl}/order/all`, authorization(credential));
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
