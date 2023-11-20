'use client';

import api from '@/lib/api';

type HealthCondition = {
  git_semver: number;
  git_sha: string;
  mode: string;
};

export async function health(): Promise<HealthCondition> {
  const res = await api.get(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/health');
  return res.data as HealthCondition;
}
