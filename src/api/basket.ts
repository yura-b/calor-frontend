import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const addToBasket = (data) => {
  return axios.post(`${BASE_URL}/basket/${data.userId}`, data.requestData);
};

export const updateBasketItemQuantity = (data) => {
  return axios.patch(`${BASE_URL}/basket/${data.userId}/quantity`, { basketItemId: data.basketItemId, quantity: data.count });
};

export const deleteFromBasket = (data) => {
  return axios.delete(`${BASE_URL}/basket`, { data });
};
