'use client';

import { apiClient } from '@/shared/libs';
import { AuthToken } from '../types';

export async function loginEmailConfirm(token: string): Promise<AuthToken> {
  const res = await apiClient.post('/api/v1/auth/email/confirm', {
    token
  });
  return res.data;
}
