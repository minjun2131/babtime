import { useState } from 'react';
import Header from '../components/header/Header';
import ImageUploader from '../components/postedit/ImageUploader';
import TextInput from '../components/postedit/TextInput';
import CategorySelector from '../components/postedit/CategorySelector';
import TextAreaInput from '../components/postedit/TextAreaInput';
import RatingSelector from '../components/postedit/RatingSelector';
import { Container, ButtonGroup, SubmitButton, CancelButton } from '../styles/PostEditStyle';

const PostEdit = ({ isEdit = false, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [address, setAddress] = useState(initialData.address || '');
  const [content, setContent] = useState(initialData.content || '');
  const [selectedCategory, setSelectedCategory] = useState(initialData.category || '');
  const [rating, setRating] = useState(initialData.rating || 0);
  const [image, setImage] = useState(initialData.image || null);

  const categories = ['한식', '중식', '양식', '일식', '분식', '카페 / 베이커리'];

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
    event.target.value = null;
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
        <ImageUploader image={image} onUpload={handleImageUpload} onDelete={() => setImage(null)} />
        <TextInput label="제목" placeholder="제목을 입력해주세요." value={title} onChange={setTitle} />
        <TextInput label="주소" placeholder="주소를 입력해주세요." value={address} onChange={setAddress} />
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={(category) => setSelectedCategory(selectedCategory === category ? '' : category)}
        />
        <TextAreaInput label="내용" placeholder="내용을 입력해주세요." value={content} onChange={setContent} />
        <RatingSelector rating={rating} onRatingClick={setRating} />
        <ButtonGroup>
          <SubmitButton>{isEdit ? '수정' : '등록'}</SubmitButton>
          <CancelButton onClick={isEdit ? undefined : resetForm}>취소</CancelButton>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default PostEdit;
