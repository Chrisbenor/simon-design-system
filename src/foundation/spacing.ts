// src/foundation/spacing.ts
export const spacing = {
  minimum: { px: 4, rem: '0.25rem' },
  compact: { px: 8, rem: '0.5rem' },
  extraSmall: { px: 12, rem: '0.75rem' },
  small: { px: 16, rem: '1rem' },
  medium: { px: 20, rem: '1.25rem' },
  medium2: { px: 24, rem: '1.5rem' },
  medium3: { px: 28, rem: '1.75rem' },
  large: { px: 32, rem: '2rem' },
  large2: { px: 36, rem: '2.25rem' },
  structural: { px: 40, rem: '2.5rem' },
  structural2: { px: 48, rem: '3rem' },
  extraLarge: { px: 52, rem: '3.25rem' },
  extraExtraLarge: { px: 56, rem: '3.5rem' },
  tripleExtraLarge: { px: 60, rem: '3.75rem' },
  quadrupleExtraLarge: { px: 64, rem: '4rem' },
  superLarge: { px: 72, rem: '4.5rem' },
  giant: { px: 80, rem: '5rem' },
  adaptableMaxMargin: { px: 120, rem: '7.5rem' },
} as const;

export const spacingPx = Object.fromEntries(
  Object.entries(spacing).map(([key, value]) => [key, value.px])
) as { [K in keyof typeof spacing]: (typeof spacing)[K]['px'] };

export const spacingRem = Object.fromEntries(
  Object.entries(spacing).map(([key, value]) => [key, value.rem])
) as { [K in keyof typeof spacing]: (typeof spacing)[K]['rem'] };
