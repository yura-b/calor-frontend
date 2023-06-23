import axios from 'axios';
import {backendUrl} from '@/api/languages.ts';
import {LoginDto} from '@/api/dto/login.dto.ts';

export const login = (credentials: LoginDto) => {
    return axios.post(`${backendUrl}/user/login`, credentials)
}
