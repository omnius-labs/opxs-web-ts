'use client';

import { useState } from 'react';

export default function Page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
