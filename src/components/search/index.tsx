/** interface
 * searchPage UI rendering
 */
import React, { useState } from 'react';
import { styled } from 'styled-components';
import SearchBar from './SearchBar';

const Search = () => {
  const [isFocused, setIsFocused] = useState(true);
  return (
    <SearchContainer onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <SearchBar isFocused={isFocused} />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  background-color: #cae9ff;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
    margin-top: 80px;
  }
`;
