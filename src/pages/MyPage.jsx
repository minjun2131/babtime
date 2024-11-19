import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { StyledMypageWrapper } from '../styles/MyPageStyle';
import { supabase } from '../services/supabase';
import Header from '../components/header/Header';
import MyPageLikePostList from '../components/mypage/MyPageLikePostList';
import MyPageMyPostList from '../components/mypage/MyPageMyPostList';
import MyPageProfile from '../components/mypage/MyPageProfile';

const MyPage = () => {
  const param = useParams(); 

  const [paramUser, setParamUserData] = useState(null);
  const [loginUser, setUser] = useState(null);
  const [writePosts, setWritePosts] = useState([]);
  const [likePosts, setLikePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 로그인한 유저 데이터 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    
    fetchUser();
  }, []);

  // 파라미터에 해당하는 유저 데이터 가져오기
  useEffect(() => {
    const fetchParamUserData = async () => {
      setLoading(true);
      try {
        const userData = await fetchUserData(param.id);
        setParamUserData(userData);

        const writePostsData = await fetchWritePosts(userData.id);
        setWritePosts(writePostsData);

        const likedPostsData = await fetchLikedPosts(userData.id);
        setLikePosts(likedPostsData);
      } catch (err) {
        console.error('데이터를 가져오는 데 오류가 발생했습니다:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParamUserData();
  }, [param.id]);

  // 유저 데이터 가져오기
  const fetchUserData = async (userId) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
    if (error) throw error;
    return data;
  };

  // 작성한 게시물 가져오기
  const fetchWritePosts = async (userId) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  };

  // 좋아요 게시물 가져오기
  const fetchLikedPosts = async (userId) => {
    const { data: likedPostIds, error } = await supabase
      .from('likes')
      .select('post_id')
      .eq('user_id', userId);
    if (error) throw error;

    if (likedPostIds.length > 0) {
      const { data: likedPostsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .in('id', likedPostIds.map((like) => like.post_id));
      if (postsError) throw postsError;

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

      return enrichedLikedPosts.filter((post) => post !== null);
    } else {
      return [];
    }
  };

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