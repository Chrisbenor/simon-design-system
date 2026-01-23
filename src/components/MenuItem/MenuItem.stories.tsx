import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import MenuItem, {
  MenuItemSubItem,
  MenuItemState,
} from './MenuItem';

/* =========================
   Story-only props
========================= */
type MenuItemStoryProps = {
  id: string;
  label: string;

  icon?: boolean;
  collapsed?: boolean;

  hasDropdown?: boolean;
  dropdownItemsCount?: 1 | 2 | 3 | 4;

  selected?: boolean;
};

/* =========================
   Meta
========================= */

const meta: Meta<MenuItemStoryProps> = {
  title: 'Components/MenuItem',
  component: MenuItem,

  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier (DS-agnostic)',
    },

    label: { control: 'text' },

    icon: {
      control: 'boolean',
      name: 'Show icon',
    },

    collapsed: { control: 'boolean' },

    hasDropdown: { control: 'boolean' },

    dropdownItemsCount: {
      control: 'radio',
      options: [1, 2, 3, 4],
      if: { arg: 'hasDropdown', truthy: true },
    },

    selected: {
      control: 'boolean',
      description: 'Visual state only (storybook)',
    },
  },

  render: ({
    id,
    label,
    icon = true,
    collapsed = false,
    hasDropdown = false,
    dropdownItemsCount = 2,
    selected = false,
  }) => {
    const [state, setState] = React.useState<MenuItemState>(
      selected ? 'selected' : 'enable'
    );

    React.useEffect(() => {
      setState(selected ? 'selected' : 'enable');
    }, [selected]);

    const items: MenuItemSubItem[] | undefined = hasDropdown
      ? Array.from({ length: dropdownItemsCount }, (_, i) => ({
          id: `sub-${i + 1}`,
          label: ['General', 'Security', 'Notifications', 'Account'][i],
          onClick: () => {
            /* visual-only */
          },
        }))
      : undefined;

    return (
      <div style={{ width: 260, padding: 16 }}>
        <MenuItem
          id={id}
          label={label}
          collapsed={collapsed}
          hasDropdown={hasDropdown}
          items={items}
          state={state}
          iconSrc={icon ? '/icons/placeholder.svg' : undefined}
          iconSelectedSrc={icon ? '/icons/placeholder-selected.svg' : undefined}
          onClick={() =>
            setState((prev) =>
              prev === 'selected' ? 'enable' : 'selected'
            )
          }
        />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<MenuItemStoryProps>;

/* =========================
   Stories
========================= */

export const Interactive: Story = {
  args: {
    id: 'settings',
    label: 'Ajustes',
    icon: true,
    hasDropdown: true,
    dropdownItemsCount: 4,
    collapsed: false,
    selected: false,
  },
};

export const Simple: Story = {
  args: {
    id: 'simple',
    label: 'Simple item',
    icon: true,
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    id: 'selected',
    label: 'Selected item',
    icon: true,
    selected: true,
  },
};

export const Collapsed: Story = {
  args: {
    id: 'collapsed',
    label: 'Collapsed item',
    icon: true,
    hasDropdown: true,
    dropdownItemsCount: 3,
    collapsed: true,
    selected: false,
  },
};
