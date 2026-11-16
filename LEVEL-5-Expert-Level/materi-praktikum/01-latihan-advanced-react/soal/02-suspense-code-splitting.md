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

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

---

## Cara Submit
1. Buat 3 page components (Home, About, Dashboard)
2. Lazy load semuanya
3. Suspense dengan loading spinner
4. Cek network tab → bundle terpisah