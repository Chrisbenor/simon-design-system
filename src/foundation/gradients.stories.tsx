import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { gradients, gradientsButton } from './gradients';

type GradientKey = keyof typeof gradients;
type ButtonGradientKey = keyof typeof gradientsButton;

const meta: Meta = {
  title: 'Foundations/Gradients',
  parameters: {
    layout: 'fullscreen',
    docs: { source: { type: 'code' } },
  },
};

export default meta;

type Story = StoryObj;

/* ---------- UI components ---------- */

function GradientCard({
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
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Preview */}
      <div
        style={{
          height: 120,
          borderRadius: 12,
          background: value,
          border: '1px solid rgba(0,0,0,0.12)',
        }}
      />

      {/* Meta */}
      <div style={{ display: 'grid', gap: 6 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>
          {title}
        </div>

        <div
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: 12,
            color: '#444',
            lineHeight: 1.4,
            wordBreak: 'break-word',
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

/* ---------- Views ---------- */

function GradientsGallery() {
  const gradientKeys = Object.keys(gradients) as GradientKey[];
  const buttonKeys = Object.keys(gradientsButton) as ButtonGradientKey[];

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.05, color: '#111' }}>
          Foundations · Gradients
        </div>
        <div style={{ marginTop: 8, color: '#666', maxWidth: 900, lineHeight: 1.5 }}>
          Gradient tokens used across the system. Includes general gradients and
          button-specific gradients.
        </div>
      </div>

      {/* Base gradients */}
      <section style={{ marginTop: 28 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 12 }}>
          Base gradients
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
          }}
        >
          {gradientKeys.map((k) => (
            <GradientCard key={k} title={k} value={gradients[k]} />
          ))}
        </div>
      </section>

      {/* Button gradients */}
      <section style={{ marginTop: 36 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 12 }}>
          Button gradients
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
          }}
        >
          {buttonKeys.map((k) => (
            <GradientCard key={k} title={k} value={gradientsButton[k]} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- Story ---------- */

export const All: Story = {
  render: () => <GradientsGallery />,
};
