import React from 'react'
import { StyledMyPageProfileDiv, StyledMyPageSectionDiv, StyledMyPageDetailDiv, StyledLogoutButton } from "../styles/MyPageStyle"

function MyPageProfile() {
  return (
        <StyledMyPageProfileDiv>
            <StyledMyPageSectionDiv width="150px">
                <img src="/images/user.svg" alt="밥타임" />
            </StyledMyPageSectionDiv>

            <StyledMyPageSectionDiv width="950px" padding="15px 0px 15px 30px">
                <StyledMyPageDetailDiv fontSize="24px">닉네임</StyledMyPageDetailDiv>
                <StyledMyPageDetailDiv>자기 소개</StyledMyPageDetailDiv>
                <StyledMyPageDetailDiv>
                    <button>프로필 수정</button>
                    <button>비밀번호 변경</button>
                </StyledMyPageDetailDiv>
            </StyledMyPageSectionDiv>
            
            <StyledMyPageSectionDiv>
                <StyledLogoutButton onClick={() => alert('로그 아웃 하시겠습니까? 로직')}>로그아웃</StyledLogoutButton>
            </StyledMyPageSectionDiv>
        </StyledMyPageProfileDiv>  
  )
}

export default MyPageProfile