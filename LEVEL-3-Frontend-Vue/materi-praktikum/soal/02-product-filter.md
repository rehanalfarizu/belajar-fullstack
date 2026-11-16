<!-- markdownlint-disable MD024 MD028 -->

# SOAL 02 — Product Filter

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menghubungkan input form ke state dengan `v-model` (termasuk modifier `.trim`)
- Merender list dengan `v-for` dan `:key` yang stabil
- Menampilkan konten bersyarat dengan `v-if` / `v-else`
- Membuat hasil filter sebagai `computed`, bukan data salinan
- Mendesain "empty state" yang jelas untuk user

**Difficulty:** Pemula-Menengah • **Estimasi:** 45-60 menit

---

## Briefing

Kamu pernah cari barang di marketplace? Ketik "keyboard", centang "stok
tersedia", hasil langsung menyempit. Hapus kata kunci, hasil kembali penuh.
Data barangnya **tidak berubah** — yang berubah cuma **kacamata** yang kamu
pakai untuk melihatnya.

Di soal ini kamu membuat kacamata itu. Daftar produk asli tetap utuh,
`filteredProducts` adalah hasil "melihat lewat kacamata" pencarian dan
centang aktif.

---

## Cara Kerja Latihan Ini

Starter yang kamu kerjakan:
`LEVEL-3-Frontend-Vue/materi-praktikum/code/02-product-filter.vue`
([buka starter](../code/02-product-filter.vue)).

Alurnya sama seperti soal 01:

1. **Baca penjelasan** tiap bagian
2. **Ketik sendiri** di bagian `TODO(human)`
3. **Verifikasi** dengan checklist

Cara menjalankan: lihat [TUGAS.md](../TUGAS.md). Teori: [Vue dan Template
Syntax](../../materi-teori/01-vue-dan-template-syntax/README.md) (bagian
`v-for`, `v-if`, `v-model`) dan
[Reactivity](../../materi-teori/02-reactivity-ref-reactive-computed/README.md)
(bagian `computed`).

---

## Bagian A: Input Terhubung ke State (`v-model`)

### Penjelasan

`v-model` itu jalan dua arah: ketik di input → state berubah; ubah state dari
script → isi input ikut berubah. Starter sudah memasang `v-model.trim` di
kolom cari dan `v-model` di checkbox.

Modifier `.trim` membuang spasi di awal/akhir. Jadi user yang tidak sengaja
mengetik `"  mouse "` tetap dapat hasil.

Untuk checkbox, `v-model` menghasilkan `true` / `false`.

### Wajib Ada di Kode Kamu

- Kolom cari tetap terikat ke `search`
- Checkbox tetap terikat ke `onlyActive`

### Cara Mengerjakan

1. Jalankan starter apa adanya
2. Buka Vue DevTools, pilih komponen, lalu ketik sesuatu di kolom cari.
   Perhatikan nilai `search` berubah di panel
3. Centang checkbox, perhatikan `onlyActive`

### Verifikasi

- [ ] Nilai `search` di DevTools sama dengan yang kamu ketik (tanpa spasi pinggir)
- [ ] `onlyActive` berganti `true` / `false` saat dicentang

---

## Bagian B: Logika Filter di `computed`

### Penjelasan

`filteredProducts` harus memenuhi dua syarat sekaligus:

1. **Cocok kata kunci** — nama produk *mengandung* teks pencarian. Huruf
   besar/kecil dianggap sama: "KEY", "key", "Key" semua menemukan "Keyboard".
2. **Cocok status** — kalau checkbox dicentang, hanya produk aktif. Kalau tidak
   dicentang, semua status boleh.

Hal penting: **jangan mengubah `products`**. Computed harus mengembalikan array
baru. Kalau kamu membuang item dari array asli, begitu kata kunci dihapus,
produk yang hilang tidak bisa kembali.

Kenapa computed, bukan `ref` yang kamu update tiap input berubah? Karena hasil
filter itu *turunan* dari tiga hal (produk, search, onlyActive). Computed
otomatis tahu ketiga dependensinya.

### Wajib Ada di Kode Kamu

- Pencarian case-insensitive
- Kata kunci kosong = semua produk lolos syarat 1
- Syarat 2 hanya berlaku saat `onlyActive` true
- `products.value` tidak pernah dimutasi

### Cara Mengerjakan

1. Tulis dulu dalam bahasa manusia: "produk lolos kalau (A) DAN (B)"
2. Untuk (A): cari method string JavaScript yang mengecek "apakah teks ini
   mengandung teks itu", lalu pikirkan cara menyamakan huruf besar/kecil di
   *kedua* sisi
3. Untuk (B): pikirkan logika "kalau checkbox mati, selalu lolos; kalau
   nyala, lolos hanya jika aktif"
4. Gunakan method array yang membuat array baru berisi item yang lolos

### Verifikasi

- [ ] Ketik "mo" → muncul Mouse dan Monitor
- [ ] Ketik "KEY" → muncul Keyboard
- [ ] Centang aktif → Mouse hilang
- [ ] Centang aktif + ketik "mo" → hanya Monitor

---

## Bagian C: Render List dengan `v-for` dan `:key`

### Penjelasan

