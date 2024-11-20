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
  const params = useParams();
  const postId = params.id;
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

  // CurrentUser부분 커스텀 훅으로 분리하기
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
  // 의존성 배열로 nav를 넣어줄 이유가 없음 (상관은 없지만 불필요함)
  // 페이지가 처음 렌더링 되었을 때 로그인 여부 한번만 확인해주면 됨
  // 어차피 페이지가 다시 실행되면 다시 한번만 확인하게 됨
  // 그래서 nav가 바뀔 가능성이 0인데 의존성 배열이 들어가 있는 상태임

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
  }, [postId, nav, currentUser]);
  // 여기도 불필요한 nav가 들어가있음
  // 불필요한 의존성 배열은 제가해주는게 맞음

  // 이미지 업로드
  const uploadImage = async (file) => {
    const { data, error } = await supabase.storage.from('images').upload(file.name, file);

    if (error) {
      console.error('Error uploading image:', error.message);
      return null;
    }

    return await supabase.storage.from('images').getPublicUrl(data.path).publicUrl;
    // 이런 경우엔 supabase에 다가가기 때문에 await가 필수로 들어가야 함
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    // 굳이 FileReader를 이용해 이미지를 추출하는 이유는?
    // setImage는 작동하고 있는데 상태관리가 이상해보임
    // 98번 째 줄에서 FileReader로 읽어서 브라우저에서 url로 만들고
    // 상태관리를 setImage로 바꿔주는 건 이해가 됨
    // setImage는 104번꺼는 브라우저에 반영되지 않음
    // set이 비동기처리기 때문에 110번째 줄만 바뀌게 됨
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
      // 현재 이건 boolean 타입으로 함수가 2가지 이상의 역할을 하고 있기 때문에
      // 함수는 되도록이면 1가지 역할을 가지고 있게끔 작성해야 하는데
      // 포스트를 등록하는 로직을 다른 곳에서도 사용하려 한다면
      // 등록하는 함수가 함수 1개로 되어있다면 유틸함수로 가져와 쓸 수 있음
      // boolean타입으로 처리를 하기보단 함수를 나눠서 작업하는게 좋음
      // handleSubmit은 Submit으로 실행하고 내부에서 isEdit으로 등록하는 함수를 시키거나 수정하는 함수를 시키거나 해야됨
      // or 함수 다른 걸 만들되 검증하는 함수를 그냥 공용함수로 만들어 보는게 좋습니다.
      const numericId = parseInt(postId, 10);
      const { error } = await supabase.from('posts').update(post).eq('id', numericId).select();
      if (error) {
        console.error('Error updating post:', error.message);
        toast.error('게시글 수정에 실패했습니다.');
        return;
      }
      toast.success('게시글이 성공적으로 수정되었습니다.');
      nav(-1);
    } else {
      const { error } = await supabase.from('posts').insert(post).select();

      if (error) {
        console.error('Error inserting post:', error.message);
        toast.error('게시글 등록에 실패했습니다.');
        return;
      }
      toast.success('게시글이 성공적으로 등록되었습니다.');
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
