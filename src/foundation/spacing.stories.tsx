import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { spacing, spacingPx, spacingRem } from './spacing';

type SpacingKey = keyof typeof spacing;

const meta: Meta = {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'fullscreen',
    docs: { source: { type: 'code' } },
  },
};

export default meta;

type Story = StoryObj;

/* ---------- UI components ---------- */

function SpacingCard({
  name,
  px,
  rem,
}: {
  name: string;
  px: number;
  rem: string;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#fff',
        padding: 16,
        display: 'grid',
        gap: 12,
      }}
    >
      {/* Visual preview */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: px,
            height: 12,
            background: '#00F1C7',
            borderRadius: 6,
          }}
        />
        <div style={{ fontSize: 12, color: '#666' }}>{px}px</div>
      </div>

      {/* Meta */}
      <div style={{ display: 'grid', gap: 6 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>
          {name}
        </div>

        <div
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: 12,
            color: '#444',
            lineHeight: 1.4,
          }}
        >
          {px}px · {rem}
        </div>
      </div>
    </div>
  );
}

/* ---------- Views ---------- */

function SpacingGallery() {
  const keys = Object.keys(spacing) as SpacingKey[];

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.05, color: '#111' }}>
          Foundations · Spacing
        </div>
        <div style={{ marginTop: 8, color: '#666', maxWidth: 900, lineHeight: 1.5 }}>
          Spacing tokens used for margins, paddings and layout rhythm.
          Values are shown in both <strong>px</strong> and <strong>rem</strong>.
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          marginTop: 22,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 18,
        }}
      >
        {keys.map((k) => (
          <SpacingCard
            key={k}
            name={k}
            px={spacingPx[k]}
            rem={spacingRem[k]}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Story ---------- */

export const All: Story = {
  render: () => <SpacingGallery />,
};
