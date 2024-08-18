'use client';

import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <main className="flex justify-center items-center h-screen w-screen bg-gray-900">
      <div className="text-center text-white">
        <p>{email}に確認URLをお送りしました。</p>
        <p>記載してあるURLをクリックしてください。</p>
      </div>
    </main>
  );
}
