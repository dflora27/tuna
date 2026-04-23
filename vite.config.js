import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Larger safe limit — our hero video import pushes one chunk high.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Split big vendor libs into their own chunks for better HTTP caching.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-router')) return 'router';
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('lenis')) return 'scroll';
          if (id.includes('react-dom') || id.includes('/react/')) return 'react';
        },
      },
    },
  },
  server: {
    open: false,
  },
})
