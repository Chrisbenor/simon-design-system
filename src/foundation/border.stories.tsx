import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { border, borderWidth } from './border';

type BorderKey = keyof typeof border;

const meta: Meta = {
  title: 'Foundations/Border',
  parameters: {
    layout: 'fullscreen',
    docs: { source: { type: 'code' } },
  },
};

export default meta;
type Story = StoryObj;

/* ---------- UI components ---------- */

function BorderCard({
  name,
  width,
  style,
}: {
  name: string;
  width: number;
  style: string;
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
      {/* Preview */}
      <div
        style={{
          height: 72,
          borderRadius: 12,
          border: `${width}px ${style} #00F1C7`,
          background: 'rgba(0,241,199,0.06)',
        }}
      />

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
          {width}px · {style}
        </div>
      </div>
    </div>
  );
}

/* ---------- Views ---------- */

function BorderGallery() {
  const keys = Object.keys(border) as BorderKey[];

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            lineHeight: 1.05,
            color: '#111',
          }}
        >
          Foundations · Border
        </div>
        <div
          style={{
            marginTop: 8,
            color: '#666',
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          Border tokens used for strokes and outlines. Each example shows the
          real width and style applied to a preview box.
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
          <BorderCard
            key={k}
            name={k}
            width={borderWidth[k]}
            style={border[k].style}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Story ---------- */

export const All: Story = {
  render: () => <BorderGallery />,
};
