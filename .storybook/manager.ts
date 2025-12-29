import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const simonTheme = create({
  base: "light", // o "light"
  brandTitle: "Simon Design System",
  brandImage: "/assets/simon.svg",
  brandUrl: "https://tusitio.com",
});

addons.setConfig({
  theme: simonTheme,
});