import { useState } from 'react';
import Header from '../components/header/Header';
import {
  Container,
  ImageUpload,
  ImagePlaceholder,
  ButtonGroup,
  Button,
  InputContainer,
  Label,
  Input,
  TextArea,
  CategoryContainer,
  CategoryItem,
  RatingContainer,
  Star,
  SubmitButton,
  CancelButton
} from '../styles/PostEditorStyle';

const PostRegist = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState(0);

  const categories = ['한식', '중식', '양식', '일식', '분식', '카페 / 베이커리'];

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <>
      <Header />
      <Container>
        <ImageUpload>
          <ImagePlaceholder>이미지를 업로드해주세요</ImagePlaceholder>
          <ButtonGroup>
            <Button>사진 등록</Button>
            <Button>사진 삭제</Button>
          </ButtonGroup>
        </ImageUpload>
        <InputContainer>
          <Label>제목</Label>
          <Input type="text" placeholder="제목을 입력해주세요." />
        </InputContainer>
        <InputContainer>
          <Label>주소</Label>
          <Input type="text" placeholder="주소를 입력해주세요." />
        </InputContainer>
        <InputContainer>
          <Label>종류</Label>
          <CategoryContainer>
            {categories.map((category) => (
              <CategoryItem
                key={category}
                selected={category === selectedCategory}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </CategoryItem>
            ))}
          </CategoryContainer>
        </InputContainer>
        <InputContainer>
          <Label>내용</Label>
          <TextArea placeholder="주소를 입력해주세요." />
        </InputContainer>
        <InputContainer>
          <Label>평점</Label>
          <RatingContainer>
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} selected={index < rating} onClick={() => handleRatingClick(index + 1)}>
                ★
              </Star>
            ))}
          </RatingContainer>
        </InputContainer>
        <ButtonGroup>
          <SubmitButton>등록</SubmitButton>
          <CancelButton>취소</CancelButton>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default PostRegist;
