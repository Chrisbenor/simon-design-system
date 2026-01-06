import { aquamarine } from './colors';

export const gradients = {
  blackToAquaGreen: 'linear-gradient(to top, #000000, #00F1C7)',
  magentaToAquaGreen: 'linear-gradient(to top, #E31952, #00F1C7)',
  magentaToAquaGreenDiagonal: 'linear-gradient(135deg, #E31952, #00F1C7)',
  blackToAquaGreenDiagonal: 'linear-gradient(135deg, #000000, #00F1C7)',
  orangeToMagentaDiagonal: 'linear-gradient(135deg, #FE7C43, #E31952)',
  aquaGreenToDeepAquaDiagonal: 'linear-gradient(135deg, #00F1C7, #007868)',
} as const;

export const gradientsButton = {
  primaryDefault: `linear-gradient(90deg, ${aquamarine[400]} 0%, ${aquamarine[600]} 100%)`,
  primaryHover: `linear-gradient(90deg, ${aquamarine[500]} 0%, ${aquamarine[800]} 100%)`,
  primaryPressed: `linear-gradient(90deg, ${aquamarine[600]} 0%, ${aquamarine[900]} 100%)`,
   borderVertical: `linear-gradient(180deg, ${aquamarine[400]} 0%, ${aquamarine[600]} 100%)`,
  borderDefault: `linear-gradient(90deg, ${aquamarine[400]} 0%, ${aquamarine[700]} 100%)`,
} as const;