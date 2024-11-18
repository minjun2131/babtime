import React from 'react'
import { StyledMyPageMyPostDiv, StyledMyPageTitle, StyledMyPostListDiv } from "../styles/MyPageStyle"


function MyPageMyPostList() {
  return (
    <>
        <StyledMyPageMyPostDiv>
            <StyledMyPageTitle>나의 게시글</StyledMyPageTitle>
            <StyledMyPostListDiv>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
            </StyledMyPostListDiv>
        </StyledMyPageMyPostDiv>
    </>
  )
}

export default MyPageMyPostList