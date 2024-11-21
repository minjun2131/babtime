import Header from '../components/header/Header.jsx';
import { Inner, MainVisual, IntroTitle } from '../styles/MainStyle.jsx';
import Category from '../components/main/Category.jsx';
import PostList from '../components/main/PostList.jsx';
import { supabase } from '../api/services/supabase.js';
import React, { useEffect, useState } from 'react';

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: posts, error: postError } = await supabase.from('posts').select('*');

        if (postError) throw postError;

        const userPromises = posts.map(async (post) => {
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
        });

        const postsWithUserNames = await Promise.all(userPromises);
        const validPosts = postsWithUserNames.filter((post) => post !== null);
        const sortedPosts = validPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setPostData(sortedPosts);
        setFilteredPosts(sortedPosts); // 초기 필터링된 게시물 설정
      } catch (err) {
        console.error('데이터 로딩 중 오류 발생:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const results = postData.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {!searchTerm && <MainVisual></MainVisual>}
      <Inner>
        <IntroTitle>다양한 맛집 리뷰를 확인해 보세요.</IntroTitle>

        <PostList posts={filteredPosts} loading={loading} error={error} />
      </Inner>
    </>
  );
};

export default Main;
