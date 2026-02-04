import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Accordion, { AccordionProps } from './Accordion';
import Button from '../Button/Button';
import StatusBadge from '../StatusBadge/StatusBadge';
import Checkbox from '../Checkbox/Checkbox';
import { Typography } from '@mui/material';
import { black, typography } from '../../foundation';


const meta: Meta<AccordionProps> = {
  title: 'Components/Accordion',
  component: Accordion,

  argTypes: {
    label: { control: 'text' },

    defaultOpen: { control: 'boolean' },
    disabled: { control: 'boolean' },

    showIconLeft: { control: 'boolean' },

    children: { control: false },
    sx: { control: false },
  },

  render: (args) => (
    <div style={{ width: 360 }}>
      <Accordion {...args}>
        
      </Accordion>
    </div>
  ),
};

export default meta;
type Story = StoryObj<AccordionProps>;

export const Default: Story = {
  args: {
    label: 'Label text',
    defaultOpen: false,
    children: (
      <div>
        <Typography
          sx={{
            ...typography.desktop.body.regular,
            color: black[900],
          }}    
        >
          Contenido simple
        </Typography>
      </div>
    ),
  },
};

export const WithButtons: Story = {
  args: {
    label: 'Actions',
    defaultOpen: true,
    children: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button dsVariant="primary">Confirmar</Button>
        <Button dsVariant="ghost">Cancelar</Button>
      </div>
    ),
  },
};

export const WithStatusAndCheckboxes: Story = {
  args: {
    label: 'Estado',
    defaultOpen: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <StatusBadge text="Activo" dsColor="correct" />
        <Checkbox showLabel>Opción 1</Checkbox>
        <Checkbox showLabel>Opción 2</Checkbox>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    defaultOpen: false,
    children: <div>No debería abrir</div>,
  },
};
