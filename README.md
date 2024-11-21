# 🕊 React 7기 뉴스피드 프로젝트
![스크린샷 2024-11-21 110616](https://github.com/user-attachments/assets/6963e87d-8aa9-47a2-b964-0761ceccfdfb)
![스크린샷 2024-11-21 110632](https://github.com/user-attachments/assets/fa3b8043-934b-487e-ac67-fbfbdd813650)
![스크린샷 2024-11-21 110643](https://github.com/user-attachments/assets/383714ef-5ad4-43d2-821d-1749def9d4ec)
![스크린샷 2024-11-21 110704](https://github.com/user-attachments/assets/2075f3b1-2a31-4681-a1e7-6acda36bbd8d)
# 🔭[배포용 링크](https://babtime.vercel.app/)

<br>

## 💻기술 스택
<div style="display:flex; justify-contents: center;">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  <img src="https://img.shields.io/badge/git-orange?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/supabase-232F3E?style=for-the-badge&logo=supabase&logoColor=white">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">

</div>
<br>

## 🥇팀원 소개

| 팀장 김호준  | 팀원 안현희  | 팀원 박은영  | 팀원 박가나 | 팀원 양성훈 |
| :-------------: | :-------------: | :-------------: | :-------------: | :-------------: |
| INTJ  | ENFJ  | INFJ  | ISTJ  | INTP  |
| 🤖 | ✝️ | 🌸 | 🍫 | 🧩 |
| [<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/minjun2131) [<img src="https://img.shields.io/badge/velog-20C997?style=for-the-badge&logo=velog&logoColor=white">](https://velog.io/@minjun23221/posts) | [<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/ahh0619) [<img src="https://img.shields.io/badge/velog-20C997?style=for-the-badge&logo=velog&logoColor=white">](https://velog.io/@hhyun19/posts) | [<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/euncloud) [<img src="https://img.shields.io/badge/tistory-000000?style=for-the-badge&logo=tistory&logoColor=white">](https://poohello.tistory.com/) | [<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/ParkGana?tab=repositories) [<img src="https://img.shields.io/badge/tistory-000000?style=for-the-badge&logo=tistory&logoColor=white">](https://dev-gana.tistory.com/) | [<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/yangsunghun) [<img src="https://img.shields.io/badge/tistory-000000?style=for-the-badge&logo=tistory&logoColor=white">](https://notion7815.tistory.com) |

<br>

## 📆 개발 기간
**2024년 11월 15일 ~ 2024년 11월 21일**

## 🛠️ 구현 기능

### ✅ 필수 기능
1. **Supabase를 활용한 CRUD**
   - Supabase API를 이용해 CRUD 데이터베이스 핸들링 구현
   - `useEffect`를 통해 외부 데이터를 컴포넌트 라이프사이클 내에서 관리
   - 데이터 동기화 방법 2가지 중 하나 선택:
     - CUD(등록, 수정, 삭제) 시마다 R(조회) 후 최신 데이터 `setState`
     - CUD(등록, 수정, 삭제) 시 해당 항목만 `setState`로 직접 동기화

2. **Supabase를 활용한 로그인 및 회원 가입**
   - Authentication API로 이메일/패스워드 기반 로그인 및 회원 가입 구현
   - `onAuthStateChanged`를 이용해 인증된 유저 상태 변경 추적

3. **Context API를 활용한 전역 상태 관리**
   - `createContext()`, `ContextProvider`, `useContext`를 사용하여 전역 상태 관리

4. **RRD(React Router DOM)**
   - 페이지 라우팅 구현
   - 로그인 유저 전용 페이지와 비로그인 유저 페이지 구분

5. **마이 페이지**
   - 내 게시물 보기: uid를 이용하여 개인 게시물만 조회
   - 프로필 수정 기능: Storage API를 이용해 이미지 업로드 및 다운로드 핸들링

6. **배포하기**
   - Vercel을 통해 프로젝트 배포
   - Main 브랜치를 기준으로 배포

7. **Git 활용**
   - Pull Request, Branch, Code Review를 적극 활용

---

### 🏆 도전 기능
- [ ] 댓글 기능
- [ ] 좋아요 및 북마크 기능
- [ ] 로그인/회원가입 예외 처리
