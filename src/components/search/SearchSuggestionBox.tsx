/** interface
 * SearchSuggestionBox UI rendering
 * state management
 */
import React from 'react';

interface ISearchSuggestionBoxProps {
  keyword: string;
}
const SearchSuggestionBox = ({ keyword }: ISearchSuggestionBoxProps) => {
  if (!keyword) {
    return (
      <div>
        <div>최근 검색어</div>
        <div>추천 검색어로 검색해보세요</div>
      </div>
    );
  }
  return (
    <div>
      <div>{keyword}</div>
      <div>추천 검색어</div>
    </div>
  );
};

export default SearchSuggestionBox;
