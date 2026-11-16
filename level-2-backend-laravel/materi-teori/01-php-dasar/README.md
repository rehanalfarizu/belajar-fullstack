# MATERI TEORI 01 — PHP Dasar (PHP 8.3+)

> Target: PHP 8.3 atau lebih baru. Laravel 13 butuh minimal PHP 8.3. Semua contoh di
> sini juga jalan di PHP 8.4 dan 8.5.

Praktikumnya ada di [materi-praktikum/01-php-dasar](../../materi-praktikum/01-php-dasar/README.md).

---

## 1. PHP Itu Apa dan Jalan di Mana?

PHP adalah bahasa yang jalan di **server**. Browser tidak pernah melihat kode PHP.
Browser hanya menerima hasilnya: HTML atau JSON.

**Analogi:** PHP itu koki di dapur. Pelanggan (browser) tidak melihat koki memasak.
Pelanggan cuma menerima piring berisi makanan (HTML/JSON).

```text
Browser ── request ──▶ Server (PHP jalan di sini) ── response (HTML/JSON) ──▶ Browser
```

PHP juga bisa jalan di terminal tanpa browser. Ini yang kita pakai di topik ini.

```bash
php --version          # cek versi
php -l file.php        # cek sintaks saja (lint), tidak menjalankan
php file.php           # jalankan file
php -a                 # mode interaktif (REPL), keluar dengan exit
php -r 'echo 2 + 3;'   # jalankan satu baris
```

**Kenapa penting buat kerja:** `php artisan` di Laravel itu cuma `php` yang menjalankan
file bernama `artisan`. Kalau kamu nyaman di terminal, Laravel terasa jauh lebih ringan.

---

## 2. Struktur File PHP

```php
<?php

declare(strict_types=1);

echo "Halo dari PHP" . PHP_EOL;
```

- `<?php` membuka mode PHP. Di file yang isinya PHP semua, **jangan** tulis penutup `?>`.
  Spasi atau enter setelah `?>` bisa ikut terkirim dan merusak header/JSON.
- Setiap statement diakhiri `;`.
- `.` adalah operator gabung string (bukan `+` seperti JavaScript).
- `PHP_EOL` adalah karakter baris baru sesuai sistem operasi.

---

## 3. Tipe Data dan `strict_types`

| Tipe | Contoh | Catatan |
| --- | --- | --- |
| `int` | `42`, `1_500_000` | `_` boleh dipakai sebagai pemisah ribuan agar mudah dibaca |
| `float` | `3.14` | Jangan untuk uang |
| `string` | `'teks'`, `"teks {$x}"` | Petik dua bisa menyisipkan variabel |
| `bool` | `true`, `false` | |
| `array` | `[1, 2]`, `['a' => 1]` | List dan associative pakai tipe yang sama |
| `null` | `null` | "Tidak ada nilai" |
| object | `new DateTimeImmutable()` | Hasil dari class |

### Kenapa `strict_types`?

Tanpa `strict_types`, PHP suka "membantu" mengubah tipe diam-diam.

**Analogi:** Kasir yang menerima uang mainan karena "warnanya mirip". Ramah, tapi bikin
rugi. `strict_types` = kasir yang teliti: tipe salah langsung ditolak.

```php
<?php
declare(strict_types=1);

function kaliDua(int $angka): int
{
    return $angka * 2;
}

kaliDua(5);    // 10
kaliDua("5");  // TypeError, karena "5" itu string
```

Tanpa baris `declare`, `kaliDua("5")` akan diam-diam jadi `10`. Kelihatannya enak, tapi
bug jadi susah dicari karena data salah lolos jauh ke dalam program.

### Float dan uang

```php
var_dump(0.1 + 0.2 === 0.3); // bool(false)
```

Float disimpan dalam biner dan tidak selalu persis. Untuk uang, simpan dalam **satuan
terkecil sebagai integer**. Rupiah tidak punya sen yang dipakai sehari-hari, jadi cukup
simpan rupiah sebagai `int`. Untuk pembagian integer, ada `intdiv()` yang membulatkan ke
bawah.

---

## 4. Variabel, String, dan Operator Penting

