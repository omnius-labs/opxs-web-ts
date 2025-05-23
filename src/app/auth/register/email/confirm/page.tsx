'use client';

import { Api } from '@/features/auth/api';
import { tokenStore } from '@/features/auth/libs/tokenStore';
import { useSearchParams } from 'next/navigation';
import { useAsync } from 'react-use';

export default function Page() {
  const searchParams = useSearchParams();

  const state = useAsync(async () => {
    const token = searchParams.get('token') || '';

    tokenStore.setToken(await Api.loginEmailConfirm(token));
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
