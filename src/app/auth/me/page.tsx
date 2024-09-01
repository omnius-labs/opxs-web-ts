'use client';

import { apiClient } from '@/features/shared/libs';
import { useAsync } from 'react-use';

type User = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

async function me(): Promise<User> {
  const res = await apiClient.get(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/auth/me');
  return res.data as User;
}

type Item = {
  key: string;
  value: any;
};

export default function Page() {
  const state = useAsync(async () => {
    const user = await me();
    const items: Item[] = [];
    for (const [key, value] of Object.entries(user)) {
      items.push({ key, value });
    }

    return items;
  }, []);

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-900">
      <div className="p-16 h-full w-full">
        <h1 className="text-white mb-6 text-3xl font-bold">Me</h1>
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
            {state.value?.map((item, index) => (
              <tr key={item.key} className="border-b bg-gray-800 border-gray-700">
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
