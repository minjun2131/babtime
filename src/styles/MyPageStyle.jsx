import styled from 'styled-components';
import { typography } from '../configurations/Typography';

/* MyPageProfile Style */
export const StyledMypageWrapper = styled.div`
    width: 1200px; /* div의 가로 길이 설정 */
    position: absolute; /* absolute 위치 지정 */
    left: 50%; /* 왼쪽 끝을 화면의 50%로 설정 */
    top: 90px;
    transform: translate(-50%); /* 자신 크기의 절반만큼 이동시켜 정확한 중앙 정렬 */
    
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const StyledMyPageProfileWrapper = styled.div`
    border: 1px solid green;
    margin: 100px 0 100px 0; /* 유저 프로필 영역 위 아래 마진 */
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const StyledMyPageSection = styled.div`
    height: 150px;
    width: ${(props) => props.width || '100px'};
    padding: ${(props) => props.padding || '0 0 0 0'};;

    display: flex;
    flex-direction: column;

    img {
    width: 150px; 
    height: 150px; 
  }
`
    /* 이름, 소개, 버튼 영역 */
export const StyledMyPageDetail = styled.div`
    width: 100%;
    margin-bottom: 20px;
    font-size: ${(props) => props.fontSize || '16px'};

    display: flex;
    flex-direction: row;
    gap: 20px;
`

export const StyledLogoutButton = styled.button`
    margin-top: 110px;
    background: none;
    border: none;
    ${typography.body2}
    color: #333;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.3s, text-decoration 0.3s;

    &:hover {
        color: #ff6347; /* 호버 시 색 변화 */
        text-decoration: none; /* 호버 시 밑줄 제거 */
    }
`

/* MyPageMyPostList Style */
export const StyledMyPagePostSection = styled.div`
    border: 1px solid green;
    
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
`

export const StyledMyPageTitle = styled.div`
    width: 100%;
    ${typography.title2}
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 2px solid #D9D9D9; 
    margin-bottom: 20px; 
`

export const StyledMyPagePostList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 60px;
    flex-wrap: wrap; 
`

/* MyPageLikePostList Style  */
