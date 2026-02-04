import * as React from 'react';
import { Box } from '@mui/material';

import { spacingRem } from '../../foundation/spacing';
import { elevation } from '../../foundation/elevation';
import { black } from '../../foundation/colors';

import Button from '../Button/Button';
import CardsMap, { SMCardsMapProps } from '../CardsMap/CardsMap';

export type DeviceListBarProps = {
  devices: SMCardsMapProps[];
  sx?: any;
};

const DEFAULT_ITEM_HEIGHT = 200;

const DeviceListBar = ({
  devices,
  sx,
}: DeviceListBarProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(devices.length);

  React.useLayoutEffect(() => {
    if (!containerRef.current) return;

    const availableHeight =
      containerRef.current.clientHeight -
      64; 

    const count = Math.max(1, Math.floor(availableHeight / DEFAULT_ITEM_HEIGHT));
    setItemsPerPage(count);
    setPage(0);
  }, [devices.length, DEFAULT_ITEM_HEIGHT]);

  const totalPages = Math.ceil(devices.length / itemsPerPage);
  const hasOverflow = totalPages > 1;

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleDevices = devices.slice(start, end);

  return (
    <Box
      ref={containerRef}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: elevation.extraSmall,
        padding: spacingRem.small,
        ...(sx || {}),
      }}
    >
      {/* LIST */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: spacingRem.small,
          overflow: 'hidden',
        }}
      >
        {visibleDevices.map((device, index) => (
        <CardsMap
            key={device.id}
            {...device}
            index={index}
            onSelect={({ id, index }) => {
            console.log('ID:', id);
            console.log('Index:', index);
            }}
        />
        ))}
      </Box>

      {/* FOOTER CONTROLS */}
      {hasOverflow && (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gap: spacingRem.small,
            }}
            >
            <Box sx={{ flex: '0 0 auto' }}>
                <Button
                dsVariant="ghost"
                fullWidth={false}
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                Atrás
                </Button>
            </Box>

            <Box sx={{ flex: '0 0 auto' }}>
                <Button
                dsVariant="primary"
                fullWidth={false}
                disabled={page >= totalPages - 1}
                iconRight={ <svg viewBox="0 0 16 16" width="16" height="16"> <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg> }
                onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                }
                >
                Siguiente
                </Button>
            </Box>
        </Box>
      )}
    </Box>
  );
};

export default DeviceListBar;
export { DeviceListBar };