```php
$nama = 'Alya';
$umur = 21;

echo "Halo {$nama}, umurmu {$umur}" . PHP_EOL;  // interpolasi
echo 'Halo ' . $nama . PHP_EOL;                 // penggabungan

$a === $b;   // sama nilai DAN sama tipe (pakai ini)
$a == $b;    // sama nilai setelah dikonversi (hindari)
$a <=> $b;   // spaceship: -1, 0, atau 1 (dipakai untuk sorting)
```

Selalu pakai `===`. Contoh jebakan `==`: `"abc" == 0` dulu bernilai `true` di PHP 7.
Di PHP 8 sudah diperbaiki, tapi kebiasaan `===` membuat kodemu jelas maksudnya.

### Null coalescing dan nullsafe

**Analogi:** `??` itu "kalau kotaknya kosong, pakai cadangan".

```php
$kota = $alamat['kota'] ?? 'Tidak diketahui';  // tidak error kalau kunci tidak ada
$halaman ??= 1;                                // isi kalau masih null

$namaKota = $user?->alamat?->kota;             // berhenti dan jadi null kalau ada yang null
```

Di Laravel kamu akan sering melihat `$request->user()?->id`. Artinya: kalau belum
login, hasilnya `null`, bukan error.

---

## 5. Array: List dan Associative

Di PHP, satu tipe `array` dipakai untuk dua hal.

**Analogi:** List = antrean nomor (0, 1, 2, ...). Associative = lemari loker berlabel
nama ("sepatu", "tas").

```php
// List
$warna = ['merah', 'hijau', 'biru'];
echo $warna[0]; // merah

// Associative
$buku = ['judul' => 'Laskar Pelangi', 'halaman' => 529];
echo $buku['judul'];

// Array of associative = bentuk data paling sering di backend
$daftarBuku = [
    ['judul' => 'Laskar Pelangi', 'halaman' => 529],
    ['judul' => 'Bumi Manusia', 'halaman' => 535],
];
```

### Fungsi array yang wajib kamu kenal

| Fungsi | Apa yang dilakukan | Analogi |
| --- | --- | --- |
| `array_map` | Ubah setiap elemen | Cap stempel ke setiap kertas |
| `array_filter` | Saring elemen yang lolos syarat | Saringan teh |
| `array_reduce` | Gabung semua elemen jadi satu nilai | Celengan yang terus diisi |
| `usort` | Urutkan pakai aturanmu sendiri | Menyusun buku di rak |
| `array_key_exists` / `isset` | Cek kunci ada | Cek loker ada pemiliknya |
| `array_values` | Reset kunci jadi 0, 1, 2 | Nomor antrean ulang |
| `count` | Jumlah elemen | |

Contoh menghitung rata-rata halaman (domain buku, bukan soal latihan):

```php
$halaman = array_map(fn (array $b): int => $b['halaman'], $daftarBuku);
$rata = array_sum($halaman) / count($halaman);

$tebal = array_filter($daftarBuku, fn (array $b): bool => $b['halaman'] > 530);
// Hati-hati: array_filter MEMPERTAHANKAN kunci lama. Pakai array_values() kalau butuh list.
```

### Copy-on-write

Array di PHP dikirim **sebagai salinan**, bukan referensi.

```php
function urutkan(array $angka): array
{
    sort($angka);     // yang diurutkan salinan lokal
    return $angka;
}

$asli = [3, 1, 2];
$baru = urutkan($asli);
// $asli tetap [3, 1, 2]
```

Object berbeda: object dikirim sebagai "pegangan" ke benda yang sama. Ini penting saat
kamu memakai Eloquent model nanti.

---

## 6. Function

```php
function luasPersegiPanjang(int $panjang, int $lebar): int
{
    return $panjang * $lebar;
}
```

- Tulis **tipe parameter** dan **tipe return**. Ini dokumentasi yang dicek mesin.
- Satu fungsi, satu tugas. Kalau namanya butuh kata "dan", mungkin perlu dipecah.

### Arrow function dan closure

```php
$pajak = 11;

// Arrow function: satu ekspresi, otomatis bisa membaca $pajak dari luar
$denganPajak = fn (int $harga): int => $harga + intdiv($harga * $pajak, 100);

// Closure biasa: perlu `use` untuk membaca variabel luar
$denganPajak2 = function (int $harga) use ($pajak): int {
    return $harga + intdiv($harga * $pajak, 100);
};
```

