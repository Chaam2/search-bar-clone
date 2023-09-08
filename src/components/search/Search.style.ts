import { styled } from 'styled-components';

export const SearchContainer = styled.div`
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

//SearchBar

export const SearchBarForm = styled.form<{ isFocused: boolean }>`
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

export const SearchBarInput = styled.input`
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

export const SearchButton = styled.button`
  ${ButtonStyle}
  background-color: #007be9;
  width: 48px;
  height: 48px;
  border-radius: 100px;
`;

export const CancelButton = styled.button<{ isFocused: boolean }>`
  color: ${props => (props.isFocused ? 'black' : 'white')};
  ${ButtonStyle}
`;

//SuggestionBox

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
padding:10px 20px;
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
&:focus{
  background-color: #f4f4f4;
  outline:none;
}
`;

export const SearchSuggestionBoxContainer = styled.div<{ isFocused: boolean }>`
  opacity: ${props => (props.isFocused ? '100' : '0')};
  ${SuggestionContainerStyle}
  padding:20px 0;
  h3 {
    ${SectionTitleStyle}
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

export const SuggestionUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    ${KeywordStyle}
  }
`;

export const RecentContainer = styled.div<{ isFocused: boolean }>`
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
    padding-top:20px;
  }
`;
