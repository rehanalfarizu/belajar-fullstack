# SOAL 03 — Error Boundary

## Tujuan
Memahami Error Boundary untuk graceful error handling di React.

---

## Deskripsi
Error boundary component yang catch errors di subtree.

---

## Syarat (Checklist)

### Class-based Error Boundary
- [ ] `componentDidCatch(error, info)`
- [ ] `static getDerivedStateFromError(error)` — update state
- [ ] Render fallback UI

### Function Error Boundary (React 16+)
- [ ] Tidak ada (harus class component)
- [ ] Bisa wrap class component

### Usage
- [ ] Wrap component yang error-prone
- [ ] Reset error state dengan button

---

## Contoh Code

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

---

## Cara Submit
1. Buat ErrorBoundary class component
2. Buat component yang throw error
3. Wrap dengan ErrorBoundary
4. Test: click "Coba Lagi" → error reset
