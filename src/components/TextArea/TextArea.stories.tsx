import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import TextArea, { TextAreaProps } from './TextArea';

const meta: Meta<TextAreaProps> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    isRequired: { control: 'boolean' },

    hasInfoIcon: { control: 'boolean' },
    infoTooltipText: { control: 'text' },

    hasLabel: { control: 'boolean' },
    label: { control: 'text' },

    supportText: { control: 'text' },
    hasIconSupportText: { control: 'boolean' },

    hasOtherText: { control: 'boolean' },
    otherText: { control: 'text' },

    text: { control: 'text' },
    placeholder: { control: 'text' },

    state: {
      control: { type: 'inline-radio' },
      options: ['enable', 'completed', 'error', 'disable', 'success'],
    },
    pressed: {
      control: { type: 'inline-radio' },
      options: ['no', 'yes'],
    },

    fullWidth: { control: 'boolean' },
    sx: { control: false },
    onChange: { control: false },
  },
  render: (args) => <TextArea {...args} />,
};

export default meta;

type Story = StoryObj<TextAreaProps>;

export const Default: Story = {
  args: {
    fullWidth: false,

    isRequired: true,
    hasInfoIcon: true,
    infoTooltipText: 'Info',

    hasLabel: true,
    label: 'Label',

    text: 'Text',
    placeholder: 'Text',

    supportText: 'Support Text',
    hasIconSupportText: true,

    hasOtherText: false,
    otherText: '',

    state: 'enable',
    pressed: 'no',
  },
};

export const Pressed: Story = {
  args: {
    ...Default.args,
    pressed: 'yes',
  },
};

export const Completed: Story = {
  args: {
    ...Default.args,
    state: 'completed',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    state: 'error',
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    state: 'success',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: 'disable',
  },
};
