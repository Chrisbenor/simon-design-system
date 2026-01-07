// src/components/Checkbox/Checkbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Checkbox, { DSCheckboxProps } from './Checkbox';

type CheckboxStoryProps = DSCheckboxProps & {
  // Story-only (for easy text control in stories)
  storyText?: string;
};

const meta: Meta<CheckboxStoryProps> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    // Story-only label content (optional). If you prefer, you can remove this too.
    storyText: { control: 'text' },

    showLabel: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },

    name: { control: 'text' },
    id: { control: 'text' },

    // Keep checkbox interactive
    checked: { control: false },
    defaultChecked: { control: false },
    onChange: { action: 'changed' },

    // Not controlled from panel
    children: { control: false },
    sx: { control: false },
  },

  render: ({ storyText, onChange, ...args }) => {
    const [val, setVal] = React.useState<boolean>(Boolean(args.checked ?? false));

    // keep local state in sync when switching between stories
    React.useEffect(() => {
      setVal(Boolean(args.checked ?? false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [args.disabled, args.showLabel, args.fullWidth]);

    return (
      <div style={{ padding: 8 }}>
        <Checkbox
          {...args}
          checked={val}
          onChange={(e: any, next: boolean) => {
            setVal(next);
            onChange?.(e, next);
          }}
        >
          {storyText}
        </Checkbox>
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<CheckboxStoryProps>;

export const Default: Story = {
  args: {
    storyText: 'Label',
    showLabel: true,
    disabled: false,
    fullWidth: false,
    checked: false,
    id: 'ds-checkbox',
    name: 'ds-checkbox',
  },
};

export const Checked: Story = {
  args: {
    storyText: 'Checked',
    showLabel: true,
    disabled: false,
    checked: true,
    id: 'ds-checkbox-checked',
  },
};

export const DisabledUnchecked: Story = {
  args: {
    storyText: 'Disabled',
    showLabel: true,
    disabled: true,
    checked: false,
    id: 'ds-checkbox-disabled',
  },
};

export const DisabledChecked: Story = {
  args: {
    storyText: 'Disabled (checked)',
    showLabel: true,
    disabled: true,
    checked: true,
    id: 'ds-checkbox-disabled-checked',
  },
};

export const NoLabel: Story = {
  args: {
    storyText: '',
    showLabel: false,
    disabled: false,
    checked: false,
    id: 'ds-checkbox-nolabel',
  },
};

export const FullWidth: Story = {
  args: {
    storyText: 'Full width checkbox',
    showLabel: true,
    fullWidth: true,
    disabled: false,
    checked: false,
    id: 'ds-checkbox-fullwidth',
  },
};
