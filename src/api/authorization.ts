import axios from 'axios';
import {backendUrl} from '@/api/languages.ts';
import {LoginDto} from '@/api/dto/login.dto.ts';

export const login = (credentials: LoginDto) => {
    return axios.post(`${backendUrl}/user/login`, credentials)
}

export const googleLogin = (credentials: string) => {
    return axios.post(`${backendUrl}/user/google`, {
        credentials: credentials
    })
}
