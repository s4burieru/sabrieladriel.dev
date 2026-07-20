import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { resolve, basename } from 'path';

export default defineConfig({
  root: 'portfolio',
  plugins: [
    react(),
    {
      name: 'copy-and-finalize',
      closeBundle() {
        const distDir = resolve(__dirname, 'dist');
        const srcDir = resolve(__dirname, 'portfolio');

        // Helper to copy directory recursively
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

        // Find the built React bundle
        const assetsDir = resolve(distDir, 'assets');
        let reactBundlePath = '';
        if (existsSync(assetsDir)) {
          const files = readdirSync(assetsDir);
          const bundleFile = files.find(f => f.startsWith('react-components-') && f.endsWith('.js'));
          if (bundleFile) {
            reactBundlePath = './assets/' + bundleFile;
            console.log(`  ✓ Found React bundle: ${bundleFile}`);
          }
        }

        // Copy HTML files and update script references
        const htmlFiles = ['index.html', 'projects.html', 'services.html', 'blog.html', 'contact.html'];
        for (const file of htmlFiles) {
          const srcPath = resolve(srcDir, file);
          if (existsSync(srcPath)) {
            let content = readFileSync(srcPath, 'utf-8');
            
            // Replace the dev module script with the production bundle
            content = content.replace(
              '<script type="module" src="/src/main.jsx"></script>',
              `<script src="${reactBundlePath}"></script>`
            );
            
            writeFileSync(resolve(distDir, file), content, 'utf-8');
            console.log(`  ✓ Processed ${file}`);
          }
        }

        // Copy js directory
        const jsDir = resolve(srcDir, 'js');
        if (existsSync(jsDir)) {
          copyDir(jsDir, resolve(distDir, 'js'));
          console.log('  ✓ Copied js/');
        }

        // Copy css directory
        const cssDir = resolve(srcDir, 'css');
        if (existsSync(cssDir)) {
          copyDir(cssDir, resolve(distDir, 'css'));
          console.log('  ✓ Copied css/');
        }

        // Copy assets (images, etc.) - skip the react-components file since it's already there
        const sourceAssetsDir = resolve(srcDir, 'assets');
        if (existsSync(sourceAssetsDir)) {
          function copyDirSkipExisting(src, dest) {
            if (!existsSync(dest)) {
              mkdirSync(dest, { recursive: true });
            }
            const entries = readdirSync(src, { withFileTypes: true });
            for (const entry of entries) {
              const srcPath = resolve(src, entry.name);
              const destPath = resolve(dest, entry.name);
              if (entry.isDirectory()) {
                copyDirSkipExisting(srcPath, destPath);
              } else if (!existsSync(destPath)) {
                copyFileSync(srcPath, destPath);
              }
            }
          }
          copyDirSkipExisting(sourceAssetsDir, assetsDir);
          console.log('  ✓ Copied assets/');
        }

        // Copy data directory
        const dataDir = resolve(srcDir, 'data');
        if (existsSync(dataDir)) {
          copyDir(dataDir, resolve(distDir, 'data'));
          console.log('  ✓ Copied data/');
        }

        // Copy partials directory
        const partialsDir = resolve(srcDir, 'partials');
        if (existsSync(partialsDir)) {
          copyDir(partialsDir, resolve(distDir, 'partials'));
          console.log('  ✓ Copied partials/');
        }

        console.log('\n📦 Build complete! All static files copied to dist/');
      },
    },
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'portfolio/src/main.jsx'),
      },
      output: {
        entryFileNames: 'assets/react-components-[hash].js',
        chunkFileNames: 'assets/react-[name]-[hash].js',
      },
    },
  },
});