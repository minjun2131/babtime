import React from 'react';
import { StyledMyPagePostSection, StyledMyPageTitle } from '../../styles/MyPageStyle';
import PostList from '../main/PostList.jsx';

function MyPageLikePostList({ posts, loading, error }) {
  const page = 'like';

  return (
    <>
      <StyledMyPagePostSection>
        <StyledMyPageTitle>좋아요 누른 게시글</StyledMyPageTitle>
        <PostList posts={posts} loading={loading} error={error} page={page}/>
      </StyledMyPagePostSection>
    </>
  );
}

export default MyPageLikePostList;
