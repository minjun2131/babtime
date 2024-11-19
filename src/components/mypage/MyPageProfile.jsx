import { useState } from 'react';
import {
  StyledMyPageProfileWrapper,
  StyledMyPageSection,
  StyledMyPageDetail,
  StyledLogoutButton
} from '../../styles/MyPageStyle';
import Button from '../detail/Button';
import MyPageProfileEdit from './MyPageProfileEdit';
import MyPagePwdEdit from './MyPagePwdEdit';
import { supabase } from '../../services/supabase';
import { useNavigate } from 'react-router-dom';

function MyPageProfile() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // 모달 열기/닫기 상태 관리
  const [isPwdModalOpen, setIsPwdModalOpen] = useState(false); // 모달 열기/닫기 상태 관리
  const nav = useNavigate();

  //   const handleSaveProfile = () => {
  //     console.log('프로필이 업데이트되었습니다.');
  //     setIsProfileModalOpen(false); // 프로필을 저장한 후 모달 닫기
  //   };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert('로그아웃이 완료되었습니다.');
    nav('/');
  };

  return (
    <>
      <StyledMyPageProfileWrapper>
        <StyledMyPageSection $width="150px">
          <img src="/images/user.svg" alt="user Image" />
        </StyledMyPageSection>

        <StyledMyPageSection $width="950px" $padding="15px 0px 15px 30px">
          <StyledMyPageDetail $fontSize="25px" $fontWeight="700">
            닉네임
          </StyledMyPageDetail>
          <StyledMyPageDetail>자기 소개</StyledMyPageDetail>
          <StyledMyPageDetail>
            <Button label="프로필 수정" handleClick={() => setIsProfileModalOpen(true)} />
            <Button category="sub" label="비밀번호 변경" handleClick={() => setIsPwdModalOpen(true)} />
          </StyledMyPageDetail>
        </StyledMyPageSection>

        <StyledMyPageSection>
          <StyledLogoutButton onClick={handleLogout}>로그아웃</StyledLogoutButton>
        </StyledMyPageSection>
      </StyledMyPageProfileWrapper>

      {/* MyPageProfileEdit 모달 */}
      {isProfileModalOpen && <MyPageProfileEdit setIsProfileModalOpen={setIsProfileModalOpen} />}
      {/* MyPagePwdEdit 모달 */}
      {isPwdModalOpen && <MyPagePwdEdit setIsPwdModalOpen={setIsPwdModalOpen} />}
    </>
  );
}

export default MyPageProfile;
