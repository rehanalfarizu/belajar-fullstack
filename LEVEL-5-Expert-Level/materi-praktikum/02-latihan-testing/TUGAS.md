# TUGAS — Testing (Jest, React Testing Library, MSW, Playwright)

Test otomatis adalah jaring pengaman: kamu berani mengubah kode karena ada yang
memberi tahu kalau sesuatu rusak. Di sini kamu belajar menulis test yang
**berguna**, bukan sekadar menaikkan angka coverage.

## Hasil Akhir yang Diharapkan

1. Unit test untuk fungsi murni, termasuk kasus tepi dan test parametrik.
2. Test komponen React yang mengetes **perilaku yang dilihat user**, bukan detail
   implementasi.
3. Integration test halaman produk dengan API palsu (MSW), termasuk skenario
   error.
4. Satu atau dua alur end-to-end dengan Playwright (login, belanja).
5. Kebiasaan: menulis test yang gagal dulu, baru membuatnya lulus.

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-unit-testing.md` | `LEVEL-5-Expert-Level/materi-praktikum/02-latihan-testing/code/01-unit-testing-jest.test.js` | 100 menit |
| 02 | `soal/02-react-testing.md` | `LEVEL-5-Expert-Level/materi-praktikum/02-latihan-testing/code/03-react-testing-library.test.jsx` dan `LEVEL-5-Expert-Level/materi-praktikum/02-latihan-testing/code/03-button.test.jsx` | 100 menit |
| 03 | `soal/03-integration-testing.md` | Tidak ada starter yang cocok. Tulis dari nol (lihat catatan) | 100 menit |
| 04 | `soal/04-end-to-end-testing.md` | `LEVEL-5-Expert-Level/materi-praktikum/02-latihan-testing/code/04-end-to-end-playwright.spec.js` (sudah jadi, baca sebagai pembanding) | 110 menit |
| Bonus | Tidak ada soal | `LEVEL-5-Expert-Level/materi-praktikum/02-latihan-testing/code/02-slice.test.js` (test Redux slice, sudah jadi) | 45 menit |

### Catatan jujur

- README folder menyebut nama file lama (`01-math.test.js`, `03-button.test.jsx`,
  `04-playwright.spec.js`). Nama sebenarnya ada di tabel di atas.
- Soal 02 bicara tentang `AddToCartButton`. Starter `03-react-testing-library`
  melatih `Counter`, `TodoList`, `SearchFilter`, `UserProfile` dan memintamu
  **membuat komponennya** (TODO). Starter `03-button` melatih `Button` dan
  cart. Kerjakan keduanya sebagai latihan, lalu tulis test untuk
  `AddToCartButton` di file baru.
- Soal 03 membahas Product Listing Page dengan MSW. Tidak ada starter untuk itu.
  `02-slice.test.js` bukan jawabannya (itu test Redux, tanpa TODO).
- `code/04` dan `code/02` **sudah lengkap**. Anggap seperti `contoh/`: tulis
  versimu dulu, baru buka.
- Soal 04 meminta file workflow `.github/workflows/e2e.yml`. Itu dilatih lagi di
  [05-latihan-cicd](../05-latihan-cicd/TUGAS.md).

---

## Cara Menjalankan

File test tidak bisa jalan sendirian. Butuh proyek dan alat uji.

```bash
npm create vite@latest latihan-testing -- --template react
cd latihan-testing
npm install
npm install -D jest jest-environment-jsdom babel-jest @babel/preset-env @babel/preset-react \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event identity-obj-proxy
npm install -D msw                      # soal 03
npm install -D @playwright/test         # soal 04
npx playwright install chromium         # soal 04
```

- Setup Jest + Babel untuk JSX butuh `jest.config.*` dan `babel.config.*`.
  Cara persisnya ada di dokumentasi dan di
  [Testing dan CI/CD](../../software/02-testing-dan-ci-cd.md).
  Mengatur ini sendiri adalah bagian dari latihan.
- Alternatif yang sering dipakai proyek Vite: Vitest. Sintaksnya hampir sama
  dengan Jest. Boleh dipakai, tulis keputusanmu di jurnal.
- Jalankan: `npx jest nama-file` (atau `npm test`). E2E:
  `npx playwright test`.
- Starter menyebut path jalankan relatif ke repo ini (`npx jest materi-praktikum/...`).
  Di proyekmu, ganti sesuai lokasi salinan.
- Tes E2E butuh aplikasi yang berjalan (`npm run dev`) dan halaman login/produk
  nyata. Kamu perlu membuat aplikasi kecil dengan halaman itu (bisa dari
  [Level 4](../../../LEVEL-4-Fullstack-Integration/materi-praktikum/02-latihan-auth-fullstack/TUGAS.md)).

---

## Langkah Pengerjaan

1. **Soal 01** — mulai dari fungsi paling sederhana. Untuk tiap fungsi, tulis
   daftar kasus di kertas: normal, kosong, `null`, angka negatif, sangat besar.
   Tulis test **sebelum** mengisi implementasinya, lihat gagal (merah), baru
   hijau.
2. **Soal 02** — tanyakan: "apa yang user lihat dan lakukan?" Cari elemen dengan
   role/label (`getByRole`), bukan class CSS. Pakai `userEvent` untuk klik dan
   ketik.
3. **Soal 03** — daftarkan dulu endpoint yang dipanggil halaman. Buat handler MSW
   untuk sukses, lalu untuk error 500 dan daftar kosong. Test tiap skenario.
4. **Soal 04** — pilih satu alur terpenting saja dulu (login). Ketahui kapan
   E2E layak dipakai: alur kritis, bukan semua kombinasi.
5. **Coverage** — jalankan, lihat baris yang belum tercakup, lalu tanyakan
   apakah baris itu perlu dites. Jangan mengejar angka 100%.

Teori: [Testing](../../materi-teori/02-testing/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Error umum

- `SyntaxError: Unexpected token <` → Jest belum tahu cara membaca JSX. Cek
  konfigurasi Babel/transform.
- `document is not defined` → environment test bukan `jsdom`.
- `Unable to find an element with the role...` → baca daftar role yang
  tersedia di pesan error. Itu petunjuk langsung.
- `act(...)` warning → ada update state yang belum ditunggu. Pakai `await` pada
  `userEvent` dan `findBy...` untuk elemen yang muncul belakangan.

### Level 2 — Lihat buktinya

- `screen.debug()` mencetak DOM saat itu. Taruh sebelum assertion yang gagal.
- Tambahkan sementara `console.log` di komponen untuk melihat props yang masuk.
- Playwright: `npx playwright test --ui` atau `--headed`, dan buka trace
  (`npx playwright show-trace`) untuk melihat setiap langkah.
- Cek apakah test lulus karena **benar**, bukan karena tidak memeriksa apa-apa:
  rusak-kan implementasinya dengan sengaja, test harus merah.

### Level 3 — Perkecil masalah

- Test flaky (kadang lulus, kadang gagal)? Cari `setTimeout`, urutan async, atau
  data yang dipakai bersama antar test. Setiap test harus berdiri sendiri.
- Mocking terlalu rumit? Tanya: apakah ini bisa dites tanpa mock sama sekali?
  MSW membantu karena mock di level jaringan, bukan di level fungsi.

### Dokumentasi

- jestjs.io → Getting Started, Expect, Mock Functions.
- testing-library.com → "Guiding Principles", "Queries → About Queries",
  "user-event".
- mswjs.io → Getting started.
- playwright.dev → "Writing tests", "Best Practices".

---

## Cara Mengecek Hasil Sendiri

```bash
npx jest --coverage
npx playwright test
```

- [ ] Semua test hijau, dan tidak ada test yang di-`skip` atau `.only`.
- [ ] **Uji mutasi manual:** ubah satu operator di kode yang dites (misalnya `+`
      jadi `-`). Minimal satu test harus gagal. Kalau tidak ada, test-mu lemah.
- [ ] Test komponen tidak bergantung pada class CSS atau struktur DOM internal.
- [ ] Ada test untuk jalur gagal (API error, input kosong), bukan hanya jalur
      sukses.
- [ ] Test bisa dijalankan dalam urutan acak dan tetap lulus
      (`npx jest --randomize`, bila versi Jest-mu mendukung).
- [ ] Laporan Playwright (`playwright-report/`) bisa dibuka dan menunjukkan
      langkah tiap test.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md), lalu lanjut ke
[03-latihan-docker](../03-latihan-docker/TUGAS.md).
