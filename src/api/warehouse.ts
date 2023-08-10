import axios from 'axios';
import {backendUrl} from '@/api/languages.ts';
import { authorization } from '@/api/config.ts';


export const getDetails = () =>{
    return axios.get(`${backendUrl}/product/details`)
}

export const changeColorAvailability = (_id:string, access_token: string) =>{
    return axios.patch(`${backendUrl}/product/colors/${_id}`, {}, authorization(access_token))
}