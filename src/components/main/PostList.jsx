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

export const PostList = ({ posts, loading, error, userInfo, page = '' }) => {
  if (loading) return <Loading></Loading>;
  if (error) return <ErrorScreen>데이터를 불러오는 데 문제가 발생했습니다.</ErrorScreen>;
  if (!posts || posts.length === 0 )  { return page === 'like' ? <ErrorScreen>아직 좋아요 누른 게시글이 없습니다. 마음에 드는 글을 찾아보세요.</ErrorScreen> : <ErrorScreen>등록된 게시글이 없습니다. 새로운 글을 작성해보세요.</ErrorScreen> }

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
