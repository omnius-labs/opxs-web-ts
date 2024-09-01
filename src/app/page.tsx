'use client';

import { Header } from '@/features/shared/components';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <Header />
    </main>
  );
}
