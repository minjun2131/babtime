import { useEffect } from 'react';
import { supabase } from '../services/supabase';
import {
  SignUpForm,
  Logo,
  InputWrap,
  InputDiv,
  InputName,
  Input,
  FormButton,
  LinkStyle
} from '../styles/SignUpStyle.jsx';

const SignUp = () => {
  return (
    <SignUpForm>
      <div>
        <Logo>
          <img src="logo.png" alt="밥타임_로고" />
        </Logo>
      </div>
      <InputWrap>
        <InputDiv>
          <InputName>아이디</InputName>
          <Input />
        </InputDiv>
        <InputDiv>
          <InputName>비밀번호</InputName>
          <Input />
        </InputDiv>
        <InputDiv>
          <InputName>비밀번호 확인</InputName>
          <Input />
        </InputDiv>
        <InputDiv>
          <InputName>이름</InputName>
          <Input />
        </InputDiv>
        <InputDiv>
          <FormButton type="submit">회원가입</FormButton>
        </InputDiv>
        <LinkStyle to="/Login">로그인</LinkStyle>
      </InputWrap>
    </SignUpForm>
  );
};

export default SignUp;
