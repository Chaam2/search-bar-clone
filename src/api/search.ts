import { getCacheData, setCacheData } from '../utils/cacheStorage';
import { apiClient } from './apiClient';

export const getSearchResult = async (keyword: string) => {
  const cachedResponse = await getCacheData(keyword);
  if (cachedResponse) {
    return await cachedResponse.json();
  } else {
    console.info('CALLING API : getSearchResult');
    const { data } = await apiClient.get(`/sick?q=${keyword}`);
    setCacheData(keyword, data);
    return data;
  }
};