### Named arguments

```php
function buatAkun(string $email, bool $aktif = true, string $peran = 'member'): array
{
    return compact('email', 'aktif', 'peran');
}

buatAkun('a@contoh.test', peran: 'admin'); // lewati $aktif, langsung isi $peran
```

### Fungsi murni

**Analogi:** Kalkulator. Tekan `7 × 6`, hasilnya selalu `42`, dan kalkulator tidak
mengubah isi dompetmu.

Fungsi murni: input sama → output sama, tanpa efek samping (tidak `echo`, tidak ubah
variabel global, tidak menulis file). Fungsi murni gampang dites karena cukup dicek
"masuk X, keluar Y". Pisahkan **hitungan** (murni) dari **tampilan** (`echo`).

---

## 7. `match`

`match` mirip `switch` tapi lebih aman:

- Membandingkan dengan `===`.
- Mengembalikan nilai.
- Error (`UnhandledMatchError`) kalau tidak ada cabang yang cocok dan tidak ada `default`.

```php
$namaHari = match ($nomor) {
    1 => 'Senin',
    2 => 'Selasa',
    6, 7 => 'Akhir pekan',
    default => 'Hari kerja lain',
};

// Trik match (true): tiap cabang berisi kondisi
$kategoriSuhu = match (true) {
    $suhu >= 35 => 'panas',
    $suhu >= 25 => 'hangat',
    default => 'sejuk',
};
```

---

## 8. Exception

**Analogi:** Alarm kebakaran. Begitu ada masalah serius, alarm bunyi, semua berhenti,
dan orang yang bertugas (`catch`) yang menangani.

```php
function bagi(int $a, int $b): int
{
    if ($b === 0) {
        throw new InvalidArgumentException('Pembagi tidak boleh 0.');
    }

    return intdiv($a, $b);
}

try {
    echo bagi(10, 0);
} catch (InvalidArgumentException $e) {
    echo 'Gagal: ' . $e->getMessage() . PHP_EOL;
} finally {
    echo 'Selesai mencoba.' . PHP_EOL;
}
```

Exception bawaan yang sering dipakai:

| Exception | Kapan |
| --- | --- |
| `InvalidArgumentException` | Argumen yang dikirim salah |
| `DomainException` | Melanggar aturan bisnis (misal data duplikat) |
| `RangeException` / `OutOfRangeException` | Nilai di luar batas |
| `RuntimeException` | Masalah saat program jalan (file tidak ada, koneksi putus) |
| `LogicException` | Kesalahan programmer (misal fitur belum diimplementasikan) |

### Exception atau return `null`?

- Return `null` kalau "tidak ketemu" itu **hal biasa** (cari produk berdasarkan slug).
- Lempar exception kalau kondisinya **tidak boleh terjadi** dan pemanggil harus tahu
  (harga negatif, stok kurang).

Di Laravel, banyak exception otomatis jadi HTTP response. Contoh: `ModelNotFoundException`
jadi `404`, `ValidationException` jadi `422`. Jadi kebiasaan memakai exception yang tepat
akan langsung berguna.

---

## 9. OOP: Class dan Object

**Analogi:** Class = cetakan kue. Object = kuenya. Satu cetakan bisa menghasilkan banyak
kue dengan isi berbeda.

```php
final class Rekening
{
    private int $saldo = 0;

    public function __construct(public readonly string $nomor)
    {
    }

    public function setor(int $jumlah): void
    {
        if ($jumlah <= 0) {
            throw new InvalidArgumentException('Setoran harus positif.');
        }
        $this->saldo += $jumlah;
    }

    public function saldo(): int
    {
        return $this->saldo;
    }
}

$r = new Rekening('001-234');
$r->setor(50_000);
echo $r->saldo(); // 50000
```

### Visibility

| Kata kunci | Bisa diakses dari |
| --- | --- |
| `public` | Mana saja |
| `protected` | Class itu dan turunannya |
| `private` | Class itu saja |

Default-mu: `private`. Buka hanya yang memang perlu dipakai dari luar.

### Constructor property promotion

