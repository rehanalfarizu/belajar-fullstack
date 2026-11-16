# TUGAS — React Hooks Lanjutan

Di sini kamu belajar hook yang sering bikin bingung: `useRef`, `useCallback`,
`useReducer`, dan custom hook. Fokusnya bukan hafal API, tapi paham **kapan**
komponen render ulang dan **kenapa**.

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu punya:

1. TrafficLight yang ganti warna otomatis dan berhenti bersih saat di-unmount.
2. Pencarian user GitHub yang tidak mengirim request di setiap ketikan dan tidak
   menampilkan hasil yang "kesalip" request lama.
3. Stopwatch dengan `useRef`, input auto-focus, dan demo `useCallback` +
   `React.memo` yang bisa kamu buktikan di Profiler.
4. Keranjang belanja dengan `useReducer` + Context, total dihitung dari state.
5. Kumpulan custom hook buatanmu sendiri (`useLocalStorage`, `useDebounce`,
   `useFetch`, `useToggle`, dll).

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-useState-useEffect.md` | `level-3-frontend-react/materi-praktikum/02-latihan-hooks/code/01-useState-useEffect.jsx` (1A) dan `level-3-frontend-react/materi-praktikum/02-latihan-hooks/code/02-useRef-useCallback.jsx` bagian `GitHubUserSearch` (1B) | 90 menit |
| 02 | `soal/02-useRef-useCallback.md` | `level-3-frontend-react/materi-praktikum/02-latihan-hooks/code/02-useRef-useCallback.jsx` (sisa TODO) + file baru buatanmu untuk 2A dan 2C | 90 menit |
| 03 | `soal/03-useContext-useReducer.md` | `level-3-frontend-react/materi-praktikum/02-latihan-hooks/code/03-useContext-useReducer.jsx` (kerangka dengan TODO) | 90–120 menit |
| 04 | `soal/04-custom-hooks.md` | `level-3-frontend-react/materi-praktikum/02-latihan-hooks/code/04-custom-hooks.jsx` | 90 menit |

### Catatan: starter tidak pas 1:1 dengan soal

- `code/01` berisi TODO `TrafficLight`, `ColorPicker`, `AnimatedCounter`.
  TrafficLight = soal 1A. Dua lainnya bonus.
- `code/02` justru berisi `GitHubUserSearch` (soal 1B), timer/clock, document
  title, resize listener, dan fetch API. TODO auto-focus (2A) dan
  `useCallback` + `React.memo` (2C) **tidak ada** di starter. Buat file sendiri.
- `code/03-useContext-useReducer.jsx` berupa kerangka dengan `TODO(human)` dan
  kriteria "Selesai kalau". Implementasi lama dipindah ke
  [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Jangan dibuka
  sebelum versimu jalan. Nama action-nya beda dengan soal; ikuti soal.
- `code/04` berisi `useLocalStorage`, `useDebounce`, `usePrevious`,
  `useIntersectionObserver`, `useMediaQuery`, `useOnClickOutside`. Soal minta
  juga `useFetch` dan `useToggle`, yang tidak ada di starter. Tulis sendiri.
- Soal 2B: `elapsedTime` tampil di layar, jadi dia state. Yang masuk `useRef`
  adalah interval ID dan waktu mulai (tidak tampil, tidak perlu memicu render).
  Starter `code/02-useRef-useCallback.jsx` sebenarnya isinya useEffect (soal 01);
  di akhir file ada kerangka kosong untuk 2B. Coba dulu taruh `elapsedTime` di
  `useRef` dan amati apa yang terjadi pada layar, lalu catat di jurnal.

---

### Soal buntu?

Blok jawaban yang dulu ada di starter dipindah ke [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Coba dulu minimal 30 menit dan catat apa yang sudah kamu coba, baru buka untuk membandingkan.

## Cara Menjalankan Starter

Sama seperti folder sebelumnya. Butuh proyek Vite React
([panduan install](../../software/01-react-dan-vite-install.md)).

```bash
npm create vite@latest latihan-hooks -- --template react
cd latihan-hooks
npm install
npm run dev
```

1. Salin starter ke `src/`.
2. File starter di sini **tidak punya** `export default`. Tambahkan `export`
   pada komponen yang mau kamu tampilkan, lalu import di `src/App.jsx`.
3. Header soal menulis `npm start`. Di Vite pakai `npm run dev`.
4. Soal GitHub search butuh internet (memanggil `api.github.com`). API ini punya
   batas request per jam untuk pengguna tanpa login. Kalau dapat status 403,
   tunggu dulu, jangan langsung curiga kodemu.

---

## Langkah Pengerjaan

1. **Soal 01A (TrafficLight)** — tulis di kertas urutan warna dan durasinya.
   Tentukan: state apa yang dibutuhkan? Timer dibuat di mana? Siapa yang
   membersihkannya?
2. **Soal 01B (GitHub search)** — kerjakan tanpa debounce dulu. Lihat tab Network
   saat mengetik. Baru tambahkan debounce, lalu pembatalan request lama.
3. **Soal 02A dan 02B** — sebelum menulis, jawab: "nilai ini perlu tampil di layar
   atau tidak?" Kalau tidak, itu kandidat `useRef`.
4. **Soal 02C** — buat dulu versi **tanpa** `useCallback` dan `React.memo`. Ukur
   dengan Profiler. Baru tambahkan, lalu ukur lagi. Bandingkan.
5. **Soal 03** — tulis reducer sebagai fungsi biasa dulu, tanpa React. Panggil
   `reducer(state, action)` di `console.log` untuk tiap action. Kalau semua
   benar, baru sambungkan ke `useReducer` dan Context.
6. **Soal 04** — satu hook per sesi kecil. Tiap hook langsung dipakai di satu
   komponen demo kecil supaya kelihatan hasilnya.

Teori: [React Hooks](../../materi-teori/02-react-hooks/README.md) dan
[State Management](../../materi-teori/04-state-management/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Cek gejala

- Timer jalan dobel / makin cepat? Kemungkinan interval lama belum dibersihkan.
  Cari apakah effect-mu me-return fungsi cleanup.
- Di mode development, React (StrictMode) sengaja menjalankan effect dua kali.
  Ini membantu kamu menemukan cleanup yang hilang. Jangan hapus StrictMode untuk
  "memperbaiki" bug.
- Angka di timer "nyangkut" di nilai lama? Itu tanda stale closure. Baca kasus 2
  di [Self Problem Solving](../../SELF_PROBLEM_SOLVING.md).

### Level 2 — Lihat buktinya

- **Network tab**: berapa request saat kamu mengetik "react"? Satu atau lima?
  Ada yang berstatus `(canceled)`?
- **React DevTools → Profiler**: rekam, klik tombol, berhenti. Lihat komponen
  mana yang render dan kenapa ("Why did this render?" bisa diaktifkan di
  pengaturan Profiler).
- **React DevTools → Components**: klik komponen yang pakai `useReducer`, lihat
  state-nya berubah setelah dispatch.

### Level 3 — Perkecil masalah

- Debounce bingung? Buat dulu input yang menampilkan "nilai setelah 500 ms
  berhenti mengetik" di layar. Belum perlu fetch.
- Race condition bingung? Simulasikan: buat fungsi palsu yang resolve dengan
  delay acak, lalu panggil cepat dua kali. Mana yang tampil terakhir?
- `useLocalStorage` error saat parse? Coba `JSON.parse` pada nilai rusak di
  Console browser. Apa yang terjadi? Bagaimana hook-mu harus bersikap?

### Dokumentasi

- react.dev → Reference → `useRef`, `useCallback`, `useReducer`, `memo`.
- react.dev → Learn → "You Might Not Need an Effect" dan
  "Reusing Logic with Custom Hooks".
- MDN → `AbortController`.

---

## Cara Mengecek Hasil Sendiri

- [ ] Console bersih: tidak ada error dan tidak ada warning dari React.
- [ ] TrafficLight: pindah ke komponen lain (unmount), lalu cek di Console bahwa
      log dari timer berhenti.
- [ ] GitHub search: ketik "react" cepat. Di tab Network hanya ada sedikit
      request, bukan satu per huruf. Hasil yang tampil sesuai kata terakhir.
- [ ] Stopwatch: start-stop-start berkali-kali. Kecepatannya tetap normal.
- [ ] Demo `useCallback`: di Profiler, Child **tidak** ikut render saat kamu
      mengetik di input text, tapi render saat count berubah.
- [ ] Keranjang: tambah item yang sama dua kali, quantity jadi 2 (bukan baris
      dobel). Ubah quantity ke 0, item hilang. Total = subtotal − diskon + ongkir.
- [ ] Custom hook: refresh halaman, nilai `useLocalStorage` masih ada. Isi
      localStorage dengan teks rusak lewat DevTools → Application, halaman tidak
      crash.
- [ ] `npm run build` sukses.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md). Bandingkan keranjangmu dengan
[solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md) **setelah** punyamu jalan. Tulis di jurnal:
keputusan apa yang beda, dan mana yang menurutmu lebih jelas.
