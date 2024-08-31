'use client';

import axios from 'axios';
import { Button, Toast } from 'flowbite-react';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';

import { loginEmail, nonceGoogle } from '@/features/auth/api';
import { tokenStore } from '@/shared/libs/tokenStore';

export default function Page() {
  const origin = process.env.NEXT_PUBLIC_API_ORIGIN || '/';

  // Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Email
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      tokenStore.setToken(await loginEmail(email, password));
      location.replace(origin);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error_code || 'An error occurred';
        console.error('Error:', errorMessage);
        setToastMessage(errorMessage); // Assuming you have a state to set the toast message
      } else {
        console.error('Error:', error);
        setToastMessage('An unexpected error occurred');
      }
      setShowToast(true);
    }
  };

  // Google
  const handleLogInWithGoogle = async () => {
    const nonce = await nonceGoogle();

    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID || '';
    const responseType = 'code';
    const scope = 'openid email profile';
    const redirectUri = origin + '/auth/login/oauth2/google';

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', responseType);
    params.append('scope', scope);
    params.append('redirect_uri', redirectUri);
    params.append('nonce', nonce);
    const url = `${baseUrl}?${params.toString()}`;
    location.replace(url);
  };

  return (
    <main>
      {showToast && (
        <div className="fixed bottom-0 left-0 m-4">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{toastMessage}</div>
            <Toast.Toggle onDismiss={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
      <div className="flex justify-center items-center h-screen w-screen bg-gray-900">
        <div className="w-96">
          <div className="flex-col flex justify-center items-center">
            <h1 className="text-white mb-6 text-4xl font-bold">Log in</h1>
            <Button className="w-full" size="lg" onClick={handleLogInWithGoogle}>
              Log in with Google
            </Button>
          </div>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div>
            <div className="flex-col flex justify-center items-center">
              <h2 className="text-white mb-6 text-2xl font-bold">EMail Log in</h2>
            </div>
            <form onSubmit={handleLogInWithEmail}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white"
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  minLength={8}
                  className="text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full" size="lg" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
