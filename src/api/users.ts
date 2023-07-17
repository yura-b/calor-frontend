import axios from 'axios';
import {backendUrl} from '@/api/languages.ts';
import {authorization} from '@/api/config.ts';


export const getUsers = (credential) => {
    return axios.get(`${backendUrl}/user/all`, authorization(credential));
};
