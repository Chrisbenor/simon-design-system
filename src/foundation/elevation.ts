export const elevation = {
  extraSmall: '0 2px 4px 0 rgba(93, 93, 93, 0.16)',

  small: [
    '0 16px 32px -4px rgba(26, 26, 26, 0.10)',
    '0 2px 4px 0 rgba(26, 26, 26, 0.04)',
  ].join(', '),

  medium: [
    '0 24px 48px -8px rgba(26, 26, 26, 0.12)',
    '0 2px 4px 0 rgba(26, 26, 26, 0.04)',
  ].join(', '),

  large: [
    '0 40px 80px -16px rgba(26, 26, 26, 0.16)',
    '0 2px 4px 0 rgba(26, 26, 26, 0.04)',
  ].join(', '),

  extraLarge: [
    '0 56px 112px -20px rgba(26, 26, 26, 0.18)',
    '0 2px 4px 0 rgba(26, 26, 26, 0.04)',
  ].join(', '),
} as const;