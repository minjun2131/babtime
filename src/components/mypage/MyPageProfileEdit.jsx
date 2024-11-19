import React, { useRef, useState } from 'react';
import { StyledModalWrapper, StyledModalContent, StyledModalCloseBtn, StyledModalTitle, StyledModalBtnWrapper, StyledModalInputWrapper, StyledModalInput, StyledMyPageBtn } from "../../styles/MyPageStyle"
import { updateProfileImage, uploadProfileImage } from '../../api/profileImage';

function MyPageProfileEdit({ setIsProfileModalOpen }) {
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef();
    const userId = '6b94b3d6-ec1e-43fb-8561-2e21f1e9f2d8'; // test 계정

    const handleSelectImage = () => {
        fileInputRef.current.click();
    }

    const handleImageFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // 이미지 미리보기 URL 생성
            const previewUrl = URL.createObjectURL(file);
            setProfileImage(previewUrl);

            // 파일을 Supabase에 업로드
            const uploadedUrl = await uploadProfileImage(file, userId);
            console.log("업로드된 이미지 URL:", uploadedUrl);

            // DB에 업로드된 URL 저장
            if (uploadedUrl) {
                await updateProfileImage({ img_url: uploadedUrl, userId: userId });
            }
        }
    }

    return (
        <StyledModalWrapper>
            <StyledModalContent>
                <StyledModalTitle>프로필 수정</StyledModalTitle>
                <img src="/images/user.svg" alt="user Image" />
                {/* 숨겨진 파일 입력 필드 */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageFileChange}
                />
                <StyledModalBtnWrapper>
                    <StyledMyPageBtn onClick={handleSelectImage}>사진 변경</StyledMyPageBtn>
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