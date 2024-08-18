'use client';

import { apiClient } from '@/shared/libs';

export async function logout(): Promise<void> {
  await apiClient.delete(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/auth/token/refresh');
}
