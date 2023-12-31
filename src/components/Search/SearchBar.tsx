import React, { useEffect, useRef, useState } from 'react';
import { LuSearch, LuX } from 'react-icons/lu';
import * as S from './Search.style';
import { useSearchResult } from '../../hooks/useSearchResult';
import { useRecentKeyword } from '../../hooks/useRecentKeyword';
// import { TypeSearchResult } from '../../types/TypeSearchResult';

const SearchBar = ({ isFocused }: TypeSearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const searchResult = useSearchResult(keyword);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isListFocused, setIsListFocused] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const { recentKeyword, handleSearchClick } = useRecentKeyword(keyword);

  useEffect(() => {
    if (isListFocused && listRef.current) {
      const liElements = listRef.current.querySelectorAll('li');
      if (liElements[focusedIndex]) {
        liElements[focusedIndex].focus();
      }
    }
  }, [focusedIndex, isListFocused]);

  const moveToList = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsListFocused(true);
      setFocusedIndex(0);
    }
  };

  const moveList = (e: React.KeyboardEvent, keyword: string) => {
    if (e.key === 'Enter') {
      setKeyword(keyword);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prevIndex => (prevIndex === 0 ? -1 : prevIndex - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prevIndex => (prevIndex === searchResult.length - 1 ? 0 : prevIndex + 1));
    }
  };

  return (
    <>
      <S.SearchBarForm isFocused={isFocused} onSubmit={handleSearchClick}>
        <S.SearchBarInput
          type="text"
          placeholder="질환명을 입력해 주세요."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={moveToList}
          autoFocus
        />

        <S.CancelButton
          isFocused={isFocused}
          onClick={() => {
            setKeyword('');
          }}
        >
          <LuX size={16} />
        </S.CancelButton>

        <S.SearchButton type="submit">
          <LuSearch size={24} color={'#ffffff'} />
        </S.SearchButton>
      </S.SearchBarForm>

      {keyword ? (
        <S.SearchSuggestionBoxContainer isFocused={isFocused}>
          <ul>
            <li>
              <LuSearch size={20} color={'#aaaaaa'} />
              {keyword}
            </li>
          </ul>
          <div>
            <h3>추천 검색어</h3>
            {searchResult.length === 0 ? (
              <span>추천 검색어가 없습니다.</span>
            ) : (
              <S.SuggestionUl
                ref={listRef}
                tabIndex={isListFocused ? 0 : -1}
                onFocus={() => setIsListFocused(true)}
                onBlur={() => setIsListFocused(false)}
              >
                {searchResult?.slice(0, MAX_RESULT).map((result, index) => {
                  return (
                    <li
                      key={result.sickCd}
                      onClick={() => setKeyword(result.sickNm)}
                      tabIndex={focusedIndex === index && isListFocused ? 0 : -1}
                      onKeyDown={e => moveList(e, result.sickNm)}
                    >
                      <LuSearch size={20} color={'#aaaaaa'} />
                      {result.sickNm}
                    </li>
                  );
                })}
              </S.SuggestionUl>
            )}
          </div>
        </S.SearchSuggestionBoxContainer>
      ) : (
        <S.RecentContainer isFocused={isFocused}>
          <h3>최근 검색어</h3>
          <S.SuggestionUl>
            {recentKeyword.map((keyword, index) => {
              return (
                <li key={index + keyword} onClick={() => setKeyword(keyword)}>
                  <LuSearch size={20} color={'#aaaaaa'} />
                  {keyword}
                </li>
              );
            })}
          </S.SuggestionUl>
          <h3>추천 검색어로 검색해보세요</h3>
          <div>
            <span>B형간염</span>
            <span>비만</span>
            <span>관절염</span>
            <span>우울증</span>
            <span>식도염</span>
          </div>
        </S.RecentContainer>
      )}
    </>
  );
};

export default SearchBar;

type TypeSearchBarProps = {
  isFocused: boolean;
};
export const MAX_RESULT = 7;
