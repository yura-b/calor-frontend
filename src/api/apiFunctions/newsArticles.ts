import axios from 'axios';
import { NewsArticleDto } from '@/api/dto/newsArticle.dto';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchNewsArticles = async () => {
  try {
    const response = await axios.get<NewsArticleDto[]>(`${BASE_URL}/manager/newsarticle`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
};
