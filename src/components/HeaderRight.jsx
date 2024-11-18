import { color } from '../configurations/Color';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderRightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ButtonPrimary = styled.button`
  display: inline-block;
  background: ${color.white};
  width: 100px;
  height: 40px;
  color: #ffb879;
  border: 1px solid #ffb879;
  border-radius: 40px;
  font-size: 16px;
  cursor: pointer;
`;

const HeaderProfile = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  background-image: ${(props) => (props.profileImage ? `url(${props.profileImage})` : `url('../../images/user.svg')`)};
`;

const HeaderRight = ({ hasUserInfo }) => {
  if (hasUserInfo) {
    return (
      <HeaderRightDiv>
        <ButtonPrimary>새 글 작성</ButtonPrimary>
        <HeaderProfile></HeaderProfile>
      </HeaderRightDiv>
    );
  } else {
    return (
      <HeaderRightDiv>
        <Link>Login</Link>
        <Link>Sign Up</Link>
      </HeaderRightDiv>
    );
  }
};

export default HeaderRight;
