import styled from 'styled-components';
import { color } from '../configurations/Color';

export const MainVisual = styled.section`
  width: 100%;
  height: 500px;
  background: url('../../public/images/main_visual_img1.jpg') no-repeat 50% 75%;
  background-size: cover;
`;

export const Inner = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const IntroTitle = styled.p`
  margin-top: 100px;
  font-weight: 900;
  font-size: 36px;
  line-height: 40px;
  color: ${color.black};
`;

export const PostUl = styled.ul`
  padding: 50px 0 200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;

  & > li {
    border: 1px solid ${color.primary};
    box-shadow: 0px 0px 20px ${color.primary};
    border-radius: 10px;
    background: #fff;
    transition: 0.3s;
  }

  & > li:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 30px ${color.primary};
  }

  & > li > article {
    position: relative;
    padding: 20px;
  }

  & > li > article > a {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const PostBoxTop = styled.article`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid ${color.primary};
`;

export const Writer = styled.p`
  font-weight: 700;
`;
export const Date = styled.p`
  color: ${color.gray};
  margin-top: 10px;
`;

export const PostBoxBtm = styled.article`
  figure {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background-image: url(${(props) => (props.imageUrl ? props.imageUrl : '../public/images/noimg.svg')});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
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
