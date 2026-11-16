/**
 * TODO: Konfigurasi Vite untuk Bundle Optimization
 *
 * Tugas:
 * 1. Konfigurasi manualChunks untuk memisahkan vendor dari aplikasi
 * 2. Aktifkan tree-shaking dengan esbuild
 * 3. Tambahkan plugin untuk visualisasi bundle (rollup-plugin-visualizer)
 * 4. Konfigurasi build options untuk production
 *
 * Target:
 * - Initial bundle < 300KB
 * - Vendor chunk terpisah
 * - Dynamic imports di-split per route
 */

import { defineConfig } from 'vite';
// TODO: import visualizationPlugin from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    // Target browsers (untuk determine syntax yang perlu di-transpile)
    target: 'esnext',

    // Output directory
    outDir: 'dist',

    // Source map untuk debugging (disable di production)
    sourcemap: false,

    // Minify (terser vs esbuild — esbuild lebih fast)
    minify: 'esbuild', // 'esbuild' | 'terser' | false

    // Chunk size warning threshold (dalam KB)
    chunkSizeWarningLimit: 300,

    // Rollup options
    rollupOptions: {
      // Output configuration
      output: {
        // Manual chunk splitting — pisahkan vendor dari app code
        // TODO: Implementasikan manualChunks
        manualChunks(id) {
          // Hint: Gunakan kondisi untuk memisahkan:
          // - node_modules → vendor chunk
          // - src/ → app code
          // - Hati-hati: jangan split terlalu granular (banyak request)
          // - Chunking yang bagus: vendor, react-related, ui-related

          if (id.includes('node_modules')) {
            // Strategi: Kelompokkan berdasarkan library size
            // Library besar (> 20KB) jadi chunk terpisah

            if (id.includes('moment')) return 'moment';        // 300KB+, worth separate
            if (id.includes('lodash')) return 'lodash';        // 70KB+
            if (id.includes('@mui') || id.includes('material')) return 'mui';
            if (id.includes('chart') || id.includes('d3')) return 'charts';
            // Sisanya → vendor chunk
          }

          if (id.includes('src/')) {
            // Route-based splitting
            // Extracted automatically oleh Vite/Rollup dari dynamic imports
          }
        },

        // Asset file names (CSS, images, fonts)
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          if (/\.css$/.test(info)) return 'assets/css/[name]-[hash][extname]';
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(info)) return 'assets/images/[name]-[hash][extname]';
          if (/\.(woff2?|eot|ttf|otf)$/.test(info)) return 'assets/fonts/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },

        // Chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // CSS code splitting
    cssCodeSplit: true,

    // Enable lib mode (untuk building libraries)
    lib: false,

    // Rollup plugin untuk visualisasi bundle
    // TODO: Aktifkan plugin ini, run build, buka dist/bundle-stats.html
    // plugins: [visualizationPlugin({ open: true })],
  },

  // Optimize deps
  optimizeDeps: {
    // Pre-bundle dependencies
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
    exclude: [], // Force tidak pre-bundle
  },

  // Vite Dev Server (tidak mempengaruhi build, tapi baik untuk referensi)
  server: {
    port: 5173,
    host: true,
  },
});