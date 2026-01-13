import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import MenuItem, { MenuItemProps } from './MenuItem';

type MenuItemStoryProps = MenuItemProps & {
  storyLabel?: string;
};

const meta: Meta<MenuItemStoryProps> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  argTypes: {
    storyLabel: { control: 'text' },

    hasIcon: { control: 'boolean' },

    item: {
      control: 'radio',
      options: ['reportes', 'mapa', 'geocercas', 'guantera'],
    },

    state: {
      control: 'radio',
      options: ['selected', 'enable', 'hover'],
    },

    onClick: { control: false },
  },

  render: ({ storyLabel, ...args }) => (
    <div style={{ width: 260, padding: 16 }}>
      <MenuItem {...args} label={storyLabel ?? args.label} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<MenuItemStoryProps>;

export const Selected: Story = {
  args: {
    storyLabel: 'Reportes',
    label: 'Reportes',
    hasIcon: true,
    item: 'reportes',
    state: 'selected',
  },
};

export const Enable: Story = {
  args: {
    storyLabel: 'Mapa',
    label: 'Mapa',
    hasIcon: true,
    item: 'mapa',
    state: 'enable',
  },
};

export const Hover: Story = {
  args: {
    storyLabel: 'Geocercas',
    label: 'Geocercas',
    hasIcon: true,
    item: 'geocercas',
    state: 'hover',
  },
};

export const NoIcon: Story = {
  args: {
    storyLabel: 'Guantera',
    label: 'Guantera',
    hasIcon: false,
    item: 'guantera',
    state: 'enable',
  },
};
