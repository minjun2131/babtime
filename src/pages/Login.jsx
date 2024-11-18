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

const Login = () => {
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
          <FormButton type="submit">로그인</FormButton>
          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
          {/* {success && <p style={{ color: 'green' }}>{success}</p>} */}
        </InputDiv>
        <LinkStyle to="/SignUp">회원가입</LinkStyle>
      </InputWrap>
    </SignUpForm>
  );
};

export default Login;
