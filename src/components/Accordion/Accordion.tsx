import * as React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import { spacingRem } from '../../foundation/spacing';
import { black } from '../../foundation/colors';
import { borderWidth } from '../../foundation/border';
import { elevation } from '../../foundation/elevation';
import { typography } from '../../foundation/typography';

/* =========================
   Types
========================= */

export type AccordionProps = {
  label: string;

  defaultOpen?: boolean;
  disabled?: boolean;

  showIconLeft?: boolean;

  children?: React.ReactNode;

  sx?: any;
};

/* =========================
   Component
========================= */

const Accordion = ({
  label,
  defaultOpen = false,
  disabled = false,
  showIconLeft = false,
  children,
  sx,
}: AccordionProps) => {
  const [open, setOpen] = React.useState(defaultOpen);

  const toggle = () => {
    if (!disabled) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 2,
        backgroundColor: '#fff',
        border: `${borderWidth.extraSmall}px solid ${black[200]}`,
        boxShadow: open ? elevation.extraSmall : 'none',
        ...(sx || {}),
      }}
    >
      {/* HEADER */}
      <Box
        onClick={toggle}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: spacingRem.minimum,
          padding: spacingRem.minimum,
          paddingLeft: spacingRem.compact,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {/* LEFT */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: spacingRem.extraSmall,
            minWidth: 0,
          }}
        >
          {showIconLeft && (
            <AddIcon
              sx={{
                color: black[600],
                flex: '0 0 auto',
              }}
            />
          )}

          <Typography
            sx={{
              ...typography.desktop.body.semibold,
              color: black[900],
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label}
          </Typography>
        </Box>

        <IconButton
            size="small"
            disableRipple
            sx={{
              color: black[600],
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
      </Box>

      {/* CONTENT */}
      {open && (
        <Box sx={{ padding: spacingRem.compact }}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default Accordion;
export { Accordion };
