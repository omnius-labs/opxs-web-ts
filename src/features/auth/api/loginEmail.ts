'use client';

import apiClient from '@/libs/apiClient';

export async function loginEmail(email: string, password: string): Promise<void> {
  try {
    await apiClient.post(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/auth/email/login', {
      email: email,
      password: password
    });
  } catch (error) {
    console.error('Error:', error);
  }
}
