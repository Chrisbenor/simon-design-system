import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import ProfileCard, { ProfileCardProps } from './ProfileCard';

type StoryProps = ProfileCardProps;

import avatarImg from '../../assets/avatar.png';

const meta: Meta<StoryProps> = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],

  argTypes: {
    hasName: { control: 'boolean' },
    name: { control: 'text' },

    hasRol: { control: 'boolean' },
    rol: { control: 'text' },

    hasDropdown: { control: 'boolean' },

    hasPhoto: { control: 'boolean' },
    photoSrc: { control: 'text' },

    type: { control: { type: 'inline-radio' }, options: ['open', 'close'] },

    onClick: { control: false },
    sx: { control: false },
  },

  render: (args) => <ProfileCard {...args} />,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    hasName: true,
    name: 'Sofía Mahecha',

    hasRol: true,
    rol: 'Administrador',

    hasDropdown: true,

    hasPhoto: false,
    photoSrc: avatarImg,

    type: 'close',
  },
};

export const Open: Story = {
  args: {
    ...Default.args,
    type: 'open',
  },
};

export const WithPhoto: Story = {
  args: {
    ...Default.args,
    hasPhoto: true,
    photoSrc: avatarImg,
  },
};

export const NoRole: Story = {
  args: {
    ...Default.args,
    hasRol: false,
  },
};

export const NoDropdown: Story = {
  args: {
    ...Default.args,
    hasDropdown: false,
  },
};
