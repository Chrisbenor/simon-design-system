import * as React from 'react';
import {
  Box,
  ButtonBase,
  Typography,
  Collapse,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { typography } from '../../foundation/typography';
import { aquamarine, black } from '../../foundation/colors';
import { spacingRem } from '../../foundation/spacing';

// Icons
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

export type MenuItemSubItem = {
  key: string;
  label: string;
  state?: MenuItemState;
  onClick?: () => void;
};

export type MenuItemProps = {
  hasIcon?: boolean;
  item?: MenuItemItem;
  state?: MenuItemState;
  label: string;

  collapsed?: boolean;

  /** Dropdown */
  hasDropdown?: boolean;
  items?: MenuItemSubItem[];

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

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem(
    {
      hasIcon = true,
      item = 'reportes',
      state = 'enable',
      label,
      collapsed = false,

      hasDropdown = false,
      items = [],

      onClick,
    },
    ref
  ) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      if (collapsed) {
        setOpen(false);
      }
    }, [collapsed]);

    const isSelected = state === 'selected';

    const textColor = isSelected ? aquamarine[950] : black[400];

    const bgImage = isSelected
      ? `linear-gradient(90deg, ${aquamarine[400]} 0%, ${aquamarine[50]} 100%)`
      : 'none';

    const hoverBgColor = isSelected ? 'transparent' : aquamarine[50];

    const icons = iconMap[item];
    const iconSrc = isSelected ? icons.selected : icons.normal;

    const hasRealDropdown = hasDropdown && items.length > 0;

    const handleMainClick = () => {
      if (hasRealDropdown) {
        setOpen((v) => !v);
      }
      onClick?.();
    };

    return (
      <Box ref={ref}>
        {/* Main item */}
        <ButtonBase
          onClick={handleMainClick}
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
              }}
            />
          )}

          {!collapsed && (
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
          )}

          {hasRealDropdown && !collapsed && (
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 20,
                color: black[500],
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          )}
        </ButtonBase>

        {/* Dropdown items */}
        {hasRealDropdown && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                marginLeft: spacingRem.compact,
                marginTop: 0.5,
              }}
            >
              {items.map((sub) => (
                <ButtonBase
                  key={sub.key}
                  onClick={() => {
                    sub.onClick?.();
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1,
                    borderRadius: '10px',
                    textAlign: 'left',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: aquamarine[50],
                    },
                  }}
                >
                  <Typography
                    noWrap
                    sx={{
                      ...typography.desktop.bodyS.regular,
                      color:
                        sub.state === 'selected'
                          ? aquamarine[950]
                          : black[500],
                    }}
                  >
                    {sub.label}
                  </Typography>
                </ButtonBase>
              ))}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  }
);

export default MenuItem;
export { MenuItem };
