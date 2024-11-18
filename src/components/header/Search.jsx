import { useState } from 'react';
import styled from 'styled-components';

const SearchWrap = styled.form`
  display: block;
  width: 500px;
  height: 40px;
  position: relative;

  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border: 0;
    border-radius: 50px;
    box-shadow: 0px 0px 10px #ffb879;
    font-size: 16px;
  }

  button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    background: none;
  }
`;

const Search = ({ placeholderText }) => {
  const [inputValue, setInputValue] = useState();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <SearchWrap>
      <input type="text" placeholder={placeholderText} value={inputValue} onChange={handleChange} />
      <button type="submit">
        <img src="../../images/search.svg" alt="" />
      </button>
    </SearchWrap>
  );
};

export default Search;
