import * as React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';

import { typography } from '../../foundation/typography';
import { aquamarine, black } from '../../foundation/colors';
import { gradientsButton } from '../../foundation/gradients';

// 👉 imports EXACTAMENTE como en CardsMap
import ReportIcon from '../../assets/icons/report.svg';
import ReportSelectedIcon from '../../assets/icons/report-selected.svg';

import MapPinIcon from '../../assets/icons/map-pin.svg';
import MapPinSelectedIcon from '../../assets/icons/map-pin-selected.svg';

import MapPinnedIcon from '../../assets/icons/map-pinned.svg';
import MapPinnedSelectedIcon from '../../assets/icons/map-pinned-selected.svg';

import BriefcaseIcon from '../../assets/icons/briefcase-business.svg';
import BriefcaseSelectedIcon from '../../assets/icons/briefcase-business-selected.svg';

export type MenuItemItem = 'reportes' | 'mapa' | 'geocercas' | 'guantera';
export type MenuItemState = 'selected' | 'enable' | 'hover';

export type MenuItemProps = {
  hasIcon?: boolean;
  item?: MenuItemItem;
  state?: MenuItemState;
  label: string;
  onClick?: () => void;
};

const iconMap = {
  reportes: {
    normal: ReportIcon,
    selected: ReportSelectedIcon,
  },
  mapa: {
    normal: MapPinIcon,
    selected: MapPinSelectedIcon,
  },
  geocercas: {
    normal: MapPinnedIcon,
    selected: MapPinnedSelectedIcon,
  },
  guantera: {
    normal: BriefcaseIcon,
    selected: BriefcaseSelectedIcon,
  },
} as const;

const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  function MenuItem(
    {
      hasIcon = true,
      item = 'reportes',
      state = 'enable',
      label,
      onClick,
    },
    ref
  ) {
    const isSelected = state === 'selected';
    const isHover = state === 'hover';

    const textColor = isSelected ? aquamarine[950] : black[400];

    const bgImage = isSelected ? `linear-gradient(90deg, ${aquamarine[400]} 0%, ${aquamarine[50]} 100%)` : 'none';
    const hoverBgColor = isSelected ? 'transparent' : aquamarine[50];

    const icons = iconMap[item];
    const iconSrc = isSelected ? icons.selected : icons.normal;

    return (
      <ButtonBase
        ref={ref}
        onClick={onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderRadius: '12px',
          justifyContent: 'flex-start',
          width: '100%',
          textAlign: 'left',
          color: textColor,
          backgroundColor: isHover && !isSelected ? aquamarine[50] : 'transparent',
          backgroundImage: bgImage,
          '&:hover': {
            backgroundColor: hoverBgColor,
          },
        }}
      >
        {hasIcon && (
          <Box
            component="img"
            src={iconSrc}
            alt={item}
            sx={{
              width: 20,
              height: 20,
              flex: '0 0 auto',
              opacity: isSelected ? 1 : 0.7,
              display: 'block',
            }}
          />
        )}

        <Typography
          noWrap
          sx={{
            ...typography.desktop.body.regular,
            color: textColor,
            flex: 1,
            minWidth: 0,
            lineHeight: '16px',
          }}
        >
          {label}
        </Typography>
      </ButtonBase>
    );
  }
);

export default MenuItem;
export { MenuItem };
