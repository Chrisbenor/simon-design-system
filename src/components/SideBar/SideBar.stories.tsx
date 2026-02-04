import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import SideBar from './SideBar';
import MenuItem from '../MenuItem/MenuItem';

type SideBarStoryProps = {
  showMapa?: boolean;
  showGuantera?: boolean;
  showReportes?: boolean;
  showAjustes?: boolean;
};

const meta = {
  title: 'Components/SideBar',
  component: SideBar,

  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['children', 'logoSrc', 'sx'],
    },
  },

  argTypes: {
    showMapa: { control: { type: 'boolean' }, name: 'Mapa' },
    showGuantera: { control: { type: 'boolean' }, name: 'Guantera' },
    showReportes: { control: { type: 'boolean' }, name: 'Reportes' },
    showAjustes: { control: { type: 'boolean' }, name: 'Ajustes' },
  },

  render: ({
    showMapa = true,
    showGuantera = true,
    showReportes = true,
    showAjustes = true,
  }) => (
    <div style={{ width: 280, height: '80vh', margin: 'auto' }}>
      <SideBar logoSrc='/logo/logo-light.svg'>
        {showMapa && (
          <MenuItem
            id="mapa"
            label="Mapa"
            iconSrc='/icons/map-pin.svg'
            iconSelectedSrc='/icons/map-pin-selected.svg'
          />
        )}

        {showGuantera && (
          <MenuItem
            id="guantera"
            label="Guantera"
            iconSrc='/icons/report.svg'
            iconSelectedSrc='/icons/report-selected.svg'
          />
        )}

        {showReportes && (
          <MenuItem
            id="reportes"
            label="Reportes"
            iconSrc='/icons/report.svg'
            iconSelectedSrc='/icons/report-selected.svg'
          />
        )}

        {showAjustes && (
          <MenuItem
            id="ajustes"
            label="Ajustes"
            iconSrc='/icons/map-pinned.svg'
            hasDropdown
            items={[
              { id: 'general', label: 'General' },
              { id: 'security', label: 'Seguridad' },
              { id: 'notifications', label: 'Notificaciones' },
            ]}
          />
        )}
      </SideBar>
    </div>
  ),
} satisfies Meta<SideBarStoryProps>;

export default meta;

type Story = StoryObj<SideBarStoryProps>;

export const Interactive: Story = {
  args: {
    showMapa: true,
    showGuantera: true,
    showReportes: true,
    showAjustes: true,
  },
};
