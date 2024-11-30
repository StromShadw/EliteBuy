// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://elitebuy-1.onrender.com',
        changeOrigin: true,
      },
      '/user': {
        target: 'https://elitebuy-1.onrender.com',
        changeOrigin: true,
      },
    },
  },
  
});
