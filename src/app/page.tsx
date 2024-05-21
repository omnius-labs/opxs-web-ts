'use client';

import FeatureCard from '@/components/top/FeatureCard';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-4xl text-center text-green-600">Opxsへようこそ！</h1>
      <p className="text-xl text-center text-gray-600 m-8">
        Opxsは、あなたのコンテンツ変換ニーズを解決するためのツールです。画像、テキスト、音声など、さまざまな形式のコンテンツを簡単に変換できます。
      </p>
      <FeatureCard
        title="画像コンバーター"
        description="画像を別の形式に変換します"
        imageUrl="/path/to/image.jpg"
        href="/image-converter"
      />
    </main>
  );
}
