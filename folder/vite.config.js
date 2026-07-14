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
        manualChunks(id) {
          // drei helpers are large — isolate them so they never block initial parse
          if (id.includes('@react-three/drei')) {
            return 'drei';
          }
          // Three.js + fiber in its own lazy chunk
          if (id.includes('node_modules/three') ||
              id.includes('@react-three/fiber')) {
            return 'three';
          }
          // React runtime — rarely changes, cache-friendly
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
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: { safari10: true },
    },
    cssMinify: true,
    target: 'es2020',
    // Inline assets smaller than 4 KiB to reduce HTTP requests
    assetsInlineLimit: 4096,
    // drei chunk is inherently large — suppress warning
    chunkSizeWarningLimit: 1000,
    // Emit source maps for error monitoring without exposing source in prod
    sourcemap: false,
    // Reduce CSS code duplication across chunks
    cssCodeSplit: true,
  },
})
