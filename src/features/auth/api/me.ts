'use client';

import { apiClient } from '@/shared/libs';
import { User } from '../types';

export async function me(): Promise<User> {
  const res = await apiClient.get('/api/v1/auth/me');
  return await res.data;
}
