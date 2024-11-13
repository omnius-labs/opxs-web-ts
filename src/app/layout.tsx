'use client';

import { UserProvider } from '@/features/auth/contexts';
import { Flowbite, ThemeModeScript } from 'flowbite-react';
import { Suspense } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <ThemeModeScript />
      </head>
      <body className="bg-white dark:bg-gray-800">
        <Flowbite>
          <UserProvider>
            <Suspense>{children}</Suspense>
          </UserProvider>
        </Flowbite>
      </body>
    </html>
  );
}
