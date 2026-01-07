// src/foundation/elevation/elevation.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { elevation } from './elevation';

type ElevationKey = keyof typeof elevation;

const meta: Meta = {
  title: 'Foundations/Elevation',
  parameters: {
    layout: 'fullscreen',
    docs: { source: { type: 'code' } },
  },
};

export default meta;

type Story = StoryObj;

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#fff',
        boxShadow: value,
        padding: 16,
        height: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>{title}</div>

      <div
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: 12,
          color: '#444',
          lineHeight: 1.35,
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ElevationGallery() {
  const keys = Object.keys(elevation) as ElevationKey[];

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        <div>
          <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.05, color: '#111' }}>
            Foundations · Elevation
          </div>
          <div style={{ marginTop: 8, color: '#666', maxWidth: 900, lineHeight: 1.5 }}>
            Shadow tokens from <code>foundation/elevation</code>. Each card shows the raw CSS box-shadow value.
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 18,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
        }}
      >
        {keys.map((k) => (
          <Card key={k} title={k} value={elevation[k]} />
        ))}
      </div>
    </div>
  );
}

export const All: Story = {
  render: () => <ElevationGallery />,
};
