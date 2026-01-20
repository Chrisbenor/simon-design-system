import * as React from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { typography } from '../../foundation/typography';
import { spacingPx, spacingRem } from '../../foundation/spacing';
import { aquamarine, black, red } from '../../foundation/colors';

import ProfileCard from '../ProfileCard/ProfileCard';

export type NavBarProps = {
  title: string;

  user: {
    name: string;
    role?: string;
    photoSrc?: string;
  };

  onAccount?: () => void;
  onLogout?: () => void;
  onNotifications?: () => void;

  forceMobile?: boolean;

  sx?: any;
};

const NavBar = ({
  title,
  user,
  onAccount,
  onLogout,
  onNotifications,
  forceMobile,
  sx,
}: NavBarProps) => {
  const theme = useTheme();
  const isMobileViewport = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = forceMobile ?? isMobileViewport;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => setAnchorEl(null);

  const handleAccount = () => {
    handleCloseMenu();
    onAccount?.();
  };

  const handleLogout = () => {
    handleCloseMenu();
    onLogout?.();
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: spacingRem.large,
        backgroundColor: '#ffffff',
        
        ...(sx || {}),
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          ...typography.desktop.h5.regular,
          fontWeight: 400,
          color: black[800],
        }}
      >
        {title}
      </Typography>

      {/* Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingRem.compact }}>
        <IconButton onClick={onNotifications} sx={{ color: black[500] }}>
          <NotificationsNoneIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <ProfileCard
          name={user.name}
          rol={user.role}
          hasPhoto={Boolean(user.photoSrc)}
          photoSrc={user.photoSrc}
          type={open ? 'open' : 'close'}
          collapsed={isMobile}
          onClick={handleOpenMenu}
          aria-haspopup="menu"
          aria-expanded={open}
        />
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleAccount}>
          <Typography sx={{ ...typography.desktop.body.regular }}>
            Cuenta
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <Typography
            sx={{
              ...typography.desktop.body.regular,
              color: red[500],
            }}
          >
            Cerrar sesión
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
export { NavBar };
