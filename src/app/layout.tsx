'use client';

import { AuthTokenProvider, UserProvider } from '@/features/auth/contexts';
import { Suspense } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body className="bg-slate-900">
        <AuthTokenProvider>
          <UserProvider>
            <Suspense>{children}</Suspense>
          </UserProvider>
        </AuthTokenProvider>
      </body>
    </html>
  );
}
