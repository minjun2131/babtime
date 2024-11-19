import { Link } from 'react-router-dom';
import ProfileSmall from './ProfileSmall';
import { HeaderRightDiv, ButtonPrimary } from '../../styles/HeaderStyle.jsx';

const HeaderRight = ({ loginUser }) => {
  if (loginUser) {
    return (
      <HeaderRightDiv>
        <Link to={`/PostEdit`}>
          <ButtonPrimary>새 글 작성</ButtonPrimary>
        </Link>
        <Link to={`/MyPage/${loginUser.id}`}>
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
