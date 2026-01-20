import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button, { SMButtonProps } from './Button';

type ButtonStoryProps = SMButtonProps & {
  label: string;
};

const meta: Meta<ButtonStoryProps> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },

    dsVariant: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost'],
    },

    dsSize: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },

    disabled: { control: 'boolean' },
    iconLeft: { control: false },
    iconRight: { control: false },
    onClick: { action: 'clicked' },
  },

  render: ({ label, ...args }) => (
    <Button {...args}>{label}</Button>
  ),
};

export default meta;

type Story = StoryObj<ButtonStoryProps>;

export const Primary: Story = {
  args: {
    label: 'Botón primario',
    dsVariant: 'primary',
    dsSize: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Botón secundario',
    dsVariant: 'secondary',
    dsSize: 'medium',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Botón ghost',
    dsVariant: 'ghost',
    dsSize: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Deshabilitado',
    dsVariant: 'primary',
    disabled: true,
  },
};
