# TUGAS — 01 PHP Dasar

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Tiga file PHP yang jalan di terminal dan lulus cek mandirinya sendiri.
2. Pengalaman memecah masalah jadi fungsi kecil yang bisa dites.
3. Pengalaman membuat class yang menolak data salah sejak awal.

---

## Daftar Soal dan File

| Soal | File awal (starter) | Disalin ke mana? | Estimasi |
| --- | --- | --- | --- |
| [01 — Rekap Nilai](soal/01-katalog-nilai.md) | `code/01-katalog-nilai.php` | Folder latihan bebas, misal `~/latihan-laravel/php-dasar/` | 45–60 menit |
| [02 — Keranjang Belanja](soal/02-keranjang-belanja.md) | `code/02-keranjang-belanja.php` | `~/latihan-laravel/php-dasar/` | 60–90 menit |
| [03 — Class Produk](soal/03-class-produk.md) | `code/03-class-produk.php` | `~/latihan-laravel/php-dasar/` | 90–120 menit |

---

## Cara Menjalankan

Topik ini **tidak butuh Laravel**. Semua starter adalah PHP murni dan bisa langsung
dijalankan dengan `php`.

```bash
php --version                       # minimal PHP 8.3
mkdir -p ~/latihan-laravel/php-dasar
cp code/02-keranjang-belanja.php ~/latihan-laravel/php-dasar/
cd ~/latihan-laravel/php-dasar
php 02-keranjang-belanja.php
```

Kenapa disalin ke luar repo? Supaya file asli di repo tetap utuh dan bisa kamu ulang
dari nol kapan saja.

Selama TODO belum diisi, kamu akan melihat `PHP Fatal error: Uncaught LogicException:
TODO: ...`. Itu normal. Artinya program sudah sampai di fungsi yang belum kamu isi.

---

## Bagian A: Rekap Nilai (Soal 01)

### Langkah

1. Baca [soal 01](soal/01-katalog-nilai.md) sampai habis sebelum mengetik.
2. Salin `code/01-katalog-nilai.php` ke folder latihan.
3. Isi `hitungRataRata()` dulu. Uji dengan `var_dump(hitungRataRata([80, 90, 70]));` sementara.
4. Lanjut `tentukanPredikat()`, lalu `buatRekap()`.
5. Terakhir, filter yang lulus dan cetak.

### Verifikasi

- [ ] `php -l` tidak menemukan error sintaks
- [ ] Rata-rata `[80, 90, 70]` = `80`
- [ ] Nilai `-1` dan `101` ditolak dengan exception
- [ ] Bima (rata-rata < 60) tidak tampil di output

---

## Bagian B: Keranjang Belanja (Soal 02)

### Langkah

1. Baca [soal 02](soal/02-keranjang-belanja.md).
2. Salin `code/02-keranjang-belanja.php` ke folder latihan.
3. Kerjakan berurutan: `formatRupiah()` → `hitungDiskon()` → `hitungBaris()` → `hitungKeranjang()`.
4. Isi bagian "Tampilkan struk".
5. Jalankan sampai muncul `Semua cek lulus.`

### Verifikasi

- [ ] Output diakhiri `Semua cek lulus.`
- [ ] Bagian "Cek mandiri" tidak kamu ubah
- [ ] Tidak ada `float` di nilai uang
- [ ] Pesan error stok menyebut jumlah diminta dan stok tersedia

---

## Bagian C: Class Produk dan Katalog (Soal 03)

### Langkah

1. Baca [soal 03](soal/03-class-produk.md).
2. Salin `code/03-class-produk.php` ke folder latihan.
3. Isi enum `StatusProduk` dulu (case + `label()`).
4. Ganti constructor `Produk` dengan constructor promotion + validasi.
5. Buat `DiskonPersen` dan `DiskonNominal` di posisi TODO.
6. Lengkapi `Katalog`.
7. Jalankan sampai muncul `Semua cek lulus.`

### Verifikasi

- [ ] Output diakhiri `Semua cek lulus.`
- [ ] Semua properti `Produk` adalah `public readonly`
- [ ] Class `Produk` tidak memakai `instanceof` untuk memilih jenis diskon

---

## Petunjuk Kalau Macet

Buka petunjuk satu per satu. Jangan langsung loncat ke petunjuk 3.

### Soal 02 — keranjang

1. **Petunjuk 1 (arah berpikir):** Tulis di kertas dulu: untuk 1 keyboard + 2 mouse, berapa subtotal tiap baris, subtotal total, diskon, total? Kodemu harus meniru langkah hitungan tanganmu.
2. **Petunjuk 2 (fitur yang dicari):** Cari di php.net: `array_key_exists`, `array_keys`, `array_reduce`, `intdiv`, `number_format`. Baca contoh di bagian bawah halaman dokumentasinya.
3. **Petunjuk 3 (langkah tanpa kode):** Di `hitungKeranjang`: (a) cek kosong, (b) ambil daftar slug, (c) untuk tiap slug panggil `hitungBaris` dengan jumlah dari keranjang, (d) reduce semua subtotal mulai dari 0, (e) panggil `hitungDiskon`, (f) susun array hasil.

### Soal 03 — class

1. **Petunjuk 1 (arah berpikir):** Error `Cannot modify readonly property` justru tanda kamu benar. Error `Class "DiskonPersen" not found` artinya class itu belum kamu buat.
2. **Petunjuk 2 (fitur yang dicari):** Cari "constructor promotion", "readonly properties", "BackedEnum::tryFrom", dan `preg_match` di php.net.
3. **Petunjuk 3 (langkah tanpa kode):** Di `urutHarga`: (a) ambil semua value produk jadi list baru, (b) urutkan list baru itu dengan pembanding harga, (c) kalau tidak naik, tukar urutan pembandingnya, (d) return list baru.

### Umum

- **`Parse error: syntax error, unexpected ...`** → lihat nomor baris yang disebut, lalu cek baris **sebelumnya** (biasanya kurang `;` atau `}`).
- **`TypeError ... must be of type int, string given`** → itu `strict_types` bekerja. Cari dari mana nilai string itu datang.

---

## Cara Mengecek Hasil Sendiri

```bash
cd ~/latihan-laravel/php-dasar

# 1. Cek sintaks semua file
for f in *.php; do php -l "$f"; done

# 2. Jalankan satu per satu
php 01-katalog-nilai.php
php 02-keranjang-belanja.php     # harus diakhiri "Semua cek lulus."
php 03-class-produk.php          # harus diakhiri "Semua cek lulus."

# 3. Cek tidak ada TODO yang tertinggal
grep -n "TODO" *.php             # idealnya tidak ada output
```

Uji juga kasus gagal dengan mengubah data sementara (lihat bagian "Verifikasi Hasil" di
tiap soal). Program yang benar bukan cuma lulus jalur bahagia, tapi juga menolak input
salah dengan pesan jelas.

---

## File yang Perlu Diisi

```text
~/latihan-laravel/php-dasar/
├── 01-katalog-nilai.php        ← salinan dari code/01-katalog-nilai.php
├── 02-keranjang-belanja.php    ← salinan dari code/02-keranjang-belanja.php
└── 03-class-produk.php         ← salinan dari code/03-class-produk.php
```
