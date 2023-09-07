import React, { useState } from 'react';
import SearchBar from './SearchBar';
import * as S from './Search.style';

const Search = () => {
  const [isFocused, setIsFocused] = useState(true);
  return (
    <S.SearchContainer onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <SearchBar isFocused={isFocused} />
    </S.SearchContainer>
  );
};

export default Search;
