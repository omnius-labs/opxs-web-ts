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
    api.get('/api/v1/health').then((res) => {
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
        <h1 className="text-white mb-6 text-3xl font-bold">Health</h1>
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700">
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
              <tr key={item.key} className="bg-white border-b bg-gray-800 border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
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
