import React from 'react';
import ProfileSmall from '../header/ProfileSmall.jsx';
import { Link } from 'react-router-dom';
import { PostUl, PostBoxTop, Writer, StyledDate, PostBoxBtm } from '../../styles/MainStyle.jsx';

export const PostList = ({ lenderData }) => {
  return (
    <PostUl>
      {lenderData.map((post) => {
        const formattedString = post.created_at.replace(/\.\d+/, '');
        const date = new Date(formattedString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`; // 최종 포맷

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
              <p>{post.description}</p>
            </PostBoxBtm>
          </li>
        );
      })}
    </PostUl>
  );
};

export default PostList;
