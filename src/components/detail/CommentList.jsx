import styled from 'styled-components';
import { typography } from '../../configurations/Typography';
import { color } from '../../configurations/Color';

const Container = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CommentContainer = styled.div`
  width: max-content;
  max-width: 100%;
  display: flex;
  gap: 20px;
  background: ${color.white};
  border-radius: 10px;
  box-shadow: 0px 0px 10px #ffb879;
  padding: 20px;
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Name = styled.p`
  ${typography.title3};
  color: ${color.black};
`;

const Date = styled.p`
  ${typography.body2};
  color: ${color.gray};
`;

const Content = styled.p`
  ${typography.body1};
  color: ${color.black};
`;

const CommentList = ({ comments }) => {
  return (
    <Container>
      {comments.map((comment) => (
        <CommentContainer key={comment.id}>
          <Profile src={comment.users.profile_image_url ?? '/images/user.svg'} alt="icon" />
          <ContentContainer>
            <UserContainer>
              <Name>{comment.users.name}</Name>
              <Date>{comment.created_at.slice(0, 10)}</Date>
            </UserContainer>
            <Content>{comment.content}</Content>
          </ContentContainer>
        </CommentContainer>
      ))}
    </Container>
  );
};

export default CommentList;
