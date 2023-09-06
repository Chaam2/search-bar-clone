/** interface
 * SearchSuggestionBox UI rendering
 * state management
 */
import React, { useEffect, useState } from 'react';
import { getSearchResult } from '../../api/search';
import { TypeSearchResult } from '../../types/TypeSearchResult';

const SearchSuggestionBox = ({ keyword, debouncedKeyword }: TypeSearchSuggestionBoxProps) => {
  const [searchResult, setSearchResult] = useState<TypeSearchResult[]>([]);
  useEffect(() => {
    debouncedKeyword.trim() && getSearchResultData();
  }, [debouncedKeyword]);

  const getSearchResultData = async () => {
    const searchResultData = await getSearchResult(debouncedKeyword);
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

type TypeSearchSuggestionBoxProps = {
  keyword: string;
  debouncedKeyword: string;
};

const MAX_RESULT = 7;
