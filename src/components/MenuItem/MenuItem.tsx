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

/* =========================
   Types
========================= */

export type MenuItemState = 'selected' | 'enable';

export type MenuItemSubItem = {
  id: string;
  label: string;
  onClick?: () => void;
};

export type SMMenuItemProps = {
  /** Unique identifier (used by SideBar) */
  id: string;

  /** Visible label */
  label: string;

  /** Optional icon */
  iconSrc?: string;

  /** Optional icon when selected */
  iconSelectedSrc?: string;

  /** Controlled visual state */
  state?: MenuItemState;

  /** Sidebar collapsed state */
  collapsed?: boolean;

  /** Dropdown */
  hasDropdown?: boolean;
  items?: MenuItemSubItem[];

  /** Click handler */
  onClick?: () => void;
};

/* =========================
   Component
========================= */

const MenuItem = React.forwardRef<HTMLDivElement, SMMenuItemProps>(
  function MenuItem(
    {
      id,
      label,
      iconSrc,
      iconSelectedSrc,
      state = 'enable',
      collapsed = false,

      hasDropdown = false,
      items = [],

      onClick,
    },
    ref
  ) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      if (collapsed) setOpen(false);
    }, [collapsed]);

    const isSelected = state === 'selected';
    const hasRealDropdown = hasDropdown && items.length > 0;

    const icon =
      isSelected && iconSelectedSrc
        ? iconSelectedSrc
        : iconSrc;

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
            width: '100%',
            borderRadius: '12px',
            justifyContent: 'flex-start',
            textAlign: 'left',

            color: isSelected ? aquamarine[950] : black[400],
            backgroundImage: isSelected
              ? `linear-gradient(90deg, ${aquamarine[400]} 0%, ${aquamarine[50]} 100%)`
              : 'none',

            '&:hover': {
              backgroundColor: isSelected
                ? 'transparent'
                : aquamarine[50],
            },

            /* Remove default focus styles */
            '&:focus': {
              outline: 'none',
            },
            '&:focus-visible': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        >
          {/* Icon */}
          {icon && (
            <Box
              component="img"
              src={icon}
              alt=""
              sx={{
                width: 20,
                height: 20,
                flex: '0 0 auto',
                opacity: isSelected ? 1 : 0.7,
              }}
            />
          )}

          {/* Label */}
          {!collapsed && (
            <Typography
              noWrap
              sx={{
                ...typography.desktop.body.regular,
                flex: 1,
                minWidth: 0,
                color: isSelected
                  ? aquamarine[950]
                  : black[400],
              }}
            >
              {label}
            </Typography>
          )}

          {/* Dropdown arrow */}
          {hasRealDropdown && !collapsed && (
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 20,
                color: black[500],
                transition: 'transform 0.2s ease',
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
                  key={sub.id}
                  onClick={sub.onClick}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: '10px',
                    textAlign: 'left',
                    '&:hover': {
                      backgroundColor: aquamarine[50],
                    },

                    '&:focus': {
                      outline: 'none',
                    },
                    '&:focus-visible': {
                      outline: 'none',
                      boxShadow: 'none',
                    },
                  }}
                >
                  <Typography
                    noWrap
                    sx={{
                      ...typography.desktop.bodyS.regular,
                      color: black[500],
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
