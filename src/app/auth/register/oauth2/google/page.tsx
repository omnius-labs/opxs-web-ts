'use client';

import { registerGoogle } from '@/features/auth/api';
import { useAuthToken } from '@/features/auth/contexts';
import { useSearchParams } from 'next/navigation';
import { useAsync } from 'react-use';

export default function Page() {
  const { authToken, setAuthToken } = useAuthToken();
  const searchParams = useSearchParams();

  const state = useAsync(async () => {
    const code = searchParams.get('code') || '';
    const redirectUri = location.origin + '/auth/register/oauth2/google';

    setAuthToken(await registerGoogle(code, redirectUri));
    location.replace(location.origin);
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
