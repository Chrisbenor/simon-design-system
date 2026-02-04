// src/components/Badge/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Badge, { SMBadgeProps } from './Badge';

type BadgeStoryProps = SMBadgeProps & {
  storyText?: string;
};

const meta: Meta<BadgeStoryProps> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    storyText: { control: 'text' },

    hasText: { control: 'boolean' },

    dsColor: {
      control: 'radio',
      options: ['primary', 'secondary', 'correct', 'error', 'warning'],
    },

    dsPill: {
      control: 'radio',
      options: ['no', 'yes'],
    },

    sx: { control: false },
    children: { control: false },
  },

  render: ({ storyText, ...args }) => (
    <div style={{ padding: 8 }}>
      <Badge {...args} text={storyText ?? args.text} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<BadgeStoryProps>;

export const Default: Story = {
  args: {
    storyText: 'Badge',
    hasText: true,
    dsColor: 'primary',
    dsPill: 'no',
  },
};

export const Pill: Story = {
  args: {
    storyText: 'Badge',
    hasText: true,
    dsColor: 'primary',
    dsPill: 'yes',
  },
};

export const Secondary: Story = {
  args: {
    storyText: 'Badge',
    hasText: true,
    dsColor: 'secondary',
    dsPill: 'no',
  },
};

export const Correct: Story = {
  args: {
    storyText: 'Badge',
    hasText: true,
    dsColor: 'correct',
    dsPill: 'no',
  },
};

export const Error: Story = {
  args: {
    storyText: 'Badge',
    hasText: true,
    dsColor: 'error',
    dsPill: 'no',
  },
};

export const Warning: Story = {
  args: {
    storyText: 'Badge',
    hasText: true,
    dsColor: 'warning',
    dsPill: 'no',
  },
};

export const NoText: Story = {
  args: {
    storyText: 'Badge',
    hasText: false,
    dsColor: 'primary',
    dsPill: 'no',
  },
};
