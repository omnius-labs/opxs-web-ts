'use client';

import api from '@/api/api';
import { useEffect, useState } from 'react';

type Item = {
  key: string;
  value: any;
};

export default function Page() {
  const [state, setState] = useState<Item[]>([]);

  useEffect(() => {
    api.get(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/auth/me').then((res) => {
      const items: Item[] = [];
      for (const [key, value] of Object.entries(res.data)) {
        items.push({ key, value });
      }
      setState(items);
    });
  }, []);

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-900">
      <div className="p-16 h-full w-full">
        <h1 className="text-white mb-6 text-3xl font-bold">Me</h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Key
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {state.map((item, index) => (
              <tr key={item.key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.key}
                </th>
                <td className="px-6 py-4">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
