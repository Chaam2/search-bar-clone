import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { LuSearch, LuX } from 'react-icons/lu';
import { styled } from 'styled-components';
import { getSearchResult } from '../../api/search';
import { TypeSearchResult } from '../../types/TypeSearchResult';

const SearchBar = ({ isFocused }: TypeSearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<TypeSearchResult[]>([]);
  const debouncedKeyword = useDebounce(keyword);

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

  return (
    <>
      <SearchBarContainer isFocused={isFocused}>
        <SearchBarInput
          type="text"
          placeholder="질환명을 입력해 주세요."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          autoFocus
        />

        <CancelButton
          isFocused={isFocused}
          onClick={() => {
            setKeyword('');
          }}
        >
          <LuX size={16} />
        </CancelButton>

        <SearchButton>
          <LuSearch size={24} color={'#ffffff'} />
        </SearchButton>
      </SearchBarContainer>

      {keyword ? (
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
                {searchResult?.slice(0, MAX_RESULT).map(result => {
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
      ) : (
        <RecentContainer isFocused={isFocused}>
          <div>
            <h3>최근 검색어</h3>
          </div>
          <div>
            <h3>추천 검색어로 검색해보세요</h3>
          </div>
        </RecentContainer>
      )}
    </>
  );
};

export default SearchBar;

type TypeSearchBarProps = {
  isFocused: boolean;
};

const SearchBarContainer = styled.div<{ isFocused: boolean }>`
  box-sizing: border-box;
  width: 500px;
  border-radius: 42px;
  border: 2px solid ${props => (props.isFocused ? '#007be9' : '#ffffff')};
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px;
  box-shadow: 0px 2px 4px #1e202519;
  cursor: pointer;
`;

const SearchBarInput = styled.input`
  font-size: 1rem;
  font-weight: 400;
  flex: 1;
  border: 0;
  padding: 16px;
  outline: none;
  background-color: transparent;
`;

const ButtonStyle = `
background-color:#ffffff;
border: none;
margin: 0;
padding: 0;
cursor: pointer;
`;

const SearchButton = styled.button`
  ${ButtonStyle}
  background-color: #007be9;
  width: 48px;
  height: 48px;
  border-radius: 100px;
`;

const CancelButton = styled.button<{ isFocused: boolean }>`
  color: ${props => (props.isFocused ? 'black' : 'white')};
  ${ButtonStyle}
`;

//suggestionBox

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
