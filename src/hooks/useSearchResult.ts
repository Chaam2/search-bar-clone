import { useEffect, useState } from 'react';
import { getSearchResult } from '../api/search';
import { TypeSearchResult } from '../types/TypeSearchResult';
import { useDebounce } from './useDebounce';

export const useSearchResult = (keyword: string) => {
  const [searchResult, setSearchResult] = useState<TypeSearchResult[]>([]);
  const debouncedKeyword = useDebounce(keyword.trim());

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (debouncedKeyword !== '') {
          const response = await getSearchResult(debouncedKeyword);
          setSearchResult(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [debouncedKeyword]);

  return searchResult;
};
