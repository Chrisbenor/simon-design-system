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
import StatusBadge from '../StatusBadge/StatusBadge';

/* =========================
   Types
========================= */

export type SelectState =
  | 'enable'
  | 'selected'
  | 'error'
  | 'success'
  | 'disabled';

export type SelectOption = {
  value: string;
  label: string;
};

export type MultipleSelectProps = {
  label?: string;
  required?: boolean;

  value?: string[];
  options: SelectOption[];

  placeholder?: string;

  supportText?: string;
  hasSupportText?: boolean;

  state?: SelectState;
  isBadge?: boolean;

  onChange?: (value: string[]) => void;
  sx?: any;
};

/* =========================
   Helpers
========================= */

const getBorderColor = (state: SelectState) => {
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

const getSupportTextColor = (state: SelectState) => {
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

const MultipleSelect = ({
  label,
  required = false,

  value = [],
  options,

  placeholder = 'Text',

  supportText,
  hasSupportText = false,

  state = 'enable',
  isBadge = true,

  onChange,
  sx,
}: MultipleSelectProps) => {
  const disabled = state === 'disabled';

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newValue =
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value;

    onChange?.(newValue);
  };

  const handleRemove = (val: string) => {
    onChange?.(value.filter(v => v !== val));
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
          <Typography sx={{ color: black[500], fontWeight: 500 }}>
            {label}
            {required && (
              <Typography component="span" sx={{ color: red[500], ml: 0.25 }}>
                *
              </Typography>
            )}
          </Typography>
        </Box>
      )}

      {/* Select */}
      <FormControl fullWidth disabled={disabled}>
        <Select
          multiple
          displayEmpty
          value={value}
          onChange={handleChange}
          sx={{
            minHeight: 40,
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
                boxShadow: 'none',
                borderColor:
                state === 'enable'
                    ? aquamarine[500]
                    : getBorderColor(state),
            },

            // ✅ ESTE es el único padding que debe existir
            '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: spacingRem.compact,

                padding: `${spacingRem.compact} ${spacingRem.extraSmall} ${spacingRem.compact} ${spacingRem.extraSmall} `, // ← controla TODO desde aquí
                boxSizing: 'border-box',
                boxShadow: 'none',
            },
            }}
            renderValue={(selected) => {
                if (!selected.length) {
                return (
                    <Typography sx={{ color: black[400] }}>
                    {placeholder}
                    </Typography>
                );
                }

                if (!isBadge) {
                return selected
                    .map(val => options.find(o => o.value === val)?.label ?? val)
                    .join(', ');
                }

                return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(val => {
                    const option = options.find(o => o.value === val);

                    return (
                    <StatusBadge
                            key={val}
                            text={option?.label ?? val}
                            dsColor="secondary"
                            rightIcon={!disabled ? <CloseIcon /> : undefined}
                            hasLeftIcon={false}
                            hasRightIcon={!disabled}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={
                                !disabled
                                ? () => handleRemove(val)
                                : undefined
                            }
                            sx={{
                                cursor: disabled ? 'default' : 'pointer',
                                opacity: disabled ? 0.6 : 1,
                            }}
                        />
                    );
                    })}
                </Box>
                );
            }}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Support text */}
      {hasSupportText && supportText && (
        <Typography
          variant="caption"
          sx={{
            marginTop: spacingRem.minimum,
            color: getSupportTextColor(state),
          }}
        >
          {supportText}
        </Typography>
      )}
    </Box>
  );
};

export default MultipleSelect;
export { MultipleSelect };


function CloseIcon() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M4 4l6 6M10 4l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

