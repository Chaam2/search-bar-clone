import React, { useState } from 'react';
import { LuSearch, LuX } from 'react-icons/lu';
import * as S from './Search.style';
import { useSearchResult } from '../../hooks/useSearchResult';

const SearchBar = ({ isFocused }: TypeSearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const searchResult = useSearchResult(keyword);

  const changeKeyword = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  return (
    <>
      <S.SearchBarContainer isFocused={isFocused}>
        <S.SearchBarInput
          type="text"
          placeholder="질환명을 입력해 주세요."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
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

        <S.SearchButton>
          <LuSearch size={24} color={'#ffffff'} />
        </S.SearchButton>
      </S.SearchBarContainer>

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
              <S.SuggestionUl>
                {searchResult?.slice(0, MAX_RESULT).map(result => {
                  return (
                    <li key={result.sickCd} onClick={() => changeKeyword(result.sickNm)}>
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
          <div>
            <h3>최근 검색어</h3>
          </div>
          <div>
            <h3>추천 검색어로 검색해보세요</h3>
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
