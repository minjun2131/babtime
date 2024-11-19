import Search from './Search';
import HeaderRight from './HeaderRight';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase.js';
import { HeaderWrap, Inner } from '../../styles/HeaderStyle.jsx';

const Header = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

  return (
    <HeaderWrap>
      <Inner>
        <h1>
          <a href="/">
            <img src="../images/logo_horizontal.svg" alt="밥타임" />
          </a>
        </h1>

        <Search placeholderText="제목으로 검색" value={searchTerm} onChange={handleSearchChange} />

        <HeaderRight hasUserInfo={hasUserInfo} />
      </Inner>
    </HeaderWrap>
  );
};

export default Header;
