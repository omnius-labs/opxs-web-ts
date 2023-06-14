'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

interface HealthResult {
  mode: string;
  git_sha: string;
  git_semver: string;
}

const DefaultHealthResult: HealthResult = {
  mode: '',
  git_sha: '',
  git_semver: ''
};

export default function Page() {
  const [state, setState] = useState<HealthResult>(DefaultHealthResult);

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/health').then((res) => {
      setState(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <td>mode</td>
          <td>{state.mode}</td>
        </tr>
        <tr>
          <td>git_sha</td>
          <td>{state.git_sha}</td>
        </tr>
        <tr>
          <td>git_semver</td>
          <td>{state.git_semver}</td>
        </tr>
      </tbody>
    </table>
  );
}
