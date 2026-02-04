import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Dropdown, { DropdownProps } from './Dropdown';

const meta: Meta<DropdownProps> = {
  title: 'Components/Dropdown',
  component: Dropdown,

  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    supportText: { control: 'text' },
    required: { control: 'boolean' },

    // ❌ No controlables
    value: { control: false },
    state: { control: false },
    onChange: { control: false },
    options: { control: false },
    sx: { control: false },
  },

  render: (args) => {
    const [value, setValue] = React.useState<string>('');

    // 🔑 resetear value cuando cambian props "estructurales"
    React.useEffect(() => {
      setValue('');
    }, [args.required, args.placeholder, args.label]);

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export default meta;
type Story = StoryObj<DropdownProps>;

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Text',
    supportText: 'Support Text',
    required: false,
    options,
  },
};

export const Required: Story = {
  args: {
    label: 'Label',
    placeholder: 'Text',
    supportText: 'Support Text',
    required: true,
    options,
  },
};
