import axios from 'axios';

const BASE_URL = 'https://search-bar-clone-server.vercel.app';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.response.use(
  response => {
    return response;
  },

  async error => {
    return Promise.reject(error);
  },
);
