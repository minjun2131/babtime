import Header from '../components/header/Header';
import CommentForm from '../components/detail/CommentForm';
import CommentList from '../components/detail/CommentList';
import PostDetail from '../components/detail/postDetail';
import Button from '../components/detail/Button';
import { ButtonContainer, CommentContainer, DetailContainer, Wrap } from '../styles/DetailStyle';

const Detail = () => {
  return (
    <Wrap>
      <Header />
      <DetailContainer>
        <PostDetail />
        <ButtonContainer>
          <Button label="수정" handleClick={() => {}} />
          <Button category="sub" label="삭제" handleClick={() => {}} />
        </ButtonContainer>
      </DetailContainer>
      <CommentContainer>
        <CommentForm />
        <CommentList />
      </CommentContainer>
    </Wrap>
  );
};

export default Detail;