Daripada menulis properti lalu mengisinya di constructor, PHP 8 bisa sekaligus:

```php
// Cara lama
final class Titik
{
    public int $x;
    public int $y;

    public function __construct(int $x, int $y)
    {
        $this->x = $x;
        $this->y = $y;
    }
}

// Constructor promotion
final class Titik2
{
    public function __construct(
        public readonly int $x,
        public readonly int $y,
    ) {
    }
}
```

### `readonly`

Properti `readonly` hanya bisa diisi **sekali**, dari dalam class (biasanya di
constructor). Setelah itu, mencoba mengubah akan memicu `Error`.

**Analogi:** Ijazah yang sudah dicap. Kalau ada yang salah, cetak ijazah baru, bukan
dicoret.

PHP 8.2 ke atas juga punya `readonly class` (semua properti otomatis readonly).

### `final`

`final class` tidak boleh diturunkan (`extends`). Ini mencegah orang mengubah perilaku
class lewat turunan tanpa sengaja. Banyak tim memakai `final` sebagai default.

### `static`

Method `static` dipanggil lewat nama class, bukan object. Sering dipakai untuk **factory**:
cara lain membuat object.

```php
final class Suhu
{
    private function __construct(public readonly float $celcius) {}

    public static function dariFahrenheit(float $f): self
    {
        return new self(($f - 32) * 5 / 9);
    }
}

$s = Suhu::dariFahrenheit(98.6);
```

Kamu akan melihat pola ini di Laravel: `Product::create(...)`, `Product::query()`,
`Str::slug(...)`.

---

## 10. Interface

**Analogi:** Stopkontak standar. Kipas, charger, dan TV punya colokan sama. Stopkontak
tidak peduli alat apa yang dicolok, asal colokannya cocok.

```php
interface Pengirim
{
    public function kirim(string $tujuan, string $pesan): bool;
}

final class PengirimEmail implements Pengirim
{
    public function kirim(string $tujuan, string $pesan): bool
    {
        // ... kirim email
        return true;
    }
}

final class PengirimWhatsApp implements Pengirim
{
    public function kirim(string $tujuan, string $pesan): bool
    {
        // ... kirim WA
        return true;
    }
}

function beriTahu(Pengirim $pengirim, string $tujuan): void
{
    $pengirim->kirim($tujuan, 'Pesananmu sudah dikirim.');
}
```

`beriTahu` tidak perlu `if ($pengirim instanceof ...)`. Menambah cara kirim baru cukup
dengan class baru. Laravel memakai pola ini di mana-mana (cache driver, mail driver,
filesystem).

---

## 11. Enum

**Analogi:** Pilihan di dropdown. Pilihannya pasti, tidak bisa ngetik bebas, jadi tidak
ada typo `"aktiff"`.

```php
enum Prioritas: int
{
    case Rendah = 1;
    case Sedang = 2;
    case Tinggi = 3;

    public function warna(): string
    {
        return match ($this) {
            self::Rendah => 'hijau',
            self::Sedang => 'kuning',
            self::Tinggi => 'merah',
        };
    }
}

Prioritas::from(3);        // Prioritas::Tinggi
Prioritas::tryFrom(9);     // null (tidak error)
Prioritas::Tinggi->value;  // 3
Prioritas::cases();        // semua case
```

- **Pure enum**: tanpa nilai (`enum Arah { case Utara; ... }`).
- **Backed enum**: punya nilai `string` atau `int`, cocok disimpan di database.

Laravel bisa meng-cast kolom database langsung ke enum. Jadi `$order->status` langsung
berupa enum, bukan string.

---

## 12. Namespace dan Composer Autoload

### Namespace

**Analogi:** Nama lengkap dengan alamat. Ada banyak "Budi", tapi "Budi, Jl. Melati 3,
Bandung" cuma satu. Namespace mencegah dua class bernama sama saling tabrakan.

```php
<?php

declare(strict_types=1);

namespace App\Models;

final class Product
{
}
```

Nama lengkap class di atas: `App\Models\Product`. Untuk memakainya di file lain:

```php
use App\Models\Product;

$p = new Product();
```

### Composer dan PSR-4

