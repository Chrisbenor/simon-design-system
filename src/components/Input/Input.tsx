import * as React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { typography } from '../../foundation/typography';
import { spacingPx } from '../../foundation/spacing';
import { borderWidth } from '../../foundation/border';
import { aquamarine, black, red, green } from '../../foundation/colors';

export type DSInputState =
  | 'enable'
  | 'completed'
  | 'error'
  | 'success'
  | 'disabled';

export type DSInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number';

export type DSInputProps = {
  label?: string;
  required?: boolean;
  infoIcon?: React.ReactNode;

  infoTooltipText?: string;

  infoTooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';

  dsType?: DSInputType;

  value?: string;
  placeholder?: string;
  onChange?: (event: any) => void;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;

  supportText?: string;
  state?: DSInputState;
  pressed?: boolean;

  fullWidth?: boolean;
  name?: string;
  id?: string;
};

const focusRing = '0 0 0 3px rgba(0, 241, 199, 0.35)';

const isValidEmail = (value: string) => {
  const v = value.trim();
  if (!v) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
};

const stateTokens = (state: DSInputState) => {
  let borderColor = black[200];
  let textColor = black[900];
  let supportColor = black[500];
  let labelColor = black[900];
  let asteriskColor = red[500];

  if (state === 'completed') {
    borderColor = aquamarine[400];
    supportColor = aquamarine[700];
  }

  if (state === 'success') {
    borderColor = green[500];
    supportColor = green[700];
  }

  if (state === 'error') {
    borderColor = red[500];
    supportColor = red[700];
  }

  if (state === 'disabled') {
    borderColor = black[200];
    textColor = black[400];
    supportColor = black[400];
    labelColor = black[500];
    asteriskColor = black[400];
  }

  return {
    borderColor,
    textColor,
    supportColor,
    labelColor,
    asteriskColor,
  };
};

const Input = React.forwardRef(function Input(props: DSInputProps, ref: any) {
  const {
    label,
    required,
    infoIcon,
    infoTooltipText,
    infoTooltipPlacement = 'top',

    dsType = 'text',

    value,
    placeholder,
    onChange,

    leftIcon,
    rightIcon,
    onRightIconClick,

    supportText,
    state = 'enable',
    pressed = false,

    fullWidth = true,
    name,
    id,
  } = props;

  const disabled = state === 'disabled';

  const [touched, setTouched] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const emailInvalid =
    dsType === 'email' &&
    touched &&
    !disabled &&
    state !== 'error' &&
    !isValidEmail(String(value ?? ''));

  const computedState: DSInputState = emailInvalid ? 'error' : state;

  const { borderColor, textColor, supportColor, labelColor, asteriskColor } =
    stateTokens(computedState);

  const pressedBg = pressed ? 'rgba(0, 241, 199, 0.06)' : '#ffffff';

  const helperText =
    supportText ??
    (dsType === 'email' && emailInvalid ? 'Enter a valid email address.' : null);

  const inputType =
    dsType === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : dsType === 'email'
      ? 'email'
      : dsType === 'number'
      ? 'number'
      : 'text';

  const renderInfoIcon = () => {
    if (!infoIcon) return null;

    const iconNode = (
      <Box
        component="span"
        sx={{
          color: supportColor,
          display: 'inline-flex',
          alignItems: 'center',
          lineHeight: 0,
          cursor: infoTooltipText ? 'help' : 'default',
        }}
      >
        {infoIcon}
      </Box>
    );

    if (!infoTooltipText) return iconNode;

    return (
      <Tooltip
        title={infoTooltipText}
        placement={infoTooltipPlacement}
        arrow
      >
        {iconNode}
      </Tooltip>
    );
  };

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
      {(label || infoIcon || required) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: spacingPx.minimum,
            mb: 0.25,
          }}
        >
          {label && (
            <Typography sx={{ ...typography.desktop.body.bold, color: labelColor }}>
              {label}
              {required && (
                <Box component="span" sx={{ color: asteriskColor, ml: 0.5 }}>
                  *
                </Box>
              )}
            </Typography>
          )}

          {renderInfoIcon()}
        </Box>
      )}

      <TextField
        inputRef={ref}
        type={inputType}
        id={id}
        name={name}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        disabled={disabled}
        fullWidth={fullWidth}
        variant="outlined"
        InputProps={{
          startAdornment: leftIcon ? (
            <InputAdornment position="start">
              <Box
                sx={{
                  color: supportColor,
                  display: 'flex',
                  alignItems: 'center',
                  lineHeight: 0,
                }}
              >
                {leftIcon}
              </Box>
            </InputAdornment>
          ) : undefined,

          endAdornment: dsType === 'password' ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setShowPassword((v: any) => !v)}
                disabled={disabled}
                sx={{ color: supportColor }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : rightIcon ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={onRightIconClick}
                disabled={disabled || !onRightIconClick}
                sx={{ color: supportColor }}
              >
                {rightIcon}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        sx={{
          '& .MuiInputBase-input': {
            ...typography.desktop.body.regular,
            color: textColor,
            padding: `${spacingPx.compact}px ${spacingPx.small}px`,
          },

          '& .MuiOutlinedInput-root': {
            background: pressedBg,
            borderRadius: 8,

            '& fieldset': {
              borderWidth: `${borderWidth.extraSmall}px`,
              borderColor,
            },

            '&:hover fieldset': {
              borderColor:
                computedState === 'error'
                  ? red[500]
                  : state === 'success'
                  ? green[500]
                  : aquamarine[400],
            },

            '&.Mui-focused fieldset': {
              borderColor:
                state === 'error'
                  ? red[500]
                  : state === 'success'
                  ? green[500]
                  : aquamarine[400],
              borderWidth: `${borderWidth.extraSmall}px`,
            },

            '&.Mui-focused': {
              boxShadow:
                state === 'error' ? 'none' : state === 'success' ? 'none' : focusRing,
            },

            '&.Mui-disabled': {
              background: black[50],
            },
          },

          '& .MuiFormHelperText-root': {
            ...typography.desktop.bodyS.regular,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0.5,
            lineHeight: 1.2,
            minHeight: 0,
            color: supportColor,
          },
        }}
        helperText={helperText}
      />
    </Box>
  );
});

export default Input;
export { Input };
