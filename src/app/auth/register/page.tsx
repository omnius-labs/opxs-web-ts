'use client';

import api from '@/api/api';
import { useState } from 'react';

export default function Page() {
  // Email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUpWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(process.env.NEXT_PUBLIC_API_ORIGIN);
    const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    const result = await response.text();
    console.log(`TEST: ${result}`);
  };

  // Google
  const handleSignUpWithGoogle = async () => {
    const res = await api.get('/api/v1/auth/google/nonce');
    const nonce = res.data.value;

    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID;
    const responseType = 'code';
    const scope = 'openid email profile';
    const redirectUri = window.location.origin + '/auth/register/oauth2/google';

    const url = `${baseUrl}?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&nonce=${nonce}`;
    const encodedUrl = encodeURI(url);
    window.location.replace(encodedUrl);
  };

  return (
    <main className="flex justify-center items-center h-screen w-screen bg-gray-900">
      <div className="w-96">
        <div className="flex-col flex justify-center items-center">
          <h1 className="text-white mb-6 text-4xl font-bold">Register</h1>
          <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <button onClick={handleSignUpWithGoogle}>Sign up with Google</button>
          </div>
        </div>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <div>
          <div className="flex-col flex justify-center items-center">
            <h2 className="text-white mb-6 text-2xl font-bold">EMail register</h2>
          </div>
          <form onSubmit={handleSignUpWithEmail}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
