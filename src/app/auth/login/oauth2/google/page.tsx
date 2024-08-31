'use client';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useAsync } from 'react-use';

import { loginGoogle } from '@/features/auth/api';
import { tokenStore } from '@/shared/libs/tokenStore';
import { ErrorCode, toErrorCode } from '@/shared/types';

export default function Page() {
  const origin = process.env.NEXT_PUBLIC_API_ORIGIN || '/';
  const searchParams = useSearchParams();

  const state = useAsync(async () => {
    const code = searchParams.get('code');
    if (!code) throw new Error('Code not found');

    const redirectUri = origin + '/auth/login/oauth2/google';

    try {
      const token = await loginGoogle(code, redirectUri);
      tokenStore.setToken(token);

      setTimeout(() => {
        location.replace(origin);
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = toErrorCode(error.response?.data?.error_code || 'Unknown');
        console.error('ErrorCode:', errorCode);

        setTimeout(() => {
          location.replace(origin);
        }, 3000);

        switch (errorCode) {
          case ErrorCode.UserNotFound:
            var errorMessage = 'User not found';
            throw new Error(errorMessage);
          default:
            var errorMessage = 'Unknown error';
            throw new Error(errorMessage);
        }
      } else {
        console.error('Error:', error);
        throw error;
      }
    }
  }, []);

  return (
    <main className="flex justify-center items-center h-screen w-screen bg-gray-900">
      <div className="block mb-2 text-sm font-medium text-white">
        {state.loading ? <p>Loading...</p> : state.error ? <p>Error: {state.error.message}</p> : <p>Success</p>}
      </div>
    </main>
  );
}
