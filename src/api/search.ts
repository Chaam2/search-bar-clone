import { getCacheData, setCacheData } from '../utils/cacheStorage';
import { apiClient } from './apiClient';

export const getSearchResult = async (keyword: string) => {
  const cachedResponse = await getCacheData(API_URL, keyword);
  if (cachedResponse) {
    return await cachedResponse.json();
  } else {
    console.info('CALLING API : getSearchResult');
    const { data } = await apiClient.get(`${API_URL}?q=${keyword}`);
    setCacheData(API_URL, keyword, data);
    return data;
  }
};

const API_URL = '/sick';
