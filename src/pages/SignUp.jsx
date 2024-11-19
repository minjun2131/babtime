import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  // 상태 객체 정의
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: ''
  });

  // 상태 변경 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password, passwordConfirm, name } = formData;

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // Supabase 회원가입
    const {
      data: { user },
      error
    } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;
    console.log(user);
    // Users 테이블에 추가 데이터 저장
    const { error: dbError } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        name
      })
      .single();

    if (dbError) throw dbError;

    alert('회원가입 성공!');
    navigate('/');
    // 추가적인 동작, 예를 들어 리다이렉트

    console.error(error.message);
    alert('회원가입에 실패했습니다.');
  };

  return (
    <SignUpForm onSubmit={handleSignUp}>
      <div>
        <Logo>
          <img src="logo.png" alt="밥타임_로고" />
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
          <InputName>비밀번호 확인</InputName>
          <Input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleInputChange}
            required
          />
        </InputDiv>
        <InputDiv>
          <InputName>이름</InputName>
          <Input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
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
