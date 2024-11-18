import Header from "../components/Header"
import MyPageLikePostList from "../components/MyPageLikePostList"
import MyPageMyPostList from "../components/MyPageMyPostList"
import MyPageProfile from "../components/MyPageProfile"
import { StyledMypageDiv } from "../styles/MyPageStyle"

const MyPage = () => {
  return (
    <>
      <Header />
      <StyledMypageDiv>
        <MyPageProfile />
        <MyPageMyPostList />
        <MyPageLikePostList />
      </StyledMypageDiv>

    </>
  )
}

export default MyPage