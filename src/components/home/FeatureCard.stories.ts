'use client';

import { Meta, StoryObj } from '@storybook/react';
import FeatureCard from './FeatureCard';

const meta = {
  title: 'FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '画像コンバーター',
    description: '画像を別の形式に変換します',
    imageUrl: '/path/to/image.jpg',
    href: '/image-converter'
  }
};
