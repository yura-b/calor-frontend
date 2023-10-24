import axios from 'axios';

const VITE_INSTAGRAM_USER_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_USER_ACCESS_TOKEN;

export const instagramGetPosts = () => {
  const OPTIONS = 'id,media_type,media_url,caption';
  const POSTS_LIMIT = 20;
  const instagramGraphURL = `https://graph.instagram.com/me/media?fields=${OPTIONS}&limit=${POSTS_LIMIT}&access_token=${VITE_INSTAGRAM_USER_ACCESS_TOKEN}`;

  return axios.get(instagramGraphURL);
};
