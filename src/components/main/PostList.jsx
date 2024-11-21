import React from 'react';
import ProfileSmall from '../header/ProfileSmall.jsx';
import { Link } from 'react-router-dom';
import {
  PostUl,
  PostBoxTop,
  Writer,
  StyledDate,
  PostBoxBtm,
  PostInfo,
  Rating,
  Loading,
  ErrorScreen
} from '../../styles/MainStyle.jsx';

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
        // 11 ~ 16 로직까지 아래 return까지 컴포넌트를 만들어서 props로 post를 받게
        // 11 ~ 35 줄까지 아우르는 컴포넌트를 하나 만드는게 맞음
        // 그 다음 map을 사용해서 그 안에 포스트 하나를 넣어주게 변경이 되야 함.

        // return 부턴 view를 담당하는데 간단한 조건부나 필터링은 괜찮지만
        // 이렇게 길어지는건 옳지 않은 패턴임
        return (
          <li key={post.id}>
            <Link to={`/detail/${post.id}`}></Link>
            <PostBoxTop>
              {post.userId ? (
                <Link to={`/myPage/${post.userId}`}>
                  <ProfileSmall profileImage={userInfo ? userInfo.profile_image_url : post.userImage}></ProfileSmall>
                </Link>
              ) : (
                <ProfileSmall profileImage={userInfo ? userInfo.profile_image_url : post.userImage}></ProfileSmall>
              )}

              <div>
                <Writer>{userInfo ? userInfo.name : post.userName}</Writer>
                <StyledDate>{formattedDate}</StyledDate>
              </div>
            </PostBoxTop>
            <PostBoxBtm image={post.image_url}>
              <figure></figure>
              <PostInfo>
                <strong>{post.title}</strong>
                <Rating>
                  <i>★&nbsp;</i>
                  {post.rating}
                </Rating>
                <p>{post.description}</p>
              </PostInfo>
            </PostBoxBtm>
          </li>
        );
      })}
    </PostUl>
  );
};

export default PostList;
