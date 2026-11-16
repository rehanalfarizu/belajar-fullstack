<!-- markdownlint-disable MD024 MD028 -->

# SOAL 04 — Add to Cart (Emit)

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Mendeklarasikan event dengan `defineEmits` beserta validatornya
- Mengirim event dari child ke parent dengan payload object
- Menangani submit form dengan `@submit.prevent`
- Memakai `v-model.number` dan memahami batasnya
- Menerima event di parent dan memperbarui state milik parent

**Difficulty:** Menengah • **Estimasi:** 45-75 menit

---

## Briefing

Di restoran, pelayan **tidak** masuk dapur dan memasak sendiri. Pelayan
menulis pesanan di kertas ("meja 4, nasi goreng, 2 porsi"), lalu
menyerahkannya ke dapur. Dapur yang memutuskan dan memasak.

Komponen `AddToCart` adalah pelayan. Ia tidak memegang keranjang. Ia hanya
mengumpulkan jumlah dari user lalu **mengirim pesanan** (event `add`) berisi
`productId` dan `quantity` ke parent. Parent = dapur = pemilik data keranjang.

Kertas pesanan yang tidak masuk akal ("-3 porsi", "1,5 porsi") harus ditolak
sebelum sampai dapur.

---

## Cara Kerja Latihan Ini

Starter yang kamu kerjakan:
`LEVEL-3-Frontend-Vue/materi-praktikum/code/04-add-to-cart.vue`
([buka starter](../code/04-add-to-cart.vue)).

Seperti soal 03, ini komponen child. Kamu butuh **parent** (misalnya
`src/App.vue`) yang:

1. memakai komponen ini untuk minimal dua produk berbeda (kirim `productId`),
2. punya state keranjang sendiri (misalnya array atau object kecil),
3. mendengarkan event `add`, lalu menambah jumlah produk yang sesuai di
   keranjang,
4. menampilkan isi keranjang di layar supaya hasilnya kelihatan.

Parent ini kamu desain sendiri. Cara setup: [TUGAS.md](../TUGAS.md). Teori:
[Component, Props, Emit,
Slot](../../materi-teori/03-component-props-emit-slot/README.md).

---

## Bagian A: Form dan `v-model.number`

### Penjelasan

Nilai dari `<input>` selalu string di DOM, walaupun `type="number"`.
Modifier `.number` meminta Vue mengubahnya ke angka. Tapi hati-hati: kalau
user mengosongkan input, hasilnya bisa string kosong. Kalau user mengetik
`2.5`, hasilnya angka 2.5 — angka, tapi bukan jumlah yang valid.

`@submit.prevent` menahan perilaku default form (reload halaman), jadi kamu
bisa menangani submit di JavaScript. Bonusnya, tombol Enter di input juga
memicu submit.

### Wajib Ada di Kode Kamu

- Form memakai `@submit.prevent`
- Input terikat ke `quantity` dengan `.number`
- Atribut HTML yang membantu browser menerima bilangan bulat ≥ 1

### Cara Mengerjakan

1. Jalankan starter, buka Vue DevTools
2. Ketik `3`, lalu kosongkan, lalu ketik `2.5`. Catat nilai dan **tipe**
   `quantity` di DevTools tiap kali
3. Cari atribut input number yang mengatur "loncatan" nilai

### Verifikasi

- [ ] Kamu sudah mencatat nilai `quantity` untuk input kosong dan desimal
- [ ] Tekan Enter di input tidak me-reload halaman

---

## Bagian B: Validasi Sebelum Emit

### Penjelasan

Atribut `min` dan `step` di HTML hanya **saran** untuk browser — user tetap
bisa mengetik apa pun, atau mengubah atribut lewat DevTools. Jadi fungsi
`submit` harus mengecek sendiri: apakah `quantity` integer positif? Kalau
tidak, jangan kirim apa pun.

Ini pola yang akan terus kamu temui: **validasi di setiap batas**. Browser →
komponen → server. Tiap lapis tidak boleh percaya buta pada lapis sebelumnya.

### Wajib Ada di Kode Kamu

- `submit` berhenti lebih awal kalau `quantity` tidak valid
- (Disarankan) beri tahu user kenapa tidak terjadi apa-apa

### Cara Mengerjakan

1. Tulis kondisi "valid" dalam kalimat: "bilangan bulat DAN lebih dari nol"
2. Gunakan pola *guard clause*: cek yang salah dulu, `return` kalau salah
3. Pikirkan pesan error yang ramah, kalau kamu menambahkannya

### Verifikasi

- [ ] quantity 0 → tidak ada event terkirim
- [ ] quantity 2.5 → tidak ada event
- [ ] input kosong → tidak ada event

---

