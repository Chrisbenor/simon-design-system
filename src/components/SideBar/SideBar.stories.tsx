import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import SideBar from './SideBar';
import MenuItem from '../MenuItem/MenuItem';

import logo from '../../assets/logo-light.svg';

/* =========================
   Story-only props
========================= */
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

    /* 👇 AQUÍ es donde se ocultan */
    controls: {
      exclude: ['children', 'logoSrc', 'sx'],
    },
  },

  argTypes: {
    /* ✅ CHECKBOXES LIMPIOS */
    showMapa: {
      control: { type: 'boolean' },
      name: 'Mapa',
    },
    showGuantera: {
      control: { type: 'boolean' },
      name: 'Guantera',
    },
    showReportes: {
      control: { type: 'boolean' },
      name: 'Reportes',
    },
    showAjustes: {
      control: { type: 'boolean' },
      name: 'Ajustes',
    },
  },

  render: ({
    showMapa = true,
    showGuantera = true,
    showReportes = true,
    showAjustes = true,
  }) => {
    const [selected, setSelected] = React.useState<string | null>('mapa');

    return (
      <div style={{ width: 280, height: '80vh', margin: 'auto' }}>
        <SideBar logoSrc={logo}>
          {showMapa && (
            <MenuItem
              label="Mapa"
              item="mapa"
              hasIcon
              state={selected === 'mapa' ? 'selected' : 'enable'}
              onClick={() => setSelected('mapa')}
            />
          )}

          {showGuantera && (
            <MenuItem
              label="Guantera"
              item="guantera"
              hasIcon
              state={selected === 'guantera' ? 'selected' : 'enable'}
              onClick={() => setSelected('guantera')}
            />
          )}

          {showReportes && (
            <MenuItem
              label="Reportes"
              item="reportes"
              hasIcon
              state={selected === 'reportes' ? 'selected' : 'enable'}
              onClick={() => setSelected('reportes')}
            />
          )}

          {showAjustes && (
            <MenuItem
              label="Ajustes"
              item="reportes"
              hasIcon
              hasDropdown
              items={[
                { key: 'general', label: 'General' },
                { key: 'security', label: 'Seguridad' },
                { key: 'notifications', label: 'Notificaciones' },
              ]}
              state={selected === 'ajustes' ? 'selected' : 'enable'}
              onClick={() => setSelected('ajustes')}
            />
          )}
        </SideBar>
      </div>
    );
  },
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

