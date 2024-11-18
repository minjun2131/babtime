import React from 'react'
import { StyledMyPageProfileWrapper, StyledMyPageSection, StyledMyPageDetail, StyledLogoutButton } from "../styles/MyPageStyle"
import Button from '../components/detail/Button';

function MyPageProfile() {
  return (
        <StyledMyPageProfileWrapper>
            <StyledMyPageSection width="150px">
                <img src="/images/user.svg" alt="밥타임" />
            </StyledMyPageSection>

            <StyledMyPageSection width="950px" padding="15px 0px 15px 30px">
                <StyledMyPageDetail fontSize="24px">닉네임</StyledMyPageDetail>
                <StyledMyPageDetail>자기 소개</StyledMyPageDetail>
                <StyledMyPageDetail>
                    <Button label="프로필 수정" handleClick={() => {}} />
                    <Button category="sub" label="비밀번호 변경" handleClick={() => {}} />
                </StyledMyPageDetail>
            </StyledMyPageSection>
            
            <StyledMyPageSection>
                <StyledLogoutButton onClick={() => alert('로그 아웃 하시겠습니까? 로직')}>로그아웃</StyledLogoutButton>
            </StyledMyPageSection>
        </StyledMyPageProfileWrapper>  
  )
}

export default MyPageProfile