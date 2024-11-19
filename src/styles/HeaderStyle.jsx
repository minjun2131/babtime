import styled from 'styled-components';
import { color } from '../configurations/Color';

export const HeaderWrap = styled.header`
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 90px;
  padding: 0 40px;
  background: ${color.white};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);

  & > div {
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h1 {
    width: 150px;
  }
  img {
    max-width: 100%;
    vertical-align: middle;
  }
`;

export const Inner = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const SearchWrap = styled.form`
  display: block;
  width: 500px;
  height: 40px;
  position: relative;

  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border: 0;
    border-radius: 50px;
    box-shadow: 0px 0px 10px #ffb879;
    font-size: 16px;
  }

  button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    background: none;
  }
`;
