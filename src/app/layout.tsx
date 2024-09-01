'use client';

import { UserProvider } from '@/features/auth/contexts';
import { ThemeModeScript } from 'flowbite-react';
import { Suspense } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <UserProvider>
          <Suspense>{children}</Suspense>
        </UserProvider>
      </body>
    </html>
  );
}
