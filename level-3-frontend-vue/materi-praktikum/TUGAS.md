# TUGAS — Praktikum Vue 3

## Hasil Akhir yang Diharapkan

Setelah semua soal selesai, kamu akan punya:

1. Satu project Vite + Vue berisi 11 komponen/modul hasil ketikanmu sendiri
2. Pengalaman memakai `ref`, `computed`, props, emit, slot, lifecycle,
   composable, Vue Router, Pinia, dan `fetch`
3. Satu unit test (soal 07) dan satu perbaikan keamanan (soal 11)
4. Catatan refleksi per soal: apa yang bikin macet dan bagaimana kamu keluar

---

## Daftar Soal

Kerjakan berurutan. Setiap soal membangun di atas soal sebelumnya.

| No | Soal | Starter (file yang kamu edit) | Estimasi |
| --- | --- | --- | --- |
| 01 | [Counter](soal/01-counter.md) | `level-3-frontend-vue/materi-praktikum/code/01-counter.vue` | 30-45 menit |
| 02 | [Product Filter](soal/02-product-filter.md) | `level-3-frontend-vue/materi-praktikum/code/02-product-filter.vue` | 45-60 menit |
| 03 | [Product Card](soal/03-product-card.md) | `level-3-frontend-vue/materi-praktikum/code/03-product-card.vue` | 45-75 menit |
| 04 | [Add to Cart (emit)](soal/04-add-to-cart.md) | `level-3-frontend-vue/materi-praktikum/code/04-add-to-cart.vue` | 45-75 menit |
| 05 | [Cart Reactivity](soal/05-cart-reactivity.md) | `level-3-frontend-vue/materi-praktikum/code/05-cart-reactivity.vue` | 45-60 menit |
| 06 | [Products Lifecycle](soal/06-products-lifecycle.md) | `level-3-frontend-vue/materi-praktikum/code/06-products-lifecycle.vue` | 60-90 menit |
| 07 | [useCounter Composable](soal/07-use-counter.md) | `level-3-frontend-vue/materi-praktikum/code/07-use-counter.js` | 60-90 menit |
| 08 | [Router + Guard](soal/08-router.md) | `level-3-frontend-vue/materi-praktikum/code/08-router.js` | 90-120 menit |
| 09 | [Cart Store (Pinia)](soal/09-cart-store.md) | `level-3-frontend-vue/materi-praktikum/code/09-cart-store.js` | 60-90 menit |
| 10 | [Products API](soal/10-products-api.md) | `level-3-frontend-vue/materi-praktikum/code/10-products-api.vue` | 90-150 menit |
| 11 | [Render Aman tanpa v-html](soal/11-render-aman-tanpa-v-html.md) | `level-3-frontend-vue/materi-praktikum/code/11-komentar-aman.vue` | 45-60 menit |

Total kira-kira **12-17 jam**. Jangan dipaksa sehari. Dua soal per hari sudah bagus.

---

## Cara Menjalankan Starter (Jujur Soal Setup)

File di `code/` **bukan project yang bisa langsung `npm run dev`**. Isinya cuma
satu komponen atau satu modul. Kamu butuh "rumah" berupa project Vite.
Bayangkan `code/` itu bibit tanaman, dan project Vite itu pot-nya.

Software yang perlu terpasang ada di [software/README.md](../software/README.md).

### Langkah 1: Bikin project sekali saja

```bash
# di folder mana saja DI LUAR repo ini, misalnya ~/latihan
npm create vue@latest latihan-vue
```

Saat ditanya fitur, pilih:

- **Router**: Ya (dipakai soal 08)
- **Pinia**: Ya (dipakai soal 08 dan 09)
- **Vitest**: Ya (dipakai soal 07)
- TypeScript, JSX, E2E: boleh Tidak dulu

Lalu:

```bash
cd latihan-vue
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya `http://localhost:5173`). Kalau
halaman contoh Vue tampil, pot-nya siap.

### Langkah 2: Salin starter ke `src/`

Untuk soal komponen (`.vue`):

