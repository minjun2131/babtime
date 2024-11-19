import React from 'react';
import ProfileSmall from '../header/ProfileSmall.jsx';
import { Link } from 'react-router-dom';
import { PostUl, PostBoxTop, Writer, StyledDate, PostBoxBtm } from '../../styles/MainStyle.jsx';

export const PostList = ({ posts, loading, error, userInfo }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;

  return (
    <PostUl>
      {posts.map((post) => {
        const formattedString = post.created_at.replace(/\.\d+/, '');
        const date = new Date(formattedString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`; // 최종 포맷

        return (
          <li key={post.id}>
            <PostBoxTop>
              {post.userId && <Link to={`/myPage/${post.userId}`}></Link>}
              <ProfileSmall profileImage={userInfo ? userInfo.profile_image_url : post.userImage}></ProfileSmall>
              <div>
                <Writer>{userInfo ? userInfo.name : post.userName}</Writer>
                <StyledDate>{formattedDate}</StyledDate>
              </div>
            </PostBoxTop>
            <PostBoxBtm image={post.image_url}>
              <Link to={`/detail/${post.id}`}></Link>
              <figure></figure>
              <p>{post.description}</p>
            </PostBoxBtm>
          </li>
        );
      })}
    </PostUl>
  );
};

export default PostList;
