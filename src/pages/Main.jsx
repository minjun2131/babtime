import styled from 'styled-components';
import Header from '../components/header/Header.jsx';
import ProfileSmall from '../components/header/ProfileSmall.jsx';
import { Link } from 'react-router-dom';
import { MainVisual, IntroTitle, FeedUl, FeedLiTop, Writer, Date, FeedLiBtm } from '../styles/MainStyle.jsx';

// 월요일에 글로벌 스타일로 이동
const Inner = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Main = () => {
  return (
    <>
      <Header />
      <MainVisual></MainVisual>
      <Inner>
        <IntroTitle>다양한 맛집 리뷰를 확인해 보세요.</IntroTitle>
        <FeedUl>
          <FeedLi />
        </FeedUl>
      </Inner>
    </>
  );
};

export const FeedLi = () => {
  return (
    <li>
      <FeedLiTop>
        <Link to={`/MyPage.jsx`}></Link>
        <ProfileSmall></ProfileSmall>
        <div>
          <Writer>밥타임</Writer>
          <Date>2024-11-16</Date>
        </div>
      </FeedLiTop>
      <FeedLiBtm>
        <Link to={`/Detail.jsx`}></Link>
        <figure>
          <img src="../../images/thumbnail_sample.png" alt="" />
        </figure>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry.
        </p>
      </FeedLiBtm>
    </li>
  );
};

export default Main;
