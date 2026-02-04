import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import DeviceListBar, { DeviceListBarProps } from './DeviceListBar';
import { SMCardsMapProps } from '../CardsMap/CardsMap';

const devices: SMCardsMapProps[] = [
  {
    id: 1,
    name: 'DEF 123',
    uniqueId: '10101010',
    phone: 'Juan Alejandro Correa',
    status: 'online',
  },
  {
    id: 2,
    name: 'XYZ 456',
    uniqueId: '20202020',
    phone: 'Maria Fernanda Lopez',
    status: 'warning',
  },
  {
    id: 3,
    name: 'JKL 789',
    uniqueId: '30303030',
    phone: 'Carlos Alberto Méndez',
    status: 'offline',
  },
  {
    id: 4,
    name: 'QRS 101',
    uniqueId: '40404040',
    phone: 'Sofía Andrea Pérez',
    status: 'online',
  },
  {
    id: 5,
    name: 'TUV 202',
    uniqueId: '50505050',
    phone: 'Daniel Rojas',
    status: 'online',
  },
  {
    id: 6,
    name: 'MNO 303',
    uniqueId: '60606060',
    phone: 'Laura Gómez',
    status: 'warning',
  },
];

/* =========================
   Meta
========================= */

const meta: Meta<DeviceListBarProps> = {
  title: 'Components/DeviceListBar',
  component: DeviceListBar,

  argTypes: {
    devices: { control: false },
    sx: { control: false },
  },

  render: (args) => (
    <div
      style={{
        height: 640,
        width: 360,
        border: '1px dashed #E0E0E0',
        padding: 8,
      }}
    >
      <DeviceListBar {...args} />
    </div>
  ),
};

export default meta;

/* =========================
   Stories
========================= */

type Story = StoryObj<DeviceListBarProps>;

export const Default: Story = {
  args: {
    devices,
  },
};

export const FewItems: Story = {
  args: {
    devices: devices.slice(0, 2),
  },
};
