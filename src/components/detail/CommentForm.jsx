import styled from 'styled-components';
import { color } from '../../configurations/Color';
import { typography } from '../../configurations/Typography';

const Container = styled.form`
  display: flex;
  gap: 20px;
`;

const Textarea = styled.textarea`
  width: 1100px;
  height: 80px;
  border-radius: 5px;
  ${typography.body1};
  color: ${color.black};
  padding: 10px;
  resize: none;

  &::placeholder {
    color: ${color.gray};
  }

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 80px;
  height: 80px;
  background-color: #ffb879;
  border: none;
  border-radius: 5px;
  ${typography.title3};
  color: ${color.white};
`;

const CommentForm = () => {
  return (
    <Container>
      <Textarea placeholder="댓글을 작성해 주세요."></Textarea>
      <Button type="button">등록</Button>
    </Container>
  );
};

export default CommentForm;