'use client';

import { apiClient } from '@/shared/libs';
import { AuthToken } from '../types';

export async function registerGoogle(code: string, redirectUri: string): Promise<AuthToken> {
  const res = await apiClient.post('/api/v1/auth/google/register', {
    code: code,
    redirect_uri: redirectUri
  });
  return res.data;
}
