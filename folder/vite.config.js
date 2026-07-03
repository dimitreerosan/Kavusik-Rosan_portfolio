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
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    minify: 'terser',
    cssMinify: true,
    target: 'es2020',
  },
})