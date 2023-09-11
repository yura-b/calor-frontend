import { EventDto, PatchEventDto } from '@/api/dto/event.dto.ts';
import axios from 'axios';
import { authorization } from '@/api/config.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createEvent = (event: EventDto, access_token: string) => {
  return axios.post(`${BASE_URL}/manager/event`, event, authorization(access_token));
};

export const getEvents = () => {
  return axios.get(`${BASE_URL}/manager/event`);
};

export const patchEvent = (access_token: string, eventData: PatchEventDto) => {
  return axios.patch(`${BASE_URL}/manager/event`, eventData, authorization(access_token));
};

export const deleteEvent = (access_token: string, id: string) => {
  return axios.delete(`${BASE_URL}/manager/event/${id}`, authorization(access_token));
};
