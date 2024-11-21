import Search from './Search';
import HeaderRight from './HeaderRight';
import { HeaderWrap, Inner } from '../../styles/HeaderStyle.jsx';
import { useLocation, Link } from 'react-router-dom';

const Header = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const location = useLocation();

  const isSearchVisible = ['/Main', '/main', '/'].includes(location.pathname);

  return (
    <HeaderWrap>
      <Inner>
        <h1>
          <Link to={`/`}>
            <img src="../images/logo_horizontal.svg" alt="밥타임" />
          </Link>
        </h1>
        {isSearchVisible && <Search placeholderText="제목으로 검색" value={searchTerm} onChange={handleSearchChange} />}

        <HeaderRight />
      </Inner>
    </HeaderWrap>
  );
};

export default Header;
