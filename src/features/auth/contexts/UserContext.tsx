'use client';

import { tokenStore } from '@/features/auth/libs/tokenStore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { me } from '../api';
import { User, UserContextType } from '../types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const initUser = async () => {
    const authToken = tokenStore.getToken();
    if (!authToken) {
      setUser(null);
      return;
    }

    const currentDate: Date = new Date();
    if (authToken.refresh_token_expires_at > currentDate) {
      tokenStore.removeToken();
      setUser(null);
      return;
    }

    var storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (!storedUser) {
      try {
        storedUser = await me();
      } catch (error) {
        console.error('Error:', error);
        tokenStore.removeToken();
        setUser(null);
        return;
      }
    }

    setUser(storedUser);
  };

  useEffect(() => {
    if (!user) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return <UserContext.Provider value={{ user, setUser, initUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
