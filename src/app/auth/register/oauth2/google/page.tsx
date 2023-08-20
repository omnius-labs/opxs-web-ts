'use client';

import api from '@/api/api';
import { useSearchParams } from 'next/navigation';
import { useAsync } from 'react-use';

export default function Page() {
  const searchParams = useSearchParams();

  const state = useAsync(async () => {
    const code = searchParams.get('code');
    const redirectUri = window.location.origin + '/auth/register/oauth2/google';

    const res = await api.post('/api/v1/auth/google/register', {
      code: code,
      redirect_uri: redirectUri
    });

    window.localStorage.setItem('refreshToken', res.data.refresh_token);
    window.localStorage.setItem('accessToken', res.data.access_token);

    window.location.replace(window.location.origin);

    return res;
  }, []);

  return (
    <main className="flex justify-center items-center h-screen w-screen bg-gray-900">
      <div className="mb-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {state.loading ? (
          <div>Loading...</div>
        ) : state.error ? (
          <div>Error: {state.error.message}</div>
        ) : (
          <div>Success</div>
        )}
      </div>
    </main>
  );
}
