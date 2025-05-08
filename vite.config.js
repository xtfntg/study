import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    exclude: ["@tailwindcss/oxide", "lightningcss"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      lightningcss: "lightningcss/lib/index.js",
    },
  },
});
