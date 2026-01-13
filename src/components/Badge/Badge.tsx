import * as React from 'react';
import { Box, BoxProps } from '@mui/material';

import { typography } from '../../foundation/typography';
import { spacingPx } from '../../foundation/spacing';
import { borderWidth } from '../../foundation/border';
import { aquamarine, black, green, red, yellow } from '../../foundation/colors';

export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'correct'
  | 'error'
  | 'warning';

export type BadgePill = 'no' | 'yes';

export type BadgeProps = Omit<BoxProps, 'color'> & {
  hasText?: boolean;
  text?: string;
  dsColor?: BadgeColor;
  dsPill?: BadgePill;
};

const focusRing = `0 0 0 3px rgba(0, 241, 199, 0.35)`;

const colorTokens = (dsColor: BadgeColor) => {
  let bg = black[50];
  let border = black[50];
  let text = black[700];

  if (dsColor === 'primary') {
    bg = aquamarine[50];
    border = aquamarine[50];
    text = aquamarine[800];
  }

  if (dsColor === 'correct') {
    bg = green[50];
    border = green[50];
    text = green[800];
  }

  if (dsColor === 'error') {
    bg = red[50];
    border = red[50];
    text = red[800];
  }

  if (dsColor === 'warning') {
    bg = yellow[50];
    border = yellow[50];
    text = yellow[800];
  }

  return { bg, border, text };
};

const Badge = React.forwardRef(function Badge(props: BadgeProps, ref: any) {
  const {
    hasText = true,
    text = 'Badges',
    dsColor = 'primary',
    dsPill = 'no',
    ...rest
  } = props;

  const { bg, border, text: textColor } = colorTokens(dsColor);
  const radius = dsPill === 'yes' ? 64 : 1;

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
        width: '    ',
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
          xs: spacingPx.compact,
          sm: spacingPx.compact,
          md: spacingPx.compact,
        },

        borderRadius: radius,
        backgroundColor: bg,
        border: `${borderWidth.extraSmall}px solid ${border}`,

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

        '&:focus-visible': {
          outline: 'none',
          boxShadow: focusRing,
        },

        ...(rest.sx || {}),
      }}
    >
      {showText && <Box component="span">{text}</Box>}
    </Box>
  );
});

export default Badge;
export { Badge };
