// src/components/StatusBadge/StatusBadge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import StatusBadge, { StatusBadgeProps } from './StatusBadge';

type StatusBadgeStoryProps = StatusBadgeProps & {
  // Story-only (para controlar el texto sin romper el shape del componente)
  storyText?: string;
};

const meta: Meta<StatusBadgeStoryProps> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  argTypes: {
    // Story-only
    storyText: { control: 'text' },

    // Prompts del componente
    hasText: { control: 'boolean' },
    hasLeftIcon: { control: 'boolean' },
    hasRightIcon: { control: 'boolean' },

    dsColor: {
      control: 'radio',
      options: ['primary', 'secondary', 'correct', 'error', 'warning'],
    },

    dsPill: {
      control: 'radio',
      options: ['no', 'yes'],
    },

    // Por ahora no hay íconos
    leftIcon: { control: false },
    rightIcon: { control: false },

    // Evitar ruido
    sx: { control: false },
    children: { control: false },
  },

  render: ({ storyText, ...args }) => (
    <div style={{ padding: 8 }}>
      <StatusBadge
        {...args}
        text={storyText ?? args.text}
      />
    </div>
  ),
};

export default meta;

type Story = StoryObj<StatusBadgeStoryProps>;

export const Default: Story = {
  args: {
    storyText: 'Badges',
    hasText: true,
    hasLeftIcon: true,
    hasRightIcon: true,
    dsColor: 'primary',
    dsPill: 'no',
  },
};

export const Pill: Story = {
  args: {
    storyText: 'Badges',
    hasText: true,
    hasLeftIcon: true,
    hasRightIcon: true,
    dsColor: 'primary',
    dsPill: 'yes',
  },
};

export const Secondary: Story = {
  args: {
    storyText: 'Badges',
    hasText: true,
    hasLeftIcon: true,
    hasRightIcon: true,
    dsColor: 'secondary',
    dsPill: 'no',
  },
};

export const Correct: Story = {
  args: {
    storyText: 'Badges',
    hasText: true,
    hasLeftIcon: true,
    hasRightIcon: true,
    dsColor: 'correct',
    dsPill: 'no',
  },
};

export const Error: Story = {
  args: {
    storyText: 'Badges',
    hasText: true,
    hasLeftIcon: true,
    hasRightIcon: true,
    dsColor: 'error',
    dsPill: 'no',
  },
};

export const Warning: Story = {
  args: {
    storyText: 'Badges',
    hasText: true,
    hasLeftIcon: true,
    hasRightIcon: true,
    dsColor: 'warning',
    dsPill: 'no',
  },
};

export const NoText: Story = {
  args: {
    storyText: 'Badges',
    hasText: false,
    hasLeftIcon: false,
    hasRightIcon: false,
    dsColor: 'primary',
    dsPill: 'no',
  },
};
