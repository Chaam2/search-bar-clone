/** interface
 * SearchSuggestionBox UI rendering
 * state management
 */
import React, { useEffect, useState } from 'react';
import { getSearchResult } from '../../api/search';

const SearchSuggestionBox = ({ keyword, debouncedKeyword }: ISearchSuggestionBoxProps) => {
  const [searchResult, setSearchResult] = useState<ISearchResult[]>([]);
  useEffect(() => {
    getSearchResultData();
  }, [debouncedKeyword]);

  const getSearchResultData = async () => {
    const response = await getSearchResult(debouncedKeyword);
    const searchResultData = response.data;
    setSearchResult(searchResultData);
  };
  if (!keyword) {
    return (
      <div>
        <h3>최근 검색어</h3>
        <h3>추천 검색어로 검색해보세요</h3>
      </div>
    );
  }
  return (
    <div>
      <div>{keyword}</div>
      <div>
        <h3>추천 검색어</h3>
        {searchResult.length === 0 ? (
          <span>추천 검색어가 없습니다.</span>
        ) : (
          searchResult.slice(0, MAX_RESULT).map(result => {
            return (
              <div key={result.sickCd}>
                <span>{result.sickNm}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchSuggestionBox;

interface ISearchSuggestionBoxProps {
  keyword: string;
  debouncedKeyword: string;
}
interface ISearchResult {
  sickCd: string;
  sickNm: string;
}

const MAX_RESULT = 7;
