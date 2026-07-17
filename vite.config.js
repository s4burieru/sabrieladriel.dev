import { defineConfig } from 'vite';

export default defineConfig({
  root: 'portfolio',
  server: {
    port: 3000,
    // SPA fallback: any unknown route serves index.html
    // so the client-side router can handle /about, /projects, etc.
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});