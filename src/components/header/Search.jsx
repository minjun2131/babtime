import { SearchWrap } from '../../styles/HeaderStyle.jsx';

const Search = ({ placeholderText, value, onChange }) => {
  return (
    <SearchWrap>
      <input
        type="text"
        placeholder={placeholderText}
        value={value} // 부모 컴포넌트에서 전달된 value 사용
        onChange={onChange} // 부모 컴포넌트에서 전달된 onChange 사용
      />
      <button type="submit">
        <img src="../../images/search.svg" alt="검색" />
      </button>
    </SearchWrap>
  );
};

export default Search;
