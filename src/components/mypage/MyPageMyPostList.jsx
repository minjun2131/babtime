import React, { useEffect, useState } from 'react';
import { StyledMyPagePostSection, StyledMyPageTitle } from '../../styles/MyPageStyle';
import PostList from '../main/PostList.jsx';
import { supabase } from '../../services/supabase';

const MyPageMyPostList = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      setLoading(true);

      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.log('유저 정보를 가져오는 데 오류가 발생했습니다:', userError);
        setError(userError);
        setLoading(false);
        return;
      }

      const userId = userData.user.id;

      const { data: userInfo, error: userInfoError } = await supabase
        .from('users')
        .select('name')
        .eq('id', userId)
        .single();

      if (userInfoError) {
        console.log('유저 이름을 가져오는 데 오류가 발생했습니다:', userInfoError);
        setError(userInfoError);
        setLoading(false);
        return;
      }

      const { data: postsData, error: postsError } = await supabase.from('posts').select('*').eq('user_id', userId);

      if (postsError) {
        console.log('게시물을 가져오는 데 오류가 발생했습니다:', postsError);
        setError(postsError);
      } else {
        setPosts(postsData);
      }

      setUser({ ...userData.user, name: userInfo.name });
      setLoading(false);
    };

    fetchUserAndPosts();
  }, []);

  return (
    <>
      <StyledMyPagePostSection>
        <StyledMyPageTitle>나의 게시글</StyledMyPageTitle>
        <PostList posts={posts} loading={loading} error={error} userInfo={user} />
      </StyledMyPagePostSection>
    </>
  );
};

export default MyPageMyPostList;
