'use client';

import { Meta, StoryObj } from '@storybook/react';
import UploadContainer from './UploadContainer';

const meta = {
  title: 'UploadContainer',
  component: UploadContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof UploadContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
