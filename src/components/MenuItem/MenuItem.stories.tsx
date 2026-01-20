import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import MenuItem, {
  MenuItemItem,
  MenuItemSubItem,
} from './MenuItem';

type MenuItemStoryProps = {
  item?: MenuItemItem;
  label: string;
  hasIcon?: boolean;
  collapsed?: boolean;
  hasDropdown?: boolean;
  dropdownItemsCount?: 1 | 2 | 3 | 4;
};

const meta: Meta<MenuItemStoryProps> = {
  
  title: 'Components/MenuItem',
  component: MenuItem,

  argTypes: {
    label: { control: 'text' },

    hasIcon: { control: 'boolean' },

    item: {
      control: 'radio',
      options: ['reportes', 'mapa', 'geocercas', 'guantera'],
      description: 'Icon source (visual only)',
    },

    collapsed: { control: 'boolean' },

    hasDropdown: { control: 'boolean' },

    dropdownItemsCount: {
      control: 'radio',
      options: [1, 2, 3, 4],
      if: { arg: 'hasDropdown', truthy: true },
    },
  },

  render: ({
    label,
    item = 'reportes',
    hasIcon = true,
    collapsed = false,
    hasDropdown = false,
    dropdownItemsCount = 2,
  }) => {
    const [activeKey, setActiveKey] = React.useState<string | null>(() => item);

    React.useEffect(() => {
      setActiveKey(item);
    }, [item]);

    const items: MenuItemSubItem[] | undefined = hasDropdown
      ? Array.from({ length: dropdownItemsCount }, (_, i) => ({
          key: `sub-${i + 1}`,
          label: [
            'General',
            'Security',
            'Notifications',
            'Account',
          ][i],
          onClick: () => setActiveKey(`sub-${i + 1}`),
        }))
      : undefined;

    return (
      <div style={{ width: 260, padding: 16 }}>
        <MenuItem
          label={label}
          item={item}
          hasIcon={hasIcon}
          collapsed={collapsed}
          hasDropdown={hasDropdown}
          items={items}
          state={activeKey === item ? 'selected' : 'enable'}
          onClick={() => setActiveKey(item)}
        />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<MenuItemStoryProps>;

export const Interactive: Story = {
  args: {
    label: 'Ajustes',
    item: 'reportes', 
    hasIcon: true,
    hasDropdown: true,
    dropdownItemsCount: 4,
    collapsed: false,
  },
};

export const Simple: Story = {
  args: {
    label: 'Ajustes',
    item: 'reportes',
    hasIcon: true,
  },
};

export const Collapsed: Story = {
  args: {
    label: 'Ajustes',
    item: 'reportes',
    hasDropdown: true,
    dropdownItemsCount: 3,
    collapsed: true,
  },
};
