import React from 'react';
import { StyledMyPagePostSection, StyledMyPageTitle } from '../../styles/MyPageStyle';
import PostList from '../main/PostList.jsx';

const MyPageMyPostList = ({ paramUser, posts, loading, error }) => {
  return (
    <>
      <StyledMyPagePostSection>
        <StyledMyPageTitle>{paramUser && paramUser.name}님의 게시글</StyledMyPageTitle>
        <PostList posts={posts} loading={loading} error={error} userInfo={paramUser} />
      </StyledMyPagePostSection>
    </>
  );
};

export default MyPageMyPostList;
