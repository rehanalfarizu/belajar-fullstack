# SOAL 03 — Class Produk, Enum, dan Katalog

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuat class yang menolak data tidak valid sejak dibuat (object selalu valid).
- Memakai constructor property promotion dan `readonly` supaya data tidak bisa diubah sembarangan.
- Memakai `enum` untuk nilai yang pilihannya terbatas, bukan string bebas.
- Memakai `interface` supaya aturan diskon bisa ditukar tanpa mengubah class `Produk`.
- Menulis static factory method (`dariArray`) untuk mengubah data mentah jadi object.

**Topik:** `final class`, constructor promotion, `readonly`, `enum` (backed), `interface`, `implements`, `static`, `?Produk` (nullable), `usort`, `<=>`

**Referensi utama:**

- [PHP Manual: Constructor Promotion](https://www.php.net/manual/en/language.oop5.decon.php#language.oop5.decon.constructor.promotion)
- [PHP Manual: Readonly Properties](https://www.php.net/manual/en/language.oop5.properties.php#language.oop5.properties.readonly-properties)
- [PHP Manual: Enumerations](https://www.php.net/manual/en/language.enumerations.php)
- [PHP Manual: Interfaces](https://www.php.net/manual/en/language.oop5.interfaces.php)

**Difficulty:** Lanjut • **Estimasi:** 90–120 menit

---

## Briefing

Di soal 02 produk masih berupa array. Masalahnya, array bisa diisi apa saja: harga
minus, slug pakai spasi, status `"aktiff"` (typo). Tidak ada yang mencegah.

Sekarang kamu ubah produk jadi **object** yang menjaga dirinya sendiri. Produk dengan
data salah tidak boleh bisa dibuat sama sekali. Toko juga mau dua jenis promo:
potongan persen dan potongan nominal. Keduanya harus bisa dipakai tanpa mengubah class
`Produk`.

Ini persis cara Eloquent Model, Enum cast, dan service class bekerja di Laravel nanti.

---

## Deskripsi

Lengkapi `code/03-class-produk.php`: enum `StatusProduk`, class `Produk`, dua class
diskon yang mengimplementasikan `AturanDiskon`, dan class `Katalog`. File harus
berakhir dengan `Semua cek lulus.`

---

## Syarat (Acceptance Criteria)

### Enum `StatusProduk`

- [ ] Backed enum bertipe `string` dengan tepat 3 case: `Aktif`, `Draft`, `Arsip` (value huruf kecil).
- [ ] Method `label()` memakai `match ($this)` dan mengembalikan teks Indonesia untuk tiap case.

### Class `Produk`

- [ ] Memakai constructor property promotion. Semua properti `public readonly`.
- [ ] Parameter `status` punya default `StatusProduk::Aktif`.
- [ ] Slug dengan huruf besar atau spasi ditolak dengan `InvalidArgumentException`.
- [ ] Nama kosong atau hanya spasi ditolak.
- [ ] Harga atau stok negatif ditolak.
- [ ] `dariArray()` adalah method `static` dan status tidak dikenal jadi `Draft` (tidak error).
- [ ] Mengubah properti setelah object dibuat (`$p->harga = 1`) memicu `Error`.

### Diskon

- [ ] Ada class `DiskonPersen` dan `DiskonNominal`, keduanya `implements AturanDiskon`.
- [ ] `DiskonPersen` menolak persen di luar 0–100.
- [ ] `DiskonNominal` menolak nominal negatif.
- [ ] Harga setelah diskon tidak pernah negatif.
- [ ] Class `Produk` tidak berisi `if` yang mengecek jenis diskon (`instanceof`).

### Class `Katalog`

- [ ] `tambah()` menolak slug duplikat dengan `DomainException`.
- [ ] `cari()` mengembalikan `Produk` atau `null`.
- [ ] `aktif()` mengembalikan list (index mulai 0) berisi produk berstatus Aktif saja.
- [ ] `urutHarga()` tidak mengubah urutan data di dalam katalog (mengurutkan salinan).

---

## Expected Output

```text
Mouse Wireless   Rp 175.000  [Dijual] (tidak bisa dibeli)
Keyboard Mekanik Rp 350.000  [Dijual]
Monitor 24 inci  Rp 1.650.000  [Belum terbit] (tidak bisa dibeli)

Semua cek lulus.
```

---

## Panduan Teknis

### Object yang "menjaga dirinya sendiri"

Analogi: KTP. Petugas Dukcapil mengecek data **sebelum** KTP dicetak. Setelah jadi,
kamu tidak bisa mencoret NIK di KTP. Constructor = petugas yang mengecek. `readonly` =
laminasi yang mencegah coretan.

Contoh di domain lain (alamat email), bukan jawaban soal:

```php
final class Email
{
    public function __construct(public readonly string $nilai)
    {
        if (filter_var($nilai, FILTER_VALIDATE_EMAIL) === false) {
            throw new InvalidArgumentException("Email '{$nilai}' tidak valid.");
        }
    }
}
```

### Enum

Enum itu seperti pilihan di menu dropdown: pilihannya sudah pasti, tidak bisa ngetik
bebas. Contoh enum untuk metode bayar:

```php
enum MetodeBayar: string
{
    case Tunai = 'tunai';
    case Transfer = 'transfer';
}

MetodeBayar::from('tunai');     // MetodeBayar::Tunai
MetodeBayar::from('kripto');    // ValueError
```

Cari di dokumentasi: method enum mana yang **tidak** melempar error kalau value tidak cocok?

### Interface

Interface = colokan listrik standar. Kipas, charger, dan TV punya bentuk colokan sama,
jadi stopkontak tidak perlu tahu alat apa yang dicolok. `Produk::hargaSetelah()` cukup
tahu "ini sesuatu yang punya method `potongan()`".

### Mengurutkan salinan

`usort` mengubah array yang diberikan. Di PHP, array yang dioper ke fungsi atau
di-assign ke variabel baru adalah **salinan** (copy-on-write). Jadi kamu cukup
menyalin dulu ke variabel lokal, baru urutkan.

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php -l 03-class-produk.php     # harus: No syntax errors detected
php 03-class-produk.php        # harus diakhiri: Semua cek lulus.
```

- [ ] Tambahkan sementara `new Produk('Kabel HDMI', 'Kabel', 50_000, 1);` di bawah demo. Harus gagal karena slug.
- [ ] Hapus kata `readonly` dari satu properti. Cek mandiri "readonly tidak bisa diubah" harus gagal. Kembalikan lagi.

---

## Cara Submit

1. Simpan hasil kerja di folder latihanmu sendiri.
2. Pastikan `php -l` bersih dan output diakhiri `Semua cek lulus.`
3. Jawab Refleksi di catatanmu.
4. Bandingkan dengan `contoh/` hanya setelah semua cek lulus.

---

## Catatan Penting

- ⚠️ **Constructor promotion**: parameter yang diberi visibility (`public readonly string $slug`) otomatis jadi properti. Jangan dideklarasikan dua kali.
- ⚠️ Tulis class diskon tepat di posisi TODO-nya, yaitu **di bawah** `interface AturanDiskon`. Class yang `implements` sebuah interface paling aman ditulis setelah interface itu dideklarasikan.
- 💡 Regex slug: pikirkan pola "kata, lalu (strip + kata) boleh berulang". Uji pola di [regex101.com](https://regex101.com/) dengan flavor PCRE.
- 📚 Baca [materi teori PHP Dasar](../../../materi-teori/01-php-dasar/README.md) bagian OOP dan enum.

---

## Refleksi

1. Apa untungnya validasi di constructor dibanding validasi di setiap tempat yang memakai produk?
2. Kalau toko menambah promo "beli 2 gratis 1", class mana yang perlu dibuat dan class mana yang **tidak** perlu disentuh?
3. Kenapa `cari()` mengembalikan `?Produk` (bisa null), sedangkan `tambah()` melempar exception? Kapan masing-masing cocok?
