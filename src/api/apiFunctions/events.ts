import axios from 'axios';
import { backendUrl } from '@/api/languages.ts';
import { EventDto } from '@/api/dto/event.dto';

export const fetchEvents = async () => {
  try {
    const response = await axios.get<EventDto[]>(`${backendUrl}/manager/event`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};
