import styled from 'styled-components';
import { typography } from '../../configurations/Typography';
import { color } from '../../configurations/Color';
import Like from './Like';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 800px;
  height: 450px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Title = styled.p`
  ${typography.headline1};
  color: ${color.black};
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Icon = styled.p`
  ${typography.title1};
  color: #ffcc00;
`;

const Rating = styled.p`
  ${typography.title1};
  color: ${color.black};
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RowTitle = styled.p`
  ${typography.title3};
  color: ${color.black};
`;

const RowContent = styled.p`
  ${typography.body1};
  color: ${color.black};
`;

const PostDetail = ({ post }) => {
  return (
    <Container>
      <Image src="/images/thumbnail_sample.png" alt="image" />
      <InfoContainer>
        <TitleContainer>
          <Title>{post.title}</Title>
          <RatingContainer>
            <Icon>★</Icon>
            <Rating>{post.rating}</Rating>
          </RatingContainer>
          <Like />
        </TitleContainer>
        <RowContainer>
          <RowTitle>주소</RowTitle>
          <RowContent>{post.location}</RowContent>
        </RowContainer>
        <RowContainer>
          <RowTitle>종류</RowTitle>
          <RowContent>{post.category}</RowContent>
        </RowContainer>
        <RowContainer>
          <RowTitle>내용</RowTitle>
          <RowContent>{post.description}</RowContent>
        </RowContainer>
      </InfoContainer>
    </Container>
  );
};

export default PostDetail;
