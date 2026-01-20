import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

import FAB, { SMFABProps } from './FAB';

const meta: Meta<SMFABProps> = {
  title: 'Components/FAB',
  component: FAB,
  tags: ['autodocs'],

  argTypes: {
    icon: { control: false },

    size: {
      control: { type: 'inline-radio' },
      options: ['s', 'normal', 'l'],
    },

    type: {
      control: { type: 'inline-radio' },
      options: ['principal', 'secundario', 'ghost'],
    },

    state: {
      control: { type: 'inline-radio' },
      options: ['default', 'hover', 'focus', 'disabled'],
    },

    disabled: { control: 'boolean' },

    onClick: { control: false },
    sx: { control: false },
  },

  render: (args) => <FAB {...args} icon={<AddIcon />} />,
};

export default meta;

type Story = StoryObj<SMFABProps>;

export const Playground: Story = {
  args: {
    size: 'normal',
    type: 'principal',
    state: 'default',
    disabled: false,
  },
};
