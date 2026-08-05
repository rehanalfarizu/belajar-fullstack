# SOAL 03 — Bundle Optimization

> Strategi advanced untuk mengurangi bundle size dan loading time.

---

## Deskripsi Soal

Aplikasi React kamu sudah mulai berkembang. Setelah dilakukan Lighthouse audit, ditemukan bahwa:

- **Total bundle size** sudah mencapai **1.8 MB** (too large!)
- **Initial load time** di mobile 3G: **8.2 detik**
- **Time to Interactive**: **12 detik**
- Banyak kode yang di-load tapi tidak pernah digunakan

Tugas kamu adalah mengoptimasi bundle secara sistematis dari **1.8 MB → < 300 KB** (initial bundle).

---

## Teori Singkat

### Bundle Analysis

Bundle adalah file JavaScript tunggal yang memuat semua kode aplikasi. Masalah umum:

1. **Duplicate dependencies** — library yang sama di-bundle beberapa kali (misal: moment.js × 2)
2. **Unused exports** — fungsi yang di-export tapi tidak dipakai
3. **Tree-shaking failures** — ESM yang tidak bisa di-tree-shake karena side effects
4. **Large dependencies** — library berat yang tidak ada alternatif ringan
5. **No code splitting** — semua kode ada di satu bundle

### Vite Build Process

```
Source Code (ESM)
  │
  ▼
┌──────────────────┐
│  Rollup Bundler  │
├──────────────────┤
│ 1. Flatten deps  │ → resolve import/require
│ 2. Merge modules │ → concatenate modules
│ 3. Tree-shake   │ → remove unused code
│ 4. Minify       │ → terser/esbuild
│ 5. Chunk split  │ → separate vendor/app/dynamic
└──────────────────┘
  │
  ▼
Output: dist/
```

---

## Checklist Pengerjaan

### Bagian A — Bundle Analysis (20 menit)

**1. Setup Bundle Analyzer**

Install bundle analyzer:

```bash
npm install --save-dev rollup-plugin-visualizer
# atau
npm install --save-dev webpack-bundle-analyzer
```

**2. Konfigurasi Vite**

Tambahkan ke `vite.config.js`:

```js
// Lihat code template untuk konfigurasi lengkap
// code/01-vite-config.js
```

**3. Generate dan Analisis Treemap**

```bash
npm run build
# Buka file yang digenerate: dist/bundle-stats.html
```

Identifikasi:
- Top 5 dependencies terbesar
- Apakah ada duplicate dependencies?
- Berapa persen kode yang sebenarnya dipakai (used vs total)?

**4. Dokumentasikan Temuan**

Buat tabel temuan:

| Dependency | Size (KB) | Purpose | Alternatif? | Status |
|------------|-----------|---------|-------------|--------|
| moment.js  | 300 KB    | Date formatting | date-fns (70KB) | Consider replace |
| lodash     | ...       | ...     | ...         | ...    |

### Bagian B — Tree-Shaking Audit (20 menit)

**1. Identifikasi Side Effects**

Rollup/tree-shaker hanya bisa menghilangkan kode yang **pure ESM** dan **tidak memiliki side effects**. Cek library kamu:

```json
// package.json — beri tahu bundler tentang side effects
{
  "sideEffects": [
    "*.css",
    "./src/polyfills.js"
  ]
}
```

Analisis: Apakah ada module yang salah ditandai sebagai `sideEffects: false` padahal sebenarnya punya side effects?

**2. Selective Imports**

Untuk setiap library besar yang kamu pakai, implementasikan selective imports:

```js
// BAD — import seluruh library
import _ from 'lodash';
const sorted = _.sortBy(items, 'name');

// GOOD — import fungsi spesifik (tree-shakeable)
import sortBy from 'lodash/sortBy';
const sorted = sortBy(items, 'name');

// BETTER — import individual functions (lodash-es)
import { sortBy } from 'lodash-es';
```

Audit 5 library terbesar dan tuliskan perubahan import yang diperlukan.

**3. CSS Tree-Shaking**

Cek apakah CSS yang tidak terpakai ikut terbundle:

```bash
npm install --save-dev purgecss
```

### Bagian C — Code Splitting (30 menit)

**1. Manual Dynamic Imports**

Identifikasi komponen yang bagus untuk lazy loading:

```jsx
// BEFORE — selalu di-load
import HeavyChart from './components/HeavyChart';
import AdminPanel from './components/AdminPanel';

// AFTER — hanya di-load saat dibutuhkan
const HeavyChart = lazy(() => import('./components/HeavyChart'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
```

Implementasikan `lazy()` + `<Suspense>` untuk:
- Halaman Admin
- Komponen Chart/Graph
- Modul export (PDF, Excel)
- Editor teks berat (rich text editor)

**2. Route-Based Splitting**

Konfigurasi React Router untuk route-based code splitting:

```jsx
// Contoh: setiap route jadi chunk terpisah
<Route
  path="/dashboard"
  element={<Suspense fallback={<Spinner />}><Dashboard /></Suspense>}
/>
```

Analisis: Berapa banyak chunk yang dibuat? Berapa ukuran masing-masing?

**3. Vendor Chunking**

Konfigurasi `rollupOptions.output.manualChunks` untuk memisahkan vendor dari aplikasi:

```js
// Lihat code template untuk contoh konfigurasi
```

Pertanyaan:
- Apakah pemisahan vendor chunk menguntungkan?
- Kapan sebaiknya vendor di-cache? Kapan di-rebundle?
- Bagaimana strategi cache versioning?

### Bagian D — Dependency Replacement (20 menit)

Evaluasi dan replace minimal 3 library besar dengan alternatif yang lebih ringan:

| Library | Size Asli | Alternatif | Size Alternatif | Effort | Status |
|---------|-----------|------------|----------------|--------|--------|
| moment.js (300KB) | date-fns (70KB) | ... | Replace | Done |
| lodash | lodash-es + selective | ... | ... | ... |
| axios | native fetch | ... | ... | ... |

Untuk setiap replacement, jawab:
1. Apakah semua fitur yang dipakai tersedia di alternatif?
2. Berapa effort estimasi untuk migrasi?
3. Apa risk-nya?

### Bagian E — Hasil Akhir (10 menit)

Jalankan Lighthouse audit lagi dan buat perbandingan:

```bash
npm run build
lighthouse http://localhost:5173 \
  --output html \
  --output-path ./lighthouse-after.html \
  --chrome-flags="--headless"
```

| Metrik | Sebelum | Sesudah | Improvement |
|--------|---------|---------|-------------|
| Bundle Size | 1.8 MB | ? | ? |
| Initial Load (3G) | 8.2s | ? | ? |
| TTI | 12s | ? | ? |
| Lighthouse Score | ? | ? | ? |

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Kelengkapan bundle analysis | 20% |
| Implementasi tree-shaking | 20% |
| Implementasi code splitting | 25% |
| Dependency replacement decisions | 20% |
| Hasil akhir (before/after comparison) | 15% |

---

## Reference

- [Vite — Bundling](https://vitejs.dev/guide/build.html)
- [Rollup — Tree-Shaking](https://rollupjs.org/guides/tree-shaking/)
- [Webpack — SplitChunks](https://webpack.js.org/plugins/split-chunks-plugin/)
- [Bundlephobia](https://bundlephobia.com/) — cek size library sebelum install
