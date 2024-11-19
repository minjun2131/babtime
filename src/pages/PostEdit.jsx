import { useParams, useNavigate } from 'react-router-dom';
import { usePostEdit } from '../hooks/usePostEdit';
import Header from '../components/header/Header';
import ImageUploader from '../components/postedit/ImageUploader';
import TextInput from '../components/postedit/TextInput';
import CategorySelector from '../components/postedit/CategorySelector';
import TextAreaInput from '../components/postedit/TextAreaInput';
import RatingSelector from '../components/postedit/RatingSelector';
import { Container, ButtonGroup, SubmitButton, CancelButton } from '../styles/PostEditStyle';
import { supabase } from '../services/supabase';
import { toast } from 'react-toastify';

const PostEdit = () => {
  const { id: postId } = useParams();
  const { currentUser, post, setPost, isEdit } = usePostEdit(postId);
  const nav = useNavigate();

  const categories = ['한식', '중식', '양식', '일식', '분식', '카페 / 베이커리'];

  const handleImageUpload = async (file) => {
    const { data, error } = await supabase.storage.from('images').upload(file.name, file);
    if (error) {
      console.error('Error uploading image:', error.message);
      return null;
    }
    return supabase.storage.from('images').getPublicUrl(data.path).publicUrl;
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    if (!post.title || !post.location || !post.category || !post.description) {
      toast.error('모든 정보를 입력해주세요.');
      return;
    }

    const postPayload = { ...post, user_id: currentUser.id };

    try {
      if (isEdit) {
        await supabase.from('posts').update(postPayload).eq('id', postId);
        toast.success('게시글이 성공적으로 수정되었습니다.');
        nav(-1);
      } else {
        await supabase.from('posts').insert(postPayload);
        toast.success('게시글이 성공적으로 등록되었습니다.');
        nav('/');
      }
    } catch (error) {
      console.error('Error saving post:', error.message);
      toast.error('게시글 저장에 실패했습니다.');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <ImageUploader
          image={post.image_url}
          onUpload={async (file) => {
            const url = await handleImageUpload(file);
            setPost((prev) => ({ ...prev, image_url: url }));
          }}
          onDelete={() => setPost((prev) => ({ ...prev, image_url: null }))}
        />
        <TextInput
          label="제목"
          placeholder="제목을 입력해주세요."
          value={post.title}
          onChange={(value) => setPost((prev) => ({ ...prev, title: value }))}
        />
        <TextInput
          label="주소"
          placeholder="주소를 입력해주세요."
          value={post.location}
          onChange={(value) => setPost((prev) => ({ ...prev, location: value }))}
        />
        <CategorySelector
          categories={categories}
          selectedCategory={post.category}
          onCategoryClick={(category) =>
            setPost((prev) => ({ ...prev, category: prev.category === category ? '' : category }))
          }
        />
        <TextAreaInput
          label="내용"
          placeholder="내용을 입력해주세요."
          value={post.description}
          onChange={(value) => setPost((prev) => ({ ...prev, description: value }))}
        />
        <RatingSelector rating={post.rating} onRatingClick={(rating) => setPost((prev) => ({ ...prev, rating }))} />
        <ButtonGroup>
          <SubmitButton onClick={handleSubmit}>{isEdit ? '수정' : '등록'}</SubmitButton>
          <CancelButton onClick={() => nav(-1)}>취소</CancelButton>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default PostEdit;
