'use client';

import { Flowbite, ThemeModeScript } from 'flowbite-react';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { UserProvider } from '@/features/auth/contexts';

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
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            closeOnClick
            draggable
            pauseOnHover
            theme="colored"
          />
        </Flowbite>
      </body>
    </html>
  );
}
