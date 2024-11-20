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
import { toast } from 'react-toastify';

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

  const validateForm = ({ email, password, passwordConfirm, name }) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/;
    if (!email) return { valid: false, message: '이메일을 입력해주세요.' };
    if (!/\S+@\S+\.\S+/.test(email)) return { valid: false, message: '유효한 이메일 형식이 아닙니다.' };
    if (!password) return { valid: false, message: '비밀번호를 입력해주세요.' };
    if (!passwordRegex.test(password)) {
      return {
        valid: false,
        message: '비밀번호는 영문, 숫자, 특수문자를 포함하여 6자 이상이어야 합니다.'
      };
    }
    if (password !== passwordConfirm) return { valid: false, message: '비밀번호가 일치하지 않습니다.' };
    if (!name) return { valid: false, message: '이름을 입력해주세요.' };

    return { valid: true };
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password, passwordConfirm, name } = formData;
    const { valid, message } = validateForm({ email, password, passwordConfirm, name });

    if (!valid) {
      toast.error(message);
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

    if (error) {
      toast.error('이미 등록된 이메일이 존재합니다.');
      throw error;
    }

    /////////////////////////////
    // Users 테이블에 추가 데이터 저장
    const { error: dbError } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        name
      })
      .single();

    if (dbError) throw dbError;

    toast.success('로그인에 성공하셨습니다.');
    navigate('/');
    // 추가적인 동작, 예를 들어 리다이렉트

    console.error(error.message);
    toast.error('회원가입에 실패했습니다.');
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
          <Input name="email" value={formData.email} onChange={handleInputChange} />
        </InputDiv>
        <InputDiv>
          <InputName>비밀번호</InputName>
          <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </InputDiv>
        <InputDiv>
          <InputName>비밀번호 확인</InputName>
          <Input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleInputChange} />
        </InputDiv>
        <InputDiv>
          <InputName>이름</InputName>
          <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
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
