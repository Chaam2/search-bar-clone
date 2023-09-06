/** interface
 * searchPage UI rendering
 */
import React from 'react';
import { styled } from 'styled-components';
import SearchBar from './SearchBar';

const Search = () => {
  return (
    <SearchContainer>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <SearchBar />
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
