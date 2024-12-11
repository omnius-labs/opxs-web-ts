'use client';

import { apiClient } from '@/shared/libs';

export async function nonceGoogle(): Promise<string> {
  const res = await apiClient.get('/api/v1/auth/google/nonce');
  return res.data.value;
}
