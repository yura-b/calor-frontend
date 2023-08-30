import axios from 'axios';
import { PageSection } from '@/constants/interfaces/pageSection.ts';
import { authorization } from '@/api/config.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getPageSection = () => {
  return axios.get(`${BASE_URL}/manager/pages`);
};

export const saveChanges = (access_token: string, data: PageSection[]) => {
  return axios.put(`${BASE_URL}/manager/pages`, data, authorization(access_token));
};

export const uploadEventPhoto = (file) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('folder', 'events');

  return axios.post(`${BASE_URL}/do/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
