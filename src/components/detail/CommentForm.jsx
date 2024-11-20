import styled from 'styled-components';
import { color } from '../../configurations/Color';
import { typography } from '../../configurations/Typography';
import { useState } from 'react';

const Container = styled.form`
  display: flex;
  gap: 20px;
`;

const Textarea = styled.textarea`
  width: 700px;
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
  cursor: pointer;
`;

const CommentForm = ({ handleSubmit }) => {
  const [comment, setComment] = useState('');

  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(comment);
        setComment('');
      }}
    >
      <Textarea
        placeholder="댓글을 작성해 주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></Textarea>
      <Button type="submit">등록</Button>
    </Container>
  );
};

export default CommentForm;
