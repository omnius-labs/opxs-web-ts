'use client';

import apiClient from '@/libs/apiClient';

export async function logout(): Promise<void> {
  try {
    await apiClient.delete(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/auth/token/refresh');
  } catch (error) {
    console.error('Error:', error);
  }
}
