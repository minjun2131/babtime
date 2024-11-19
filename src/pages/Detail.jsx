import Header from '../components/header/Header';
import CommentForm from '../components/detail/CommentForm';
import CommentList from '../components/detail/CommentList';
import PostDetail from '../components/detail/postDetail';
import Button from '../components/detail/Button';
import { ButtonContainer, CommentContainer, DetailContainer, Wrap } from '../styles/DetailStyle';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { toast } from 'react-toastify';

const Detail = () => {
  const navigate = useNavigate();
  const param = useParams();

  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  /* 로그인한 유저 정보 가져오기 */
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      setUser(data.user);
    };

    fetchUser();
  }, []);

  /* 게시글 상세 정보 가져오기 */
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', param.id);

      if (error) window.alert('오류가 발생했습니다.');
      else setPost(data[0]);
    };

    fetchData();
  }, [param.id]);

  /* 댓글 정보 가져오기 */
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, users: user_id(*)')
        .eq('post_id', param.id)
        .order('created_at', { ascending: false });

      if (error) window.alert('오류가 발생했습니다.');
      else setComments(data);
    };

    fetchData();
  }, [param.id]);

  /* 게시글 삭제 이벤트 */
  const handleDeletePost = async () => {
    const { error } = await supabase.from('posts').delete().eq('id', post.id);

    if (error) console.log(error);
    else {
      navigate('/');
      toast.success('게시글이 성공적으로 삭제되었습니다.');
    }
  };

  /* 댓글 등록 이벤트 */
  const handleAddComment = async (value) => {
    const { addError } = await supabase.from('comments').insert({ content: value, user_id: user.id, post_id: post.id });

    if (addError) console.log(addError);
    else {
      const { data, readError } = await supabase
        .from('comments')
        .select('*, users: user_id(*)')
        .eq('post_id', param.id)
        .order('created_at', { ascending: false });

      if (readError) window.alert('오류가 발생했습니다.');
      else setComments(data);
    }
  };

  return (
    <>
      {post && (
        <Wrap>
          <Header />
          <DetailContainer>
            <PostDetail user={user} post={post} />
            {user?.id === post.user_id && (
              <ButtonContainer>
                <Button label="수정" handleClick={() => navigate(`/postedit/${post.id}`)} />
                <Button category="sub" label="삭제" handleClick={handleDeletePost} />
              </ButtonContainer>
            )}
          </DetailContainer>
          <CommentContainer>
            <CommentForm handleSubmit={handleAddComment} />
            <CommentList comments={comments} />
          </CommentContainer>
        </Wrap>
      )}
    </>
  );
};

export default Detail;
