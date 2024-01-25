import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen w-screen bg-gray-900">
      <div className="w-96">
        <div className="flex-col flex justify-center items-center">
          <h1 className="text-white mb-6 text-4xl font-bold">Index</h1>
        </div>

        <ul className="list-disc text-white">
          <li>
            <Link href="/health">health</Link>
          </li>
          <li>
            auth
            <ul className=" list-inside list-disc text-white">
              <li>
                <Link href="/auth/me">me</Link>
              </li>
              <li>
                <Link href="/auth/register">register</Link>
              </li>
              <li>
                <Link href="/auth/login">login</Link>
              </li>
            </ul>
          </li>
          <li>
            image
            <ul className=" list-inside list-disc text-white">
              <li>
                <Link href="/image/convert">convert</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </main>
  );
}
