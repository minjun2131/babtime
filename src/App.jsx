import Router from './routes/Router';
import GlobalStyle from './styles/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ToastContainer />
    </>
  );
};

export default App;
