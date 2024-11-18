import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Main from '../pages/Main';
import Login from '../pages/Login';
import PostEdit from '../pages/PostEdit';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import Detail from '../pages/Detail';
import PostRegist from '../pages/PostRegist';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/postregist" element={<PostRegist />} />
        <Route path="/postedit" element={<PostEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
