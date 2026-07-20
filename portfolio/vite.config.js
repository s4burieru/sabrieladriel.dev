import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { resolve } from 'path';

function copyDir(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-static-folders',
      closeBundle() {
        const distDir = resolve(__dirname, 'dist');
        const staticFolders = ['assets', 'data', 'css', 'js'];

        for (const folder of staticFolders) {
          const srcDir = resolve(__dirname, folder);
          const destDir = resolve(distDir, folder);

          if (existsSync(srcDir)) {
            copyDir(srcDir, destDir);
          }
        }
      },
    },
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/react-components-[hash].js',
        chunkFileNames: 'assets/react-[name]-[hash].js',
      },
    },
  },
});
