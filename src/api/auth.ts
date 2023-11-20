'use client';

import api from '@/lib/api';

type User = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export async function me(): Promise<User> {
  const res = await api.get(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/auth/me');
  return res.data as User;
}
