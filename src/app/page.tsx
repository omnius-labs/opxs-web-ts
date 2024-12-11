'use client';

import { Header } from '@/components/layouts';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <Header />
    </main>
  );
}
