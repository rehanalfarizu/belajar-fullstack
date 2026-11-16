<!-- markdownlint-disable MD024 MD028 -->

# SOAL 03 — Product Card

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Mendefinisikan props dengan `defineProps` lengkap dengan type, required, dan validator
- Memahami kenapa props bersifat read-only (one-way data flow)
- Memformat angka ke Rupiah dengan `Intl.NumberFormat`
- Membuat **named slot** dan mengirim **slot props** ke parent
- Memakai komponen child dari komponen parent

**Difficulty:** Menengah • **Estimasi:** 45-75 menit

---

## Briefing

Bayangkan kamu bikin **cetakan kartu menu** untuk warung. Bentuk kartunya
selalu sama: nama makanan, harga, stok. Isinya beda-beda, dikirim oleh pemilik
warung.

Tapi bagian bawah kartu dibiarkan **kosong**. Kenapa? Karena di halaman
katalog, pemilik mau tombol "Tambah ke Keranjang". Di halaman admin, tombol
"Edit". Cetakannya tidak perlu tahu tombol apa — cetakan cukup menyediakan
**slot kosong** dan memberi tahu "ini kartu produk nomor sekian".

Cetakan itu = komponen `ProductCard`. Data yang dikirim = **props**. Ruang
kosong = **slot**.

---

## Cara Kerja Latihan Ini

Starter yang kamu kerjakan:
`level-3-frontend-vue/materi-praktikum/code/03-product-card.vue`
([buka starter](../code/03-product-card.vue)).

**Penting:** komponen ini *child*. Ia tidak bisa diuji sendirian karena butuh
data dari luar. Kamu perlu **parent** — biasanya `src/App.vue` di project
Vite-mu — yang:

1. meng-import file kartu ini,
2. memakainya beberapa kali dengan props berbeda (minimal satu produk dengan
   stok 0),
3. mengisi slot `actions` dengan tombol yang menampilkan id produk saat diklik
   (misalnya lewat `alert` atau `console.log`).

Parent ini kamu tulis sendiri. Tidak ada starternya — anggap itu bagian
latihan. Cara setup project: [TUGAS.md](../TUGAS.md). Teori: [Component, Props,
Emit, Slot](../../materi-teori/03-component-props-emit-slot/README.md).

---

## Bagian A: Props dengan Validasi

### Penjelasan

`defineProps` adalah "formulir pendaftaran" komponen: data apa yang boleh
dikirim parent, tipenya apa, wajib atau tidak. Bentuk umumnya (contoh lain,
bukan jawaban):

```js
defineProps({
  title: { type: String, required: true },
});
```

Selain `type` dan `required`, ada `validator`: fungsi yang menerima nilai dan
me-return `true` kalau nilai itu masuk akal. Kalau `false`, Vue memberi warning
di console (saat development). Ini bukan keamanan, tapi alarm dini untuk
developer.

Aturan di soal ini:

- `price` tidak boleh negatif
- `stock` harus bilangan bulat dan tidak negatif

### Wajib Ada di Kode Kamu

- Keempat props (`id`, `name`, `price`, `stock`) tetap ada dengan type dan required
- `validator` di `price` dan `stock` sesuai aturan

### Cara Mengerjakan

1. Cari `TODO(human)` di props `price` dan `stock`
2. Tulis aturannya sebagai kalimat dulu, lalu jadikan ekspresi boolean
3. Untuk "bilangan bulat", cari method statis di `Number`

### Verifikasi

- [ ] Parent kirim `price` negatif → muncul warning Vue di console
- [ ] Parent kirim `stock` 2.5 → muncul warning
- [ ] Data normal → tidak ada warning

---

## Bagian B: Props Itu Read-Only

### Penjelasan

Props seperti **titipan**. Parent yang punya, child hanya meminjam untuk
ditampilkan. Kalau child mengubah titipan (misal `stock--` di dalam kartu),
data jadi tidak sinkron: parent mengira stok 5, kartu bilang 4. Vue akan
menolak dan memberi warning.

Kalau kartu butuh "mengubah" sesuatu, ia harus **minta** ke parent lewat event
(itu soal 04).

### Wajib Ada di Kode Kamu

- Tidak ada satu baris pun yang menulis ke props
- Kalau kamu butuh akses props di script, simpan hasil `defineProps` ke variabel

### Cara Mengerjakan

1. Eksperimen kecil: sementara tambahkan tombol yang mencoba mengubah `stock`
   dari dalam kartu. Lihat console. Lalu **hapus** eksperimen itu
2. Catat pesan warning yang muncul

### Verifikasi

- [ ] Kamu pernah melihat sendiri warning saat props dimutasi
- [ ] Kode akhir tidak memutasi props

---

## Bagian C: Tampilan Kartu dan Format Rupiah

### Penjelasan

`350000` itu angka untuk mesin. Manusia membaca `Rp 350.000`. JavaScript punya
`Intl.NumberFormat` yang tahu aturan format tiap negara: pemisah ribuan, simbol
mata uang, desimal. Kamu cukup bilang locale (`id-ID`), style mata uang, dan
kode mata uang (`IDR`). Rupiah biasanya tidak memakai sen, jadi atur jumlah
digit desimal.

