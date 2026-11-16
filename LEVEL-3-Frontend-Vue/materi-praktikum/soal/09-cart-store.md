<!-- markdownlint-disable MD024 MD028 -->

# SOAL 09 — Pinia: Store Keranjang Belanja

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membuat setup store dengan `defineStore`
- Membedakan state, getter (computed), dan action
- Menjaga aturan bisnis (quantity valid) di satu tempat
- Memakai store yang sama dari beberapa komponen
- Membaca state dengan `storeToRefs` tanpa kehilangan reactivity

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Bayangkan keranjang belanja di supermarket. Kamu bisa ambil barang di lorong
mana saja, tapi keranjangnya **satu**. Kasir, kamu, dan petugas yang cek
struk semua melihat keranjang yang sama.

Di aplikasi, halaman produk, ikon keranjang di navbar, dan halaman checkout
semua butuh data keranjang yang sama. Kalau tiap komponen pegang salinan
sendiri, angkanya pasti beda-beda. Pinia adalah "keranjang bersama" itu.

Target versi: Pinia 4 (cara pakai setup store sama dengan Pinia 2 dan 3).

---

## Cara Kerja Latihan Ini

1. **Baca teori dulu** — [Pinia dan HTTP](../../materi-teori/06-pinia-dan-http/README.md)
   dan [Reactivity](../../materi-teori/02-reactivity-ref-reactive-computed/README.md)
2. **Buka starter** — `LEVEL-3-Frontend-Vue/materi-praktikum/code/09-cart-store.js`
   ([buka file](../code/09-cart-store.js)), cari semua `TODO(human)`
3. **Siapkan project** — ikuti [TUGAS.md](../TUGAS.md), **pilih Pinia** saat
   scaffold. Simpan starter sebagai `src/stores/cart.js`
4. **Ketik sendiri**
5. **Verifikasi** — pakai checklist tiap bagian

Kamu **tidak akan diberi kode jadi**.

---

## Bagian A: State dan Getter

### Penjelasan

State di setup store adalah `ref` biasa. Getter adalah `computed` biasa. Pinia
yang membuat semuanya "bersama". Ingat pelajaran soal 05: total **dihitung**,
bukan disimpan. Jangan bikin `ref` untuk total.

Perhatikan bedanya `totalItems` dan jumlah baris. Dua keyboard + satu mouse
artinya `totalItems` = 3, walaupun barisnya cuma 2.

### Wajib Ada di Kode Kamu

- `items` berupa array item `{ id, name, price, quantity }`
- `totalItems` = jumlah semua quantity
- `subtotal` = jumlah harga x quantity

### Cara Mengerjakan

1. Isi kedua computed. Kamu sudah pernah menulis yang mirip di soal 05
2. Pikirkan nilai awal saat keranjang kosong

### Verifikasi

- [ ] Keranjang kosong → kedua getter bernilai 0
- [ ] Vue DevTools tab Pinia menampilkan getter dan nilainya

---

## Bagian B: Action `add`

### Penjelasan

Action adalah satu-satunya "pintu" untuk mengubah keranjang. Di sinilah aturan
bisnis dijaga, supaya komponen mana pun yang memanggil tetap patuh. Aturannya:

- quantity harus bilangan bulat, minimal 1
- produk yang sama ditambah lagi → quantity-nya bertambah, bukan baris baru

Analogi: kasir tidak menulis "Indomie" dua baris di struk, dia tulis
"Indomie x2".

### Wajib Ada di Kode Kamu

- Quantity tidak valid ditolak dengan error yang jelas
- Produk dengan `id` sama digabung
- Produk baru dimasukkan sebagai salinan + quantity (jangan memodifikasi object
  produk asli yang dikirim pemanggil)

### Cara Mengerjakan

1. Tulis fungsi kecil di luar store untuk mengecek quantity (sesuai TODO),
   supaya bisa dipakai ulang di `updateQuantity`
2. Cari item dengan id yang sama memakai method array yang mengembalikan satu
   elemen
3. Putuskan cabang "sudah ada" dan "belum ada"

### Verifikasi

- [ ] Tambah produk A 2x → satu baris, quantity 2
- [ ] Tambah dengan quantity 0, -1, 1.5, atau `'2'` → ditolak
- [ ] Object produk asli di komponen tidak berubah (tidak ketambahan field
      `quantity`)

---

## Bagian C: `updateQuantity`, `remove`, `clear`

### Penjelasan

