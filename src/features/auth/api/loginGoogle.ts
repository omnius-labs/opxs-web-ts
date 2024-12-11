'use client';

import { apiClient } from '@/shared/libs';
import { AuthToken } from '@/shared/types/AuthToken';

export async function loginGoogle(code: string, redirectUri: string): Promise<AuthToken> {
  const res = await apiClient.post('/api/v1/auth/google/login', {
    code: code,
    redirect_uri: redirectUri
  });
  return res.data;
}
