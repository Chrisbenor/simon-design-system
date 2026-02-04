// .storybook/preview.ts
import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";


// 1) Tus estilos base del proyecto (si ahí tienes resets, fuentes, etc.)
import "../src/styles/index.css";
import "../src/styles/fonts.css";

// 2) Si tienes estilos de App (opcional)
//import "../src/App.css";

import "../src/styles/tokens.light.css";
import "../src/styles/tokens.dark.css";

const BREAKPOINTS = {
  mobile: {
    name: "Mobile (320)",
    styles: { width: "320px", height: "800px" },
    type: "mobile",
  },
  mobileLg: {
    name: "Mobile (375)",
    styles: { width: "375px", height: "800px" },
    type: "mobile",
  },
  tablet: {
    name: "Tablet (768)",
    styles: { width: "768px", height: "900px" },
    type: "tablet",
  },
  desktop: {
    name: "Desktop (1280)",
    styles: { width: "1280px", height: "900px" },
    type: "desktop",
  },
  desktopLg: {
    name: "Desktop (1600)",
    styles: { width: "1600px", height: "900px" },
    type: "desktop",
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Light / Dark",
    defaultValue: "light",
    toolbar: {
      icon: "mirror",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
      dynamicTitle: true,
    },
  },
};
const withTheme = (Story: any, ctx: any) => {
  const theme = ctx.globals.theme || "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <Story />;
};
const preview: Preview = {
  parameters: {
    docs: {
      source: {
        type: "dynamic", 
      },
       canvas: {
        withToolbar: false,
        sourceState: "dynamic",
      }
    },
    controls: {
      expanded: true,
    },
    backgrounds: {
      default: 'white',
      values: [{ name: 'white', value: '#ffffff' }],
    },
    grid: {
      disable: true,
    },
    
    viewport: {
      viewports: BREAKPOINTS,
      defaultViewport: "desktop",
    },

  },
   decorators: [withTheme],
};

export default preview;