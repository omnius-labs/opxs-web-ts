import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-900">
      <div className="w-96">
        <h1 className="text-white mb-6 text-3xl font-bold">Menu</h1>
        <ul className="list-disc text-white">
          <li>
            <Link href="/health">Health</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
