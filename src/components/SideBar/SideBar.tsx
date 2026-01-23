import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { spacingRem } from '../../foundation/spacing';
import { black } from '../../foundation/colors';

import SideBackgroundLogo from '../../assets/side-logo.png';
import type { SMMenuItemProps } from '../MenuItem/MenuItem';

export type SMSideBarProps = {
  children: React.ReactNode;
  logoSrc: string;
  sx?: any;

  onCollapseChange?: (collapsed: boolean) => void;
};

const EXPANDED_WIDTH = 280;
const COLLAPSED_WIDTH = 84;

const SideBar = ({
  children,
  logoSrc,
  sx,
  onCollapseChange,
}: SMSideBarProps) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const [activeId, setActiveId] = React.useState<string | null>(null);

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      onCollapseChange?.(next);
      return next;
    });
  }, [onCollapseChange]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingY: spacingRem.medium,
        backgroundColor: 'transparent',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        ...(sx || {}),
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          gap: spacingRem.medium,
          paddingX: spacingRem.medium2,
          marginBottom: spacingRem.large,
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={toggleCollapsed}
          sx={{
            color: black[500],
            width: 36,
            height: 36,
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        {!collapsed && (
          <Box
            component="img"
            src={logoSrc}
            alt="Logo"
            sx={{ height: 32, objectFit: 'contain' }}
          />
        )}
      </Box>

      {/* Menu */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacingRem.extraSmall,
          paddingX: spacingRem.small,
          zIndex: 2,
        }}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<SMMenuItemProps>(child)) return child;

          const id = child.props.id;

          return React.cloneElement(child, {
            collapsed,
            state: id === activeId ? 'selected' : 'enable',
            onClick: () => setActiveId(id),
          });
        })}
      </Box>

      {/* Background logo */}
      <Box
        component="img"
        src={SideBackgroundLogo}
        alt=""
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          maxWidth: '100%',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: collapsed ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      />
    </Box>
  );
};

export default SideBar;
export { SideBar };
