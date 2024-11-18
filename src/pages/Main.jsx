import styled from 'styled-components';
import Header from '../components/Header';

const MainVisual = styled.section`
  width: 100%;
  height: 500px;
  background: #ffb879;
`;

// 월요일에 글로벌 스타일로 이동
const Inner = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const IntroTitle = styled.p`
  margin-top: 100px;
  font-weight: 900;
  font-size: 36px;
  line-height: 40px;
  color: #000000;
`;

const FeedList = styled.ul`
  padding: 50px 0 200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;

  & > li {
    border: 1px solid #ffb879;
    box-shadow: 0px 0px 20px #ffb879;
    border-radius: 10px;
    background: #fff;
  }

  & > li > div {
    padding: 20px;
  }

  & > li > div + div {
    border-top: 1px solid #ffb879;
  }

  figure {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  figure img {
    object-fit: cover;
  }

  figure + p {
    line-height: 1.4;
    margin-top: 15px;
    clear: both;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Main = () => {
  return (
    <>
      <Header /*월요일에 상위 컴포넌트로 이동*/ />

      <MainVisual></MainVisual>
      <Inner>
        <IntroTitle>다양한 맛집 리뷰를 확인해 보세요.</IntroTitle>
        <FeedList>
          <li>
            <div></div>
            <div>
              <figure>
                <img src="../../images/thumbnail_sample.png" alt="" />
              </figure>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy
                text of the printing and typesetting industry.
              </p>
            </div>
          </li>
        </FeedList>
      </Inner>
    </>
  );
};

export default Main;
