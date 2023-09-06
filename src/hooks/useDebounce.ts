/** interface
 * input keyword, delay
 * output debouncedKeyword
 */
import { useEffect, useState } from 'react';

export const useDebounce = (keyword: string, delay = 500) => {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, delay);
    return () => clearTimeout(timer);
  }, [keyword, delay]);

  return debouncedKeyword;
};
