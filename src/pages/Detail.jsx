import Header from '../components/header/Header';
import CommentForm from '../components/detail/CommentForm';
import CommentList from '../components/detail/CommentList';
import PostDetail from '../components/detail/postDetail';
import Button from '../components/detail/Button';
import { ButtonContainer, CommentContainer, DetailContainer, Wrap } from '../styles/DetailStyle';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const Detail = () => {
  const navigate = useNavigate();
  const param = useParams();

  const [user, setUser] = useState();
  const [post, setPost] = useState();

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

  /* 게시글 삭제 이벤트 */
  const handleDelete = async () => {
    const { error } = await supabase.from('posts').delete().eq('id', post.id);

    if (error) console.log(error);
    else navigate('/main');
  };

  return (
    <>
      {post && (
        <Wrap>
          <Header />
          <DetailContainer>
            <PostDetail user={user} post={post} />
            {user.id === post.user_id && (
              <ButtonContainer>
                <Button label="수정" handleClick={() => navigate(`/postedit/${post.id}`)} />
                <Button category="sub" label="삭제" handleClick={handleDelete} />
              </ButtonContainer>
            )}
          </DetailContainer>
          <CommentContainer>
            <CommentForm />
            <CommentList />
          </CommentContainer>
        </Wrap>
      )}
    </>
  );
};

export default Detail;
