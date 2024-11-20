import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignUpForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 15px #ffb879;
`;
const Logo = styled.h1`
  padding: 50px;
  text-align: center;
  img {
    width: 150px;
  }
`;

const InputWrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputDiv = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const InputName = styled.label`
  display: inline-block;
`;

const Input = styled.input`
  display: block;
  margin-top: 5px;
  width: 100%;
  padding: 0 10px;
  line-height: 40px;
  border: 1px solid #333;
  border-radius: 5px;
  font-size: 18px;
`;

const FormButton = styled.button`
  width: 100%;
  height: 40px;
  color: #fff;
  border-radius: 50px;
  background-color: #ffb879;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #fe963b;
  }
`;

const Image = styled.img`
  width: 150px;
`;

const LinkStyle = styled(Link)`
  color: #aaa;
  margin: 30px 0;
  &:hover {
    color: #333;
  }
`;
export { SignUpForm, Logo, InputWrap, InputDiv, InputName, Input, FormButton, LinkStyle, Image };
