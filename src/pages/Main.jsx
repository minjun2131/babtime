import Header from '../components/header/Header.jsx';
import { Inner, MainVisual, IntroTitle } from '../styles/MainStyle.jsx';
import MainPost from '../components/main/MainPost.jsx';
import { useState } from 'react';

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MainVisual></MainVisual>
      <Inner>
        <IntroTitle>다양한 맛집 리뷰를 확인해 보세요.</IntroTitle>

        <MainPost searchTerm={searchTerm} />
      </Inner>
    </>
  );
};

export default Main;
