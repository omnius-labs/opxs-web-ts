import { useEffect, useState } from 'react';
import { me } from '../api/me';
import { User } from '../types';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (localStorage.getItem('refreshToken') == null || localStorage.getItem('accessToken') == null) {
          return null;
        }
        const data = await me();
        setUser(data);
      } catch (error) {
        return null;
      }
    };
    fetchUser();
  });

  return { user, setUser };
};
