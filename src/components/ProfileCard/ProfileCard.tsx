import * as React from 'react';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { typography } from '../../foundation/typography';
import { borderWidth } from '../../foundation/border';
import { aquamarine, black } from '../../foundation/colors';

export type ProfileCardType = 'open' | 'close';

export type ProfileCardProps = {
  hasName?: boolean;
  name?: string;

  hasRol?: boolean;
  rol?: string;

  hasDropdown?: boolean;

  hasPhoto?: boolean;
  photoSrc?: string;

  type?: ProfileCardType;

  onClick?: () => void;

  id?: string;
  'aria-controls'?: string;
  'aria-haspopup'?: React.AriaAttributes['aria-haspopup'];
  'aria-expanded'?: React.AriaAttributes['aria-expanded'];

  sx?: any;
};

const AVATAR_SIZE = 30;

const ProfileCard = React.forwardRef<HTMLButtonElement, ProfileCardProps>(
  function ProfileCard(
    {
      hasName = true,
      name = '',

      hasRol = true,
      rol = 'Administrador',

      hasDropdown = true,

      hasPhoto = true,
      photoSrc,

      type = 'close',

      onClick,

      id,
      sx,
      ...aria
    },
    ref
  ) {
    const isOpen = type === 'open';
    const initial = (name?.trim()?.charAt(0) || '?').toUpperCase();

    return (
      <ButtonBase
        ref={ref}
        id={id}
        onClick={onClick}
        {...aria}
        sx={{
          display: 'flex',
          alignItems: 'center',

          gap: 1.5,                
          padding: '6px 10px',      

          borderRadius: 12,
          textAlign: 'left',
          width: 'auto',
          backgroundColor: 'transparent',

          '&:hover': {
            backgroundColor: aquamarine[50],
          },

          '&:active': {
            backgroundColor: 'rgba(0, 241, 199, 0.06)',
          },

          '&.Mui-focusVisible': {
            outline: 'none',
            boxShadow: '0 0 0 2px rgba(0, 241, 199, 0.35)',
            border: `${borderWidth.extraSmall}px solid ${aquamarine[400]}`,
          },

          ...(sx || {}),
        }}
      >
        {/* Avatar */}
        <Avatar
          src={hasPhoto ? photoSrc : undefined}
          sx={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            bgcolor: aquamarine[400],
            color: aquamarine[950],
            fontSize: 14,
            fontFamily: typography.desktop.body.bold.fontFamily,
            fontWeight: typography.desktop.body.bold.fontWeight,
            flex: '0 0 auto',
          }}
          imgProps={{ referrerPolicy: 'no-referrer' }}
        >
          {initial}
        </Avatar>

        {/* Text */}
        {(hasName || hasRol) && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {hasName && (
              <Typography
                noWrap
                sx={{
                  fontFamily: typography.desktop.body.regular.fontFamily,
                  fontWeight: 400,
                  fontSize: 20,
                  lineHeight: 1.2,   
                  color: black[900],
                }}
              >
                {name}
              </Typography>
            )}

            {hasRol && (
              <Typography
                noWrap
                sx={{
                  fontFamily: typography.desktop.bodyS.regular.fontFamily,
                  fontWeight: typography.desktop.bodyS.regular.fontWeight,
                  fontSize: 12,
                  lineHeight: 1.2,   
                  color: aquamarine[700],
                }}
              >
                {rol}
              </Typography>
            )}
          </Box>
        )}

        {/* Dropdown icon */}
        {hasDropdown && (
          <KeyboardArrowDownIcon
            sx={{
              fontSize: 24,
              color: black[500],
              transition: 'transform 0.2s',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              flex: '0 0 auto',
            }}
          />
        )}
      </ButtonBase>
    );
  }
);

export default ProfileCard;
export { ProfileCard };
