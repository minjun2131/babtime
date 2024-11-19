import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase.js';
import PostList from './PostList.jsx';

export const MainPost = ({ searchTerm }) => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]); // 검색 state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: posts, error: postError } = await supabase.from('posts').select('*');

        if (postError) throw postError;

        const userPromises = posts.map(async (post) => {
          const { data: user, error: userError } = await supabase
            .from('users')
            .select('name')
            .eq('id', post.user_id)
            .single();

          if (userError) {
            console.error(`사용자 데이터 불러오기 실패 (user_id: ${post.user_id}):`, userError);
            return null;
          }

          return { ...post, userName: user.name };
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

  useEffect(() => {
    // 검색어에 따라 필터링
    const results = postData.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPosts(results);
  }, [searchTerm, postData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;

  return <PostList lenderData={filteredPosts} />;
};

export default MainPost;
