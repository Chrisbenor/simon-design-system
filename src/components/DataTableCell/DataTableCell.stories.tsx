import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import DataTableCell, { DataTableCellProps } from './DataTableCell';

const exampleOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

const meta: Meta<DataTableCellProps> = {
  title: 'Components/DataTableCell',
  component: DataTableCell,

  argTypes: {
    /* =========================
       TYPE
    ========================= */
    type: {
      control: 'radio',
      options: ['header', 'normal', 'buttons', 'state', 'select'],
    },

    /* =========================
       TEXT
    ========================= */
    text: {
      control: 'text',
      if: { arg: 'type', neq: 'buttons' },
    },

    /* =========================
       DROPDOWN (header / normal)
    ========================= */
    options: {
      control: false,
      if: { arg: 'type', eq: 'normal' },
    },

    /* =========================
       STATUS
    ========================= */
    status: {
      control: 'radio',
      options: ['primary', 'secondary', 'correct', 'error', 'warning'],
      if: { arg: 'type', eq: 'state' },
    },

    /* =========================
       CHECKBOX
    ========================= */
    checked: {
      control: 'boolean',
      if: { arg: 'type', eq: 'select' },
    },

    checkboxId: {
      control: 'text',
      if: { arg: 'type', eq: 'select' },
    },

    checkboxName: {
      control: 'text',
      if: { arg: 'type', eq: 'select' },
    },

    showLabelCheckbox: {
      control: 'boolean',
      if: { arg: 'type', eq: 'select' },
    },

    onChangeCheckbox: {
      action: 'checkbox-changed',
      if: { arg: 'type', eq: 'select' },
    },

    /* =========================
       BUTTONS
    ========================= */
    onClickButton1: {
      action: 'button-1',
      if: { arg: 'type', eq: 'buttons' },
    },

    onClickButton2: {
      action: 'button-2',
      if: { arg: 'type', eq: 'buttons' },
    },

    onClickButton3: {
      action: 'button-3',
      if: { arg: 'type', eq: 'buttons' },
    },

    /* =========================
       GENERAL
    ========================= */
    disabled: { control: 'boolean' },
  },

  render: (args) => (
    <div style={{ width: 240 }}>
      <DataTableCell {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<DataTableCellProps>;

/* =========================
   STORIES
========================= */

export const Header: Story = {
  args: {
    type: 'header',
    text: 'Header text',
    options: exampleOptions,
  },
};

export const Normal: Story = {
  args: {
    type: 'normal',
    text: 'Text',
    options: exampleOptions,
  },
};

export const Buttons: Story = {
  args: {
    type: 'buttons',
  },
};

export const State: Story = {
  args: {
    type: 'state',
    text: 'Active',
    status: 'correct',
  },
};

export const Select: Story = {
  args: {
    type: 'select',
    checked: false,
    checkboxId: 'row-1',
    checkboxName: 'row-1',
    showLabelCheckbox: true,
    text: 'Select row',
  },
};
