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

  //const [hasUserInfo, setHasUserInfo] = useState(false);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const { data, error } = await supabase.auth.getUser();

  //     if (error) {
  //       console.error('로그인 오류:', error.message);
  //       return;
  //     }

  //     setHasUserInfo(!!data.user);
  //   };

  //   checkUser();
  // }, []);

  const [loginUser, setLoginUser] = useState(null);

  // 로그인한 유저
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      setLoginUser(data.user);
    };

    fetchUser();
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
        {isSearchVisible && <Search placeholderText="제목으로 검색" value={searchTerm} onChange={handleSearchChange} />}

        <HeaderRight loginUser={loginUser} />
      </Inner>
    </HeaderWrap>
  );
};

export default Header;
