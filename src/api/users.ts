import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';
import { authorization } from '@/api/config.ts';

export const getUsers = (credential: string, name: string | null) => {
  return axios.get(`${backendUrl}/user/all?name=${name}`, authorization(credential));
};
