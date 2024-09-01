'use client';

import { apiClient } from '@/features/shared/libs';
import { AuthToken } from '@/features/shared/types';

export async function loginEmailConfirm(token: string): Promise<AuthToken> {
  const res = await apiClient.post('/api/v1/auth/email/confirm', {
    token
  });
  return res.data;
}
