// .storybook/preview.ts
import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";


// 1) Tus estilos base del proyecto (si ahí tienes resets, fuentes, etc.)
import "../src/index.css";
import "../src/assets/fonts/fonts.css";

// 2) Si tienes estilos de App (opcional)
//import "../src/App.css";

// 3) Tus tokens generados por Style Dictionary (ajusta la ruta real)
//import "../src/styles/tokens.css";
import "../src/styles/tokens.light.css";
import "../src/styles/tokens.dark.css";

// ✅ Breakpoints para el toolbar de Viewport
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

// ✅ Theme switch en toolbar (Light/Dark)
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

  // 👇 aplica data-theme en <html> (documentElement) SIEMPRE
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <Story />;
};
const preview: Preview = {
  parameters: {
    docs: {
      source: {
        type: "dynamic", // genera código React
      },
       canvas: {
        withToolbar: false,
        sourceState: "dynamic",
      }
    },
    controls: {
      expanded: true,
    },
    

    // ✅ Viewport toolbar / breakpoints
    viewport: {
      viewports: BREAKPOINTS,
      defaultViewport: "desktop",
    },

  },
   decorators: [withTheme],
};

export default preview;