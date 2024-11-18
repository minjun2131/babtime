import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Modify from '../pages/Modify';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import Detail from '../pages/Detail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
