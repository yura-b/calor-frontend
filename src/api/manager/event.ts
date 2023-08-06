import { EventDto } from '@/api/dto/event.dto.ts';
import { backendUrl } from '@/api/languages.ts';
import axios from 'axios';
import { authorization } from '@/api/config.ts';

export const createEvent = (event: EventDto, access_token: string) => {
  return axios.post(`${backendUrl}/manager/event`, event, authorization(access_token));
};

export const getEvents = () => {
  return axios.get(`${backendUrl}/manager/event`);
};
