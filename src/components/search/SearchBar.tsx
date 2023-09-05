/** interface
 * SearchBar UI rendering
 * state management
 */
import React, { useState } from 'react';
import SearchSuggestionBox from './SearchSuggestionBox';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');

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
      <SearchSuggestionBox keyword={keyword} />
    </div>
  );
};

export default SearchBar;
