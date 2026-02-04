import * as React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { typography } from '../../foundation/typography';
import { borderWidth } from '../../foundation/border';
import { elevation } from '../../foundation/elevation';
import { aquamarine, black } from '../../foundation/colors';
import { gradientsButton } from '../../foundation/gradients';

/* =========================
   Types
========================= */

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

export type SMButtonProps = Omit<
  MuiButtonProps,
  'variant' | 'size' | 'color'
> & {
  dsVariant?: ButtonVariant;
  dsSize?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;

  fullWidth?: boolean;
};

/* =========================
   Size styles
========================= */

const sizeStyles: Record<ButtonSize, any> = {
  small: {
    ...typography.desktop.bodyS.bold,
    height: 32,
    minHeight: 32,
  },
  medium: {
    ...typography.desktop.body.bold,
    height: 40,
    minHeight: 40,
  },
  large: {
    ...typography.desktop.body.bold,
    height: 48,
    minHeight: 48,
  },
};

/* =========================
   Helpers
========================= */

const gradientBorder = (innerBg: string) => ({
  border: `${borderWidth.extraSmall}px solid transparent`,
  background: `${innerBg} padding-box, ${gradientsButton.borderDefault} border-box`,
});

const focusRing = `0 0 0 3px ${alpha(aquamarine[400], 0.35)}`;

/* =========================
   Variant styles
========================= */

const variantStyles: Record<ButtonVariant, any> = {
  primary: {
    background: gradientsButton.primaryDefault,
    color: aquamarine[950],
    border: `${borderWidth.extraSmall}px solid transparent`,
    boxShadow: elevation.extraSmall,

    '&:hover': {
      background: aquamarine[600],
      border: `${borderWidth.extraSmall}px solid transparent`,
      color: aquamarine[50],
      boxShadow: 'none',
    },

    '&:active': {
      background: gradientsButton.primaryPressed,
      border: `${borderWidth.extraSmall}px solid transparent`,
      color: aquamarine[50],
      boxShadow: elevation.extraSmall,
    },

    '&.Mui-focusVisible': {
      background: gradientsButton.primaryHover,
      color: aquamarine[950],
      border: `${borderWidth.extraSmall}px solid ${gradientsButton.primaryHover}`,
      boxShadow: `${focusRing}, ${elevation.small}`,
    },

    '&.Mui-disabled': {
      background: '#E7E7E7',
      color: black[500],
      boxShadow: 'none',
    },
  },

  secondary: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 9999,
    backgroundColor: '#ffffff',
    color: aquamarine[700],
    border: `${borderWidth.extraSmall}px solid transparent`,

    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      padding: `${borderWidth.small}px`,
      borderRadius: 9999,
      background: gradientsButton.borderVertical,
      WebkitMask:
        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    },

    '& > *': {
      position: 'relative',
      zIndex: 1,
    },

    '&:hover': {
      backgroundColor: aquamarine[50],
      color: aquamarine[800],
    },

    '&:active': {
      backgroundColor: '#ffffff',
      color: aquamarine[800],
      boxShadow: `0 0 0 4px rgba(0, 241, 199, 0.25)`,
    },

    '&.Mui-focusVisible': {
      boxShadow: `0 0 0 3px rgba(0, 241, 199, 0.35)`,
    },

    '&.Mui-disabled': {
      color: black[400],
      '&::before': {
        background: black[200],
      },
    },
  },

  ghost: {
    background: 'transparent',
    border: `${borderWidth.extraSmall}px solid transparent`,
    color: aquamarine[700],
    boxShadow: 'none',

    '&:hover': {
      border: `${borderWidth.extraSmall}px solid transparent`,
      background: aquamarine[50],
      color: aquamarine[800],
    },

    '&:active': {
      ...gradientBorder('#ffffff'),
      color: aquamarine[800],
    },

    '&.Mui-focusVisible': {
      background: alpha(aquamarine[400], 0.06),
      color: aquamarine[800],
      boxShadow: focusRing,
    },

    '&.Mui-disabled': {
      color: black[400],
    },
  },
};

/* =========================
   Component
========================= */

const Button = React.forwardRef<HTMLButtonElement, SMButtonProps>(
  function Button(props, ref) {
    const {
      dsVariant = 'primary',
      dsSize = 'medium',
      iconLeft,
      iconRight,
      children,
      disabled,
      fullWidth = false,
      ...rest
    } = props;

    return (
      <MuiButton
        ref={ref}
        disabled={disabled}
        disableRipple
        disableFocusRipple
        disableTouchRipple
        {...rest}
        startIcon={iconLeft}
        endIcon={iconRight}
        sx={{
          borderRadius: 9999,
          textTransform: 'none',

          padding: '8px 16px',

          width: fullWidth ? '100%' : 'fit-content',
          minWidth: 'unset',
          whiteSpace: 'nowrap',

          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',

          fontFamily: typography.desktop.body.bold.fontFamily,
          lineHeight: typography.desktop.body.bold.lineHeight,

          outline: 'none',
          '&:focus, &:focus-visible': { outline: 'none' },

          ...sizeStyles[dsSize],
          ...variantStyles[dsVariant],

          ...(rest.sx || {}),
        }}
      >
        {children}
      </MuiButton>
    );
  }
);

export default Button;
export { Button };
