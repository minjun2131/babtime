import Search from './Search';
import HeaderRight from './HeaderRight';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase.js';
import { HeaderWrap, Inner } from '../../styles/HeaderStyle.jsx';
import { useLocation, Link } from 'react-router-dom';

const Header = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const location = useLocation();

  const [hasUserInfo, setHasUserInfo] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }

      setHasUserInfo(!!data.user);
    };

    checkUser();
  }, []);

  const isSearchVisible = ['/Main', '/main', '/'].includes(location.pathname);

  return (
    <HeaderWrap>
      <Inner>
        <h1>
          <Link to={`/`}>
            <img src="../images/logo_horizontal.svg" alt="밥타임" />
          </Link>
        </h1>
        {isSearchVisible && (
          <Search placeholderText="제목으로 검색" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        )}

        <HeaderRight hasUserInfo={hasUserInfo} />
      </Inner>
    </HeaderWrap>
  );
};

export default Header;
