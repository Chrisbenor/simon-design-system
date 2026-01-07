import * as React from 'react';
import { Box, Typography } from '@mui/material';

import { typography } from '../../foundation/typography';
import { spacingPx } from '../../foundation/spacing';
import { borderWidth } from '../../foundation/border';
import { aquamarine, black } from '../../foundation/colors';

export type DSCheckboxProps = {
  /** Label content rendered to the right (optional). Use children instead of label prop. */
  children?: React.ReactNode;
  showLabel?: boolean;

  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: any, checked: boolean) => void;

  disabled?: boolean;

  name?: string;
  id?: string;

  fullWidth?: boolean;
  sx?: any;
};

const CHECK_SIZE = 20;
const HIT = 36;
const RADIUS = 0;

const Checkbox = React.forwardRef(function Checkbox(props: DSCheckboxProps, ref: any) {
  const {
    children,
    showLabel = true,

    checked,
    defaultChecked,
    onChange,

    disabled = false,

    name,
    id,

    fullWidth = false,
    sx,
  } = props;

  const isControlled = typeof checked === 'boolean';
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const isChecked = isControlled ? (checked as boolean) : internal;

  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const handleChange = (e: any) => {
    const next = Boolean(e?.target?.checked);
    if (!isControlled) setInternal(next);
    onChange?.(e, next);
  };

  const rowBg = disabled
    ? 'transparent'
    : pressed
    ? 'rgba(0, 241, 199, 0.10)'
    : hovered
    ? 'rgba(0, 241, 199, 0.06)'
    : 'transparent';

  const borderColor = disabled
    ? black[200]
    : pressed || hovered
    ? aquamarine[400]
    : black[300];

  const bgColor = isChecked
    ? disabled
      ? aquamarine[100]
      : aquamarine[400]
    : disabled
    ? black[100]
    : '#FFFFFF';

  const checkColor = disabled ? 'rgba(255, 255, 255, 0.65)' : '#FFFFFF';

  const effectiveBorder = isChecked
    ? `${borderWidth.extraSmall}px solid transparent`
    : `${borderWidth.extraSmall}px solid ${borderColor}`;

  const labelColor = disabled ? black[400] : black[900];

  return (
    <Box
      component="label"
      htmlFor={id}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      sx={{
        width: fullWidth ? '100%' : 'fit-content',
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacingPx.compact,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        borderRadius: 8,
        backgroundColor: rowBg,
        ...(sx || {}),
      }}
    >
      <Box
        sx={{
          width: HIT,
          height: HIT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative',
          flex: '0 0 auto',
        }}
      >
        <Box
          sx={{
            width: CHECK_SIZE,
            height: CHECK_SIZE,
            boxSizing: 'border-box',
            borderRadius: RADIUS,
            border: effectiveBorder,
            backgroundColor: bgColor,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {isChecked && (
            <Box
              sx={{
                width: 6,
                height: 3,
                borderLeft: `2px solid ${checkColor}`,
                borderBottom: `2px solid ${checkColor}`,
                transform: 'rotate(-45deg)',
                marginTop: '-1px',
              }}
            />
          )}
        </Box>

        <Box
          component="input"
          ref={ref}
          id={id}
          name={name}
          type="checkbox"
          checked={isChecked}
          defaultChecked={undefined}
          disabled={disabled}
          onChange={handleChange}
          onBlur={() => setPressed(false)}
          sx={{
            position: 'absolute',
            inset: 0,
            margin: 0,
            padding: 0,
            opacity: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        />
      </Box>

      {showLabel && children != null && children !== '' && (
        <Typography
          sx={{
            ...typography.desktop.h6.regular,
            color: labelColor,
          }}
        >
          {children}
        </Typography>
      )}
    </Box>
  );
});

export default Checkbox;
export { Checkbox };
