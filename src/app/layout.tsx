'use client';

import { Suspense } from 'react';
import './globals.css';

import { Header } from '@/components/header/Header';
import { ThemeModeScript } from 'flowbite-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript mode="dark" />
      </head>
      <body className="bg-slate-900">
        <Header
          onSignIn={function (): void {
            throw new Error('Function not implemented.');
          }}
          onSignOut={function (): void {
            throw new Error('Function not implemented.');
          }}
          onSignUp={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
