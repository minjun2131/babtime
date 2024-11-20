import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>;
};

export const useAuth = () => useContext(UserContext);
