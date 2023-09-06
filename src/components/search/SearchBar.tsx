/** interface
 * SearchBar UI rendering
 * state management
 */
import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import SearchSuggestionBox from './SearchSuggestionBox';
import { LuSearch, LuX } from 'react-icons/lu';
import { styled } from 'styled-components';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const debouncedKeyword = useDebounce(keyword);

  return (
    <div>
      <SearchBarContainer isFocused={isFocused}>
        <SearchBarInput
          type="text"
          placeholder="질환명을 입력해 주세요."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus
        />
        {isFocused && (
          <CancelButton
            onClick={() => {
              setKeyword('');
            }}
          >
            <LuX size={16} />
          </CancelButton>
        )}
        <SearchButton>
          <LuSearch size={24} color={'#ffffff'} />
        </SearchButton>
      </SearchBarContainer>
      {!isFocused && <SearchSuggestionBox keyword={keyword} debouncedKeyword={debouncedKeyword} />}
    </div>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div<{ isFocused: boolean }>`
  border-radius: 42px;
  border: 2px solid ${props => (props.isFocused ? '#007be9' : '#ffffff')};
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 500px;
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

const CancelButton = styled.button`
  ${ButtonStyle}
`;
