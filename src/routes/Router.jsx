import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';
import PostEdit from '../pages/PostEdit';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import Detail from '../pages/Detail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/postedit" element={<PostEdit />} />
        <Route path="/postedit/:id" element={<PostEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
