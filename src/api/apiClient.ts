import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

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

//request interceptor로 캐시된 데이터가 있으면 요청 안보내고 캐시된 데이터 리턴,
//캐시된 데이터 없으면 요청 보낸 후 캐시스토리지에 해당 데이터 저장
