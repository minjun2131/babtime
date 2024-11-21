import styled from 'styled-components';
import Router from './routes/Router';
import GlobalStyle from './styles/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './api/contexts/UserContext';

const Toast = styled(ToastContainer)`
  .Toastify__toast {
    width: 100%;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    color: #000000;
    text-align: center;
    padding: 10px 20px;
  }
  .Toastify__toast--info {
    border: 2px solid #2c8ad2;
  }
  .Toastify__toast--success {
    border: 2px solid #0ab00d;
  }
  .Toastify__toast--error {
    border: 2px solid #e33f32;
  }
`;

const App = () => {
  return (
    <UserProvider>
      <GlobalStyle />
      <Router />
      <Toast position="top-center" autoClose={2000} closeButton={false} hideProgressBar />
    </UserProvider>
  );
};

export default App;
