// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "https://elitebuy.onrender.com",
        changeOrigin: true,
      },
      "/user": {
        target: process.env.VITE_API_URL || "https://elitebuy.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
