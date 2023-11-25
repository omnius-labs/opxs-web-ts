'use client';

import api from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { useAsync } from 'react-use';

export default function Page() {
  const searchParams = useSearchParams();

  const state = useAsync(async () => {
    const token = searchParams.get('token');

    const res = await api.post('/api/v1/auth/email/confirm', {
      token: token
    });

    localStorage.setItem('refreshToken', res.data.refresh_token);
    localStorage.setItem('accessToken', res.data.access_token);

    location.replace(location.origin);

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
