import React, { useRef, useState, useEffect } from 'react';
import { StyledModalWrapper, StyledModalContent, StyledModalCloseBtn, StyledModalTitle, StyledModalBtnWrapper, StyledModalInputWrapper, StyledModalInput, StyledMyPageBtn } from "../../styles/MyPageStyle"
import { updateProfileImage, uploadProfileImage } from '../../api/fetchProfileImage';
import { fetchUserData } from '../../api/fetchUserData';

function MyPageProfileEdit({ setIsProfileModalOpen }) {
    const fileInputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [file, setFile] = useState(null); // file 상태 추가
    const [name, setName] = useState(""); // 이름 상태
    const [introduce, setIntroduce] = useState(""); // 소개 상태
    const userId = '6b94b3d6-ec1e-43fb-8561-2e21f1e9f2d8'; // test 계정

    // Supabase에서 사용자 정보 가져오기
    useEffect(() => {
        fetchUserData({ setName, setIntroduce, userId });

        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, []);

    const handleSelectImage = () => {
        fileInputRef.current.click();
    }

    const handleImageFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // 이미지 미리보기 URL 생성
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            const newPreviewUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(newPreviewUrl);
            setProfileImage(newPreviewUrl);
            setFile(selectedFile);
        }
    }

    const handleProfileSave = async (event) => {
        if (!file) return; // 파일이 없으면 저장하지 않음

        // 파일을 Supabase에 업로드
        const uploadedUrl = await uploadProfileImage({file, userId});
        console.log("업로드된 이미지 URL:", uploadedUrl);

        // DB에 업로드된 URL 저장
        if (uploadedUrl) {
            await updateProfileImage({ img_url: uploadedUrl, userId });
        }
    }

    return (
        <StyledModalWrapper>
            <StyledModalContent>
                <StyledModalTitle>프로필 수정</StyledModalTitle>
                <img src={profileImage || "/images/user.svg"} alt="user Image" />
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
                    <StyledMyPageBtn onClick={() => { setPreviewUrl(null); setProfileImage(null); }}>사진 삭제</StyledMyPageBtn>
                </StyledModalBtnWrapper>
                <StyledModalInputWrapper>
                    <StyledModalInput placeholder="닉네임" value={name} onChange={(e) => setName(e.target.value)}></StyledModalInput>
                    <StyledModalInput placeholder="자기 소개" value={introduce} onChange={(e) => setIntroduce(e.target.value)}></StyledModalInput>
                </StyledModalInputWrapper>
                <StyledMyPageBtn $width="350px" $bgcolor="#FFB879" $border="#FFB879" $color="white" onClick={handleProfileSave}>저장</StyledMyPageBtn>
                <StyledModalCloseBtn onClick={() => setIsProfileModalOpen(false)}>&times;</StyledModalCloseBtn>
            </StyledModalContent>
        </StyledModalWrapper>

    );
}

export default MyPageProfileEdit;