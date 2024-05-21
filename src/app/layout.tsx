'use client';

import { Suspense } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body className="bg-white">
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
