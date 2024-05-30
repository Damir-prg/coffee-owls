import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: path.join(__dirname, 'dist/client'),
  },
  ssr: {
    format: 'cjs',
  },
});
