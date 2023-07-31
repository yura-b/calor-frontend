import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';
import { PageSection } from '@/constants/interfaces/pageSection.ts';
import { authorization } from '@/api/config.ts';

export const getPageSection = () => {
  return axios.get(`${backendUrl}/manager/pages`)
}

export const saveChanges = (access_token: string, data: PageSection[]) =>{
    return axios.put(`${backendUrl}/manager/pages`, data, authorization(access_token))
}