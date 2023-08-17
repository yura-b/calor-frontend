import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';
import { authorization } from '@/api/config.ts';

export const getAllReviews = (access_token: string, filter: string) => {
  return axios.get(`${backendUrl}/review?filter=${filter}`, authorization(access_token));
};
export const deleteReview = (access_token: string, id: string) => {
  return axios.delete(`${backendUrl}/review/${id}`, authorization(access_token));
};

export const approveReview = (access_token: string, id: string) => {
  return axios.put(`${backendUrl}/review/${id}`, {}, authorization(access_token));
};
