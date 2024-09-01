'use client';

import { apiClient } from '@/features/shared/libs';
import { AuthToken } from '../types';

export async function loginEmail(email: string, password: string): Promise<AuthToken> {
  const res = await apiClient.post(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/auth/email/login', {
    email: email,
    password: password
  });
  return res.data;
}
