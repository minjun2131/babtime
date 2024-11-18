import React from 'react'
import { StyledMyPagePostSection, StyledMyPageTitle, StyledMyPagePostList } from "../styles/MyPageStyle"


function MyPageMyPostList() {
  return (
    <>
        <StyledMyPagePostSection>
            <StyledMyPageTitle>나의 게시글</StyledMyPageTitle>
            <StyledMyPagePostList>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
                <div style={{width: '358px', height: '380px', border:'black 1px solid'}}></div>
            </StyledMyPagePostList>
        </StyledMyPagePostSection>
    </>
  )
}

export default MyPageMyPostList