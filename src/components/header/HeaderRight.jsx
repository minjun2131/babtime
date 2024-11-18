import { color } from '../../configurations/Color';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProfileSmall from './ProfileSmall';

const HeaderRightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ButtonPrimary = styled.button`
  display: inline-block;
  background: ${color.white};
  padding: 10px 20px;
  color: ${color.primary};
  border: 1px solid ${color.primary};
  border-radius: 40px;
  font-size: 16px;
  cursor: pointer;
`;

const HeaderRight = ({ hasUserInfo }) => {
  if (hasUserInfo) {
    return (
      <HeaderRightDiv>
        <Link to={`/PostEdit`}>
          <ButtonPrimary>새 글 작성</ButtonPrimary>
        </Link>
        <Link to={`/MyPage`}>
          <ProfileSmall />
        </Link>
      </HeaderRightDiv>
    );
  } else {
    return (
      <HeaderRightDiv>
        <Link to={`/Login`}>Login</Link>
        <Link to={`/SignUp`}>Sign Up</Link>
      </HeaderRightDiv>
    );
  }
};

export default HeaderRight;
