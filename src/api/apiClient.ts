import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.response.use(
  response => {
    return response.data;
  },

  async error => {
    return Promise.reject(error);
  },
);
