'use client';

import { apiClient } from '@/shared/libs';
import { StatusOutput } from '../types';

export async function status(jobId: string): Promise<StatusOutput> {
  const res = await apiClient.get(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/file-convert/image/status', {
    params: {
      job_id: jobId
    }
  });
  return res.data;
}
