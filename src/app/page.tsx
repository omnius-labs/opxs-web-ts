'use client';

import { logout, me } from '@/features/auth/api';
import { useAuthToken, useUser } from '@/features/auth/contexts';
import { Header } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const { user, setUser } = useUser();
  const { authToken, setAuthToken } = useAuthToken();

  useEffect(() => {
    const fetchUser = async () => {
      if (authToken && !user) {
        const v = await me();
        setUser(v);
      }
    };
    fetchUser();
  }, [authToken]);

  const headerProps = {
    register: () => {
      router.push('/auth/register');
    },
    login: () => {
      router.push('/auth/login');
    },
    logout: async () => {
      try {
        await logout();
      } catch (e) {
        console.error(e);
      }
      setUser(null);
      setAuthToken(null);
      router.push('/');
    }
  };

  return (
    <main>
      <Header {...headerProps} />
    </main>
  );
}
