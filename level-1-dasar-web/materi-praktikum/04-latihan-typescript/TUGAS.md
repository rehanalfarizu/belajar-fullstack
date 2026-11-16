# TUGAS — Latihan TypeScript: Product Catalog

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. File `01-product-catalog.ts` yang semua fungsinya terisi dan lolos `tsc --strict` tanpa error.
2. Satu file test buatanmu sendiri yang menguji 6 kasus wajib dari README, dan semuanya lulus.
3. Catatan singkat: apakah harga nol dan nama kosong itu valid, dan di layer mana aturan itu seharusnya ditaruh.

---

## Daftar Tugas

Folder ini tidak punya folder `soal/`. Tugasnya diambil dari [README](README.md) dan `TODO` di file starter.

| No | Tugas | File yang kamu edit | Estimasi |
| --- | --- | --- | --- |
| 01 | Product Catalog: type guard, parser, generic filter, total, exhaustive switch | `level-1-dasar-web/materi-praktikum/04-latihan-typescript/code/01-product-catalog.ts` | 2-3 jam (perkiraan, README tidak menyebut) |
| 01b | Test untuk 6 kasus wajib | buat sendiri, misalnya `latihan-saya/02-javascript/minggu-07/product-catalog.test.ts` | 45-60 menit (perkiraan) |

Urutan yang disarankan, sesuai `TODO` di starter:

1. Baca tipe yang sudah ada: `ProductStatus`, `Product`, `Result<T>`. Pahami dulu sebelum menulis fungsi.
2. `isProduct` (type guard dari `unknown`).
3. `parseProducts` (pakai `isProduct`, laporkan indeks yang invalid).
4. `filterItems` (generic, tanpa mutasi).
5. `publishedTotal` (boleh pakai `filterItems`).
6. `statusLabel` (exhaustive `switch` dengan `assertNever`).

---

## Langkah Pengerjaan

1. **Baca README dan starter sampai habis.** Tandai bagian yang kamu belum paham (misalnya `value is Product`, `never`).
2. **Tutup filenya.** Untuk setiap fungsi, tulis di jurnal: input apa, output apa, dan 2 contoh input
   yang harus gagal.
3. **Kerjakan satu fungsi, lalu cek `tsc`.** Jangan isi semua fungsi sekaligus. Setelah setiap fungsi,
   jalankan perintah `tsc` di bawah.
4. **Tulis test untuk fungsi itu.** Uji yang benar dan yang salah.
5. **Jawab pertanyaan desain** di README (harga nol, nama kosong, layer aturan bisnis) di jurnal, dengan alasan.
6. **Baru bandingkan dengan `contoh/`.**

---

## Petunjuk Kalau Macet

### Tingkat 1 — biarkan compiler yang bicara

- Baca pesan error `tsc` dari baris paling atas. Pesannya biasanya menyebut tipe yang diharapkan dan tipe yang kamu berikan.
- Arahkan kursor ke variabel di VS Code. Tooltip menunjukkan tipe yang TypeScript pikirkan saat itu.
  Kalau tipenya masih `unknown`, berarti pengecekanmu belum cukup untuk "menyempitkan" tipe.

### Tingkat 2 — pecah masalahnya

- `isProduct` terlalu besar? Mulai dari satu pertanyaan: "apakah `value` itu object dan bukan `null`?"
  Setelah itu baru cek satu property. Tambah satu cek setiap kali, jalankan `tsc` setiap kali.
- Ingat bahwa `typeof null` hasilnya `"object"`. Ini jebakan klasik.
- `parseProducts`: tulis dulu versi yang cuma mengecek "apakah root array?". Setelah itu baru loop per item.
- `statusLabel`: hapus sementara satu `case`. Kalau `assertNever` dipasang benar, `tsc` akan protes.
  Itu tandanya exhaustive check bekerja.

### Tingkat 3 — dokumentasi resmi

- Narrowing dan type guard: [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).
- Generic: [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html).
- `never` dan exhaustiveness: bagian "Exhaustiveness checking" di halaman Narrowing.
- Test runner: [Node.js test runner](https://nodejs.org/api/test.html).

---

## Cara Mengecek Hasil Sendiri

### 1. Cek tipe (dari root repo, setelah `npm install`)

```bash
npx tsc --strict --noEmit --lib ES2023,DOM level-1-dasar-web/materi-praktikum/04-latihan-typescript/code/01-product-catalog.ts
```

Hasil yang diharapkan: tidak ada output, exit code 0. Cek dengan `echo $?` (harus `0`).

Pastikan juga tidak ada `any` di filemu:

```bash
grep -nw "any" level-1-dasar-web/materi-praktikum/04-latihan-typescript/code/01-product-catalog.ts
```

Baris yang muncul seharusnya cuma komentar `TODO` bawaan starter. Kalau ada `any` di kode, ganti.

### 2. Jalankan test

Node.js versi repo ini (22.18 ke atas) bisa menjalankan file `.ts` langsung. Buat file test sendiri yang
meng-import fungsi dari starter (tulis ekstensi `.ts` lengkap di path import), pakai `node:test` dan
`node:assert/strict`. Lalu jalankan:

```bash
node --test latihan-saya/02-javascript/minggu-07/
```

Hasil yang diharapkan: `fail 0`. Minimal ada test untuk 6 kasus wajib: array valid, `price` berupa string,
status tidak dikenal, root bukan array, array kosong, harga nol dan nama kosong.

### 3. Uji jebakan

- Panggil `filterItems`, lalu cetak array aslinya. Isinya tidak boleh berubah.
- Untuk item invalid, pesan error harus menyebut indeksnya, bukan cuma "data salah".

---

## Tentang `contoh/`

`contoh/01-product-catalog.ts` adalah solusi referensi. Buka hanya setelah `tsc` lulus dan semua testmu
hijau. Bandingkan cara memvalidasi property, lalu tulis di jurnal satu hal yang kamu pelajari dari perbedaannya.