Untuk stok: kalau 0, tampilkan "Habis" — lebih jelas daripada "Stok 0".

### Wajib Ada di Kode Kamu

- Nama produk sebagai heading
- Harga dalam format Rupiah tanpa desimal
- Stok, atau teks "Habis" bila 0

### Cara Mengerjakan

1. Baca dokumentasi `Intl.NumberFormat` di MDN (bukan AI)
2. Buat formatter **sekali** di script, pakai berkali-kali di template
3. Untuk stok, pakai `v-if`/`v-else` atau ternary — pilih yang paling mudah dibaca

### Verifikasi

- [ ] 350000 tampil sebagai Rp 350.000 (spasi bisa berupa non-breaking space, itu normal)
- [ ] Produk stok 0 menampilkan "Habis"
- [ ] Hanya ada satu heading per kartu

---

## Bagian D: Named Slot dengan Slot Props

### Penjelasan

Slot = lubang di cetakan yang diisi parent. **Named slot** = lubang yang diberi
nama, supaya parent bisa bilang "isi lubang `actions` dengan tombol ini".

**Slot props** = data yang child titipkan ke isi slot. Kartu tahu `id` produk
dan apakah stok habis. Tombol dari parent butuh info itu. Jadi kartu
"mengoper" data tersebut lewat atribut di elemen `<slot>`. Parent menerimanya
lewat `v-slot:actions` (atau `#actions`) dengan destructuring.

Analogi: kartu menu bilang ke tukang tempel stiker, "ini slot tombol, dan ini
nomor menunya ya".

### Wajib Ada di Kode Kamu

- Elemen `<slot>` dengan nama `actions`
- Slot props berisi id produk
- (Disarankan) slot props berisi info apakah stok habis, agar parent bisa
  menonaktifkan tombol

### Cara Mengerjakan

1. Di child: letakkan `<slot>` di posisi bawah kartu, beri nama, lalu bind data
   yang mau dioper
2. Di parent (`App.vue`): saat memakai kartu, tambahkan `<template>` yang
   menargetkan slot `actions` dan terima slot props-nya
3. Di dalamnya, buat tombol yang mencetak id ke console saat diklik

### Verifikasi

- [ ] Klik tombol di kartu A → console mencetak id produk A
- [ ] Klik tombol di kartu B → console mencetak id produk B
- [ ] Kartu stok 0 → tombol nonaktif (kalau kamu kirim info stok habis)
- [ ] Kartu tetap tampil normal kalau parent tidak mengisi slot

---

## Edge Case yang Harus Kamu Coba

- [ ] Parent tidak mengirim `name` → warning "missing required prop"
- [ ] Parent mengirim `price` sebagai string `"350000"` → apa kata Vue?
- [ ] Harga 0 → tampil Rp 0, tidak error
- [ ] Nama produk sangat panjang → layout tidak rusak parah

---

## Petunjuk Bertingkat

**Petunjuk 1:** Validator itu fungsi biasa: terima satu nilai, kembalikan
boolean. Jangan melempar error di dalamnya.

**Petunjuk 2:** Atribut di `<slot>` yang ditulis kebab-case (misal
`product-id`) akan diterima parent sebagai camelCase (`productId`). Kalau
destructuring di parent menghasilkan `undefined`, cek penamaan ini.

**Petunjuk 3:** Kalau `props.price` tidak bisa diakses di script, ingat:
`defineProps` me-return object props. Di template, nama prop bisa dipakai
langsung.

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] Semua `TODO(human)` terisi
- [ ] Props punya type, required, dan validator yang sesuai
- [ ] Format Rupiah benar
- [ ] Named slot `actions` mengirim id produk
- [ ] Parent memakai kartu minimal 2 kali dengan data berbeda
- [ ] Tidak ada mutasi props
- [ ] Console bersih untuk data valid

---

## Refleksi

1. Kenapa child tidak boleh mengubah props? Apa yang rusak kalau dibolehkan?
2. Apa bedanya slot dengan props? Kapan kamu pilih slot?
3. Validator props hanya jalan saat development. Lalu siapa yang menjaga data
   di production?

---

## Cara Submit

1. Centang semua checklist
2. Tulis refleksi
3. Sudah jalan? Baru boleh bandingkan dengan `../contoh/03-product-card.vue`.
   Baca dulu [aturan folder contoh](../contoh/README.md)
4. Lanjut ke [Soal 04 — Add to Cart](04-add-to-cart.md)

---

## Catatan untuk Pemula

> **Nama file komponen biasanya PascalCase** saat dipakai di project (misal `ProductCard.vue`). Kalau kamu menyalin starter ke `src/components/`, boleh ganti namanya, asal import-nya disesuaikan.
> **`defineProps` tidak perlu di-import.** Itu compiler macro di `<script setup>`.

<!-- markdownlint-enable MD024 MD028 -->
