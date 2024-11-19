import React, { useEffect, useState } from 'react';
import { StyledMyPagePostSection, StyledMyPageTitle } from '../../styles/MyPageStyle';
import PostList from '../main/PostList.jsx';

function MyPageMyPostList() {
  return (
    <>
      <StyledMyPagePostSection>
        <StyledMyPageTitle>나의 게시글</StyledMyPageTitle>
        {/* <PostList /> */}
      </StyledMyPagePostSection>
    </>
  );
}

export default MyPageMyPostList;
