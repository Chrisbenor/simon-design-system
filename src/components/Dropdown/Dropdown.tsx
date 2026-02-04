import * as React from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

import { spacingRem } from '../../foundation/spacing';
import { black, aquamarine, green, red } from '../../foundation/colors';

/* =========================
   Types
========================= */

export type DropdownState =
  | 'enable'
  | 'selected'
  | 'error'
  | 'success'
  | 'disabled';

export type DropdownOption = {
  value: string;
  label: string;
};

export type DropdownProps = {
  label?: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  options: DropdownOption[];
  supportText?: string;
  state?: DropdownState;
  onChange?: (value: string) => void;
  sx?: any;
};

/* =========================
   Helpers
========================= */

const getBorderColor = (state: DropdownState) => {
  switch (state) {
    case 'error':
      return red[500];
    case 'success':
      return green[500];
    case 'selected':
      return aquamarine[500];
    case 'disabled':
      return black[200];
    default:
      return black[300];
  }
};

const getSupportTextColor = (state: DropdownState) => {
  switch (state) {
    case 'error':
      return red[500];
    case 'success':
      return green[500];
    default:
      return black[400];
  }
};

/* =========================
   Component
========================= */

const Dropdown = ({
  label,
  required = false,
  value = '',
  placeholder = 'Text',
  options,
  supportText,
  state = 'enable',
  onChange,
  sx,
}: DropdownProps) => {
  const disabled = state === 'disabled';

  const handleChange = (event: SelectChangeEvent) => {
    onChange?.(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', ...(sx || {}) }}>
      {/* Label */}
      {label && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: spacingRem.extraSmall,
            marginBottom: spacingRem.extraSmall,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: black[500], fontWeight: 500 }}
          >
            {label}
            {required && (
              <Typography
                component="span"
                sx={{ color: red[500], marginLeft: 0.25 }}
              >
                *
              </Typography>
            )}
          </Typography>
        </Box>
      )}

      {/* Select */}
      <FormControl fullWidth disabled={disabled}>
        <Select
          value={value}
          displayEmpty
          onChange={handleChange}
          sx={{
            height: 40,
            borderRadius: 4,
            backgroundColor: disabled ? black[100] : '#FFFFFF',
            color: disabled ? black[400] : black[900],

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: getBorderColor(state),
            },

            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: getBorderColor(state),
            },

            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor:
                state === 'enable' ? aquamarine[500] : getBorderColor(state),
            },
          }}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Typography sx={{ color: black[400] }}>
                  {placeholder}
                </Typography>
              );
            }

            return options.find(o => o.value === selected)?.label;
          }}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Support Text */}
      {supportText && (
        <Typography
          variant="caption"
          sx={{
            marginTop: spacingRem.extraSmall,
            color: getSupportTextColor(state),
          }}
        >
          {supportText}
        </Typography>
      )}
    </Box>
  );
};

export default Dropdown;
export { Dropdown };