- `updateQuantity` mengganti (bukan menambah) quantity satu item
- `remove` membuang satu item
- `clear` mengosongkan semua

**Penting tentang setup store**: store dengan gaya option punya `$reset()`
otomatis. Setup store (yang kamu tulis) **tidak punya**. Jadi `clear()` buatanmu
adalah satu-satunya tombol reset. Ini hal yang sering bikin bingung saat
membaca tutorial lama.

### Wajib Ada di Kode Kamu

- `updateQuantity` menolak quantity tidak valid
- `updateQuantity` punya perilaku jelas untuk id yang tidak ada (kamu putuskan,
  tulis alasannya di komentar)
- `remove` tidak error kalau id tidak ada
- `clear` membuat getter kembali 0

### Cara Mengerjakan

1. Untuk `remove`, bandingkan dua cara: membuat array baru tanpa item itu,
   atau menghapus di tempat. Keduanya reaktif di Vue 3. Pilih yang paling mudah
   kamu baca
2. Untuk quantity 0 di `updateQuantity`: tolak, atau anggap sebagai hapus?
   Keduanya masuk akal, tapi harus konsisten dan tertulis

### Verifikasi

- [ ] Update quantity ke 5 → `totalItems` ikut berubah
- [ ] Remove id yang tidak ada → tidak error
- [ ] Clear → keranjang kosong, subtotal 0

---

## Bagian D: Pakai dari Dua Komponen

### Penjelasan

Kekuatan store terlihat saat dipakai di lebih dari satu tempat. Buat dua
komponen: daftar produk dengan tombol "Tambah", dan badge kecil di navbar yang
menampilkan `totalItems`.

Hati-hati: kalau kamu destructure store langsung, state dan getter kehilangan
reactivity. Pakai `storeToRefs` untuk state/getter. Action boleh di-destructure
langsung dari store.

### Wajib Ada di Kode Kamu

- Minimal dua komponen memakai `useCartStore()`
- Badge selalu sinkron dengan daftar

### Cara Mengerjakan

1. Coba dulu destructure langsung (cara salah), lihat badge tidak ikut berubah
2. Perbaiki dengan `storeToRefs`
3. Tulis di catatan kenapa yang pertama gagal

### Verifikasi

- [ ] Klik "Tambah" di daftar → badge di navbar langsung berubah
- [ ] Kamu sudah melihat sendiri versi salahnya gagal

---

## Edge Case yang Harus Kamu Coba

- Tambah produk dengan harga 0 (produk gratis/bonus). Subtotal benar?
- Quantity sangat besar (misal 1.000.000). Perlu batas atas? Siapa yang
  seharusnya menetapkan batas stok, frontend atau server?
- Dua produk dengan nama sama tapi id berbeda → harus tetap dua baris
- Panggil `add` tanpa argumen quantity → default 1

---

## Petunjuk Bertingkat

### Petunjuk 1

Setup store itu isinya mirip `<script setup>`: `ref`, `computed`, dan fungsi.
Bedanya cuma dibungkus `defineStore` dan semua yang ingin dipakai luar harus
di-return.

### Petunjuk 2

Item yang kamu temukan lewat pencarian di array adalah object yang sama dengan
yang ada di dalam state. Mengubah propertinya sudah cukup untuk memicu update.

### Petunjuk 3

Kalau badge tidak update, cek cara kamu mengambil `totalItems` dari store.
Bandingkan dengan masalah "destructure reactive" di teori reactivity.

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] Semua action dan getter jalan sesuai aturan
- [ ] Quantity tidak valid tidak pernah masuk ke state
- [ ] Tidak ada total yang disimpan sebagai state terpisah
- [ ] Dua komponen sinkron lewat store
- [ ] Bonus: unit test untuk store (cari "testing stores" di dokumentasi Pinia)

---

## Refleksi

1. Kenapa aturan quantity ditaruh di action, bukan di tiap komponen?
2. Data apa yang **tidak** cocok masuk store global? Beri dua contoh
3. Kalau harga di keranjang bisa diubah lewat DevTools, apa artinya untuk
   proses checkout di server?

---

## Cara Submit / Lanjut

1. Commit store + dua komponen
2. Lanjut ke [soal 10 — Products API](10-products-api.md)

---

## Sudah Jalan? Baru Boleh Bandingkan dengan Contoh

Baca dulu [aturan folder contoh](../contoh/README.md). Bandingkan terutama
keputusanmu soal id yang tidak ditemukan dan quantity 0.

<!-- markdownlint-enable MD024 MD028 -->
