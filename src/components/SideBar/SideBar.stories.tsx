import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import SideBar from './SideBar';
import MenuItem from '../MenuItem/MenuItem';

import logo from '../../assets/logo-light.svg';

import MapPinIcon from '../../assets/icons/map-pin.svg';
import MapPinSelectedIcon from '../../assets/icons/map-pin-selected.svg';

import ReportIcon from '../../assets/icons/report.svg';
import ReportSelectedIcon from '../../assets/icons/report-selected.svg';

import SettingsIcon from '../../assets/icons/map-pinned.svg';

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
      <SideBar logoSrc={logo}>
        {showMapa && (
          <MenuItem
            id="mapa"
            label="Mapa"
            iconSrc={MapPinIcon}
            iconSelectedSrc={MapPinSelectedIcon}
          />
        )}

        {showGuantera && (
          <MenuItem
            id="guantera"
            label="Guantera"
            iconSrc={ReportIcon}
            iconSelectedSrc={ReportSelectedIcon}
          />
        )}

        {showReportes && (
          <MenuItem
            id="reportes"
            label="Reportes"
            iconSrc={ReportIcon}
            iconSelectedSrc={ReportSelectedIcon}
          />
        )}

        {showAjustes && (
          <MenuItem
            id="ajustes"
            label="Ajustes"
            iconSrc={SettingsIcon}
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
