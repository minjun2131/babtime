import styled from 'styled-components';
import { color } from '../configurations/Color';
import { typography } from '../configurations/Typography';

export const MainVisual = styled.section`
  width: 100%;
  height: 350px;
  background: url('/images/main_visual_img1.jpg') no-repeat 50% 75%;
  background-size: cover;
`;

export const Inner = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const IntroTitle = styled.p`
  margin-top: 100px;
  font-weight: 700;
  font-size: 36px;
  line-height: 40px;
  color: ${color.black};
  text-align: center;
`;

export const PostUl = styled.ul`
  padding: 50px 0 80px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;

  & > li {
    position: relative;
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
    padding: 20px;
  }

  & > li > a {
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

  a {
    position: relative;
    z-index: 9;
  }
`;

export const Writer = styled.p`
  font-weight: 700;
`;
export const StyledDate = styled.p`
  color: ${color.gray};
  margin-top: 10px;
`;

export const PostBoxBtm = styled.article`
  figure {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background-image: url(${(props) => (props.image ? props.image : '/images/noimg.svg')});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  figure img {
    object-fit: cover;
  }
`;

export const PostInfo = styled.div`
  padding-top: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  strong {
    ${typography.title2}
    display: block;
    max-width: calc(100% - 35px);
  }

  p {
    width: 100%;
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

export const Rating = styled.span`
  width: 35px;
  vertical-align: middle;
  i {
    ${typography.title2}
    color: #ffcc00;
  }
`;

export const Loading = styled.div`
  position: relative;
  margin: 100px auto;
  width: 150px;
  height: 150px;
  border: 4px solid #fff3eb;
  border-radius: 50%;
  border-top-color: ${color.primary};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
export const ErrorScreen = styled.div`
  padding: 50px 0;
  font-size: 20px;
  font-weight: 500;
  color: #888;
  text-align: center;
`;

export const FoodCategory = styled.ul`
  margin: 50px 0 30px;
  display: flex;
  justify-content: center;

  li {
    padding: 0 25px;
  }

  li + li {
    border-left: 1px solid #ddd;
  }
  button {
    font-size: 22px;
    border: 0;
    background: none;
    text-underline-offset: 7px;
  }
`;
