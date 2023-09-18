import { useState, useEffect } from 'react';
import { MAX_RESULT } from '../components/Search/SearchBar';

export const useRecentKeyword = (keyword: string) => {
  const [recentKeyword, setRecentKeyword] = useState<string[]>([]);

  useEffect(() => {
    const storedKeywords = localStorage.getItem('recentKeyword');
    if (storedKeywords) {
      setRecentKeyword(JSON.parse(storedKeywords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recentKeyword', JSON.stringify(recentKeyword));
  }, [recentKeyword]);

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim() !== '') {
      addRecentKeyword(keyword);
    }
  };

  const addRecentKeyword = (newKeyword: string) => {
    const updatedKeywords = recentKeyword.filter(keyword => keyword !== newKeyword);
    if (updatedKeywords.length >= MAX_RESULT) {
      updatedKeywords.pop();
    }
    setRecentKeyword([newKeyword, ...updatedKeywords]);
  };

  return { recentKeyword, handleSearchClick };
};
