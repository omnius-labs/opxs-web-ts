'use client';

import { Header } from '@/components/layouts';
import { ConvertPanel } from '@/features/services/file-converter/components';

export default function Page() {
  return (
    <main>
      <Header />
      <div className="flex flex-col justify-center space-y-4 m-8">
        <h1 className="text-4xl text-center m-8">File Converter</h1>
        <ConvertPanel />
      </div>
    </main>
  );
}
