import styled from 'styled-components';
import { typography } from '../../configurations/Typography';
import { color } from '../../configurations/Color';

const Container = styled.button`
  ${({ $category }) => `
    width: 120px;
    background-color: ${$category === 'main' ? '#FFB879' : color.white};
    border: 1px solid #FFB879;
    border-radius: 20px;
    ${typography.title3};
    color: ${$category === 'main' ? color.white : '#FFB879'};
    padding: 10px;
  `}
`;

const Button = ({ category = 'main', label, handleClick }) => {
  return (
    <Container type="button" $category={category} onClick={handleClick}>
      {label}
    </Container>
  );
};

export default Button;
