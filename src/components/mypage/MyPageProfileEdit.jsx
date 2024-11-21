import React, { useRef, useState, useEffect } from 'react';
import { StyledModalWrapper, StyledModalContent, StyledModalCloseBtn, StyledModalTitle, StyledModalBtnWrapper, StyledModalInputWrapper, StyledModalInput, StyledMyPageBtn } from "../../styles/MyPageStyle"
import { uploadProfileImage } from '../../api/fetchProfileImage';
import { fetchGetUserData, fetchUpdateUserData } from '../../api/fetchUserData';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useAuth } from '../../api/contexts/UserContext';

function MyPageProfileEdit({ setIsProfileModalOpen, paramUser, profileImage, setProfileImage, reload, setReload }) {
    const { currentUser: loginUser } = useAuth();
    const fileInputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [file, setFile] = useState(null); // file 상태 추가
    const [name, setName] = useState(""); // 이름 상태
    const [introduce, setIntroduce] = useState(""); // 소개 상태
    const userId = paramUser.id && loginUser.id; // 로그인 유저 id

    // Supabase에서 사용자 정보 가져오기
    useEffect(() => {
        fetchGetUserData({ setName, setIntroduce, setProfileImage, userId });

        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, []);

    const handleSelectImage = () => {
        fileInputRef.current.click();
    }

    // 이미지 버튼 
    const handleImageFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // 이미지 미리보기 URL 생성
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            const newPreviewUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(newPreviewUrl);
            setFile(selectedFile);
        }
    }

    // 유저 정보 저장 
    const handleProfileSave = async () => {
        let uploadedUrl = profileImage;

        if (previewUrl) { setProfileImage(previewUrl); 
            uploadedUrl = previewUrl;
        }
        setPreviewUrl(null);

        // 파일이 선택된 경우, 이미지를 Supabase에 업로드하고 URL을 얻기
        if (file) {
            uploadedUrl = await uploadProfileImage({ file, userId });
        }
        fetchUpdateUserData({ userId, name, introduce, uploadedUrl });
        toast.success('프로필이 수정되었습니다.');
        setIsProfileModalOpen(false);
        setReload(!reload);
    }

    const handleImageDelete = () => {
        //setProfileImage(null); // 프로필 이미지 URL 초기화
        setPreviewUrl("/images/user.svg"); // 미리보기 URL 초기화
        setFile(null); // 선택된 파일 초기화
        fileInputRef.current.value = null; // 파일 입력 필드 초기화
    }

    return (
        <StyledModalWrapper>
            <StyledModalContent>
                <StyledModalTitle>프로필 수정</StyledModalTitle>
                <img src={previewUrl || profileImage || "/images/user.svg"} alt="user Image" style={{ borderRadius: "50%" }} />
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
                    <StyledMyPageBtn onClick={handleImageDelete}>사진 삭제</StyledMyPageBtn>
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