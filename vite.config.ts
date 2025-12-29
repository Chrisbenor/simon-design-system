import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [react(),
  dts({
    entryRoot: "src",
    include: ["src"],
    exclude: ["**/*.stories.*", "**/*.test.*", "**/*.spec.*"],
    insertTypesEntry: true,
    tsconfigPath: "./tsconfig.json",
  }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "SimonDesignSystem",
      formats: ["es", "cjs"],
      fileName: (format) =>
        format === "es" ? "nuwsd-design-system.es.js" : "nuwsd-design-system.cjs",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
