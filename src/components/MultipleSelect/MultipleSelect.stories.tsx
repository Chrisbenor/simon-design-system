import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import MultipleSelect, { MultipleSelectProps } from './MultipleSelect';

const options = [
  { value: 'opt1', label: 'Option one' },
  { value: 'opt2', label: 'Option two' },
  { value: 'opt3', label: 'Option three' },
  { value: 'opt4', label: 'Option four' },
  { value: 'opt5', label: 'Option five' },
];

const meta: Meta<MultipleSelectProps> = {
  title: 'Components/MultipleSelect',
  component: MultipleSelect,

  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },

    isBadge: { control: 'boolean' },

    hasSupportText: { control: 'boolean' },
    supportText: {
      control: 'text',
      if: { arg: 'hasSupportText', eq: true },
    },

    state: {
      control: 'radio',
      options: ['enable', 'selected', 'error', 'success', 'disabled'],
    },

    value: { control: false },
    onChange: { control: false },
    options: { control: false },
    sx: { control: false },
  },

  render: (args) => {
    const [value, setValue] = React.useState<string[]>([]);

    return (
      <div
        style={{
          width: 500,
          minHeight: 100,
          padding: 16,
          border: '1px dashed #ccc',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <MultipleSelect
          {...args}
          value={value}
          onChange={setValue}
        />

      </div>
    );
  },
};

export default meta;

type Story = StoryObj<MultipleSelectProps>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select options',
    options,
    isBadge: true,
    state: 'enable',
    hasSupportText: true,
    supportText: 'You can select multiple options',
  },
};

export const TextOnly: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select options',
    options,
    isBadge: false,
    state: 'enable',
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    options,
    isBadge: true,
    state: 'error',
    hasSupportText: true,
    supportText: 'This field is required',
  },
};
