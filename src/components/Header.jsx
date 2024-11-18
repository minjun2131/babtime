import styled from 'styled-components';
import { color } from '../configurations/Color';
import Search from './Search';
import HeaderRight from './HeaderRight';

const HeaderStyle = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 90px;
  padding: 0 40px;
  background: ${color.white};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  z-index: 100;

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
  const hasUserInfo = true; // 나중에 전역 상태로
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
