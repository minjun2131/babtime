import styled from 'styled-components';
import { color } from '../../configurations/Color';
import { typography } from '../../configurations/Typography';

const Container = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${color.red};
  border-radius: 50%;
  ${typography.title1};
  color: ${color.red};
  cursor: pointer;
`;

const Like = () => {
  return <Container>♥</Container>;
};

export default Like;
