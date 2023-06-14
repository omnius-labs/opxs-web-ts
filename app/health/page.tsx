'use client';

export default async function page() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + '/api/v1/health');
  const data = await response.json();
  return (
    <table>
      <tr>
        <td>mode</td>
        <td>{data.mode}</td>
      </tr>
      <tr>
        <td>git_sha</td>
        <td>{data.git_sha}</td>
      </tr>
      <tr>
        <td>git_semver</td>
        <td>{data.git_semver}</td>
      </tr>
    </table>
  );
}
