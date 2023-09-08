import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const addToBasket = (data) => {
  console.log(data);
  return axios.post(`${BASE_URL}/basket/${data.userId}`, data.requestData);
};

export const deleteFromBasket = (data) => {
  return axios.delete(`${BASE_URL}/basket`, { data });
};
