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
  useEffect(() => {
    // Supabase 환경 변수 확인
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_KEY);

    // Supabase 클라이언트 테스트 (선택)
    console.log('Supabase Client:', supabase);
  }, []);
  return (
    // <form onSubmit={handleSignUp}>
    <SignUpForm>
      <div>
        <Logo>
          <img src="logo.png" alt="밥타임_로고" />
        </Logo>
      </div>
      <InputWrap>
        <InputDiv>
          <InputName>아이디</InputName>
          {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> */}
          <Input />
        </InputDiv>
        <InputDiv>
          <InputName>비밀번호</InputName>
          {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> */}
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
          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
          {/* {success && <p style={{ color: 'green' }}>{success}</p>} */}
        </InputDiv>
        <LinkStyle to="/Login">로그인</LinkStyle>
      </InputWrap>
    </SignUpForm>
  );
};

export default SignUp;
