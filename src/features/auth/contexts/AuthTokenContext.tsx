import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthToken, AuthTokenContextType } from '../types';

const AuthTokenContext = createContext<AuthTokenContextType | undefined>(undefined);

export const AuthTokenProvider = ({ children }: { children: ReactNode }) => {
  const v = localStorage.getItem('auth_token');
  const [authToken, setAuthToken] = useState<AuthToken | null>(v === null ? null : JSON.parse(v));

  useEffect(() => {
    if (!authToken) {
      localStorage.removeItem('auth_token');
    } else {
      localStorage.setItem('auth_token', JSON.stringify(authToken));
    }
  }, [authToken]);

  return <AuthTokenContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthTokenContext.Provider>;
};

export const useAuthToken = (): AuthTokenContextType => {
  const context = useContext(AuthTokenContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
