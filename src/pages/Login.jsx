import { useState } from 'react';
import { supabase } from '../api/services/supabase.js';
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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/contexts/UserContext.jsx';

const Login = () => {
  const { setIsLogin } = useAuth();
  const navigate = useNavigate();
  // 상태를 하나로 통합
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error: '',
    success: ''
  });

  // 로그인 처리 함수
  const signIn = async (e) => {
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, error: '' })); // 오류 초기화

    // Supabase 로그인 요청
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    });

    if (error) {
      setFormData((prevData) => ({ ...prevData, error: error.message })); // 오류 메시지 설정
    } else {
      setFormData((prevData) => ({ ...prevData, success: '로그인 성공' }));
      console.log('로그인 성공:', data);
      setIsLogin(true);
      navigate('/');
    }
  };

  // 상태 변경 함수 (이메일, 비밀번호)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <SignUpForm onSubmit={signIn}>
      <div>
        <Logo>
          <img src="../../public/images/logo.svg" alt="밥타임_로고" />
        </Logo>
      </div>
      <InputWrap>
        <InputDiv>
          <InputName>아이디</InputName>
          <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </InputDiv>
        <InputDiv>
          <InputName>비밀번호</InputName>
          <Input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </InputDiv>
        <InputDiv>
          <FormButton type="submit">로그인</FormButton>
        </InputDiv>
        <LinkStyle to="/SignUp">회원가입</LinkStyle>
      </InputWrap>
    </SignUpForm>
  );
};

export default Login;
