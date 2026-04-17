import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Dev server: serve index.html for all routes (SPA fallback)
    historyApiFallback: true,
  },
  preview: {
    // Preview server: same fallback
    historyApiFallback: true,
  },
});
