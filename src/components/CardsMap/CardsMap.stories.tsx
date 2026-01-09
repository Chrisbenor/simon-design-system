// src/components/CardsMap/CardsMap.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import CardsMap from './CardsMap';
import type { CardsMapProps, DeviceStatus } from './CardsMap';

type StatusOption = 'online' | 'offline' | 'warning' | 'unknown';

type CardsMapStoryProps = Omit<
  CardsMapProps,
  'status' | 'labels' | 'selectedId' | 'onSelect'
> & {
  widgetWidth?: number;
  widgetHeight?: number;

  statusControl?: StatusOption;

  labelName?: string;
  labelIdentifier?: string;
  labelContact?: string;

  selectable?: boolean;
  initiallySelected?: boolean;
};

const meta: Meta<CardsMapStoryProps> = {
  title: 'Components/CardsMap',
  component: CardsMap,
  parameters: { layout: 'centered' },
  argTypes: {
    widgetWidth: { control: { type: 'number', min: 260, max: 900, step: 10 } },
    widgetHeight: { control: { type: 'number', min: 180, max: 600, step: 10 } },

    id: { control: 'text' },
    name: { control: 'text' },
    uniqueId: { control: 'text' },
    phone: { control: 'text' },

    statusControl: { control: 'radio', options: ['online', 'offline', 'warning'] },

    labelName: { control: 'text' },
    labelIdentifier: { control: 'text' },
    labelContact: { control: 'text' },

    disabled: { control: 'boolean' },
    interactive: { control: 'boolean', table: { disable: true } },

    selectable: { control: 'boolean', table: { disable: true } },
    initiallySelected: { control: 'boolean', table: { disable: true } },

    getStatusLabel: { control: false, table: { disable: true }  },
    style: { table: { disable: true } },
  },

  render: ({
    widgetWidth = 420,
    widgetHeight = 280,

    statusControl = 'online',

    labelName = 'Nombre',
    labelIdentifier = 'Identificador',
    labelContact = 'Contacto',

    selectable = true,
    initiallySelected = true,

    getStatusLabel,
    ...args
  }) => {
    const resolvedStatus: DeviceStatus = statusControl === 'unknown' ? 'Unknown' : statusControl;

    const safeId = args.id ?? 'dev-1';
    const safeName = (args.name ?? '').trim() || 'test';
    const safeUniqueId = (args.uniqueId ?? '').trim() || '23123';
    const safePhone = (args.phone ?? '').trim() || 'q3123';

    const [selectedId, setSelectedId] = React.useState<string | number | null>(
      selectable && initiallySelected ? safeId : null
    );

    React.useEffect(() => {
      setSelectedId(selectable && initiallySelected ? safeId : null);
    }, [selectable, initiallySelected, safeId]);

    const resolvedOnSelect = selectable ? (id: string | number) => setSelectedId(id) : undefined;

    const resolvedGetStatusLabel =
      getStatusLabel ??
      ((s?: DeviceStatus) => {
        if (s === 'online') return 'Online';
        if (s === 'offline') return 'Offline';
        if (s === 'warning') return 'Warning';
        return s ? String(s) : 'Unknown';
      });

    return (
      <div
        style={{
          width: widgetWidth,
          height: 'auto',
          padding: 12,
          boxSizing: 'border-box',
          display: 'block',
          overflow: 'visible', 
        }}
      >
        <CardsMap
          {...args}
          id={safeId}
          name={safeName}
          uniqueId={safeUniqueId}
          phone={safePhone}
          status={resolvedStatus}
          selectedId={selectedId}
          onSelect={resolvedOnSelect}
          getStatusLabel={resolvedGetStatusLabel}
        />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<CardsMapStoryProps>;

    export const Playground: Story = {
    args: {
        widgetWidth: 420,

        id: 'dev-1',
        name: 'test',
        uniqueId: '23123',
        phone: 'q3123',

        statusControl: 'online',

        labelName: 'Nombre',
        labelIdentifier: 'Identificador',
        labelContact: 'Contacto',

        disabled: false,
    },
    };
