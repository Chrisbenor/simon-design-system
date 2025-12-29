import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  staticDirs: [
  {
    from: "./assets",
    to: "/assets",
  },
],
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-viewport"

  ],
  "framework": "@storybook/react-vite",
  docs: {
    autodocs: true,
  },
};
export default config;