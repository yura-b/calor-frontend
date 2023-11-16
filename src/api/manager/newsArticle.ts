import { NewsArticleDto, EditNewsArticleDto } from '@/api/dto/newsArticle.dto';
import axios from 'axios';
import { authorization } from '@/api/config.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createNewsArticle = (newsArticle: NewsArticleDto, access_token: string) => {
  return axios.post(`${BASE_URL}/manager/newsarticle`, newsArticle, authorization(access_token));
};

export const getNewsArticles = () => {
  return axios.get(`${BASE_URL}/manager/newsarticle`);
};

export const editNewsArticle = (access_token: string, newsArticleData: EditNewsArticleDto) => {
  return axios.patch(`${BASE_URL}/manager/newsarticle`, newsArticleData, authorization(access_token));
};

export const deleteNewsArticle = (access_token: string, id: string) => {
  return axios.delete(`${BASE_URL}/manager/newsarticle/${id}`, authorization(access_token));
};
