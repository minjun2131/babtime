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

const PostEdit = ({ isEdit = false, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [address, setAddress] = useState(initialData.address || '');
  const [content, setContent] = useState(initialData.content || '');
  const [selectedCategory, setSelectedCategory] = useState(initialData.category || '');
  const [rating, setRating] = useState(initialData.rating || 0);
  const [image, setImage] = useState(initialData.image || null);

  const categories = ['한식', '중식', '양식', '일식', '분식', '카페 / 베이커리'];

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = null;
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  const resetForm = () => {
    setTitle('');
    setAddress('');
    setContent('');
    setSelectedCategory('');
    setRating(0);
    setImage(null);
  };

  return (
    <>
      <Header />
      <Container>
        <ImageUpload>
          {image ? (
            <img
              src={image}
              alt="미리 보기"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
          ) : (
            <ImagePlaceholder>이미지를 업로드해주세요</ImagePlaceholder>
          )}
          <ButtonGroup>
            <Button onClick={() => document.getElementById('image-upload').click()}>
              {image ? '사진 변경' : '사진 등록'}
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <Button onClick={handleImageDelete}>사진 삭제</Button>
          </ButtonGroup>
        </ImageUpload>
        <InputContainer>
          <Label>제목</Label>
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>주소</Label>
          <Input
            type="text"
            placeholder="주소를 입력해주세요."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
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
          <TextArea placeholder="내용을 입력해주세요." value={content} onChange={(e) => setContent(e.target.value)} />
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
          <SubmitButton>{isEdit ? '수정' : '등록'}</SubmitButton>
          <CancelButton onClick={isEdit ? undefined : resetForm}>취소</CancelButton>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default PostEdit;
