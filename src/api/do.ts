import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const uploadPhoto = (file, folderName) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('folder', folderName);

  return axios.post(`${BASE_URL}/do/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
