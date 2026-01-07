// src/components/PaginationItem/PaginationItem.tsx
import * as React from 'react';
import { ButtonBase, ButtonBaseProps, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { typography } from '../../foundation/typography';
import { borderWidth } from '../../foundation/border';
import { elevation } from '../../foundation/elevation';
import { aquamarine, black } from '../../foundation/colors';

export type DSPaginationItemState = 'normal' | 'selected' | 'disabled';

export type DSPaginationItemProps = Omit<ButtonBaseProps, 'disabled' | 'style'> & {
  
  paginationText?: React.ReactNode;

  showText?: boolean;

  state?: DSPaginationItemState;

  forceHover?: boolean;
  forcePressed?: boolean;

  sx?: any;
};

const SIZE_W = 41;
const SIZE_H = 43;
const RADIUS = 4;

const focusRing = `0 0 0 3px ${alpha(aquamarine[400], 0.35)}`;

const tokensByState = (
  state: DSPaginationItemState,
  hovered: boolean,
  pressed: boolean
) => {
  const isDisabled = state === 'disabled';
  const isSelected = state === 'selected';

  let bg = '#FFFFFF';
  let border = black[100];
  let text = black[400];
  let shadow: string = 'none';

  if (isDisabled) {
    bg = black[100];
    border = black[100];
    text = black[200];
    shadow = 'none';
    return { bg, border, text, shadow };
  }

  if (isSelected) {
    bg = aquamarine[400];
    border = aquamarine[400];
    text = '#FFFFFF';
    shadow = 'none';
  }

  if (hovered && !isSelected) {
    bg = aquamarine[50];
    border = aquamarine[400];
    text = black[900];
    shadow = elevation.extraSmall;
  }

  if (pressed) {
    if (!isSelected) {
      bg = alpha(aquamarine[400], 0.10);
      border = aquamarine[400];
      text = black[900];
    }
    shadow = 'none';
  }

  return { bg, border, text, shadow };
};

const PaginationItem = React.forwardRef(function PaginationItem(
  props: DSPaginationItemProps,
  ref: any
) {
  const {
    paginationText = '1',
    showText = true,

    state = 'normal',

    forceHover = false,
    forcePressed = false,

    sx,

    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,

    ...rest
  } = props;

  const disabled = state === 'disabled';

  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const effectiveHovered = forceHover || hovered;
  const effectivePressed = forcePressed || pressed;

  const { bg, border, text, shadow } = tokensByState(
    state,
    effectiveHovered,
    effectivePressed
  );

  return (
    <ButtonBase
      ref={ref}
      disabled={disabled}
      focusRipple={false}
      onMouseEnter={(e) => {
        if (!disabled) setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        setPressed(false);
        onMouseLeave?.(e);
      }}
      onMouseDown={(e) => {
        if (!disabled) setPressed(true);
        onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        setPressed(false);
        onMouseUp?.(e);
      }}
      sx={{
        width: SIZE_W,
        height: SIZE_H,
        boxSizing: 'border-box',
        borderRadius: `${RADIUS}px`,

        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: bg,
        border: `${borderWidth.extraSmall}px solid ${border}`,
        boxShadow: shadow,

        ...typography.mobile.body.regular,
        color: text,

        '&.Mui-focusVisible, &:focus-visible': {
          boxShadow: focusRing,
          borderColor: aquamarine[400],
        },

        ...(sx || {}),
      }}
      {...rest}
    >
      {showText && (
        <Box component="span" sx={{ lineHeight: 1, userSelect: 'none' }}>
          {paginationText}
        </Box>
      )}
    </ButtonBase>
  );
});

export default PaginationItem;
export { PaginationItem };
