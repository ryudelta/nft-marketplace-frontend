// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), ],
  resolve: {
    alias: {
       '@': path.resolve(__dirname, './src'),
       'store': path.resolve(__dirname, './src/store'),
       '@contracts': path.resolve(__dirname, './contract/nft/contracts'),
    },
  },
  server: {
      port: 3000,
      hmr: {
        overlay: true,
    },
    proxy: {
      '/pinata': {
        target: 'https://api.pinata.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pinata/, ''),
      },
    },
  },
});
