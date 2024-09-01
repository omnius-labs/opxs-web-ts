'use client';

import { apiClient } from '@/features/shared/libs';
import { AuthToken } from '@/features/shared/types';

export async function loginGoogle(code: string, redirectUri: string): Promise<AuthToken> {
  const res = await apiClient.post('/api/v1/auth/google/login', {
    code: code,
    redirect_uri: redirectUri
  });
  return res.data;
}
