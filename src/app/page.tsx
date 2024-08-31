'use client';

import { logout, me } from '@/features/auth/api';
import { useUser } from '@/features/auth/contexts';
import { Header } from '@/shared/components';
import { tokenStore } from '@/shared/libs/tokenStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      if (user) return;
      try {
        setUser(await me());
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, []);

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
      tokenStore.removeToken();
      router.push('/');
    }
  };

  return (
    <main>
      <Header {...headerProps} />
    </main>
  );
}
