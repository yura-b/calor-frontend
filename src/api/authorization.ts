import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';
import { LoginDto } from '@/api/dto/login.dto.ts';
import { SignupDto } from '@/api/dto/signup.dto.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = (credentials: LoginDto) => {
  return axios.post(`${BASE_URL}/user/login`, credentials);
};

export const signUp = (credentials: SignupDto) => {
  return axios.post(`${BASE_URL}/user/signup`, credentials);
};

export const googleLogin = (credentials: string) => {
  return axios.post(`${BASE_URL}/user/google`, { credentials });
};

export const sendEmailForReset = (email: string) => {
  return axios.post(`${backendUrl}/user/reset/`, {email});
};
export const resetPassword = (id: string, password: string) => {
  return axios.patch(`${BASE_URL}/user/reset`, { id, password });
};
