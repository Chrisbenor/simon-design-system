import * as React from 'react';
import { Box, BoxProps } from '@mui/material';

import { typography } from '../../foundation/typography';
import { spacingPx, spacingRem } from '../../foundation/spacing';
import { borderWidth } from '../../foundation/border';
import { aquamarine, black, green, red, yellow } from '../../foundation/colors';

export type StatusBadgeColor =
  | 'primary'
  | 'secondary'
  | 'correct'
  | 'error'
  | 'warning';

export type StatusBadgePill = 'no' | 'yes';

export type SMStatusBadgeProps = Omit<BoxProps, 'color'> & {
  hasText?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text?: string;
  dsColor?: StatusBadgeColor;
  dsPill?: StatusBadgePill;
};

const focusRing = `0 0 0 3px rgba(0, 241, 199, 0.35)`;

function DefaultLeftIcon() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.6 7.1l1.4 1.4L9.6 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DefaultRightIcon() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M4.2 5.6l2.8 2.8 2.8-2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const colorTokens = (dsColor: StatusBadgeColor) => {
  let bg = black[50];
  let border = black[50];
  let text = black[700];
  let icon = black[700];

  if (dsColor === 'primary') {
    bg = aquamarine[50];
    border = aquamarine[50];
    text = aquamarine[800];
    icon = aquamarine[800];
  }

  if (dsColor === 'correct') {
    bg = green[50];
    border = green[50];
    text = green[800];
    icon = green[800];
  }

  if (dsColor === 'error') {
    bg = red[50];
    border = red[50];
    text = red[800];
    icon = red[800];
  }

  if (dsColor === 'warning') {
    bg = yellow[50];
    border = yellow[50];
    text = yellow[800];
    icon = yellow[800];
  }

  return { bg, border, text, icon };
};

const StatusBadge = React.forwardRef(function StatusBadge(
  props: SMStatusBadgeProps,
  ref: any
) {
  const {
    hasText = true,
    hasLeftIcon = true,
    hasRightIcon = true,
    leftIcon,
    rightIcon,
    text = 'Badges',
    dsColor = 'primary',
    dsPill = 'no',
    ...rest
  } = props;

  const { bg, border, text: textColor, icon } = colorTokens(dsColor);
  const radius = dsPill === 'yes' ? 64 : 1;

  const resolvedLeftIcon = hasLeftIcon ? (leftIcon ?? <DefaultLeftIcon />) : null;
  const resolvedRightIcon = hasRightIcon ? (rightIcon ?? <DefaultRightIcon />) : null;

  const showLeft = Boolean(resolvedLeftIcon);
  const showRight = Boolean(resolvedRightIcon);
  const showText = Boolean(hasText && text);

  const typoMobile = typography.mobile.bodyS.semibold;
  const typoTablet = typography.tablet.bodyS.semibold;
  const typoDesktop = typography.desktop.body.semibold;

  return (
    <Box
      ref={ref}
      role="status"
      tabIndex={0}
      {...rest}
      sx={{
        width: 'fit-content',
        maxWidth: 'fit-content',
        minWidth: 'unset',
        whiteSpace: 'nowrap',
          
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',

        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'flex-start',

        height: { xs: 24, sm: 24, md: 24 },
        minHeight: { xs: 24, sm: 24, md: 24 },

        paddingInline: {
          xs: spacingRem.compact,
          sm: spacingRem.compact,
          md: spacingRem.compact,
        },

        gap: {
          xs: '8px',
          sm: '8px',
          md: '8px',
        },

        
        backgroundColor: bg,
        //border: `${borderWidth.extraSmall}px solid ${border}`,

        fontFamily: {
          xs: typoMobile.fontFamily,
          sm: typoTablet.fontFamily,
          md: typoDesktop.fontFamily,
        },
        fontSize: {
          xs: typoMobile.fontSize,
          sm: typoTablet.fontSize,
          md: typoDesktop.fontSize,
        },
        fontWeight: {
          xs: typoMobile.fontWeight,
          sm: typoTablet.fontWeight,
          md: typoDesktop.fontWeight,
        },
        lineHeight: {
          xs: typoMobile.lineHeight,
          sm: typoTablet.lineHeight,
          md: typoDesktop.lineHeight,
        },
        fontStyle: {
          xs: typoMobile.fontStyle,
          sm: typoTablet.fontStyle,
          md: typoDesktop.fontStyle,
        },

        color: textColor,
        userSelect: 'none',

        '& .DSStatusBadge-icon': {
          display: 'inline-flex',
          alignItems: 'center',
          lineHeight: 0,
          color: icon,
          flex: '0 0 auto',

          '& svg': {
            width: { xs: 12, sm: 14, md: 14 },
            height: { xs: 12, sm: 14, md: 14 },
          },
        },

        '&:focus-visible': {
          outline: 'none',
          boxShadow: focusRing,
        },

        ...(rest.sx || {}),
        borderRadius: radius,
      }}
    >
      {showLeft && <Box className="DSStatusBadge-icon">{resolvedLeftIcon}</Box>}
      {showText && <Box component="span">{text}</Box>}
      {showRight && <Box className="DSStatusBadge-icon">{resolvedRightIcon}</Box>}
    </Box>
  );
});

export default StatusBadge;
export { StatusBadge };