## Bagian C: `emit` dengan Payload Object

### Penjelasan

`defineEmits` me-return fungsi `emit`. Kamu memanggilnya dengan nama event dan
data. Kenapa payload berbentuk **object** (`{ productId, quantity }`) dan bukan
dua argumen terpisah? Karena object punya nama field — penerima tidak perlu
menebak urutan, dan kamu bisa menambah field baru nanti tanpa merusak parent.

`productId` diambil dari props (identitas produk), `quantity` dari state lokal
(input user).

### Wajib Ada di Kode Kamu

- Event bernama `add`
- Payload object dengan field `productId` dan `quantity`

### Cara Mengerjakan

1. Cari `TODO(human)` di `submit`
2. Panggil `emit` dengan nama event dan object payload
3. Di parent, pasang listener `@add` di komponen dan tulis fungsi yang
   menerima payload lalu memperbarui keranjang

### Verifikasi

- [ ] Klik Tambah di produk 1 dengan jumlah 2 → keranjang parent bertambah 2 untuk produk 1
- [ ] Vue DevTools tab Timeline/Events menampilkan event `add` dengan payload benar

---

## Bagian D: Validator Event di `defineEmits`

### Penjelasan

Mirip validator props: kamu bisa mendaftarkan event sebagai object, dengan
fungsi validator yang menerima payload. Kalau return `false`, Vue memberi
warning di console. Event *tetap* terkirim — validator ini alarm untuk
developer, bukan pagar.

Kenapa tetap perlu kalau Bagian B sudah validasi? Karena nanti ada developer
lain (atau kamu, tiga bulan lagi) yang menambah tombol "beli cepat" dan lupa
validasi. Validator event menangkap kesalahan itu saat development.

### Wajib Ada di Kode Kamu

- Validator `add` mengecek `productId` dan `quantity` keduanya integer positif

### Cara Mengerjakan

1. Cari `TODO(human)` di `defineEmits`
2. Destructure payload atau baca field-nya, lalu gabungkan beberapa syarat
   boolean dengan `&&`
3. Uji: sementara, panggil `emit` dengan data salah, lihat warning, lalu hapus uji itu

### Verifikasi

- [ ] Emit dengan quantity 0 (uji sementara) → warning di console
- [ ] Emit normal → tidak ada warning

---

## Edge Case yang Harus Kamu Coba

- [ ] Tambah produk yang sama dua kali → keranjang parent menjumlahkan, bukan membuat baris dobel
- [ ] Ketik `-1`, `0`, `1e2`, kosong
- [ ] Ubah atribut `min` lewat DevTools lalu submit nilai negatif — apakah fungsi `submit` tetap menolak?
- [ ] Keyboard saja: Tab ke input, ketik angka, Enter

---

## Petunjuk Bertingkat

**Petunjuk 1:** Kalau parent tidak menerima apa-apa, cek nama event di `emit`
dan di `@...` parent sama persis.

**Petunjuk 2:** `typeof x === 'number'` saja tidak cukup — `NaN` dan `2.5`
juga number. Cari method di `Number` yang khusus mengecek bilangan bulat.

**Petunjuk 3:** Di parent, untuk "tambah ke produk yang sudah ada", pikirkan
struktur keranjang yang memudahkan pencarian berdasarkan id. Cari dulu
apakah item dengan id itu sudah ada; kalau ada, tambah jumlahnya; kalau belum,
buat item baru.

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] Semua `TODO(human)` terisi
- [ ] Event `add` hanya dikirim untuk quantity valid
- [ ] Payload berbentuk object `{ productId, quantity }`
- [ ] Validator event aktif
- [ ] Parent memperbarui keranjang dan menampilkannya
- [ ] Child tidak menyentuh state keranjang
- [ ] Console bersih

---

## Refleksi

1. Kenapa keranjang disimpan di parent, bukan di komponen `AddToCart`?
2. `min="1"` sudah ada di HTML. Kenapa masih perlu cek di JavaScript?
3. Validator event tidak memblokir event. Lalu apa gunanya?

---

## Cara Submit

1. Centang semua checklist
2. Tulis refleksi
3. Sudah jalan? Baru boleh bandingkan dengan `../contoh/04-add-to-cart.vue`.
   Baca dulu [aturan folder contoh](../contoh/README.md)
4. Lanjut ke [Soal 05 — Cart Reactivity](05-cart-reactivity.md)

---

## Catatan untuk Pemula

> **Data turun lewat props, niat naik lewat event.** Hafalkan kalimat ini — ini pola komunikasi komponen di Vue.
> **Nama event pakai kebab-case atau camelCase secara konsisten.** Di soal ini cukup satu kata: `add`.

<!-- markdownlint-enable MD024 MD028 -->
