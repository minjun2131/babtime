import styled from 'styled-components';
import { color } from '../../configurations/Color';
import Search from './Search';
import HeaderRight from './HeaderRight';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase.js';

const HeaderStyle = styled.header`
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 90px;
  padding: 0 40px;
  background: ${color.white};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);

  & > div {
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h1 {
    width: 150px;
  }
  img {
    max-width: 100%;
    vertical-align: middle;
  }
`;

//월요일에 글로벌 스타일로 이동
const Inner = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Header = () => {
  const [hasUserInfo, setHasUserInfo] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }

      setHasUserInfo(!!data.user); // user가 존재하면 true로 설정
    };

    checkUser();
  }, []);

  return (
    <HeaderStyle>
      <Inner>
        <h1>
          <a href="/">
            <img src="../images/logo_horizontal.svg" alt="밥타임" />
          </a>
        </h1>

        <Search placeholderText="검색어를 입력해주세요." />

        <HeaderRight hasUserInfo={hasUserInfo} />
      </Inner>
    </HeaderStyle>
  );
};

export default Header;
