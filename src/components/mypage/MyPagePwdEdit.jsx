import React, { useState } from 'react';
import {
  StyledModalWrapper,
  StyledModalContent,
  StyledModalCloseBtn,
  StyledModalTitle,
  StyledModalSubTitle,
  StyledModalBtnWrapper,
  StyledModalInputWrapper,
  StyledModalInput,
  StyledMyPageBtn
} from '../../styles/MyPageStyle';
import { supabase } from '../../api/services/supabase';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function MyPagePwdEdit({ setIsPwdModalOpen }) {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const handlePwdSave = async () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/;

    if (!currentPwd || !newPwd || !confirmPwd) {
      toast.error('모든 내용을 입력해 주세요.');
      return;
    }

    if (!passwordRegex.test(newPwd)) {
      toast.warn('비밀번호는 영문, 숫자, 특수문자를 포함하여 6자 이상이어야 합니다.');
      return;
    }

    if (currentPwd === newPwd) {
      toast.warn('현재 비밀번호와 새 비밀번호가 동일합니다.');
      return;
    }

    if (newPwd !== confirmPwd) {
      toast.warn('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // Step 1: 현재 비밀번호 확인
      const {
        data: { user },
        error: signInError
      } = await supabase.auth.getUser();

      if (signInError || !user) {
        toast.error('로그인 정보가 유효하지 않습니다.');
        return;
      }

      const { error: signInWithPwdError } = await supabase.auth.signInWithPassword({
        email: user.email, // 현재 로그인된 사용자의 이메일
        password: currentPwd // 입력한 현재 비밀번호
      });

      if (signInWithPwdError) {
        toast.error('현재 비밀번호가 일치하지 않습니다.');
        return;
      }

      // Step 2: 새 비밀번호 저장
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPwd
      });

      if (updateError) {
        toast.error('비밀번호 변경에 실패했습니다.');
        console.error(updateError);
        return;
      }

      toast.success('비밀번호가 성공적으로 변경되었습니다.');
      setIsPwdModalOpen(false);
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error(
        `비밀번호 변경 중 오류가 발생했습니다. 
                 상세 내용: ${err.message || JSON.stringify(err)}`
      );
    }
  };

  return (
    <StyledModalWrapper>
      <StyledModalContent>
        <StyledModalTitle>비밀번호 변경</StyledModalTitle>
        <StyledModalSubTitle>현재 비밀번호</StyledModalSubTitle>
        <StyledModalInput
          type="password"
          placeholder="현재 비밀번호를 입력해 주세요."
          value={currentPwd}
          onChange={(e) => setCurrentPwd(e.target.value)}
        />

        <StyledModalSubTitle>새 비밀번호</StyledModalSubTitle>
        <StyledModalInputWrapper>
          <StyledModalInput
            type="password"
            placeholder="새 비밀번호를 입력해 주세요."
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
          />
          <StyledModalInput
            type="password"
            placeholder="새 비밀번호를 한 번 더 입력해 주세요."
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </StyledModalInputWrapper>
        <StyledMyPageBtn $width="350px" $bgcolor="#FFB879" $border="#FFB879" $color="white" onClick={handlePwdSave}>
          저장
        </StyledMyPageBtn>
        <StyledModalCloseBtn
          onClick={() => {
            setIsPwdModalOpen(false);
          }}
        >
          &times;
        </StyledModalCloseBtn>
      </StyledModalContent>
    </StyledModalWrapper>
  );
}

export default MyPagePwdEdit;
