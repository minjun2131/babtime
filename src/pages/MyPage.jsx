import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams 임포트 추가
import { StyledMypageWrapper } from '../styles/MyPageStyle';
import { supabase } from '../services/supabase';
import Header from '../components/header/Header';
import MyPageLikePostList from '../components/mypage/MyPageLikePostList';
import MyPageMyPostList from '../components/mypage/MyPageMyPostList';
import MyPageProfile from '../components/mypage/MyPageProfile';

const MyPage = () => {
  const param = useParams(); // URL 파라미터에서 param으로 가져오기

  const [paramUser, setParamUserData] = useState(null);
  const [loginUser, setUser] = useState(null);
  const [writePosts, setWritePosts] = useState([]);
  const [likePosts, setLikePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 로그인한 유저
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  // 파라미터에 해당하는 유저
  useEffect(() => {
    const fetchParamUserData = async () => {
      setLoading(true);

      // 유저 데이터 가져오기
      const { data, error } = await supabase.from('users').select('*').eq('id', param.id).single();

      if (error) {
        console.error('유저 데이터를 가져오는 데 오류가 발생했습니다:', error);
        window.alert('오류가 발생했습니다.');
        setError(error);
        setLoading(false);
        return;
      }

      setParamUserData(data);

      // 해당 유저가 작성한 게시물 가져오기
      const { data: writePostsData, error: writePostError } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', data.id);

      if (writePostError) {
        console.error('게시물을 가져오는 데 오류가 발생했습니다:', writePostError);
        setError(writePostError);
      } else {
        setWritePosts(writePostsData);
      }

      // 해당 유저가 좋아요를 누른 게시물 가져오기
      const { data: likedPostIds, error: likePostsError } = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', data.id);

      if (likePostsError) {
        console.error('좋아요 데이터를 가져오는 데 오류가 발생했습니다:', likePostsError);
        setError(likePostsError);
      } else {
        if (likedPostIds.length > 0) {
          const { data: likedPostsData, error: postsError } = await supabase
            .from('posts')
            .select('*')
            .in(
              'id',
              likedPostIds.map((like) => like.post_id)
            );

          if (postsError) {
            console.error('게시물을 가져오는 데 오류가 발생했습니다:', postsError);
            setError(postsError);
          } else {
            const enrichedLikedPosts = await Promise.all(
              likedPostsData.map(async (post) => {
                const { data: user, error: userError } = await supabase
                  .from('users')
                  .select('*')
                  .eq('id', post.user_id)
                  .single();

                if (userError) {
                  console.error(`사용자 데이터 불러오기 실패 (user_id: ${post.user_id}):`, userError);
                  return null;
                }

                return { ...post, userName: user.name, userId: user.id, userImage: user.profile_image_url };
              })
            );

            setLikePosts(enrichedLikedPosts.filter((post) => post !== null));
          }
        } else {
          setLikePosts([]);
        }
      }

      setLoading(false);
    };

    fetchParamUserData();
  }, [param.id]);

  return (
    <>
      <Header />
      <StyledMypageWrapper>
        <MyPageProfile paramUser={paramUser} loginUser={loginUser} />
        <MyPageMyPostList paramUser={paramUser} posts={writePosts} loading={loading} error={error} />
        {paramUser && loginUser && paramUser.id === loginUser.id && (
          <MyPageLikePostList posts={likePosts} loading={loading} error={error} />
        )}
      </StyledMypageWrapper>
    </>
  );
};

export default MyPage;
