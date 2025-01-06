import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_URL || "https://elitebuy-1.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/user": {
        target: import.meta.env.VITE_API_URL || "https://elitebuy-1.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
