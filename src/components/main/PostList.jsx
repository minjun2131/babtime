import React, { useEffect, useState } from 'react';
import ProfileSmall from '../header/ProfileSmall.jsx';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabase.js';
import { PostUl, PostBoxTop, Writer, Date, PostBoxBtm } from '../../styles/MainStyle.jsx';

export const PostList = () => {
  const [postData, setPostData] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // posts 데이터 가져오기
      const { data: posts, error: postError } = await supabase.from('posts').select('*');

      if (postError) {
        console.error('포스트 데이터를 불러오지 못했습니다.', postError);
        setError(postError);
        setLoading(false);
        return;
      }

      // 사용자 이름을 가져오기 위한 Promise 배열 생성
      const userPromises = posts.map(async (post) => {
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('name')
          .eq('id', post.user_id) // user_id를 사용하여 users 테이블의 id와 비교
          .single(); // 단일 사용자 정보 가져오기

        if (userError) {
          console.error(`사용자 데이터 불러오기 실패 (user_id: ${post.user_id}):`, userError);
          return null;
        }

        return { ...post, userName: user.name }; // 포스트 데이터에 사용자 이름 추가
      });

      // 모든 사용자 정보 가져오기
      const postsWithUserNames = await Promise.all(userPromises);
      setPostData(postsWithUserNames.filter((post) => post !== null)); // null 제거

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <PostUl>
      {postData.map((post) => {
        const formattedString = post.created_at.replace(/\.\d+/, '');
        //console.log('Formatted String:', formattedString);

        //const date = new Date(formattedString);
        const date = new window.Date(formattedString);

        //console.log('Date Object:', date);

        const formattedDate = date.toLocaleString();

        return (
          <li key={post.id}>
            <PostBoxTop>
              <Link to={`/MyPage`}></Link>
              <ProfileSmall></ProfileSmall>
              <div>
                <Writer>{post.userName}</Writer>
                <Date>{formattedDate}</Date>
              </div>
            </PostBoxTop>
            <PostBoxBtm imageUrl={post.image_url}>
              <Link to={`/Detail/${post.id}`}></Link>
              <figure></figure>
              <p>
                {post.title}
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
