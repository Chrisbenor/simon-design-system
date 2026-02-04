import * as React from 'react';
import { Box, Icon, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';
import StatusBadge from '../StatusBadge/StatusBadge';
import Checkbox from '../Checkbox/Checkbox';

import { spacingRem } from '../../foundation/spacing';
import { aquamarine, black } from '../../foundation/colors';
import { typography } from '../../foundation';

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
  buttonIcon1Src?: string;
  buttonIcon2Src?: string;
  buttonIcon3Src?: string;

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

  buttonIcon1Src,
  buttonIcon2Src,
  buttonIcon3Src,

  onClickButton1,
  onClickButton2,
  onClickButton3,

  disabled = false,
}: DataTableCellProps) => {

  const defaultOpen = false;

  const [open, setOpen] = React.useState(defaultOpen);

  const toggle = () => {
    if (!disabled) {
      setOpen((prev) => !prev);
    }
  };


  switch (type) {
    /* =========================
       HEADER
    ========================= */
    case 'header':
      return (
        <Box
            sx={{
              width: 'auto',
              borderRadius: 0,
              backgroundColor: aquamarine[50],
              border: `0px solid transparent`,
              borderBottom: `1px solid ${aquamarine[600]}`,
              boxShadow: 'none',
            }}
            >
        <Box
          onClick={toggle}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacingRem.minimum,
            padding: spacingRem.compact,
            paddingLeft: spacingRem.extraSmall,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
        >
           <Typography
              sx={{
                ...typography.desktop.body.semibold,
                color: aquamarine[800],
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {text}
            </Typography>

         <Box
            sx={{
              color: aquamarine[600],
              display: 'flex',
              alignItems: 'center',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              pointerEvents: 'none', // 🔑 extra seguridad
            }}
          >
            <ExpandMoreIcon />
          </Box>
        </Box>
        </Box>
      );

    /* =========================
       NORMAL
    ========================= */
    case 'normal':
      return (
        <Box
            sx={{
              width: 'auto',
              borderRadius: 0,
              backgroundColor: '#fff',
              border: `0px solid transparent`,
              borderRight: `1px solid ${black[100]}`,
              boxShadow: 'none',
            }}
            >
        <Box
          onClick={toggle}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacingRem.minimum,
            padding: spacingRem.compact,
            paddingLeft: spacingRem.extraSmall,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
        >
           <Typography
              sx={{
                ...typography.desktop.body.regular,
                color: black[900],
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {text}
            </Typography>

         <Box
            sx={{
              color: black[400],
              display: 'flex',
              alignItems: 'center',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              pointerEvents: 'none', // 🔑 extra seguridad
            }}
          >
            <ExpandMoreIcon />
          </Box>
        </Box>
        </Box>
      );

    /* =========================
       BUTTONS
    ========================= */
    case 'buttons':
      return (
        <Box sx={{ display: 'flex', gap: spacingRem.extraSmall }}>
          {buttonIcon1Src && (
            <Button dsVariant="ghost" disabled={disabled} onClick={onClickButton1}>
              <img src={buttonIcon1Src} alt="" width={16} height={16} />
            </Button>
          )}

          {buttonIcon2Src && (
            <Button dsVariant="ghost" disabled={disabled} onClick={onClickButton2}>
              <img src={buttonIcon2Src} alt="" width={16} height={16} />
            </Button>
          )}

          {buttonIcon3Src && (
            <Button dsVariant="ghost" disabled={disabled} onClick={onClickButton3}>
              <img src={buttonIcon3Src} alt="" width={16} height={16} />
            </Button>
          )}
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
