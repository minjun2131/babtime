import { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import ImageUploader from '../components/postedit/ImageUploader';
import TextInput from '../components/postedit/TextInput';
import CategorySelector from '../components/postedit/CategorySelector';
import TextAreaInput from '../components/postedit/TextAreaInput';
import RatingSelector from '../components/postedit/RatingSelector';
import { Container, ButtonGroup, SubmitButton, CancelButton } from '../styles/PostEditStyle';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { toast } from 'react-toastify';

const PostEdit = () => {
  const { id: postId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const nav = useNavigate();

  const categories = ['한식', '중식', '양식', '일식', '분식', '카페 / 베이커리'];

  // 로그인 여부 확인 및 사용자 정보 가져오기
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        toast.info('로그인이 필요합니다.');
        nav('/login');
        return;
      }
      setCurrentUser(user); // 현재 사용자 정보 저장
    };

    checkUser();
  }, []);

  // 기존 게시물 데이터를 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      if (postId && currentUser) {
        const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
        if (error) {
          console.error('Error fetching post:', error.message);
          return;
        }
        if (data) {
          if (data.user_id !== currentUser.id) {
            nav(-1);
            return;
          }
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
  }, [postId, currentUser]);

  // 이미지 업로드
  const uploadImage = async (file) => {
    const { data, error } = await supabase.storage.from('images').upload(file.name, file);

    if (error) {
      console.error('Error uploading image:', error.message);
      return null;
    }

    return await supabase.storage.from('images').getPublicUrl(data.path).publicUrl;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 로컬 이미지 미리보기
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setImage(imageUrl);
    }
    event.target.value = null;
  };

  // 게시글 생성
  const createPost = async (post) => {
    const { error } = await supabase.from('posts').insert(post).select();

    if (error) {
      console.error('Error inserting post:', error.message);
      toast.error('게시글 등록에 실패했습니다.');
      return;
    }

    toast.success('게시글이 성공적으로 등록되었습니다.');
    resetForm();
    nav('/');
    return;
  };

  // 게시글 수정
  const updatePost = async (post, postId) => {
    const numericId = parseInt(postId, 10);
    const { error } = await supabase.from('posts').update(post).eq('id', numericId).select();

    if (error) {
      console.error('Error updating post:', error.message);
      toast.error('게시글 수정에 실패했습니다.');
      return;
    }

    toast.success('게시글이 성공적으로 수정되었습니다.');
    nav(-1);
    return;
  };

  // 등록, 수정 핸들러
  const handleSubmit = async () => {
    if (!currentUser) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (!title || !address || !selectedCategory || !content) {
      toast.error('모든 정보를 입력해주세요.');
      return;
    }

    const post = {
      title,
      location: address,
      description: content,
      category: selectedCategory,
      rating,
      image_url: image,
      user_id: currentUser.id
    };

    if (isEdit) {
      await updatePost(post, postId);
    } else {
      await createPost(post);
    }
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
