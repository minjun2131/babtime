import styled from 'styled-components';
import { color } from '../../configurations/Color';
import { typography } from '../../configurations/Typography';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';

const Container = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${color.red};
  border-radius: 50%;
  ${typography.title1};
  color: ${color.red};
  cursor: pointer;
`;

const Like = ({ userId, postId }) => {
  const [isLiked, setIsLiked] = useState(false);

  /* 좋아요 정보 가져오기 */
  useEffect(() => {
    const fetchLike = async () => {
      const { data, error } = await supabase.from('likes').select('*').eq('user_id', userId).eq('post_id', postId);

      if (error) window.alert('오류가 발생했습니다.');
      else setIsLiked(data.length > 0);
    };

    fetchLike();
  }, [isLiked, userId, postId]);

  /* 좋아요 토글 이벤트 */
  const handleLike = async () => {
    // 좋아요 되어 있는 경우
    if (isLiked) {
      const { error } = await supabase.from('likes').delete().eq('user_id', userId).eq('post_id', postId);

      if (error) console.log(error);
    }
    // 좋아요 되어있지 않은 경우
    else {
      const { error } = await supabase.from('likes').insert({ user_id: userId, post_id: postId });

      if (error) console.log(error);
    }

    setIsLiked(!isLiked);
  };

  return (
    <Container
      onClick={async () => {
        await handleLike();
      }}
    >
      {isLiked ? '♥' : '♡'}
    </Container>
  );
};

export default Like;
