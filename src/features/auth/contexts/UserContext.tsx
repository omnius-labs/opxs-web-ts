import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User, UserContextType } from '../types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const v = localStorage.getItem('user');
  const [user, setUser] = useState<User | null>(v === null ? null : JSON.parse(v));

  useEffect(() => {
    if (!user) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
