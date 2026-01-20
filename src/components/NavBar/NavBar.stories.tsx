import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import NavBar, { SMNavBarProps } from './NavBar';

type ContainerWidth = 'desktop' | 'tablet' | 'mobile';

type NavBarStoryProps = SMNavBarProps & {
  containerWidth?: ContainerWidth;
};

const WIDTH_MAP: Record<ContainerWidth, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

const meta: Meta<NavBarStoryProps> = {
  title: 'Components/NavBar',
  component: NavBar,
  argTypes: {
    title: { control: 'text' },

    containerWidth: {
      control: 'radio',
      options: ['desktop', 'tablet', 'mobile'],
      description: `
    Test responsive behavior.
        • 375px → Mobile
        • 768px → Tablet
        • 1280px → Desktop
            `,
            
    },

    user: { control: false },

    onAccount: { action: 'account clicked' },
    onLogout: { action: 'logout clicked' },
    onNotifications: { action: 'notifications clicked' },

    forceMobile: { control: false },
    sx: { control: false },
  },

  render: ({ containerWidth = 'desktop', ...args }) => {
    const width = WIDTH_MAP[containerWidth];
    const isMobile = containerWidth === 'mobile';

    return (
      <div
        style={{
          width,
        }}
      >
        <NavBar {...args} forceMobile={isMobile} />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<NavBarStoryProps>;

export const Desktop: Story = {
  args: {
    title: 'Mapa',
    containerWidth: 'desktop',
    user: {
      name: 'Sofía Mahecha',
      role: 'Administrador',
      photoSrc: '',
    },
  },
};

export const Tablet: Story = {
  args: {
    title: 'Mapa',
    containerWidth: 'tablet',
    user: {
      name: 'Sofía Mahecha',
      role: 'Administrador',
      photoSrc: '',
    },
  },
};

export const Mobile: Story = {
  args: {
    title: 'Mapa',
    containerWidth: 'mobile',
    user: {
      name: 'Sofía Mahecha',
      role: 'Administrador',
      photoSrc: '',
    },
  },
};
