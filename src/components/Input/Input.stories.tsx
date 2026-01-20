// src/components/Input/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Input, { SMInputProps } from './Input';

// Demo icons
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import HelpOutline from '@mui/icons-material/HelpOutline';
import Search from '@mui/icons-material/Search';
import Email from '@mui/icons-material/Email';
import Person from '@mui/icons-material/Person';
import Close from '@mui/icons-material/Close';
import Clear from '@mui/icons-material/Clear';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ArrowForward from '@mui/icons-material/ArrowForward';

type IconKey =
  | 'search'
  | 'email'
  | 'person'
  | 'close'
  | 'clear'
  | 'check'
  | 'arrow'
  | 'info'
  | 'help';

const iconMap: Record<IconKey, React.ReactNode> = {
  search: <Search fontSize="small" />,
  email: <Email fontSize="small" />,
  person: <Person fontSize="small" />,
  close: <Close fontSize="small" />,
  clear: <Clear fontSize="small" />,
  check: <CheckCircle fontSize="small" />,
  arrow: <ArrowForward fontSize="small" />,
  info: <InfoOutlined fontSize="small" />,
  help: <HelpOutline fontSize="small" />,
};

type InputStoryProps = SMInputProps & {
  storyLabel?: string;

  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  showInfoIcon?: boolean;

  leftIconKey?: IconKey;
  rightIconKey?: IconKey;
  infoIconKey?: IconKey;

  showInfoTooltip?: boolean;
  infoTooltipTextControl?: string;
  infoTooltipPlacementControl?: 'top' | 'bottom' | 'left' | 'right';
};

const meta: Meta<InputStoryProps> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    storyLabel: { control: 'text' },

    label: { control: 'text' },
    placeholder: { control: 'text' },
    supportText: { control: 'text' },
    required: { control: 'boolean' },

    dsType: {
      control: 'radio',
      options: ['text', 'email', 'password', 'number'],
    },
    state: {
      control: 'radio',
      options: ['enable', 'completed', 'error', 'success', 'disabled'],
    },

    pressed: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    name: { control: 'text' },
    id: { control: 'text' },

    value: { control: false },
    onChange: { action: 'changed' },

    leftIcon: { control: false },
    rightIcon: { control: false },
    infoIcon: { control: false },
    onRightIconClick: { action: 'right icon clicked' },

    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
    showInfoIcon: { control: 'boolean' },

    leftIconKey: {
      control: 'select',
      options: ['search', 'email', 'person', 'check', 'arrow'],
    },
    rightIconKey: {
      control: 'select',
      options: ['close', 'clear', 'check', 'arrow', 'email'],
    },
    infoIconKey: {
      control: 'select',
      options: ['info', 'help'],
    },

    showInfoTooltip: { control: 'boolean' },
    infoTooltipTextControl: { control: 'text' },
    infoTooltipPlacementControl: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
    },

    infoTooltipText: { table: { disable: true } },
    infoTooltipPlacement: { table: { disable: true } },
  },

  render: ({
    storyLabel,
    onChange,

    showLeftIcon,
    showRightIcon,
    showInfoIcon,

    leftIconKey,
    rightIconKey,
    infoIconKey,

    showInfoTooltip,
    infoTooltipTextControl,
    infoTooltipPlacementControl,

    ...args
  }) => {
    const [val, setVal] = React.useState<string>(String(args.value ?? ''));

    const resolvedLeftIcon =
      showLeftIcon && leftIconKey ? iconMap[leftIconKey] : undefined;

    const resolvedRightIcon =
      showRightIcon && rightIconKey ? iconMap[rightIconKey] : undefined;

    const resolvedInfoIcon =
      showInfoIcon && infoIconKey ? iconMap[infoIconKey] : undefined;

    const resolvedOnRightIconClick =
      showRightIcon && args.dsType !== 'password'
        ? args.onRightIconClick ?? (() => {})
        : args.onRightIconClick;

    const resolvedInfoTooltipText =
      showInfoIcon && showInfoTooltip ? (infoTooltipTextControl ?? '') : undefined;

    const resolvedInfoTooltipPlacement =
      infoTooltipPlacementControl ?? 'top';

    return (
      <div style={{ maxWidth: 420 }}>
        <Input
          {...args}
          label={storyLabel ?? args.label}
          value={val}
          leftIcon={resolvedLeftIcon}
          rightIcon={resolvedRightIcon}
          infoIcon={resolvedInfoIcon}
          infoTooltipText={resolvedInfoTooltipText}
          infoTooltipPlacement={resolvedInfoTooltipPlacement}
          onRightIconClick={resolvedOnRightIconClick}
          onChange={(e: any) => {
            setVal(e.target.value);
            onChange?.(e);
          }}
        />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<InputStoryProps>;

export const Default: Story = {
  args: {
    storyLabel: 'Label',
    placeholder: 'Type something…',
    dsType: 'text',
    state: 'enable',
    fullWidth: true,
    pressed: false,
    required: false,
    supportText: '',
    value: '',

    showLeftIcon: false,
    showRightIcon: false,
    showInfoIcon: false,

    leftIconKey: 'search',
    rightIconKey: 'close',
    infoIconKey: 'info',

    showInfoTooltip: true,
    infoTooltipTextControl: 'This is helper text shown on hover.',
    infoTooltipPlacementControl: 'top',
  },
};

export const WithInfoTooltip: Story = {
  args: {
    storyLabel: 'Email',
    placeholder: 'name@domain.com',
    dsType: 'email',
    state: 'enable',
    fullWidth: true,
    value: '',

    showInfoIcon: true,
    infoIconKey: 'help',

    showInfoTooltip: true,
    infoTooltipTextControl: 'We’ll never share your email.',
    infoTooltipPlacementControl: 'top',
  },
};

export const WithIcons: Story = {
  args: {
    storyLabel: 'With icons',
    placeholder: 'Search…',
    dsType: 'text',
    state: 'enable',
    fullWidth: true,
    value: 'Hello',

    showLeftIcon: true,
    showRightIcon: true,
    showInfoIcon: true,

    leftIconKey: 'search',
    rightIconKey: 'clear',
    infoIconKey: 'info',

    showInfoTooltip: true,
    infoTooltipTextControl: 'Search tips: use keywords.',
    infoTooltipPlacementControl: 'right',
  },
};

export const Password: Story = {
  args: {
    storyLabel: 'Password',
    placeholder: '••••••••',
    dsType: 'password',
    state: 'enable',
    fullWidth: true,
    value: '',

    // password already shows the eye icon internally
    showLeftIcon: false,
    showRightIcon: false,
    showInfoIcon: true,

    infoIconKey: 'help',
    showInfoTooltip: true,
    infoTooltipTextControl: 'Use at least 8 characters.',
    infoTooltipPlacementControl: 'top',
  },
};

export const Disabled: Story = {
  args: {
    storyLabel: 'Disabled',
    placeholder: 'Not editable',
    dsType: 'text',
    state: 'disabled',
    fullWidth: true,
    value: 'Content',

    showLeftIcon: true,
    showRightIcon: true,
    showInfoIcon: true,

    leftIconKey: 'email',
    rightIconKey: 'close',
    infoIconKey: 'info',

    showInfoTooltip: true,
    infoTooltipTextControl: 'This field is disabled.',
    infoTooltipPlacementControl: 'bottom',
  },
};
