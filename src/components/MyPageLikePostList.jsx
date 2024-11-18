import React from 'react'
import { StyledMyPagePostSection, StyledMyPageTitle, StyledMyPagePostList } from "../styles/MyPageStyle"

function MyPageLikePostList() {
    return (
        <>
            <StyledMyPagePostSection>
                <StyledMyPageTitle>좋아하는 게시글</StyledMyPageTitle>
                <StyledMyPagePostList>
                    <div style={{ width: '358px', height: '380px', border: 'black 1px solid' }}></div>
                    <div style={{ width: '358px', height: '380px', border: 'black 1px solid' }}></div>
                    <div style={{ width: '358px', height: '380px', border: 'black 1px solid' }}></div>
                    <div style={{ width: '358px', height: '380px', border: 'black 1px solid' }}></div>
                    <div style={{ width: '358px', height: '380px', border: 'black 1px solid' }}></div>
                    <div style={{ width: '358px', height: '380px', border: 'black 1px solid' }}></div>
                </StyledMyPagePostList>
            </StyledMyPagePostSection>
        </>
    )
}

export default MyPageLikePostList