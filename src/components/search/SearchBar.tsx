/** interface
 * SearchBar UI rendering
 * state management
 */
import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import SearchSuggestionBox from './SearchSuggestionBox';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="질환명을 입력해 주세요."
          value={keyword}
          onChange={e => {
            setKeyword(e.target.value);
          }}
        />
        <button>X</button>
        <button>검색</button>
      </div>
      <SearchSuggestionBox keyword={keyword} debouncedKeyword={debouncedKeyword} />
    </div>
  );
};

export default SearchBar;