1. Salin starter ke `src/components/`, misalnya `src/components/Counter01.vue`.
2. Buka `src/App.vue`, kosongkan isinya, lalu import dan render komponen itu.
   Kalau lupa caranya, baca teori 03 (component).
3. Simpan. Vite otomatis reload.

Untuk soal modul (`.js`):

| Soal | Taruh di | Catatan |
| --- | --- | --- |
| 07 | `src/composables/useCounter.js` | Test di `src/composables/__tests__/` lalu `npm run test:unit` |
| 08 | `src/router/index.js` (ganti isi bawaan) | Perhatikan `main.js` mengimport router dengan nama apa. Buat view dan store auth sendiri sesuai soal |
| 09 | `src/stores/cart.js` | Pakai dari komponen soal 04/05 |

Saran: **jangan edit file di repo ini langsung saat ngoding**. Kerjakan di
project Vite, lalu setelah selesai salin balik hasilnya ke `code/` supaya
tersimpan di git. Atau sebaliknya, terserah, asal konsisten.

### Langkah 3: Pakai DevTools

- Console: tidak boleh ada error/warning merah saat soal dianggap selesai
- Vue DevTools: lihat nilai `ref`, props, event, route, dan store
- Network: wajib dipakai untuk soal 06 dan 10

---

## Menyiapkan API

Soal 06 dan 10 memanggil `/api/products`. Endpoint ini **tidak** ada di project
Vite bawaan. Pilih salah satu opsi. Semua opsi sah, yang penting kamu tahu
bentuk response-nya.

### Opsi A: File JSON statis (paling cepat, cukup untuk soal 06)

1. Buat file `public/api/products.json` berisi array produk (minimal `id` dan
   `name`). Tulis sendiri 5-10 produk.
2. Di starter, ubah URL fetch menjadi `/api/products.json`.
3. Cek di browser: `http://localhost:5173/api/products.json` harus menampilkan JSON-mu.

Kekurangan: tidak bisa search/pagination sungguhan, jadi kurang untuk soal 10.

### Opsi B: Backend Express sendiri + proxy Vite (paling disarankan)

Kamu sudah belajar Express di Level 2. Bikin server kecil sendiri dengan
spesifikasi ini (tulis sendiri, ini latihan bagus):

- `GET /api/products?page=1&search=key`
- Response: `{ "data": [...], "page": 1, "totalPages": 3 }`
- `search` mencocokkan nama, tidak peduli huruf besar/kecil
- 5 produk per halaman
- Bonus: delay acak 200-1500 ms supaya race condition di soal 10 kelihatan
- Bonus: kalau `search=error`, balas status 500 (untuk menguji error state)

Supaya browser tidak kena masalah CORS, sambungkan lewat proxy Vite di
`vite.config.js`:

```js
// di dalam defineConfig({...})
server: {
  proxy: {
    '/api': 'http://localhost:3001',
  },
},
```

Restart `npm run dev` setelah mengubah config. Sekarang `fetch('/api/products')`
di Vue diteruskan Vite ke Express di port 3001.

### Opsi C: API publik

