# TUGAS — Performa Web (Lighthouse, Core Web Vitals, Bundle, Gambar)

> **Urutan folder `01-` di Level 5:** kerjakan
> [01-latihan-advanced-react](../01-latihan-advanced-react/TUGAS.md) **dulu**,
> baru folder ini. Soal 03 di sini memakai `React.lazy` dan `Suspense` yang
> dilatih di sana.

Aturan emas performa: **ukur dulu, baru ubah**. Folder ini melatih kebiasaan itu.
Setiap perubahan harus punya angka sebelum dan sesudah.

## Hasil Akhir yang Diharapkan

1. Laporan audit Lighthouse untuk aplikasi Vite React (angka sebelum dan sesudah).
2. Analisis LCP, INP, dan CLS: apa penyebabnya di aplikasimu, bukan teori umum.
3. Bundle yang lebih kecil, dibuktikan dengan visualisasi bundle dan perbandingan
   ukuran file.
4. Komponen gambar yang hemat (lazy, ukuran responsif, tanpa layout shift).

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-lighthouse-audit.md` | Tidak ada starter. Kamu mengaudit aplikasi Vite buatanmu | 90 menit |
| 02 | `soal/02-core-web-vitals.md` | Tidak ada starter khusus. Pakai aplikasi yang sama dan DevTools | 120 menit |
| 03 | `soal/03-bundle-optimization.md` | `LEVEL-5-Expert-Level/materi-praktikum/01-latihan-performa/code/01-vite-config.js` dan `LEVEL-5-Expert-Level/materi-praktikum/01-latihan-performa/code/02-code-splitting.jsx` | 100 menit |
| Bonus | Tidak ada soal (gambar) | `LEVEL-5-Expert-Level/materi-praktikum/01-latihan-performa/code/03-image-component.jsx` lalu `LEVEL-5-Expert-Level/materi-praktikum/01-latihan-performa/code/04-image-optimization.jsx` | 90 menit |

### Catatan

- README folder menyebut `soal/04-bundle-optimization.md` (optimasi gambar).
  File itu **tidak ada**. Dua starter gambar tidak punya soal, jadi dikerjakan
  sebagai bonus berdasarkan TODO di dalam file.
- Soal 01 dan 02 tidak punya starter. Mereka latihan **mengukur**, bukan menulis
  komponen.
- Soal 02 menyebut `code/01-vite-config.js` hanya sebagai referensi.

---

## Cara Menjalankan

File di `code/` adalah potongan, bukan proyek utuh.

```bash
npm create vite@latest perf-app -- --template react
cd perf-app
npm install
npm install -D rollup-plugin-visualizer     # soal 03
npm run dev
```

1. Salin isi `01-vite-config.js` yang sudah kamu kerjakan ke `vite.config.js`
   proyekmu (jangan ganti nama file).
2. Salin `02-code-splitting.jsx` dan komponen gambar ke `src/`, tambahkan
   `export` seperlunya, lalu import di `src/App.jsx`.
3. **Ukur hanya pada build produksi:**
   `npm run build && npm run preview` (biasanya `http://localhost:4173`).
   Mode dev tidak mewakili performa asli.
4. Jalankan Lighthouse dari DevTools → tab Lighthouse, pakai jendela Incognito
   supaya ekstensi browser tidak mengganggu angka.
5. Aplikasi default Vite sangat kecil. Supaya ada yang diperbaiki, tambahkan
   dulu beban: library besar yang dipakai sedikit, gambar besar, dan beberapa
   halaman berat.

---

## Langkah Pengerjaan

1. **Catat baseline.** Lighthouse 3 kali, ambil nilai tengah. Simpan screenshot.
2. **Soal 01** — tulis tiga temuan terbesar dan hipotesismu: "kalau aku ubah X,
   metrik Y membaik karena Z".
3. **Soal 02** — pahami beda data lab dan data lapangan. Tentukan elemen LCP
   halamanmu (DevTools → Performance → LCP). Cari penyebab layout shift.
4. **Soal 03** — buka visualisasi bundle dulu. Tulis 3 paket terbesar. Lalu
   atasi satu per satu, build ulang tiap kali, dan catat ukurannya.
5. **Bonus gambar** — mulai dari `<img>` biasa dengan `width`/`height` yang
   benar dan `loading="lazy"`. Baru tambah `srcset`, lalu format modern.
6. **Bandingkan** angka akhir dengan baseline. Tulis kesimpulan jujur, termasuk
   perubahan yang ternyata tidak berpengaruh.

Teori: [Performance Optimization](../../materi-teori/01-performance-optimization/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Pastikan pengukurannya benar

- Angka Lighthouse naik-turun? Normal. Ulangi, pakai Incognito, tutup tab lain.
- Mengukur di `npm run dev`? Salah. Gunakan `build` + `preview`.
- `rollup-plugin-visualizer` tidak membuat file? Cek apakah plugin sudah terdaftar
  di `plugins` dan build dijalankan ulang.

### Level 2 — Lihat buktinya

- **DevTools → Network**: urutkan berdasarkan Size. Centang "Disable cache" lalu
  throttle "Slow 4G". File mana terbesar? Mana yang memblokir render?
- **DevTools → Performance**: rekam reload. Cari penanda LCP dan "Long task"
  (merah).
- **DevTools → Coverage** (Ctrl+Shift+P → "Show Coverage"): berapa persen
  JavaScript yang tidak terpakai?
- **Lighthouse → Treemap**: peta ukuran modul di bundle.

### Level 3 — Perkecil masalah

- Satu perubahan per percobaan. Kalau kamu mengubah lima hal sekaligus, kamu
  tidak akan tahu mana yang berhasil.
- Bundle besar karena satu library? Tanyakan: apakah semua bagiannya dipakai?
  Apakah ada alternatif lebih ringan? Apakah bisa dimuat hanya saat dibutuhkan?
- CLS tinggi? Cari elemen yang muncul belakangan dan mendorong konten lain.

### Dokumentasi

- web.dev → "Core Web Vitals", "Optimize LCP", "Optimize INP", "Optimize CLS".
- developer.chrome.com → Lighthouse.
- vite.dev → Guide → "Building for Production".
- MDN → `<img srcset>`, `loading="lazy"`.

---

## Cara Mengecek Hasil Sendiri

- [ ] Ada tabel sebelum/sesudah: ukuran bundle, jumlah request, LCP, CLS, INP
      (atau TBT), skor Performance.
- [ ] Ukuran file JS terbesar di folder `dist/assets` berkurang dibanding
      baseline: `ls -lh dist/assets`.
- [ ] Setelah code splitting, halaman pertama tidak memuat kode halaman lain
      (cek Network saat pertama buka).
- [ ] Gambar di bawah layar tidak diunduh sebelum di-scroll (Network).
- [ ] Tidak ada layout shift saat gambar muncul (Lighthouse CLS mendekati 0).
- [ ] Kamu bisa menjelaskan satu perubahan yang **tidak** membantu dan kenapa.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md), lalu lanjut ke
[02-latihan-testing](../02-latihan-testing/TUGAS.md).
