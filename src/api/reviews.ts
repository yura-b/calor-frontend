import axios from 'axios';
import {backendUrl} from '@/api/languages.ts';
import {authorization} from '@/api/config.ts';


const getAllReviews = (access_token:string, filter: string) =>{
    return axios.get(`${backendUrl}/reviews?filter=${filter}`, authorization(access_token))
}