Composer adalah package manager PHP (mirip npm). Selain install library, Composer
membuat **autoloader**: kamu tidak perlu `require` file satu per satu.

Aturan PSR-4 di `composer.json` Laravel:

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "app/"
    }
  }
}
```

Artinya: class `App\Models\Product` dicari di file `app/Models/Product.php`. Nama
namespace dan folder **harus cocok**, termasuk huruf besar-kecilnya. Salah satu huruf
saja, muncul error `Class "App\Models\Product" not found`.

```bash
composer dump-autoload   # buat ulang peta autoload kalau kamu menambah folder/aturan baru
```

**Kenapa penting buat kerja:** error "Class not found" adalah error paling sering di
minggu pertama pakai Laravel. Hampir selalu penyebabnya namespace tidak cocok dengan
folder, atau lupa `use`.

---

## 13. Kesalahan Umum

| Kesalahan | Akibat | Perbaikan |
| --- | --- | --- |
| Lupa `declare(strict_types=1)` | Tipe salah lolos diam-diam | Tulis di baris kedua setiap file |
| Uang pakai float | Selisih Rp 1 di laporan | Simpan rupiah sebagai `int` |
| Pakai `==` | Perbandingan tidak terduga | Pakai `===` |
| Menulis `?>` di akhir file | "Headers already sent" atau JSON rusak | Hapus `?>` |
| `array_filter` lalu akses `[0]` | `Undefined array key 0` | Bungkus dengan `array_values()` |
| `echo` di dalam fungsi hitungan | Fungsi susah dites | Fungsi return nilai, `echo` di luar |
| Menangkap `Exception` lalu diam | Bug tersembunyi | Tangkap jenis spesifik, log atau lempar ulang |
| Namespace tidak cocok folder | `Class not found` | Samakan namespace dengan path PSR-4 |
| Properti `public` yang bisa diubah bebas | Object jadi tidak valid | `private` atau `readonly` + validasi |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| CLI | Command Line Interface, menjalankan program lewat terminal |
| Lint (`php -l`) | Cek sintaks tanpa menjalankan program |
| REPL | Mode interaktif, ketik satu baris langsung dapat hasil |
| Type hint | Tipe yang ditulis di parameter atau return function |
| Associative array | Array dengan kunci teks |
| Closure | Function tanpa nama yang bisa disimpan di variabel |
| Arrow function | Closure pendek `fn () => ...` |
| Exception | Objek yang dilempar saat terjadi kondisi tidak normal |
| Class / Object | Cetakan / hasil cetakan |
| Constructor | Method `__construct` yang jalan saat object dibuat |
| Constructor promotion | Mendeklarasikan properti langsung di parameter constructor |
| `readonly` | Properti yang hanya bisa diisi sekali |
| Interface | Kontrak method yang wajib diimplementasikan |
| Enum | Tipe dengan daftar nilai tetap |
| Namespace | "Alamat" class untuk mencegah nama bentrok |
| Composer | Package manager dan autoloader PHP |
| PSR-4 | Standar pemetaan namespace ke folder |

---

## 15. Uji Pemahaman (Tanpa Melihat Catatan)

1. Apa yang terjadi kalau `function f(int $x)` dipanggil `f("3")` dengan dan tanpa `strict_types`?
2. Kenapa `array_filter` bisa membuat `$hasil[0]` error?
3. Kapan kamu memilih return `null` dan kapan melempar exception?
4. Apa beda `Prioritas::from()` dan `Prioritas::tryFrom()`?
5. Class `App\Services\Kasir` harus ada di file mana menurut PSR-4 Laravel?

---

## Referensi Resmi

- [PHP Manual (bahasa Inggris)](https://www.php.net/manual/en/)
- [PHP 8.3 Release](https://www.php.net/releases/8.3/en.php)
- [PHP: Classes and Objects](https://www.php.net/manual/en/language.oop5.php)
- [PHP: Enumerations](https://www.php.net/manual/en/language.enumerations.php)
- [Composer: Autoloading](https://getcomposer.org/doc/01-basic-usage.md#autoloading)
- [PSR-4 Autoloader](https://www.php-fig.org/psr/psr-4/)

Lanjut ke [Materi Teori 02 — Setup Laravel](../02-setup-laravel/README.md).
