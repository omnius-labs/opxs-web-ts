'use client';

import { apiClient } from '@/shared/libs';

export async function registerEmail(name: string, email: string, password: string): Promise<void> {
  await apiClient.post(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/auth/email/register', {
    name: name,
    email: email,
    password: password
  });
}
