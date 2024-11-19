import React from 'react';
import { StyledModalWrapper, StyledModalContent, StyledModalCloseBtn, StyledModalTitle, StyledModalSubTitle, StyledModalBtnWrapper, StyledModalInputWrapper, StyledModalInput, StyledMyPageBtn } from "../../styles/MyPageStyle"

function MyPagePwdEdit({ setIsPwdModalOpen }) {
    return (
        <StyledModalWrapper>
            <StyledModalContent>
                <StyledModalTitle>비밀번호 변경</StyledModalTitle>
                <StyledModalSubTitle>현재 비밀번호</StyledModalSubTitle>
                <StyledModalInput placeholder="현재 비밀번호를 입력해 주세요."></StyledModalInput>

                <StyledModalSubTitle>새 비밀번호</StyledModalSubTitle>
                <StyledModalInputWrapper>
                    <StyledModalInput placeholder="새 비밀번호를 입력해 주세요."></StyledModalInput>
                    <StyledModalInput placeholder="새 비밀번호를 한 번 더 입력해 주세요."></StyledModalInput>
                </StyledModalInputWrapper>
                <StyledMyPageBtn $width="350px" $bgcolor="#FFB879" $border="#FFB879" $color="white">저장</StyledMyPageBtn>
                <StyledModalCloseBtn onClick={() => { setIsPwdModalOpen(false) }}>&times;</StyledModalCloseBtn>
            </StyledModalContent>
        </StyledModalWrapper>

    );
}

export default MyPagePwdEdit;