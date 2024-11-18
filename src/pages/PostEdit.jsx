import { useState } from 'react';
import Header from '../components/Header';
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

const PostEdit = ({ initialData }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialData?.category || '');
  const [rating, setRating] = useState(initialData?.rating || 0);

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
          <ImagePlaceholder>
            {initialData?.image ? <img src={initialData.image} alt="Uploaded" /> : '이미지를 업로드해주세요'}
          </ImagePlaceholder>
          <ButtonGroup>
            <Button>사진 변경</Button>
            <Button>사진 삭제</Button>
          </ButtonGroup>
        </ImageUpload>
        <InputContainer>
          <Label>제목</Label>
          <Input type="text" defaultValue={initialData?.title} />
        </InputContainer>
        <InputContainer>
          <Label>주소</Label>
          <Input type="text" defaultValue={initialData?.address} />
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
          <TextArea defaultValue={initialData?.content} />
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
          <SubmitButton>수정</SubmitButton>
          <CancelButton>취소</CancelButton>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default PostEdit;
