import React from 'react';
import { StyledModalWrapper, StyledModalContent, StyledModalCloseBtn, StyledModalTitle, StyledModalBtnWrapper, StyledModalInputWrapper, StyledModalInput, StyledMyPageBtn } from "../../styles/MyPageStyle"

function MyPageProfileEdit({ isProfileModalOpen, setIsProfileModalOpen, handleSaveProfile }) {
    return (
        <StyledModalWrapper>
            <StyledModalContent>
                <StyledModalTitle>프로필 수정</StyledModalTitle>
                <img src="/images/user.svg" alt="user Image" />
                <StyledModalBtnWrapper>
                    <StyledMyPageBtn>사진 변경</StyledMyPageBtn>
                    <StyledMyPageBtn>사진 삭제</StyledMyPageBtn>
                </StyledModalBtnWrapper>
                <StyledModalInputWrapper>
                    <StyledModalInput placeholder="닉네임"></StyledModalInput>
                    <StyledModalInput placeholder="자기 소개"></StyledModalInput>
                </StyledModalInputWrapper>
                <StyledMyPageBtn $width="350px" $bgcolor="#FFB879" $border="#FFB879" $color="white">저장</StyledMyPageBtn>
                <StyledModalCloseBtn onClick={() => { setIsProfileModalOpen(false) }}>&times;</StyledModalCloseBtn>
            </StyledModalContent>
        </StyledModalWrapper>

    );
}

export default MyPageProfileEdit;