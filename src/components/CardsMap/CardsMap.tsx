import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Typography, ListItemButton, Tooltip } from '@mui/material';

import { typography } from '../../foundation/typography';
import { spacingPx } from '../../foundation/spacing';
import { borderWidth } from '../../foundation/border';
import { elevation } from '../../foundation/elevation';
import { aquamarine, black, yellow, red } from '../../foundation/colors';

import BadgeCheckIcon from '../../assets/icons/badge-check.svg';
import CircleAlertIcon from '../../assets/icons/circle-alert.svg';
import CircleXIcon from '../../assets/icons/circle-x.svg';

export type DeviceStatus = 'online' | 'offline' | 'warning' | string;

export type CardsMapProps = {
  id: string | number;

  name: string;
  uniqueId?: string | null;
  phone?: string | null;
  status?: DeviceStatus;

  disabled?: boolean;
  interactive?: boolean;

  selectedId?: string | number | null;
  onSelect?: (id: string | number) => void;

  getStatusLabel?: (status?: DeviceStatus) => string;

  style?: React.CSSProperties;
};

const focusRing = `0 0 0 3px ${alpha(aquamarine[400], 0.35)}`;

type IconLike = string | React.ComponentType<any>;

const getStatusUi = (
  status?: DeviceStatus
): {
  key: 'online' | 'offline' | 'warning';
  label: string;
  Icon: IconLike;
} => {
  if (status === 'online')
    return { key: 'online', label: 'Online', Icon: BadgeCheckIcon };
  if (status === 'offline')
    return { key: 'offline', label: 'Offline', Icon: CircleXIcon };

  return {
    key: 'warning',
    label: status || 'Unknown',
    Icon: CircleAlertIcon,
  };
};

const statusTokens = (key: 'online' | 'offline' | 'warning') => {
  if (key === 'online') {
    return {
      bg: alpha(aquamarine[50],1),
      icon: aquamarine[900],
      border: alpha(aquamarine[50], 1),
    };
  }

  if (key === 'offline') {
    return {
      bg: red[50],
      icon: red[900],
      border: red[50],
    };
  }

  return {
    bg: alpha(yellow[50],1),
    icon: yellow[900],
    border: alpha(yellow[50], 1),
  };
};

const CardsMap = ({
  id,
  name,
  uniqueId,
  phone,
  status,

  disabled: disabledProp,
  interactive = true,

  selectedId,
  onSelect,

  getStatusLabel,
  style,
}: CardsMapProps) => {
  const disabled = !interactive || Boolean(disabledProp);
  const isSelected = selectedId === id;

  const statusUi = getStatusUi(status);
  const tokens = statusTokens(statusUi.key);

  const StatusIcon = statusUi.Icon;

  const renderStatusIcon = () => {
    if (typeof StatusIcon === 'string') {
      return <img src={StatusIcon} alt="" width={20} height={20} />;
    }
    const IconComp = StatusIcon;
    return <IconComp aria-hidden style={{ width: 20, height: 20 }} />;
  };

  return (
    <div style={style}>
      <ListItemButton
        onClick={() => !disabled && onSelect?.(id)}
        disabled={disabled}
        selected={isSelected}
        sx={{
          padding: 0,
          borderRadius: 2,
          ...(isSelected && {
            backgroundColor: alpha(aquamarine[400], 0.06),
          }),
          '&:hover': {
            backgroundColor: disabled
              ? 'transparent'
              : alpha(aquamarine[400], 0.04),
          },
          '&.Mui-focusVisible': {
            boxShadow: focusRing,
          },
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: spacingPx.small,

              borderRadius: 2,
              border: `${borderWidth.extraSmall}px solid ${black[200]}`,

              padding: `${spacingPx.small}px ${spacingPx.small}px`,

              boxShadow: isSelected ? elevation.extraSmall : 'none',
              ...(disabled && { opacity: 0.7 }),
            }}
          >
            {/* LEFT */}
            <Box sx={{ minWidth: 0, flex: 1 }}>
              {/* Name label */}
                <Typography
                sx={{
                    ...typography.desktop.bodyS.regular,
                    fontWeight: 300,
                    lineHeight: '16px',
                    color: black[300],
                    mb: 0.125, 
                }}
                >
                Nombre
                </Typography>

                {/* Name value */}
                <Typography
                sx={{
                    ...typography.desktop.h4.semibold,
                    fontSize: '32px',
                    lineHeight: '36px',
                    fontWeight: 600,
                    color: black[900],
                    mb: 2,

                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                title={name}
                >
                {name}
                </Typography>

                {/* Identifier */}
                <Typography
                sx={{
                    ...typography.desktop.bodyS.regular,
                    fontWeight: 300,
                    lineHeight: '12px',
                    color: black[300],
                    mb: 0.8, // ⬅️
                }}
                >
                Identificador
                </Typography>

                <Typography
                sx={{
                    ...typography.desktop.body.regular,
                    fontWeight: 300,
                    lineHeight: '16px',
                    color: black[900],
                    mb: 2,

                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                title={uniqueId || '-'}
                >
                {uniqueId || '-'}
                </Typography>

                {/* Contact */}
                <Typography
                sx={{
                    ...typography.desktop.bodyS.regular,
                    fontWeight: 300,
                    lineHeight: '12px',
                    color: black[300],
                    mb: 0.8,
                }}
                >
                Contacto
                </Typography>

                <Typography
                sx={{
                    ...typography.desktop.body.regular,
                    fontWeight: 300,
                    lineHeight: '16px',
                    color: black[900],

                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                title={phone || '-'}
                >
                {phone || '-'}
                </Typography>
            </Box>

            {/* STATUS */}
            <Tooltip title={getStatusLabel ? getStatusLabel(status) : statusUi.label}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: 'grid',
                  placeItems: 'center',
                  flex: '0 0 auto',

                  backgroundColor: tokens.bg,
                  border: `1px solid ${tokens.border}`,
                  color: tokens.icon,
                }}
                aria-label={statusUi.label}
              >
                {renderStatusIcon()}
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </ListItemButton>
    </div>
  );
};

export default CardsMap;
export { CardsMap };
