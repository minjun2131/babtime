import Header from '../components/header/Header.jsx';
import { Inner, MainVisual, IntroTitle } from '../styles/MainStyle.jsx';
import PostList from '../components/main/PostList.jsx';

const Main = () => {
  return (
    <>
      <Header />
      <MainVisual></MainVisual>
      <Inner>
        <IntroTitle>다양한 맛집 리뷰를 확인해 보세요.</IntroTitle>

        <PostList />
      </Inner>
    </>
  );
};

export default Main;
