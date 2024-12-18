import { useState, useEffect } from 'react';
import {
  StyledMyPageProfileWrapper,
  StyledMyPageSection,
  StyledMyPageDetail,
  StyledLogoutButton
} from '../../styles/MyPageStyle';
import Button from '../detail/Button';
import MyPageProfileEdit from './MyPageProfileEdit';
import MyPagePwdEdit from './MyPagePwdEdit';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { fetchGetProfileImage } from '../../api/fetchUserData';
import { useAuth } from '../../api/contexts/UserContext';

function MyPageProfile({ paramUser, reload, setReload }) {
  const { currentUser: loginUser, handleLogout } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // 모달 열기/닫기 상태 관리
  const [isPwdModalOpen, setIsPwdModalOpen] = useState(false); // 모달 열기/닫기 상태 관리
  const [profileImage, setProfileImage] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    fetchGetProfileImage({ setProfileImage, paramUser });
  }, [paramUser, reload]);

  return (
    <>
      <StyledMyPageProfileWrapper>
        <StyledMyPageSection $width="150px">
          <img src={profileImage || '/images/user.svg'} alt="user Image" />
        </StyledMyPageSection>

        <StyledMyPageSection $width="950px" $padding="15px 0px 15px 30px">
          <StyledMyPageDetail $fontSize="25px" $fontWeight="700">
            {paramUser?.name}
          </StyledMyPageDetail>
          <StyledMyPageDetail>{paramUser?.introduce || '자기소개가 없습니다'}</StyledMyPageDetail>
          <StyledMyPageDetail>
            {paramUser && loginUser && paramUser.id === loginUser.id && (
              <>
                <Button label="프로필 수정" handleClick={() => setIsProfileModalOpen(true)} />
                <Button category="sub" label="비밀번호 변경" handleClick={() => setIsPwdModalOpen(true)} />
              </>
            )}
          </StyledMyPageDetail>
        </StyledMyPageSection>
        <StyledMyPageSection>
          {paramUser && loginUser && paramUser.id === loginUser.id && (
            <StyledLogoutButton onClick={() => {
              handleLogout(); nav('/'); }}>로그아웃</StyledLogoutButton>
          )}
        </StyledMyPageSection>
      </StyledMyPageProfileWrapper>

      {/* MyPageProfileEdit 모달 */}
      {isProfileModalOpen && <MyPageProfileEdit setIsProfileModalOpen={setIsProfileModalOpen} paramUser={paramUser} profileImage={profileImage} setProfileImage={setProfileImage} reload={reload} setReload={setReload} />}
      {/* MyPagePwdEdit 모달 */}
      {isPwdModalOpen && <MyPagePwdEdit setIsPwdModalOpen={setIsPwdModalOpen} />}
    </>
  );
}

export default MyPageProfile;
