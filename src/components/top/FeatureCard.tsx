// components/FeatureCard.tsx
import Link from 'next/link';
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl, href }) => {
  return (
    <Link href={href}>
      <div className="p-6 rounded-lg text-center transform transition-transform duration-300 hover:bg-gray-50">
        {/* <img className="w-full h-auto" src={imageUrl} alt={title} /> */}
        <h2 className="text-green-500 mt-4 mb-2 text-3xl">{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;
