import styled from 'styled-components';
import { typography } from '../../configurations/Typography';
import { color } from '../../configurations/Color';

const Container = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CommentContainer = styled.div`
  width: max-content;
  max-width: 100%;
  display: flex;
  align-items: center;
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

const CommentList = () => {
  return (
    <Container>
      <CommentContainer>
        <Profile src="/images/user.svg" alt="icon" />
        <ContentContainer>
          <UserContainer>
            <Name>밥타임</Name>
            <Date>2024-11-16</Date>
          </UserContainer>
          <Content>Lorem ipsum dolor sit amet consectetur.</Content>
        </ContentContainer>
      </CommentContainer>
      <CommentContainer>
        <Profile src="/images/user.svg" alt="icon" />
        <ContentContainer>
          <UserContainer>
            <Name>밥타임</Name>
            <Date>2024-11-16</Date>
          </UserContainer>
          <Content>
            Lorem ipsum dolor sit amet consectetur. Non id neque at ornare ut habitasse tristique. Nibh placerat lectus
            mollis purus praesent amet senectus tristique aliquam. Fringilla velit urna orci orci morbi sollicitudin
            mauris elementum. Id vulputate vel commodo purus coodo
          </Content>
        </ContentContainer>
      </CommentContainer>
    </Container>
  );
};

export default CommentList;
