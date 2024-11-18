import Header from '../components/header/Header';
import CommentForm from '../components/detail/CommentForm';
import CommentList from '../components/detail/CommentList';
import PostDetail from '../components/detail/postDetail';
import Button from '../components/detail/Button';
import { ButtonContainer, CommentContainer, DetailContainer, Wrap } from '../styles/DetailStyle';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const Detail = () => {
  const param = useParams();

  const [post, setPost] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', param.id);

      if (error) console.log('error => ', error);
      else setPost(data[0]);
    };

    fetchData();
  }, [param.id]);

  return (
    <>
      {post && (
        <Wrap>
          <Header />
          <DetailContainer>
            <PostDetail post={post} />
            <ButtonContainer>
              <Button label="수정" handleClick={() => {}} />
              <Button category="sub" label="삭제" handleClick={() => {}} />
            </ButtonContainer>
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
