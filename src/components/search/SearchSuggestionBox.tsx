/** interface
 * SearchSuggestionBox UI rendering
 * state management
 */
import React, { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { styled } from 'styled-components';
import { getSearchResult } from '../../api/search';
import { TypeSearchResult } from '../../types/TypeSearchResult';

const SearchSuggestionBox = ({
  keyword,
  setKeyword,
  debouncedKeyword,
  isFocused,
}: TypeSearchSuggestionBoxProps) => {
  const [searchResult, setSearchResult] = useState<TypeSearchResult[]>([]);

  useEffect(() => {
    debouncedKeyword.trim() && getSearchResultData();
  }, [debouncedKeyword]);

  const getSearchResultData = async () => {
    const searchResultData = await getSearchResult(debouncedKeyword);
    setSearchResult(searchResultData);
  };

  const changeKeyword = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  if (!keyword) {
    return (
      <RecentContainer isFocused={isFocused}>
        <div>
          <h3>최근 검색어</h3>
        </div>
        <div>
          <h3>추천 검색어로 검색해보세요</h3>
        </div>
      </RecentContainer>
    );
  }
  return (
    <SearchSuggestionBoxContainer isFocused={isFocused}>
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
          <SuggestionUl>
            {searchResult.slice(0, MAX_RESULT).map(result => {
              return (
                <li key={result.sickCd} onClick={() => changeKeyword(result.sickNm)}>
                  <LuSearch size={20} color={'#aaaaaa'} />
                  {result.sickNm}
                </li>
              );
            })}
          </SuggestionUl>
        )}
      </div>
    </SearchSuggestionBoxContainer>
  );
};

export default SearchSuggestionBox;

type TypeSearchSuggestionBoxProps = {
  keyword: string;
  // eslint-disable-next-line
  setKeyword: (newKeyword: string) => void;
  debouncedKeyword: string;
  isFocused: boolean;
};

const MAX_RESULT = 7;

const SuggestionContainerStyle = `
box-sizing: border-box;
background-color: #ffffff;
width: 500px;
box-shadow: 0px 2px 4px #1e202519;
border-radius: 24px;
margin-top: 8px;
`;

const SectionTitleStyle = `
font-size: 0.9rem;
font-weight: 400;
color: #666666;
margin:0;
`;
const KeywordStyle = `
cursor: pointer;
font-weight: 500;
padding: 14px 20px;
display:flex;
align-items:center;
gap:8px;
&:hover{
  background-color: #f4f4f4;
}
`;

const SearchSuggestionBoxContainer = styled.div<{ isFocused: boolean }>`
  opacity: ${props => (props.isFocused ? '100' : '0')};
  ${SuggestionContainerStyle}
  padding:20px 0;
  h3 {
    ${SectionTitleStyle}
    padding:10px 20px;
  }
  span {
    padding: 14px 20px;
    color: #aaaaaa;
    font-weight: 600;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      ${KeywordStyle}
    }
  }
`;

const SuggestionUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    ${KeywordStyle}
  }
`;

const RecentContainer = styled.div<{ isFocused: boolean }>`
  opacity: ${props => (props.isFocused ? '100' : '0')};
  ${SuggestionContainerStyle}
  div {
    padding: 20px;
    &:first-child {
      border-bottom: 1px solid #eaeaea;
    }
  }
  h3 {
    ${SectionTitleStyle}
  }
`;
