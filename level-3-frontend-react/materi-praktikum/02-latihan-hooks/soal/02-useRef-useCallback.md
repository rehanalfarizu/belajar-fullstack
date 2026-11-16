# SOAL 02 — useRef dan useCallback

## Tujuan Pembelajaran
Setelah menyelesaikan soal ini, mahasiswa diharapkan mampu:
1. Menggunakan `useRef` untuk mereferensikan DOM element
2. Menggunakan `useRef` untuk menyimpan nilai mutable yang tidak trigger re-render
3. Menggunakan `useCallback` untuk memoize function
4. Memahami kapan harus menggunakan `useRef` vs `useState`

---

## Briefing
`useRef` memberikan cara untuk mengakses DOM element secara langsung dan menyimpan nilai yang persist antar render tanpa trigger re-render. `useCallback` mencegah function dibuat ulang setiap render — penting untuk optimasi performance.

---

## Deskripsi

### Soal 2A — Auto-focus Input dengan useRef
Component `SearchBar`:
- Input dengan placeholder "Ketik untuk mencari..."
- Tombol "Clear" → clear input + focus kembali ke input
- Saat mount: input auto-focused
- Gunakan `useRef` untuk mereferensikan DOM element

Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "02-useRef-useCallback Soal 2A — SearchBar auto-focus").

Petunjuk: ref mana yang menunjuk ke `<input>`, dan di prop mana ia dipasang? Kapan elemen DOM sudah ada sehingga aman dipanggil `.focus()`?

### Soal 2B — Stopwatch dengan useRef (Mutable Timer)
Component `Stopwatch`:
- State: `isRunning` (boolean) dan `elapsedTime` (number, milidetik) — angka ini
  tampil di layar, jadi harus state supaya layar ikut berubah
- Gunakan `useRef` untuk nilai yang **tidak** tampil di layar: interval ID dan
  waktu mulai (`Date.now()` saat Start)
- Start: update `elapsedTime` setiap 100ms
- Stop: `clearInterval`
- Reset: set `elapsedTime` ke 0
- Display: MM:SS:ms format

**Aturan pegangan:** nilai yang ditampilkan butuh `useState`. Nilai yang cuma dipakai
di balik layar (ID interval, waktu mulai) cocok di `useRef`, karena mengubahnya
tidak memicu render ulang. Kalau `elapsedTime` ditaruh di `useRef`, angkanya
berubah tapi layar tidak pernah ikut. Coba buktikan sendiri, lalu tulis temuanmu.

### Soal 2C — useCallback untuk Prevent Re-render
Component `Parent` dengan `Child` component:
- Parent punya state `count` dan `text`
- `handleClick` di-pass sebagai prop ke Child
- Gunakan `useCallback` untuk `handleClick` — dependency: `[count]`
- Child memoized dengan `React.memo`

Demonstrasi: ketik di input `text` → Child TIDAK re-render (karena `handleClick` tidak berubah). Klik tombol `count` → Child RE-RENDER.

---

## Syarat (Checklist)
- [ ] useRef.inputRef.current.focus() dipanggil saat mount
- [ ] Stopwatch menyimpan interval ID dan waktu mulai di useRef
- [ ] elapsedTime (yang tampil) di useState, dan interval dibersihkan saat Stop/unmount
- [ ] useCallback mencegah function dibuat ulang tidak perlu
- [ ] React.memo + useCallback bekerja bersama dengan benar

---

## Expected Output
- SearchBar: auto-focused saat mount, focus kembali saat clear
- Stopwatch: stopwatch berjalan dengan MM:SS:ms display
- Parent/Child: Child tidak re-render saat text berubah

---

## Cara Submit
1. Simpan sebagai `02-useRef-useCallback.jsx`
2. Jalankan `npm start`
3. Pastikan hasilnya sesuai