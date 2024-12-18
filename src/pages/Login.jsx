import { supabase } from '../api/services/supabase.js';
import { SignUpForm, Logo, InputWrap, FormButton, LinkStyle, InputDiv } from '../styles/SignUpStyle.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/contexts/UserContext.jsx';
import useFormHandler from '../components/form/useFormHandler.js';
import InputField from '../components/form/InputField.jsx';
import { toast } from 'react-toastify';

const Login = () => {
  const { setIsLogin } = useAuth();
  const navigate = useNavigate();
  // 상태를 하나로 통합
  const { formData, setFormData, handleInputChange } = useFormHandler({});

  const validateForm = ({ email, password }) => {
    if (!email) return { valid: false, message: '아이디를 입력해주세요.' };
    if (!/\S+@\S+\.\S+/.test(email)) return { valid: false, message: '유효한 이메일 형식이 아닙니다.' };
    if (!password) return { valid: false, message: '비밀번호를 입력해주세요.' };

    return { valid: true };
  };

  // 로그인 처리 함수
  const signIn = async (e) => {
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, error: '' })); // 오류 초기화

    const { valid, message } = validateForm({ email: formData.email, password: formData.password });
    if (!valid) {
      setFormData((prevData) => ({ ...prevData, error: message }));
      toast.error(message);
      return;
    }

    // Supabase 로그인 요청
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    });

    if (error) {
      setFormData((prevData) => ({ ...prevData, error: error.message }));
    } else {
      setFormData((prevData) => ({ ...prevData, success: '로그인 성공' }));
      toast.success('로그인 성공');
      setIsLogin(true);
      navigate('/');
    }
  };

  return (
    <SignUpForm onSubmit={signIn}>
      <div>
        <Logo>
          <img src="/images/logo.svg" alt="밥타임_로고" />
        </Logo>
      </div>
      <InputWrap>
        <InputField label="아이디" name="email" value={formData.email} onChange={handleInputChange} />
        <InputField
          label="비밀번호"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <InputDiv>
          <FormButton type="submit">로그인</FormButton>
        </InputDiv>
        <LinkStyle to="/SignUp">회원가입</LinkStyle>
      </InputWrap>
    </SignUpForm>
  );
};

export default Login;
