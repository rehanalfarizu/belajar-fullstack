# SOAL 02 — Suspense & Code Splitting

## Tujuan
Memahami lazy loading dan Suspense untuk performance.

---

## Deskripsi
Lazy load component dan route dengan Suspense boundaries.

---

## Syarat (Checklist)

### Lazy Loading
- [ ] `React.lazy(() => import("./Component"))`
- [ ] Lazy + Suspense untuk route
- [ ] Loading fallback

### Route-based Splitting
- [ ] Lazy setiap page component
- [ ] Suspense boundary per route

### Preloading
- [ ] Preload on hover/focus
- [ ] `const prefetch = () => import("./Component")`

---

## Contoh Code

```jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load — tidak di-load sampai diakses
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function Loading() {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <div style={{
        width: 40, height: 40,
        border: "4px solid #e2e8f0",
        borderTopColor: "#3b82f6",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        margin: "0 auto",
      }} />
      <p>Loading...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

## Cara Submit
1. Buat 3 page components (Home, About, Dashboard)
2. Lazy load semuanya
3. Suspense dengan loading spinner
4. Cek network tab → bundle terpisah