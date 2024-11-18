import Header from "../components/header/Header"
import MyPageLikePostList from "../components/MyPageLikePostList"
import MyPageMyPostList from "../components/MyPageMyPostList"
import MyPageProfile from "../components/MyPageProfile"
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