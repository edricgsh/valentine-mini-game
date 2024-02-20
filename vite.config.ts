import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/valentine-game",
  build: {
    outDir: "dist/valentine-game", // Customize the output directory
  },
});
