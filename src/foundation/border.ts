export const border = {
  extraSmall: {
    width: 1, 
    style: 'solid',
  },

  small: {
    width: 2,
    style: 'solid',
  },

  medium: {
    width: 4,
    style: 'solid',
  },

  large: {
    width: 8,
    style: 'solid',
  },
} as const;

export const borderWidth = {
  extraSmall: border.extraSmall.width,
  small: border.small.width,
  medium: border.medium.width,
  large: border.large.width,
} as const;