# SOAL 02 — Keranjang Belanja dengan Fungsi Murni

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Memecah perhitungan uang jadi beberapa fungsi kecil yang bisa dites satu per satu.
- Menolak input yang salah dengan exception yang jelas, bukan diam-diam lanjut.
- Memakai `array_map`, `array_reduce`, dan `match` untuk mengolah data.
- Menghitung uang dalam integer rupiah tanpa masalah pecahan.

**Topik:** `declare(strict_types=1)`, associative array, `array_map`, `array_reduce`, `match (true)`, `intdiv`, exception, `number_format`

**Referensi utama:**

- [PHP Manual: Arrays](https://www.php.net/manual/en/language.types.array.php)
- [PHP Manual: array_reduce](https://www.php.net/manual/en/function.array-reduce.php)
- [PHP Manual: match](https://www.php.net/manual/en/control-structures.match.php)
- [PHP Manual: Exceptions](https://www.php.net/manual/en/language.exceptions.php)

**Difficulty:** Menengah • **Estimasi:** 60–90 menit

---

## Briefing

Toko kecil kamu jual aksesoris komputer. Pemilik toko minta satu hal: "Hitung total
belanja dengan benar. Kalau belanja di atas Rp 500.000, kasih diskon 10%." Kedengarannya
gampang. Tapi pembeli bisa iseng pesan produk yang tidak ada, pesan 0 barang, atau pesan
melebihi stok. Semua itu harus ditolak dengan pesan yang jelas.

Logika ini nanti akan kamu pindahkan ke Laravel (service class). Kalau sekarang sudah
rapi dalam fungsi murni, pindahnya tinggal copy.

---

## Deskripsi

Lengkapi `code/02-keranjang-belanja.php`: empat fungsi (`hitungBaris`, `hitungDiskon`,
`hitungKeranjang`, `formatRupiah`) plus bagian yang mencetak struk. File harus berakhir
dengan tulisan `Semua cek lulus.`

---

## Syarat (Acceptance Criteria)

### Validasi Input

- [ ] Slug yang tidak ada di katalog melempar `InvalidArgumentException`.
- [ ] Jumlah `0` atau negatif melempar `InvalidArgumentException`.
- [ ] Jumlah melebihi stok melempar `RangeException`, dan pesannya menyebut jumlah diminta serta stok tersedia.
- [ ] Keranjang kosong (`[]`) melempar `InvalidArgumentException`.

### Perhitungan

- [ ] Subtotal satu baris = harga × jumlah.
- [ ] Subtotal keranjang dihitung dengan `array_reduce` (bukan `foreach` + variabel global).
- [ ] Diskon 10% hanya berlaku kalau subtotal **>= 500.000**.
- [ ] Diskon selalu integer dan dibulatkan **ke bawah** (`500.005` → diskon `50.000`).
- [ ] Pemilihan aturan diskon memakai `match`.
- [ ] Tidak ada `float` di hasil akhir. Semua nilai uang bertipe `int`.

### Output

- [ ] `formatRupiah(1250000)` menghasilkan tepat `Rp 1.250.000`.
- [ ] Struk mencetak setiap baris, subtotal, diskon, dan total.
- [ ] Bagian "Cek mandiri" di bawah file tidak diubah dan lulus semua.

---

## Expected Output

Jalankan `php 02-keranjang-belanja.php`. Kira-kira begini (spasi boleh beda):

```text
Keyboard Mekanik   x1  Rp 350.000
Mouse Wireless     x2  Rp 350.000
Subtotal : Rp 700.000
Diskon   : Rp 70.000
Total    : Rp 630.000

Semua cek lulus.
```

Kalau ada yang salah, kamu akan lihat `CEK GAGAL: ...` lengkap dengan cek mana yang gagal.

---

## Panduan Teknis

### Kenapa uang disimpan sebagai integer?

Komputer menyimpan `float` dalam bentuk biner. Angka seperti `0.1` tidak bisa disimpan
persis. Coba sendiri:

```php
var_dump(0.1 + 0.2 === 0.3); // bool(false)
```

Analogi: float itu seperti penggaris yang garisnya agak miring. Untuk uang, kita pakai
"hitung koin": simpan semua dalam satuan terkecil (rupiah) sebagai integer.

### Fungsi murni

Fungsi murni = input sama, output selalu sama, dan tidak mengubah apa pun di luar
dirinya. Seperti kalkulator: tekan `2 + 3`, hasilnya selalu `5`. Fungsi seperti ini
gampang dites, karena kamu cukup cek "kalau masuk X, keluar Y".

### `array_reduce` itu apa?

Bayangkan kasir yang memegang satu angka "total sementara". Tiap barang lewat, total
ditambah. Itulah reduce. Contoh di kasus lain (menghitung total halaman buku):

```php
$buku = [['judul' => 'A', 'halaman' => 120], ['judul' => 'B', 'halaman' => 80]];

$totalHalaman = array_reduce(
    $buku,
    fn (int $sementara, array $b): int => $sementara + $b['halaman'],
    0, // nilai awal
);
```

### `match (true)`

`match` membandingkan dengan `===`. Trik `match (true)` membuat setiap cabang berisi
kondisi. Contoh untuk ongkir (bukan diskon):

```php
$ongkir = match (true) {
    $beratGram > 5000 => 50_000,
    $beratGram > 1000 => 20_000,
    default => 10_000,
};
```

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php -l 02-keranjang-belanja.php     # harus: No syntax errors detected
php 02-keranjang-belanja.php        # harus diakhiri: Semua cek lulus.
```

- [ ] Ubah sementara `'mouse-wireless' => 2` jadi `=> 99`. Program harus berhenti dengan pesan stok tidak cukup.
- [ ] Ubah `BATAS_DISKON` jadi `800_000`. Diskon harus jadi `Rp 0`. Kembalikan lagi setelahnya.

---

## Cara Submit

1. Simpan file hasil kerja di folder latihanmu sendiri (boleh di luar repo ini).
2. Pastikan `php -l` bersih dan output diakhiri `Semua cek lulus.`
3. Jawab pertanyaan Refleksi di bawah dalam catatanmu.
4. Baru setelah itu bandingkan dengan solusi referensi di folder `contoh/`.

---

## Catatan Penting

- ⚠️ **Jangan ubah bagian "Cek mandiri"** supaya lulus. Itu sama saja menyontek ke diri sendiri.
- 💡 **Kerjakan satu fungsi dulu**, jalankan, baru lanjut. Error `LogicException: TODO: ...` artinya kamu sudah sampai fungsi berikutnya.
- 💡 `array_map` hanya memberi *value*. Kalau butuh *key* (slug) juga, pikirkan cara memberi map daftar key-nya.
- 📚 Baca [materi teori PHP Dasar](../../../materi-teori/01-php-dasar/README.md) bagian array, function, dan exception.

---

## Refleksi

1. Kenapa `hitungDiskon` lebih mudah dites daripada kalau rumus diskon ditulis langsung di dalam `foreach` yang mencetak struk?
2. Kapan kamu memilih `InvalidArgumentException` dan kapan `RangeException`? Apa bedanya buat orang yang membaca log?
3. Kalau besok aturan diskon jadi bertingkat (5% di atas 300 ribu, 10% di atas 500 ribu), bagian mana saja yang perlu kamu ubah?
