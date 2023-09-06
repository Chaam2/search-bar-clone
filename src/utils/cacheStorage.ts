import { TypeSearchResult } from '../types/TypeSearchResult';

export const setCacheData = async (query: string, data: TypeSearchResult[]) => {
  const cacheStorage = await caches.open(query); // 스토리지 생성
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + EXPIRE_MINUTE);
  const headerOption = {
    headers: {
      Expires: expireDate.toUTCString(),
    },
  };
  const cacheResponse = new Response(JSON.stringify(data), headerOption); // 데이터 캐싱
  cacheStorage.put(query, cacheResponse);
};

export const getCacheData = async (query: string) => {
  const cacheStorage = await caches.open(query);
  const cachedResponse = await cacheStorage.match(query);

  if (!cachedResponse) return null; // 캐시된 응답 없는 경우 null 반환

  const expireHeader = cachedResponse.headers.get('Expires');
  if (!expireHeader) return null; // expire header 없는 경우 null 반환

  const parseExpireHeader = new Date(expireHeader);
  const isExpired = new Date() > parseExpireHeader;
  if (isExpired) return null; // 만료된 캐시인 경우 null 반환

  return cachedResponse;
};

const EXPIRE_MINUTE = 10;
