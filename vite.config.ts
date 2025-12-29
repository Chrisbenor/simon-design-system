import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
     cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "NuwsdDesignSystem",
      fileName: (format) => `nuwsd-design-system.${format}.js`,
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
