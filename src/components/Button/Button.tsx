import * as React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { typography } from '../../foundation/typography';
import { borderWidth } from '../../foundation/border';
import { elevation } from '../../foundation/elevation';
import { aquamarine, black } from '../../foundation/colors';
import { gradientsButton } from '../../foundation/gradients';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

export type SMButtonProps = Omit<MuiButtonProps, 'variant' | 'size' | 'color'> & {
  dsVariant?: ButtonVariant;
  dsSize?: ButtonSize;
  iconLeft?: unknown;
  iconRight?: unknown;
};

const sizeStyles: Record<ButtonSize, any> = {
  small: {
    ...typography.desktop.bodyS.bold,
    height: 32,
    minHeight: 32,
    paddingInline: 16,
  },
  medium: {
    ...typography.desktop.body.bold,
    height: 40,
    minHeight: 40,
    paddingInline: 20,
  },
  large: {
    ...typography.desktop.body.bold,
    height: 48,
    minHeight: 48,
    paddingInline: 24,
  },
};

const gradientBorder = (innerBg: string) => ({
  border: `${borderWidth.extraSmall}px solid transparent`,
  background: `${innerBg} padding-box, ${gradientsButton.borderDefault} border-box`,
});

const focusRing = `0 0 0 3px ${alpha(aquamarine[400], 0.35)}`;

const focusSelectors = {
  '&.Mui-focusVisible': {},
  '&:focus-visible': {},
};

const variantStyles: Record<ButtonVariant, any> = {
  
  primary: {
    background: gradientsButton.primaryDefault,
    color: aquamarine[950],
    border: `${borderWidth.extraSmall}px solid transparent`,
    boxShadow: elevation.extraSmall,

    '&:hover': {
      background: aquamarine[600],
      color: aquamarine[50], 
      boxShadow: elevation.small,
    },

    '&:active': {
      background: gradientsButton.primaryPressed,
      color: aquamarine[50],
      boxShadow: elevation.extraSmall,
    },

    ...focusSelectors,
    '&.Mui-focusVisible, &:focus-visible': {
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
    boxShadow: 'none',
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

    '&.Mui-focusVisible, &:focus-visible': {
        boxShadow: `0 0 0 3px rgba(0, 241, 199, 0.35)`,
    },

    '&.Mui-disabled': {
        backgroundColor: '#ffffff',
        color: black[400],
        boxShadow: 'none',
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
      background: aquamarine[50],
      color: aquamarine[800],
    },

    '&:active': {
      ...gradientBorder('#ffffff'),
      color: aquamarine[800],
      boxShadow: 'none',
    },

    ...focusSelectors,
    '&.Mui-focusVisible, &:focus-visible': {
      background: alpha(aquamarine[400], 0.06),
      color: aquamarine[800],
      boxShadow: focusRing,
    },

    '&.Mui-disabled': {
      background: 'transparent',
      borderColor: 'transparent',
      color: black[400],
    },
  },
};

const Button = React.forwardRef(function Button(props: SMButtonProps, ref: any) {
  const {
    dsVariant = 'primary',
    dsSize = 'medium',
    iconLeft,
    iconRight,
    children,
    disabled,
    ...rest
  } = props;

  return (
    <MuiButton
      ref={ref}
      disabled={disabled}
      disableElevation
      {...rest}
      startIcon={iconLeft as any}
      endIcon={iconRight as any}
      sx={{
        borderRadius: 9999,
        textTransform: 'none',

        // fixed component behavior like Figma
        width: 'auto',
        minWidth: 'unset',
        whiteSpace: 'nowrap',

        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',

        fontFamily: typography.desktop.body.bold.fontFamily,
        lineHeight: typography.desktop.body.bold.lineHeight,

        ...sizeStyles[dsSize],
        ...variantStyles[dsVariant],

        ...(rest.sx || {}),
      }}
    >
      {children}
    </MuiButton>
  );
});

export default Button;
export { Button };