`v-for` mengulang elemen untuk tiap item. Tiap item butuh `:key` — semacam
nomor KTP supaya Vue tahu "ini item yang sama dengan tadi, cuma pindah posisi".

Kenapa **bukan index**? Index itu nomor antrian, bukan identitas. Kalau
daftar difilter, item "Monitor" yang tadinya index 2 bisa jadi index 0. Vue
akan mengira itu elemen lama dan bisa mencampur state (misal isi input di
dalam item). Pakai `id` yang tidak berubah.

### Wajib Ada di Kode Kamu

- Elemen list (`<ul>` + `<li>` atau sejenisnya)
- `v-for` di atas `filteredProducts` (bukan `products`)
- `:key` memakai id produk
- Tampil nama produk dan teks status aktif/nonaktif

### Cara Mengerjakan

1. Cari `<!-- TODO(human) -->` di template
2. Tentukan elemen mana yang diulang (`<li>`, bukan `<ul>`)
3. Isi tiap item dengan nama dan status (ingat ternary di template boleh)

### Verifikasi

- [ ] Tiga produk tampil saat filter kosong
- [ ] Inspect Element: tidak ada warning "missing key" di console

---

## Bagian D: Empty State dan Reset

### Penjelasan

Kalau tidak ada hasil, layar kosong itu membingungkan: "lagi loading? error?
atau memang tidak ada?". Empty state adalah pesan jujur: "Tidak ada produk yang
cocok."

`v-if` dan `v-else` bekerja berpasangan dan harus jadi elemen yang **bersebelahan**.

Tombol Reset mengembalikan filter ke kondisi awal. Karena `v-model` dua arah,
mengubah state saja sudah cukup — input di layar ikut kosong sendiri.

### Wajib Ada di Kode Kamu

- `v-if` untuk list saat ada hasil, `v-else` untuk pesan kosong
- `resetFilters` mengembalikan `search` dan `onlyActive` ke nilai awal

### Cara Mengerjakan

1. Pikirkan kondisi apa yang menandakan "ada hasil" (lihat panjang array)
2. Pasang `v-if` di list, `v-else` di elemen pesan tepat di bawahnya
3. Isi `resetFilters` — dua baris pikiran: search kembali ke apa? checkbox
   kembali ke apa?

### Verifikasi

- [ ] Ketik "zzz" → pesan empty state muncul, list hilang
- [ ] Klik Reset → kolom cari kosong, checkbox mati, tiga produk kembali

---

## Edge Case yang Harus Kamu Coba

- [ ] Ketik hanya spasi → semua produk tetap tampil
- [ ] Ketik dengan spasi di depan: "  monitor"
- [ ] Centang aktif lalu cari "mouse" → empty state (karena Mouse nonaktif)
- [ ] Tambahkan sementara produk keempat di array dengan nama huruf besar semua,
      cek pencarian tetap jalan, lalu hapus lagi

---

## Petunjuk Bertingkat

**Petunjuk 1:** Kalau list tidak berubah saat mengetik, cek apakah `v-for`-mu
membaca `filteredProducts` atau malah `products`.

**Petunjuk 2:** Case-insensitive artinya kamu "menormalkan" dua string ke
bentuk yang sama sebelum dibandingkan. String punya method untuk mengubah semua
huruf jadi kecil. Untuk bahasa Indonesia, versi `Locale` dari method itu lebih
aman.

**Petunjuk 3:** Syarat checkbox bisa ditulis sebagai satu ekspresi boolean
dengan `||`: "checkbox tidak dicentang ATAU produk aktif". Coba buat tabel
kebenaran 2x2 di kertas untuk yakin.

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] Semua `TODO(human)` terisi
- [ ] Filter search + aktif bisa dikombinasikan
- [ ] Key memakai id, bukan index
- [ ] Empty state muncul hanya saat hasil kosong
- [ ] Reset mengembalikan semua filter
- [ ] `products` asli tidak pernah berubah (cek di Vue DevTools)
- [ ] Console bersih

---

## Refleksi

1. Apa yang terjadi kalau kamu memfilter dengan menghapus item langsung dari
   `products.value`? Coba bayangkan, lalu jelaskan.
2. Kenapa index adalah key yang buruk untuk list yang bisa difilter atau diurutkan?
3. Kalau produknya 10.000 item, apakah filter ini masih oke? Apa yang mungkin
   kamu ubah? (Tidak perlu dikerjakan, cukup pikirkan.)

---

## Cara Submit

1. Centang semua checklist
2. Tulis jawaban refleksi
3. Sudah jalan? Baru boleh bandingkan dengan `../contoh/02-product-filter.vue`.
   Baca dulu [aturan folder contoh](../contoh/README.md)
4. Lanjut ke [Soal 03 — Product Card](03-product-card.md)

---

## Catatan untuk Pemula

> **`v-if` dan `v-for` jangan di elemen yang sama.** Bungkus atau pisahkan — Vue punya aturan prioritas yang membingungkan kalau digabung.
> **Computed itu read-only.** Kalau kamu tergoda menulis `filteredProducts.value = ...`, berarti modelnya salah.

<!-- markdownlint-enable MD024 MD028 -->
