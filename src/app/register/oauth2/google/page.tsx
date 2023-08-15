'use client';

import api from '@/api/api';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { useAsync } from 'react-use';

export default function Page() {
  const searchParams = useSearchParams();

  const state = useAsync(async () => {
    const code = searchParams.get('code');
    const redirectUri = window.location.origin + '/register/oauth2/google';

    const res = await api.post('/api/v1/auth/google/register', {
      code: code,
      redirect_uri: redirectUri
    });

    Cookies.set('refreshToken', res.data, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict'
    });
    return res;
  }, []);

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-900">
      {state.loading ? (
        <div>Loading...</div>
      ) : state.error ? (
        <div>Error: {state.error.message}</div>
      ) : (
        <div>Success</div>
      )}
    </main>
  );
}
