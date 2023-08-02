import axios from 'axios';
import { PageSection } from '@/constants/interfaces/pageSection.ts';
import { authorization } from '@/api/config.ts';
import { backendUrl } from '@/api/languages.ts';


export const getPageSection = () => {
  return axios.get(`${backendUrl}/manager/pages`)
}

export const saveChanges = (access_token: string, data: PageSection[]) => {
  return axios.put(`${backendUrl}/manager/pages`, data, authorization(access_token))
}

export const uploadEventPhoto = (file) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('folder', 'events');

  return axios.post(`${backendUrl}/do/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}