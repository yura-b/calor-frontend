import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createPayPalOrder = (ordersId: string[]) => {
  return axios.post(`${BASE_URL}/paypal/create-paypal-order`, {
    order_id: ordersId,
  });
};

export const capturePayPalOrder = (data) => {
  return axios.post(`${BASE_URL}/paypal/capture-paypal-order`, {
    orderID: data.orderID,
  });
};

export const deletePayPalID = (data) => {
  return axios.delete(`${BASE_URL}/paypal/${data.orderID}`);
};

export const stripePayment = (order_ids: string[]) => {
  return axios.post(`${BASE_URL}/stripe`, { order_ids });
};
