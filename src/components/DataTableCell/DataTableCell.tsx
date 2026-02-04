import * as React from 'react';
import { Box, Typography } from '@mui/material';

import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';
import StatusBadge from '../StatusBadge/StatusBadge';
import Checkbox from '../Checkbox/Checkbox';

import { spacingRem } from '../../foundation/spacing';
import { black } from '../../foundation/colors';

/* =========================
   Types
========================= */

export type DataTableCellType =
  | 'header'
  | 'normal'
  | 'buttons'
  | 'state'
  | 'select';

export type DataTableCellOption = {
  label: string;
  value: string;
};

export type DataTableCellProps = {
  type: DataTableCellType;

  /** Texto genérico */
  text?: string;

  /** Dropdown */
  options?: DataTableCellOption[];
  value?: string;

  /** Estado */
  status?: 'primary' | 'secondary' | 'correct' | 'error' | 'warning';

  /** Checkbox */
  checked?: boolean;
  checkboxId?: string;
  checkboxName?: string;
  showLabelCheckbox?: boolean;
  onChangeCheckbox?: (checked: boolean) => void;

  /** Buttons */
  onClickButton1?: () => void;
  onClickButton2?: () => void;
  onClickButton3?: () => void;

  /** General */
  disabled?: boolean;
};

/* =========================
   Component
========================= */

const DataTableCell = ({
  type,
  text = 'Text',

  options = [],
  value,

  status = 'primary',

  checked = false,
  checkboxId,
  checkboxName,
  showLabelCheckbox = true,
  onChangeCheckbox,

  onClickButton1,
  onClickButton2,
  onClickButton3,

  disabled = false,
}: DataTableCellProps) => {
  switch (type) {
    /* =========================
       HEADER
    ========================= */
    case 'header':
      return (
        <Box sx={{ width: '100%' }}>
          <Dropdown
            value={value}
            options={options}
            state={disabled ? 'disabled' : 'enable'}
          />
        </Box>
      );

    /* =========================
       NORMAL
    ========================= */
    case 'normal':
      return (
        <Box sx={{ width: '100%' }}>
          <Dropdown
            value={value}
            options={options}
            state={disabled ? 'disabled' : 'enable'}
          />
        </Box>
      );

    /* =========================
       BUTTONS
    ========================= */
    case 'buttons':
      return (
        <Box sx={{ display: 'flex', gap: spacingRem.extraSmall }}>
          <Button dsVariant="ghost" disabled={disabled} onClick={onClickButton1}>
            +
          </Button>
          <Button dsVariant="ghost" disabled={disabled} onClick={onClickButton2}>
            ✎
          </Button>
          <Button dsVariant="ghost" disabled={disabled} onClick={onClickButton3}>
            🗑
          </Button>
        </Box>
      );

    /* =========================
       STATE
    ========================= */
    case 'state':
      return (
        <StatusBadge
          text={text}
          dsColor={status}
          hasLeftIcon={false}
          hasRightIcon={false}
        />
      );

    /* =========================
       SELECT
    ========================= */
    case 'select':
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingRem.extraSmall }}>
          <Checkbox
            id={checkboxId}
            name={checkboxName}
            checked={checked}
            disabled={disabled}
            showLabel={showLabelCheckbox}
            onChange={(e) => onChangeCheckbox?.(e.target.checked)}
          >
            {showLabelCheckbox && text}
          </Checkbox>

          {!showLabelCheckbox && text && (
            <Typography sx={{ color: disabled ? black[400] : black[900] }}>
              {text}
            </Typography>
          )}
        </Box>
      );

    default:
      return null;
  }
};

export default DataTableCell;
export { DataTableCell };
