import { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import ImageUploader from '../components/postedit/ImageUploader';
import TextInput from '../components/postedit/TextInput';
import CategorySelector from '../components/postedit/CategorySelector';
import TextAreaInput from '../components/postedit/TextAreaInput';
import RatingSelector from '../components/postedit/RatingSelector';
import { Container, ButtonGroup, SubmitButton, CancelButton } from '../styles/PostEditStyle';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const PostEdit = () => {
  const id = 17;
  const [isEdit, setIsEdit] = useState(false); // 수정 여부를 판별
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const nav = useNavigate();

  const categories = ['한식', '중식', '양식', '일식', '분식', '카페 / 베이커리'];

  // 기존 게시물 데이터를 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
        if (error) {
          console.error('Error fetching post:', error.message);
          return;
        }
        if (data) {
          // 게시물 데이터가 있으면 필드 채우기 및 수정 모드 활성화
          setTitle(data.title);
          setAddress(data.location);
          setContent(data.description);
          setSelectedCategory(data.category);
          setRating(data.rating);
          setImage(data.image_url);
          setIsEdit(true);
        }
      }
    };
    fetchPost();
  }, [id]);

  // 파일 이름 생성
  const generateFileName = (file) => {
    const timestamp = Date.now();
    const sanitizedFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${timestamp}-${sanitizedFileName}`;
  };

  // 이미지 업로드
  const uploadImage = async (file) => {
    const fileName = generateFileName(file);
    const { data, error } = await supabase.storage.from('images').upload(fileName, file);

    if (error) {
      console.error('Error uploading image:', error.message);
      return null;
    }

    return supabase.storage.from('images').getPublicUrl(data.path).publicUrl;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setImage(imageUrl);
    }
    event.target.value = null;
  };

  // 등록 또는 수정 로직
  const handleSubmit = async () => {
    if (!title || !address || !selectedCategory || !content) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const post = {
      title,
      location: address,
      description: content,
      category: selectedCategory,
      rating,
      image_url: image,
      user_id: '6b94b3d6-ec1e-43fb-8561-2e21f1e9f2d8' // 실제 로그인 사용자 ID로 대체 필요
    };

    // 데이터 있을시 수정.
    if (isEdit) {
      const numericId = parseInt(id, 10);
      const { error } = await supabase.from('posts').update(post).eq('id', numericId).select();
      if (error) {
        console.error('Error updating post:', error.message);
        alert('게시글 수정에 실패했습니다.');
        return;
      }
      alert('게시글이 성공적으로 수정되었습니다.');
    } else {
      // 데이터 없을시 등록.
      const { error } = await supabase.from('posts').insert(post).select();

      if (error) {
        console.error('Error inserting post:', error.message);
        alert('게시글 등록에 실패했습니다.');
        return;
      }
      alert('게시글이 성공적으로 등록되었습니다.');
    }

    resetForm();
    nav('/');
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
          <SubmitButton onClick={handleSubmit}>{isEdit ? '수정' : '등록'}</SubmitButton>
          <CancelButton
            onClick={() => {
              nav(-1);
              resetForm();
            }}
          >
            취소
          </CancelButton>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default PostEdit;
