import React, { useEffect, useState } from 'react';
import ProfileSmall from '../header/ProfileSmall.jsx';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabase.js';
import { PostUl, PostBoxTop, Writer, StyledDate, PostBoxBtm } from '../../styles/MainStyle.jsx';

export const PostList = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        console.error('데이터 로딩 중 오류 발생:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;

  return (
    <PostUl>
      {postData.map((post) => {
        const formattedString = post.created_at.replace(/\.\d+/, '');
        const date = new Date(formattedString);
        //const formattedDate = date.toLocaleString();
        const formattedDate = date.toLocaleDateString(); // 날짜만 표시

        return (
          <li key={post.id}>
            <PostBoxTop>
              <Link to={`/MyPage`}></Link>
              <ProfileSmall></ProfileSmall>
              <div>
                <Writer>{post.userName}</Writer>
                <StyledDate>{formattedDate}</StyledDate>
              </div>
            </PostBoxTop>
            <PostBoxBtm image={post.image_url}>
              <Link to={`/Detail/${post.id}`}></Link>
              <figure></figure>
              <p>
                {/* {post.title} */}
                {post.description}
              </p>
            </PostBoxBtm>
          </li>
        );
      })}
    </PostUl>
  );
};

export default PostList;