Misalnya [DummyJSON](https://dummyjson.com/docs/products). Saat tulisan ini
dibuat, endpoint pencariannya mengembalikan field `products`, `total`, `skip`,
dan `limit`, bukan `data`/`page`. Artinya kamu harus menyesuaikan URL (pakai
`skip`, bukan `page`) dan cara membaca response. Ini latihan membaca dokumentasi
API orang lain, skill yang sering dipakai di kerja. Kekurangannya: butuh
internet dan kamu tidak bisa memaksa error 500.

---

## Langkah Mengerjakan Tiap Soal

1. Baca teori yang ditautkan di soal.
2. Baca soal sampai habis **sebelum** mengetik.
3. Tulis rencana singkat di kertas atau komentar: state apa, event apa, keadaan apa.
4. Kerjakan Bagian A, cek Verifikasi, baru lanjut ke Bagian B, dan seterusnya.
5. Coba semua Edge Case di soal.
6. Jawab Refleksi di catatanmu.
7. Baru setelah itu boleh membuka [contoh](contoh/README.md).

---

## Petunjuk Kalau Macet

Pakai bertingkat. Jangan langsung loncat ke tingkat 4.

1. **Tingkat 1 — Baca error-nya pelan-pelan.** Error Vue biasanya menyebut
   nama komponen dan baris. Salin pesan error-nya ke catatan, garis bawahi kata
   kuncinya.
2. **Tingkat 2 — Kecilkan masalahnya.** Komentari setengah kode. Masih error?
   Masalahnya di setengah yang tersisa. Ulangi. Pakai `console.log` atau Vue
   DevTools untuk melihat nilai sebenarnya, bukan nilai yang kamu kira.
3. **Tingkat 3 — Dokumentasi resmi.** [vuejs.org/guide](https://vuejs.org/guide/introduction.html),
   [router.vuejs.org](https://router.vuejs.org/), [pinia.vuejs.org](https://pinia.vuejs.org/),
   [MDN](https://developer.mozilla.org/). Cari nama API-nya, baca contohnya,
   **tutup tab**, lalu ketik versimu sendiri.
4. **Tingkat 4 — Buka Petunjuk Bertingkat di soal.** Satu petunjuk saja, lalu
   coba lagi 15 menit.
5. **Tingkat 5 — Tanya orang.** Teman, dosen, forum. Ceritakan: apa yang kamu
   coba, apa yang kamu harapkan, apa yang terjadi. Sering kali, saat menulis
   pertanyaan ini, jawabannya ketemu sendiri.

### Masalah setup yang sering muncul

- **`Failed to resolve import "@/stores/auth"`** — file itu memang belum ada.
  Soal 08 memintamu membuatnya.
- **`getActivePinia()` was called but there was no active Pinia** — store
  dipakai sebelum `app.use(pinia)`. Cek urutan di `main.js`.
- **Fetch ke `/api/products` dapat HTML, bukan JSON** — endpoint belum ada,
  Vite mengembalikan `index.html`. Lihat bagian Menyiapkan API.
- **Perubahan `vite.config.js` tidak berefek** — restart `npm run dev`.

---

## Cara Mengecek Hasil Sendiri

- [ ] Semua checkbox **Verifikasi Akhir** di soal tercentang
- [ ] Console browser bersih
- [ ] Kamu bisa menjelaskan kodenya **tanpa melihat layar** ke teman atau
      rubber duck (bebek karet), baris per baris
- [ ] Kamu bisa menulis ulang bagian paling sulit dari nol dalam 10 menit
- [ ] Soal 07: `npm run test:unit` hijau, dan merah kalau kamu sengaja merusak kode
- [ ] Soal 11: nol alert dengan semua payload di tabel Edge Case
- [ ] Dari root repo, `node scripts/validate-curriculum.mjs` tidak menampilkan error
      untuk file yang kamu salin balik ke `code/`

Rubrik penilaian mandiri per soal (dari [soal/README.md](soal/README.md)):
40% perilaku benar, 20% edge case, 15% aksesibilitas, 15% struktur, 10% test/refleksi.

---

## File yang Perlu Diisi

```text
materi-praktikum/code/
├── 01-counter.vue            ← ref, computed, event
├── 02-product-filter.vue     ← v-for, v-model, computed filter
├── 03-product-card.vue       ← props + named slot
├── 04-add-to-cart.vue        ← defineEmits + validasi
├── 05-cart-reactivity.vue    ← computed bertingkat
├── 06-products-lifecycle.vue ← onMounted, fetch, abort
├── 07-use-counter.js         ← composable + unit test
├── 08-router.js              ← route, lazy load, guard
├── 09-cart-store.js          ← Pinia setup store
├── 10-products-api.vue       ← watch, search, pagination
└── 11-komentar-aman.vue      ← XSS: v-html dan :href
```

Kalau sudah, isi [CHECKLIST.md](CHECKLIST.md).
