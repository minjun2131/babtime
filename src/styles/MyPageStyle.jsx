import styled from 'styled-components';
import { typography } from '../configurations/Typography';

/* MyPageProfile Style */
export const StyledMypageWrapper = styled.div`
    width: 1200px; /* div의 가로 길이 설정 */
    margin: 0 auto;
    z-index: 1; /* 모달창보다 뒤에 표시 */
`

export const StyledMyPageProfileWrapper = styled.div`
    margin: 100px 0 100px 0; /* 유저 프로필 영역 위 아래 마진 */
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const StyledMyPageSection = styled.div`
    height: 150px;
    width: ${(props) => props.$width || '100px'};
    padding: ${(props) => props.$padding || '0 0 0 0'};;

    display: flex;
    flex-direction: column;

    img {
    width: 150px; 
    height: 150px;
    border-radius: 50%; 
  }  
`

/* 이름, 소개, 버튼 영역 */
export const StyledMyPageDetail = styled.div`
    width: 100%;
    margin-bottom: 20px;
    font-size: ${(props) => props.$fontSize || '16px'};
    font-weight: ${(props) => props.$fontWeight || '400'};;
    display: flex;
    flex-direction: row;
    gap: 20px;
`

export const StyledLogoutButton = styled.button`
    margin-top: 110px;
    background: none;
    border: none;
    ${typography.body2}
    color: #ff6347;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s, text-decoration 0.3s;

    &:hover {
        font-weight: 700;
        text-decoration: none; /* 호버 시 밑줄 제거 */
    }
`

/* MyPageMyPostList Style */
export const StyledMyPagePostSection = styled.div`
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

/* Modal Style */
export const StyledModalWrapper = styled.div`
    width: 100vw;
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

export const StyledModalContent = styled.div`
    margin-bottom: 90px;

    background: white;
    padding: 40px;
    border-radius: 8px;
    width: 450px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
    
    position: relative;
    display: flex;
    flex-direction: column;  /* 세로 방향으로 배치 */
    align-items: center;  /* 수평 중앙 정렬 */
    text-align: center;  /* 텍스트 수평 중앙 정렬 */
    gap: 10px;

    img {
        width: 120px; 
        height: 120px; 
        margin-top: 20px;
    }
`

export const StyledModalCloseBtn = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`

export const StyledModalTitle = styled.div`
    ${typography.title1}
    text-align: center;
`

export const StyledModalSubTitle = styled.div`
    ${typography.title3}
    width: 350px;
    text-align: left;
    margin-top: 20px;
`

export const StyledModalBtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
`

/* 커스텀 버튼 */
export const StyledMyPageBtn = styled.button`
    width: ${(props) => props.$width || '100px'};
    background-color : ${(props) => props.$bgcolor || 'white'};
    border: 1px solid ${(props) => props.$border || '#333'};
    border-radius: 20px;
    ${typography.title3};
    color: ${(props) => props.$color || '#333'};
    padding: 10px;
    cursor: pointer;

    &:hover {
        color: white; /* 호버 시 색 변화 */
        background-color: #333;
        border: 1px solid #333;
    }
`

export const StyledModalInputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyledModalInput = styled.input`
    width: 350px;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #333;
    border-radius: 4px;
`
