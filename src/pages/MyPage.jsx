import Header from "../components/header/Header"
import MyPageLikePostList from "../components/mypage/MyPageLikePostList"
import MyPageMyPostList from "../components/mypage/MyPageMyPostList"
import MyPageProfile from "../components/mypage/MyPageProfile"
import { StyledMypageWrapper } from "../styles/MyPageStyle"

const MyPage = () => {
  return (
    <>
      <Header />
      <StyledMypageWrapper>
        <MyPageProfile />
        <MyPageMyPostList />
        <MyPageLikePostList />
      </StyledMypageWrapper>

    </>
  )
}

export default MyPage