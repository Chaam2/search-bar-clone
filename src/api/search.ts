import { apiClient } from './apiClient';

export const getSearchResult = async (keyword: string) => {
  console.info('CALLING API : getSearchResult');
  return await apiClient.get(`/sick?q=${keyword}`);
};
