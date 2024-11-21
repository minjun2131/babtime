import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabase';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    fetchUser();
  }, [isLogin]);

  // 로그아웃 함수
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during logout:', error.message);
      return;
    }
    setIsLogin(false);
    setCurrentUser(null); // 사용자 상태 초기화
    toast.success('로그아웃이 완료되었습니다.');
  };

  return <UserContext.Provider value={{ currentUser, handleLogout, setIsLogin }}>{children}</UserContext.Provider>;
};

// useAuth 훅
export const useAuth = () => useContext(UserContext);
