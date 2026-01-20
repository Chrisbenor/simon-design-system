import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { spacingRem } from '../../foundation/spacing';
import { black } from '../../foundation/colors';

import SideBackgroundLogo from '../../assets/side-logo.png';

export type SideBarProps = {
  children: React.ReactNode;
  logoSrc: string;
  sx?: any;
};

const EXPANDED_WIDTH = 280;
const COLLAPSED_WIDTH = 84;

const SideBar = ({ children, logoSrc, sx }: SideBarProps) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingY: spacingRem.medium,
        backgroundColor: '#ffffff',
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
          onClick={() => setCollapsed((v) => !v)}
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
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                collapsed,
              })
            : child
        )}
      </Box>

      {/* Background logo */}
      <Box
        component="img"
        src={SideBackgroundLogo}
        alt=""
        aria-hidden
        paddingBottom={8}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '0%',
          width: 'auto', 
          maxWidth: '100%',
          transition: 'width 0.25s ease, opacity 0.25s ease',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </Box>
  );
};

export default SideBar;
export { SideBar };
