import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Kavusik-Rosan_portfolio/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  assetsInclude: ['**/*.stl'],
  build: {
    rollupOptions: {
      output: {
        // Keep service worker at a stable, unhashed path
        // (it lives in public/ so Vite copies it as-is)

        manualChunks(id) {
          // Split three.js into its own lazy-loaded chunk (Contact section hover only)
          if (id.includes('node_modules/three') ||
              id.includes('@react-three/fiber')) {
            return 'three';
          }
          // React runtime in its own small chunk (rarely changes)
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }
        },

        // Put hashed assets in named sub-dirs for cleaner URLs
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // strip console.* in production
        drop_debugger: true,
        passes: 2,
      },
    },
    cssMinify: true,
    target: 'es2020',
    // Inline assets smaller than 4 KiB to reduce requests
    assetsInlineLimit: 4096,
  },
})
