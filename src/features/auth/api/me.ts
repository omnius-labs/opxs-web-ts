'use client';

import apiClient from '@/libs/apiClient';
import { User } from '../types';

export async function me(): Promise<User | null> {
  try {
    const response = await apiClient.get('/api/v1/auth/me');
    return await response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
