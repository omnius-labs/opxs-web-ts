'use client';

import { Header } from '@/components/header/Header';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header
          onLogin={function (): void {
            throw new Error('Function not implemented.');
          }}
          onLogout={function (): void {
            throw new Error('Function not implemented.');
          }}
          onCreateAccount={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
