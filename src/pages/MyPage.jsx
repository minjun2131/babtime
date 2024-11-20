import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledMypageWrapper } from '../styles/MyPageStyle';
import { supabase } from '../api/services/supabase';
import Header from '../components/header/Header';
import MyPageLikePostList from '../components/mypage/MyPageLikePostList';
import MyPageMyPostList from '../components/mypage/MyPageMyPostList';
import MyPageProfile from '../components/mypage/MyPageProfile';
import { fetchUserData, fetchWritePosts, fetchLikedPosts } from '../api/fetchUserData';

const MyPage = () => {
  const param = useParams();

  const [paramUser, setParamUserData] = useState(null);
  const [loginUser, setUser] = useState(null);
  const [writePosts, setWritePosts] = useState([]);
  const [likePosts, setLikePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false); // 새로고침 상태

  // 로그인한 유저 데이터 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (err) {
        console.error('로그인한 유저 정보를 가져오는 데 실패했습니다:', err);
        setError(err);
      }
    };

    fetchUser();
  }, [reload]);

  // 파라미터에 해당하는 유저 데이터 가져오기
  useEffect(() => {
    const fetchParamUserData = async () => {
      setLoading(true);
      try {
        const userData = await fetchUserData(param.id);
        setParamUserData(userData);
      } catch (err) {
        console.error('유저 데이터를 가져오는 데 오류가 발생했습니다:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (param.id) {
      fetchParamUserData();
    }
  }, [param.id, reload]);

  // 작성한 게시물 가져오기
  useEffect(() => {
    const fetchWritePostsData = async () => {
      if (!paramUser) return;

      try {
        const writePostsData = await fetchWritePosts(paramUser.id);
        setWritePosts(writePostsData);
      } catch (err) {
        console.error('작성한 게시물을 가져오는 데 오류가 발생했습니다:', err);
        setError(err);
      }
    };

    fetchWritePostsData();
  }, [paramUser]);

  // 좋아요한 게시물 가져오기
  useEffect(() => {
    const fetchLikedPostsData = async () => {
      if (!paramUser) return;

      try {
        const likedPostsData = await fetchLikedPosts(paramUser.id);
        setLikePosts(likedPostsData);
      } catch (err) {
        console.error('좋아요한 게시물을 가져오는 데 오류가 발생했습니다:', err);
        setError(err);
      }
    };

    fetchLikedPostsData();
  }, [paramUser]);

  return (
    <>
      <Header key={reload} />
      <StyledMypageWrapper>
        <MyPageProfile paramUser={paramUser} loginUser={loginUser} triggerReload={() => setReload(!reload)} />
        <MyPageMyPostList paramUser={paramUser} posts={writePosts} loading={loading} error={error} />
        {paramUser && loginUser && paramUser.id === loginUser.id && (
          <MyPageLikePostList posts={likePosts} loading={loading} error={error} />
        )}
      </StyledMypageWrapper>
    </>
  );
};

export default MyPage;
