/** interface
 * searchPage UI rendering
 */
import React from 'react';
import SearchBar from './SearchBar';

const SearchPage = () => {
  return (
    <div>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <SearchBar />
    </div>
  );
};

export default SearchPage;
