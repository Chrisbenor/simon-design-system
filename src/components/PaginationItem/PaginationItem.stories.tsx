// src/components/PaginationItem/PaginationItem.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import PaginationItem, { SMPaginationItemProps } from './PaginationItem';

type PaginationItemStoryProps = SMPaginationItemProps & {
  // Story-only: easier control for number/text inside
  storyText?: string;
};

const meta: Meta<PaginationItemStoryProps> = {
  title: 'Components/PaginationItem',
  component: PaginationItem,
  argTypes: {
    storyText: { control: 'text' },

    state: {
      control: 'radio',
      options: ['normal', 'selected', 'disabled'],
    },

    showText: { control: 'boolean' },

    forceHover: { control: 'boolean' },
    forcePressed: { control: 'boolean' },

    onClick: { action: 'clicked' },

    paginationText: { table: { disable: true } },
    sx: { control: false },
    children: { control: false },
  },

  render: ({ storyText, ...args }) => (
    <div style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
      <PaginationItem
        {...args}
        paginationText={storyText ?? args.paginationText}
      />
    </div>
  ),
};

export default meta;

type Story = StoryObj<PaginationItemStoryProps>;

export const Default: Story = {
  args: {
    storyText: '1',
    showText: true,
    state: 'normal',
    forceHover: false,
    forcePressed: false,
  },
};

export const Selected: Story = {
  args: {
    storyText: '1',
    showText: true,
    state: 'selected',
  },
};

export const Disabled: Story = {
  args: {
    storyText: '1',
    showText: true,
    state: 'disabled',
  },
};

export const ForcedHover: Story = {
  args: {
    storyText: '1',
    showText: true,
    state: 'normal',
    forceHover: true,
  },
};

export const ForcedPressed: Story = {
  args: {
    storyText: '1',
    showText: true,
    state: 'normal',
    forcePressed: true,
  },
};

export const HiddenText: Story = {
  args: {
    storyText: '1',
    showText: false,
    state: 'normal',
  },
};
