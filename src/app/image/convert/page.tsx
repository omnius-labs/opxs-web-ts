'use client';

import api from '@/lib/api';
import { useState } from 'react';

export default function Page() {
  // Email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUpWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await api.post(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/auth/email/register', {
      name: name,
      email: email,
      password: password
    });
  };

  // Google
  const handleSignUpWithGoogle = async () => {
    const res = await api.get('/api/v1/auth/google/nonce');
    const nonce = res.data.value;

    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID;
    const responseType = 'code';
    const scope = 'openid email profile';
    const redirectUri = location.origin + '/auth/register/oauth2/google';

    const url = `${baseUrl}?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&nonce=${nonce}`;
    const encodedUrl = encodeURI(url);
    location.replace(encodedUrl);
  };

  return (
    <main className="flex justify-center items-center h-screen w-screen bg-gray-900">
      <div className="w-96">
        <div className="flex-col flex justify-center items-center">
          <h1 className="text-white mb-6 text-4xl font-bold">Image Convert</h1>
          <h2 className="text-white mb-6 text-2xl font-bold">工事中</h2>
        </div>
      </div>
    </main>
  );
}
