import axios from 'axios';
import { EventDto } from '@/api/dto/event.dto';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchEvents = async () => {
  try {
    const response = await axios.get<EventDto[]>(`${BASE_URL}/manager/event`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};
