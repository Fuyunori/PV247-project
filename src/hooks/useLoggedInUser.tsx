import { User } from 'firebase/auth';
import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { onAuthChanged } from '../utils/firebase';

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider: FC = ({ children }) => {
  // Hold user info in state
  const [user, setUser] = useState<User>();

  // Setup onAuthChanged once when component is mounted
  useEffect(() => {
    onAuthChanged((u) => setUser(u ?? undefined));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Hook providing logged in user information
export const useLoggedInUser = () => useContext(UserContext);
