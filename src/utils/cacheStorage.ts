import { TypeSearchResult } from '../types/TypeSearchResult';

export const setCacheData = async (query: string, data: TypeSearchResult[]) => {
  const cacheStorage = await caches.open(query); // 스토리지 생성
  const cacheResponse = new Response(JSON.stringify(data)); // 데이터 캐싱
  cacheStorage.put(query, cacheResponse);
};

export const getCacheData = async (query: string) => {
  const cacheStorage = await caches.open(query);
  const cachedResponse = await cacheStorage.match(query);
  if (cachedResponse) {
    return cachedResponse;
  }
  return null;
};
