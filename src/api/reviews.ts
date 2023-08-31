import axios from 'axios';
import { authorization } from '@/api/config.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllReviews = (access_token: string, filter: string) => {
  return axios.get(`${BASE_URL}/review?filter=${filter}`, authorization(access_token));
};
export const deleteReview = (access_token: string, id: string) => {
  return axios.delete(`${BASE_URL}/review/${id}`, authorization(access_token));
};

export const approveReview = (access_token: string, id: string) => {
  return axios.put(`${BASE_URL}/review/${id}`, {}, authorization(access_token));
};
