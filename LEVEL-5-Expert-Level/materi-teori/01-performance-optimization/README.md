# 📘 MATERI TEORI 01 — Performance Optimization

## 1. Core Web Vitals

Metrik performa dari Google untuk UX:

```
LCP (Largest Contentful Paint) — Waktu muat konten terbesar
  ✅< 2.5 detik
  ⚠️ 2.5 - 4 detik
  ❌ > 4 detik

INP (Interaction to Next Paint) — Responsivitas interaksi
  ✅ < 200ms
  ⚠️  200 - 500ms
  ❌ > 500ms

CLS (Cumulative Layout Shift) — Stabilitas visual (tidak loncat-loncad)
  ✅ < 0.1
  ⚠️  0.1 - 0.25
  ❌ > 0.25
```

---

## 2. Lighthouse — Analisis Performa

```bash
# CLI
npm install -g lighthouse
lighthouse https://myapp.com --output html --output-path ./report.html

# VS Code Extension: Lighthouse
# Browser DevTools → Lighthouse tab
```

```javascript
// Lighthouse di CI (GitHub Actions)
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

async function audit(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const result = await lighthouse(url, {
    port: chrome.port,
    onlyCategories: ["performance"]
  });
  await chrome.kill();

  const score = result.lhr.categories.performance.score * 100;
  if (score < 90) {
    console.error(`Performa rendah: ${score}/100`);
    process.exit(1);
  }
}
```

---

## 3. React Performance — Tidak Re-render Berlebihan

### React.memo

```jsx
import { memo } from "react";

// ❌ Tanpa memo — re-render kalau parent re-render
function UserCard({ name, email }) {
  return <div>{name} - {email}</div>;
}

// ✅ Dengan memo — hanya re-render kalau props berubah
const UserCard = memo(function UserCard({ name, email }) {
  return <div>{name} - {email}</div>;
});
```

### useMemo — Cache Hasil Komputasi

```jsx
import { useMemo } from "react";

function ExpensiveList({ items, filter }) {
  // Hanya recompute kalau items atau filter berubah
  const filtered = useMemo(() => {
    console.log("Filtering..."); // demo
    return items
      .filter(item => item.category === filter)
      .sort((a, b) => b.price - a.price);
  }, [items, filter]);

  return (
    <ul>
      {filtered.map(item => (
        <li key={item.id}>{item.name} - {item.price}</li>
      ))}
    </ul>
  );
}
```

### useCallback — Cache Function

```jsx
import { useCallback } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // ✅ useCallback — fungsi yang sama selama deps tidak berubah
  const handleClick = useCallback(() => {
    console.log("Klik!");
  }, []);

  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <Child onClick={handleClick} />
      <Counter count={count} onIncrement={handleIncrement} />
    </div>
  );
}
```

---

## 4. Code Splitting & Lazy Loading

```jsx
import { lazy, Suspense } from "react";

// ❌ Semua dimuat sekaligus (bundle besar)
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

// ✅ Lazy load — potong bundle
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### Vite — Chunk Strategy

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          utils: ["lodash", "date-fns"],
          charts: ["recharts", "chart.js"]
        }
      }
    }
  }
});
```

---

## 5. Image Optimization

```jsx
// ❌ Gambar besar tanpa optimisasi
<img src="/hero.jpg" />  // 5MB!

// ✅ Responsive images
<img
  src="/hero-400.jpg"
  srcSet="/hero-400.jpg 400w, /hero-800.jpg 800w, /hero-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  loading="lazy"          // lazy load
  decoding="async"        // async decode
  alt="Hero image"
/>

// ✅ Next.js Image
import Image from "next/image";

<Image
  src="/hero.jpg"
  width={800}
  height={400}
  alt="Hero"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // preload blur
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ✅ Vite image optimization
// Pakai sharp/imagestack untuk build-time optimization
```

---

## 6. Memoization — Hindari Komputasi Berulang

```jsx
// ❌ Komputasi berat di render
function ExpensiveTable({ data }) {
  const sorted = [...data].sort((a, b) => b.revenue - a.revenue); // sort setiap render!
  const filtered = sorted.filter(item => item.status === "active");
  const total = filtered.reduce((sum, item) => sum + item.revenue, 0);
  // ...
}

// ✅ Memoize semua
const sorted = useMemo(
  () => [...data].sort((a, b) => b.revenue - a.revenue),
  [data]
);
const filtered = useMemo(
  () => sorted.filter(item => item.status === "active"),
  [sorted]
);
const total = useMemo(
  () => filtered.reduce((sum, item) => sum + item.revenue, 0),
  [filtered]
);
```

---

## 7. Bundle Size Optimization

```bash
# Cek bundle size
npm install --save-dev rollup-plugin-visualizer
npx vite build --mode production
# Buka ./stats.html untuk visualisasi

# Bundle analyzer
import { visualizer } from "rollup-plugin-visualizer";
```

```javascript
// ⚠️ Package besar — jangan import semuanya
import _ from "lodash";         // 70KB+
import moment from "moment";    // 70KB+

// ✅ Import yang spesifik
import debounce from "lodash/debounce";
import cloneDeep from "lodash/cloneDeep";
import { format, formatDistance } from "date-fns";

// ✅ Pakai alternatif yang lebih kecil
// moment → date-fns (5KB vs 70KB)
// lodash → native JS atau tiny equivalents
// axios → native fetch (untuk kasus sederhana)
```

---

## 8. Web Vitals Monitoring

```jsx
// src/vitals.js — Core Web Vitals tracking
import { onCLS, onFID, onLCP, onINP, onFCP, onTTFB } from "web-vitals";

function sendToAnalytics({ name, value, id }) {
  // Kirim ke analytics service
  navigator.sendBeacon("/analytics", JSON.stringify({
    metric: name,
    value: Math.round(name === "CLS" ? value * 1000 : value),
    id
  }));
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

// Usage di App.jsx
import { reportWebVitals } from "./vitals";
reportWebVitals(console.log); // atau kirim ke analytics
```

---

## Ringkasan

```
Performance Optimization
├── Core Web Vitals → LCP < 2.5s, INP < 200ms, CLS < 0.1
├── Lighthouse      → audit performa otomatis
├── React.memo      → cegah re-render tidak perlu
├── useMemo → cache hasil komputasi
├── useCallback     → cache function definition
├── Lazy Loading    → lazy() + Suspense, code splitting
├── Image Opt       → srcSet, lazy, next/image
├── Bundle Size     → tree-shaking, import spesifik
└── Web Vitals → monitor LCP, CLS, INP di production
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/01-latihan-performa/`