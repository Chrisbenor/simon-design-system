import * as React from 'react';
import { Box, Typography, TextField, Tooltip } from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { typography } from '../../foundation/typography';
import { spacingPx } from '../../foundation/spacing';
import { borderWidth } from '../../foundation/border';
import { aquamarine, black, red, green } from '../../foundation/colors';

export type DSTextAreaState = 'enable' | 'completed' | 'error' | 'disable' | 'success';
export type DSTextAreaPressed = 'no' | 'yes';

export type TextAreaProps = {
  isRequired?: boolean;

  hasInfoIcon?: boolean;

  hasLabel?: boolean;
  label?: string;

  supportText?: string;
  text?: string;

  hasIconSupportText?: boolean;

  hasOtherText?: boolean;
  otherText?: string;

  state?: DSTextAreaState;
  pressed?: DSTextAreaPressed;

  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  fullWidth?: boolean;
  name?: string;
  id?: string;

  infoTooltipText?: string;
  infoTooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';

  sx?: any;
};

const FIELD_HEIGHT = 88;
const focusRing = '0 0 0 3px rgba(0, 241, 199, 0.35)';

const stateTokens = (state: DSTextAreaState) => {
  let borderColor = black[200];
  let textColor = black[900];
  let supportColor = black[500];
  let labelColor = black[900];
  let asteriskColor = red[500];
  let disabledBg = black[50];

  if (state === 'error') {
    borderColor = red[500];
    supportColor = red[500];
  }

  if (state === 'success') {
    borderColor = green[500];
    supportColor = green[700] ?? green[500];
  }

  if (state === 'disable') {
    borderColor = black[100];
    textColor = black[400];
    supportColor = black[300];
    labelColor = black[400];
  }

  return {
    borderColor,
    textColor,
    supportColor,
    labelColor,
    asteriskColor,
    disabledBg,
  };
};

const TextArea = React.forwardRef<HTMLDivElement, TextAreaProps>(function TextArea(props, ref) {
  const {
    isRequired = false,
    hasInfoIcon = false,
    hasLabel = true,
    label = 'Label',

    supportText = 'Support Text',
    text = 'Text',

    hasIconSupportText = true,

    hasOtherText = false,
    otherText = '',

    state = 'enable',
    pressed = 'no',

    placeholder = 'Text',
    onChange,

    fullWidth = false,
    name,
    id,

    infoTooltipText,
    infoTooltipPlacement = 'top',

    sx,
  } = props;

  const disabled = state === 'disable';

  const { borderColor, textColor, supportColor, labelColor, asteriskColor, disabledBg } =
    stateTokens(state);

  const pressedBg = pressed === 'yes' ? 'rgba(0, 241, 199, 0.06)' : '#ffffff';

  const SupportIcon = (() => {
    if (!hasIconSupportText) return null;
    if (state === 'error') return ErrorOutlineIcon;
    if (state === 'success') return CheckCircleOutlineIcon;
    return InfoOutlinedIcon;
  })();

  const renderInfoIcon = () => {
    if (!hasInfoIcon) return null;

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
        <InfoOutlinedIcon sx={{ fontSize: 16 }} />
      </Box>
    );

    if (!infoTooltipText) return iconNode;

    return (
      <Tooltip title={infoTooltipText} placement={infoTooltipPlacement} arrow>
        {iconNode}
      </Tooltip>
    );
  };

  return (
    <Box ref={ref} sx={{ width: fullWidth ? '100%' : 'auto', ...(sx || {}) }}>
      {/* Label row */}
      {hasLabel && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start', 
            gap: 0.75,
            mb: 0.5,
          }}
        >
          <Typography
            sx={{
              ...typography.desktop.body.bold,
              color: labelColor,
              lineHeight: 1.2,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {label}
            {isRequired && (
              <Box component="span" sx={{ color: asteriskColor, ml: 0.5 }}>
                *
              </Box>
            )}
          </Typography>

          {renderInfoIcon()}
        </Box>
      )}

      {/* Field */}
      <TextField
        id={id}
        name={name}
        value={text}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        fullWidth={fullWidth}
        variant="outlined"
        multiline
        sx={{
          '& .MuiOutlinedInput-root': {
            height: FIELD_HEIGHT,
            alignItems: 'flex-start',
            background: disabled ? disabledBg : pressedBg,
            borderRadius: 2, 
            padding: 0,

            '& fieldset': {
              borderColor,
              borderWidth: `${borderWidth.extraSmall}px`,
              borderRadius: 2,
            },

            '&:hover fieldset': {
              borderColor:
                state === 'error'
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
            },

            '&.Mui-focused': {
              boxShadow: state === 'error' || state === 'success' ? 'none' : focusRing,
            },

            '&.Mui-disabled': {
              background: disabledBg,
            },
          },

          '& .MuiOutlinedInput-input': {
            ...typography.desktop.body.regular,
            color: textColor,
            padding: '12px 14px',
            lineHeight: 1.2,
            height: '100% !important',
            boxSizing: 'border-box',
            overflow: 'auto',
          },
        }}
      />

      {/* Support row */}
      {(supportText || (hasOtherText && otherText)) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 0.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
            {SupportIcon && (
              <SupportIcon sx={{ fontSize: 14, color: supportColor, flex: '0 0 auto' }} />
            )}

            {supportText && (
              <Typography
                noWrap
                sx={{
                  ...typography.desktop.bodyS.regular,
                  color: supportColor,
                  lineHeight: 1.2,
                  minWidth: 0,
                }}
              >
                {supportText}
              </Typography>
            )}
          </Box>

          {hasOtherText && otherText && (
            <Typography
              noWrap
              sx={{
                ...typography.desktop.bodyS.regular,
                color: supportColor,
                lineHeight: 1.2,
                flex: '0 0 auto',
                ml: 1,
              }}
            >
              {otherText}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
});

export default TextArea;
export { TextArea };
