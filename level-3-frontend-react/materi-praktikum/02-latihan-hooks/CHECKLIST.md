# CHECKLIST — React Hooks Lanjutan

Centang dengan jujur. Kalau cuma "kayaknya bisa", jangan centang dulu.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda `useRef` dan `useState` (mana yang memicu render)
- [ ] Aku paham kenapa effect butuh cleanup, dan kapan cleanup dijalankan
- [ ] Aku paham kenapa StrictMode menjalankan effect dua kali di development
- [ ] Aku bisa menjelaskan stale closure dengan contoh timer
- [ ] Aku paham `useCallback` tidak berguna tanpa `React.memo` (atau dependency
      effect) di sisi penerima
- [ ] Aku bisa menjelaskan kapan `useReducer` lebih cocok daripada beberapa
      `useState`
- [ ] Aku paham "derived value" (total, subtotal) sebaiknya dihitung, bukan
      disimpan jadi state
- [ ] Aku paham race condition pada fetch: response lama bisa datang belakangan

---

## Kemampuan Praktis

- [ ] Aku bisa membuat timer dengan `setInterval` + cleanup yang benar
- [ ] Aku bisa membuat input yang auto-focus dengan `useRef`
- [ ] Aku bisa memilah mana yang state (tampil di layar) dan mana yang ref (interval ID, waktu mulai) di Stopwatch
- [ ] Aku bisa membuat debounce untuk input pencarian
- [ ] Aku bisa membatalkan request lama dengan `AbortController`
- [ ] Aku bisa menulis reducer murni dan mengetesnya tanpa React
- [ ] Aku bisa menggabungkan `useReducer` dengan Context dan hook `useCart()`
- [ ] Aku bisa menulis custom hook yang dipakai di lebih dari satu komponen
- [ ] Aku bisa memakai React DevTools Profiler untuk membuktikan komponen
      render ulang atau tidak

---

## Kebiasaan Baik

- [ ] Aku mengukur dulu di Profiler sebelum menambah `useCallback`/`useMemo`
- [ ] Aku tidak mematikan aturan lint `react-hooks/exhaustive-deps` hanya supaya
      warning hilang
- [ ] `useLocalStorage` buatanku tahan terhadap data rusak (pakai try/catch)
- [ ] Aku tidak memakai `useLocalStorage` untuk menyimpan token login. localStorage
      bisa dibaca script apa pun di halaman, termasuk script hasil XSS
      (baca [XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md))
- [ ] Aku mencatat di jurnal keputusan desain yang aku ambil (misalnya soal 2B)

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[03-latihan-router](../03-latihan-router/TUGAS.md).
