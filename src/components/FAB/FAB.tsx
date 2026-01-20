import * as React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { borderWidth } from '../../foundation/border';
import { elevation } from '../../foundation/elevation';
import { aquamarine, black } from '../../foundation/colors';
import { gradientsButton } from '../../foundation/gradients';

export type FabSize = 's' | 'normal' | 'l';
export type FabType = 'principal' | 'secundario' | 'ghost';
export type FabState = 'default' | 'hover' | 'focus' | 'disabled';

export type SMFABProps = {
  icon: React.ReactNode;

  size?: FabSize;
  type?: FabType;
  state?: FabState;

  onClick?: () => void;
  disabled?: boolean;

  sx?: any;
};

const SIZE_MAP: Record<FabSize, { box: number; icon: number }> = {
  s: { box: 40, icon: 16 },
  normal: { box: 48, icon: 20 },
  l: { box: 60, icon: 24 },
};

const focusRing = `0 0 0 3px ${alpha(aquamarine[400], 0.35)}`;

const gradientBorder = (innerBg: string) => ({
  border: `${borderWidth.extraSmall}px solid transparent`,
  background: `${innerBg} padding-box, ${gradientsButton.borderDefault} border-box`,
});

const getVariantSx = (type: FabType): any => {
  if (type === 'secundario') {
    return {
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

      '&:focus-visible': {
        boxShadow: `0 0 0 3px rgba(0, 241, 199, 0.35)`,
      },

      '&:disabled': {
        backgroundColor: '#ffffff',
        color: black[400],
        boxShadow: 'none',
        '&::before': {
          background: black[200],
        },
      },
    };
  }

  if (type === 'ghost') {
    return {
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

      '&:focus-visible': {
        background: alpha(aquamarine[400], 0.06),
        color: aquamarine[800],
        boxShadow: focusRing,
      },

      '&:disabled': {
        background: 'transparent',
        borderColor: 'transparent',
        color: black[400],
      },
    };
  }

  return {
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

    '&:focus-visible': {
      background: gradientsButton.primaryHover,
      color: aquamarine[950],
      border: `${borderWidth.extraSmall}px solid ${gradientsButton.primaryHover}`,
      boxShadow: `${focusRing}, ${elevation.small}`,
    },

    '&:disabled': {
      background: '#E7E7E7',
      color: black[500],
      boxShadow: 'none',
    },
  };
};

const FAB = React.forwardRef<HTMLButtonElement, SMFABProps>(function FAB(
  { icon, size = 'normal', type = 'principal', state = 'default', onClick, disabled = false, sx },
  ref
) {
  const { box, icon: iconSize } = SIZE_MAP[size];

  const variantSx = getVariantSx(type);
  const isDisabled = disabled || state === 'disabled';

  const forcedStateSx: any =
    state === 'hover'
      ? { ...(variantSx['&:hover'] || {}) }
      : state === 'focus'
      ? { ...(variantSx['&:focus-visible'] || {}) }
      : state === 'disabled'
      ? { ...(variantSx['&:disabled'] || {}) }
      : {};

  return (
    <Box
      ref={ref}
      component="button"
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      sx={
        {
          width: box,
          height: box,
          minWidth: box,
          minHeight: box,

          borderRadius: 9999,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',

          userSelect: 'none',
          outline: 'none',
          padding: 0,

          appearance: 'none',
          WebkitAppearance: 'none',
          border: 'none',

          cursor: isDisabled ? 'not-allowed' : 'pointer',

          '& svg': { fontSize: iconSize },

          ...variantSx,

          ...(state !== 'default' ? forcedStateSx : null),

          ...(sx || {}),
        } as any
      }
    >
      {icon}
    </Box>
  );
});

export default FAB;
export { FAB };
