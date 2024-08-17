'use client';

import { loginEmail } from '@/features/auth/api/loginEmail';
import apiClient from '@/libs/apiClient';
import { useState } from 'react';

export default function Page() {
  // Email
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginEmail(email, password);
  };

  // Google
  const handleLogInWithGoogle = async () => {
    const res = await apiClient.get('/api/v1/auth/google/nonce');
    const nonce = res.data.value;

    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID;
    const responseType = 'code';
    const scope = 'openid email profile';
    const redirectUri = location.origin + '/auth/login/oauth2/google';

    const url = `${baseUrl}?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&nonce=${nonce}`;
    const encodedUrl = encodeURI(url);
    location.replace(encodedUrl);
  };

  return (
    <main>
      <div className="flex justify-center items-center h-screen w-screen bg-gray-900">
        <div className="w-96">
          <div className="flex-col flex justify-center items-center">
            <h1 className="text-white mb-6 text-4xl font-bold">Log in</h1>
            <div className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5">
              <button className="w-full" onClick={handleLogInWithGoogle}>
                Log in with Google
              </button>
            </div>
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
                  className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                  className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5">
                <button className="w-full" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
