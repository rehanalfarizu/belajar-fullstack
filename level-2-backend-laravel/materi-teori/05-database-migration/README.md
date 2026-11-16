# MATERI TEORI 05 — Database, Migration, dan Query Builder

> Target: Laravel 13 (rilis Maret 2026) dengan PHP 8.3+. Semua yang dibahas di sini
> juga jalan di Laravel 12.
>
> Praktiknya ada di [materi-praktikum/05-database-migration](../../materi-praktikum/05-database-migration/README.md).

---

## 1. Kenapa Butuh Migration?

Bayangkan kamu dan dua teman mengerjakan toko online yang sama. Kamu menambah kolom
`stock` lewat phpMyAdmin di laptopmu. Teman kamu tidak tahu. Kodenya jalan di
laptopmu, error di laptop dia. Besoknya server production juga error.

Masalahnya: perubahan database **tidak tercatat** di mana pun.

Migration menyelesaikan itu. Setiap perubahan bentuk database ditulis sebagai file
PHP, disimpan di Git bersama kode. Siapa pun yang menjalankan `php artisan migrate`
akan mendapat database dengan bentuk yang sama.

**Analogi:** migration itu **Git untuk bentuk database**. Git mencatat perubahan
kode, migration mencatat perubahan tabel.

### Kenapa penting buat kerja?

- Di tim, satu database "versi laptop si A" itu mimpi buruk. Migration bikin semua orang sinkron.
- CI/CD (deploy otomatis) menjalankan migration sendiri. Tanpa migration, deploy harus manual dan rawan lupa.
- Di code review, migration sering diperiksa paling teliti, karena kesalahan schema mahal diperbaiki setelah ada data.

---

## 2. Anatomi Sebuah Migration

```bash
php artisan make:migration create_suppliers_table
```

Perintah di atas membuat file di `database/migrations/` dengan nama berawalan tanggal,
misal `2026_03_20_101500_create_suppliers_table.php`. Tanggal itu menentukan
**urutan** jalan.

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // Memasang perubahan
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('phone', 20)->nullable();
            $table->timestamps();
        });
    }

    // Membongkar perubahan (kebalikan up)
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
```

- `up()` = instruksi pasang.
- `down()` = instruksi bongkar. Harus **kebalikan persis** dari `up()`.
- `return new class extends Migration` = anonymous class. Sejak Laravel 9 ini bentuk standar, supaya nama class tidak bentrok.

**Analogi:** `up()` itu memasang rak baru di toko, `down()` itu mencopotnya lagi
sampai toko kembali seperti sebelum rak dipasang.

---

## 3. Perintah Migration yang Wajib Kamu Hafal

| Perintah | Yang terjadi |
|---|---|
| `php artisan migrate` | Jalankan semua migration yang belum jalan |
| `php artisan migrate:status` | Lihat mana yang sudah (`Ran`) dan belum (`Pending`) |
| `php artisan migrate:rollback` | Jalankan `down()` untuk **batch** terakhir |
| `php artisan migrate:rollback --step=1` | Rollback 1 migration terakhir saja |
| `php artisan migrate:refresh` | Rollback semua lalu migrate lagi |
| `php artisan migrate:fresh` | **Drop semua tabel** lalu migrate dari nol |
| `php artisan migrate:fresh --seed` | Sama, lalu jalankan seeder |
| `php artisan db:show` | Ringkasan database: koneksi, tabel, ukuran |
| `php artisan db:table products` | Detail satu tabel: kolom, index, foreign key |

**Batch** adalah kelompok migration yang jalan dalam satu kali `migrate`. Rollback
membongkar per batch, bukan per file (kecuali pakai `--step`).

> ⚠️ `migrate:fresh` dan `migrate:refresh` **menghapus data**. Jangan pernah jalankan di production.

---

## 4. Tipe Kolom: Pilih Sesuai Arti Data

Database itu seperti lemari dengan laci berbagai ukuran. Laci kecil untuk kancing,
laci panjang untuk payung. Salah pilih laci = boros tempat atau barang tidak muat.

| Kebutuhan | Method | Catatan |
|---|---|---|
| Primary key auto increment | `id()` | Big integer unsigned |
| Teks pendek (nama, slug, email) | `string('kolom', 120)` | Beri panjang maksimal yang masuk akal |
| Teks panjang (deskripsi, artikel) | `text('kolom')` | Tidak bisa di-index biasa di MySQL |
| Uang rupiah | `unsignedBigInteger('price')` | Simpan dalam rupiah utuh, bukan float |
| Jumlah stok | `unsignedInteger('stock')` | Tidak mungkin negatif |
| Ya/tidak | `boolean('is_active')` | Di MySQL jadi `tinyint(1)` |
| Tanggal + jam | `timestamp('published_at')` / `dateTime(...)` | |
| `created_at` + `updated_at` | `timestamps()` | Diisi otomatis oleh Eloquent |
| Hapus "lembut" | `softDeletes()` | Kolom `deleted_at` |
| Pilihan terbatas | `string('status', 20)` + validasi | `enum()` ada, tapi sulit diubah di beberapa database |

### Kenapa uang tidak pakai float?

```php
var_dump(0.1 + 0.2 === 0.3); // bool(false)
```

Float menyimpan angka secara **perkiraan**. Untuk uang, perkiraan = selisih saldo.
Rupiah tidak punya sen dalam praktik sehari-hari, jadi simpan sebagai integer.
Kalau butuh desimal pasti (misal kurs), pakai `decimal('kolom', 15, 2)`.

---

## 5. Modifier: Nullable, Default, Unique, Index

```php
$table->string('sku', 40)->unique();          // tidak boleh kembar
$table->string('barcode', 40)->nullable();     // boleh kosong
$table->boolean('is_active')->default(true);   // nilai bawaan
$table->index(['is_active', 'created_at']);    // index gabungan
```

- **nullable**: kolom boleh `NULL`. Pakai kalau datanya memang bisa "belum ada".
- **default**: nilai bawaan saat insert tidak menyebut kolom ini.
- **unique**: database **menolak** nilai kembar. Ini pertahanan terakhir, lebih kuat dari validasi aplikasi (yang bisa kalah balapan kalau dua request datang bersamaan).
- **index**: daftar isi supaya pencarian cepat.

**Analogi index:** buku 500 halaman tanpa daftar isi. Kamu cari bab "Pembayaran",
harus buka satu per satu. Dengan daftar isi, langsung loncat. Tapi daftar isi juga
harus diperbarui setiap ada halaman baru, jadi index membuat **insert sedikit lebih
lambat**. Pasang index berdasarkan query yang benar-benar sering dipakai, bukan di
semua kolom.

---

## 6. Foreign Key: Menjaga Hubungan Antar Tabel

Foreign key adalah aturan: "nilai kolom ini harus ada di tabel lain".

```php
// Contoh: tabel reviews menempel ke tabel products
Schema::create('reviews', function (Blueprint $table) {
    $table->id();
    $table->foreignId('product_id')->constrained()->cascadeOnDelete();
    $table->unsignedTinyInteger('rating');
    $table->timestamps();
});
```

`foreignId('product_id')->constrained()` menebak tabel induknya dari nama kolom:
`product_id` → tabel `products`, kolom `id`.

**Analogi:** foreign key itu seperti **satpam parkir** yang hanya mengizinkan mobil
dengan karcis valid. Karcis `product_id = 999` padahal produk 999 tidak ada? Ditolak.

### Saat induk dihapus

| Method | Perilaku | Contoh cocok |
|---|---|---|
| `restrictOnDelete()` | Hapus induk ditolak selama masih ada anak | Kategori yang masih punya produk |
| `cascadeOnDelete()` | Anak ikut terhapus | Review ikut hilang saat produk dihapus |
| `nullOnDelete()` | Kolom anak jadi `NULL` | Produk tetap ada walau penjualnya hapus akun (kolom harus nullable) |

Tidak ada jawaban "selalu benar". Tanyakan: **kalau induknya hilang, apakah anaknya
masih berarti?**

### Melepas foreign key di `down()`

Database tidak mengizinkan kamu menghapus kolom yang masih terikat foreign key di
beberapa engine. Lepas dulu ikatannya. Laravel punya `dropForeign([...])` untuk
melepas constraint saja, dan `dropConstrainedForeignId('kolom')` untuk melepas
constraint sekaligus kolomnya.

---

## 7. Mengubah Tabel yang Sudah Ada

Tabel lama diubah dengan `Schema::table`, bukan `Schema::create`:

```php
// Contoh: menambah kolom weight ke tabel shipments
Schema::table('shipments', function (Blueprint $table) {
    $table->unsignedInteger('weight_gram')->default(0)->after('id');
});
```

- `after('id')` hanya berlaku di MySQL/MariaDB. SQLite dan PostgreSQL mengabaikannya.
- Mengubah tipe kolom yang sudah ada: `->change()`, misal `$table->string('name', 200)->change();`.
- Mengganti nama kolom: `$table->renameColumn('old', 'new');`.

### Aturan emas

> **Jangan edit migration yang sudah dijalankan di database orang lain.**

Kalau migration sudah jalan di laptop teman atau di server, mengedit file itu tidak
akan berpengaruh di sana (Laravel menganggapnya sudah `Ran`). Buat migration baru
yang mengubah tabel. Mengedit migration lama hanya aman kalau migration itu belum
pernah keluar dari laptopmu.

### Migration yang ramah production

Server production berisi data asli. Migration yang menghapus kolom atau mengganti
nama kolom bisa membuat kode versi lama (yang masih jalan selama deploy) error.
Pola umum di tim: tambah dulu kolom baru → deploy kode yang memakai keduanya →
pindahkan data → baru hapus kolom lama di deploy berikutnya.

---

## 8. SQLite vs MySQL vs PostgreSQL

Proyek Laravel baru memakai **SQLite** secara default (file `database/database.sqlite`).
Cocok untuk belajar karena tidak perlu install server database.

| Hal | SQLite | MySQL/MariaDB | PostgreSQL |
|---|---|---|---|
| Butuh server | Tidak (cuma file) | Ya | Ya |
| `after()` | Diabaikan | Didukung | Diabaikan |
| Pembandingan `LIKE` | Tidak peka huruf besar untuk ASCII | Tergantung collation, biasanya tidak peka | **Peka** huruf besar (pakai `ILIKE`) |
| Tipe ketat | Longgar | Sedang | Ketat |
| Dipakai di kantor | Test, aplikasi kecil | Sangat umum di Indonesia | Umum di startup |

Pelajaran: sesuatu yang lolos di SQLite belum tentu lolos di MySQL/PostgreSQL. Sebelum
production, uji di database yang sama dengan production.

---

## 9. Seeder dan Factory

- **Seeder**: mengisi data awal (kategori bawaan, akun admin lokal).
- **Factory**: membuat data palsu dalam jumlah banyak (50 produk acak) untuk test dan development.

```bash
php artisan make:seeder RegionSeeder
php artisan db:seed --class=RegionSeeder
php artisan db:seed            # jalankan DatabaseSeeder
```

Seeder yang baik itu **idempotent**: dijalankan 1 kali atau 10 kali hasilnya sama.
Insert biasa akan error di kali kedua kalau ada kolom unique. Cari method yang
"perbarui kalau ada, buat kalau belum".

**Analogi:** seeder itu stok awal toko sebelum buka. Factory itu manekin untuk latihan
pegawai: banyak, mirip asli, tapi bukan pelanggan sungguhan.

> ⚠️ Jangan isi seeder dengan password asli atau data pribadi asli. Seeder masuk Git.

---

## 10. Query Builder: SQL Lewat Method PHP

Sebelum Eloquent (topik 06), Laravel punya Query Builder lewat facade `DB`:

```php
use Illuminate\Support\Facades\DB;

// Contoh di tabel suppliers
$suppliers = DB::table('suppliers')
    ->select(['id', 'name', 'phone'])
    ->where('city', 'Bandung')
    ->orderBy('name')
    ->paginate(20);
```

Yang sering dipakai:

| Method | Arti |
|---|---|
| `select([...])` | Kolom yang diambil |
| `where('kolom', 'operator', nilai)` | Kondisi |
| `whereIn('kolom', [...])` | Salah satu dari daftar |
| `whereNull('kolom')` | Kolom kosong |
| `orderBy('kolom', 'asc')` | Urutan |
| `limit(10)` | Batasi jumlah |
| `get()` | Ambil semua hasil (Collection) |
| `first()` | Ambil satu baris |
| `count()`, `sum('kolom')` | Agregat |
| `paginate(20)` | Hasil per halaman + info halaman |
| `when($kondisi, fn ...)` | Tambah kondisi hanya kalau `$kondisi` benar |

---

## 11. Parameter Binding dan SQL Injection

Ini bagian paling penting di bab ini.

### Masalahnya

```php
// JANGAN. Contoh tabel orders.
$status = $_GET['status'];
DB::select("select * from orders where status = '$status'");
```

Kalau `$status` berisi `paid' OR '1'='1`, SQL yang terbentuk:

```sql
select * from orders where status = 'paid' OR '1'='1'
```

Kondisi `'1'='1'` selalu benar. Semua order bocor. Dengan payload lain, penyerang
bisa membaca tabel lain atau bahkan menghapus data.

**Analogi:** kamu menitip pesan ke kurir: *"Antar paket ke rumah nomor [ISI]"*. Orang
iseng mengisi *"12. Lalu ambil semua paket di gudang."* Kurir yang tidak membedakan
**isi formulir** dan **instruksi** akan menjalankan keduanya.

### Solusinya: binding

```php
DB::select('select * from orders where status = ?', [$status]);
```

Query dan nilai dikirim **terpisah**. Database sudah tahu bentuk query sebelum melihat
nilainya, jadi isi `$status` hanya dianggap teks biasa, apa pun isinya.

Query Builder melakukan binding **otomatis**:

```php
DB::table('orders')->where('status', $status)->get(); // aman
```

### Method `...Raw` = zona bahaya

`whereRaw`, `orderByRaw`, `selectRaw`, `havingRaw`, `DB::raw`, `DB::select`,
`DB::statement` menerima SQL mentah. Mereka aman **hanya** kalau nilai dikirim lewat
`?` dan array binding:

```php
// Aman
DB::table('orders')->whereRaw('total > ?', [$minimal])->get();

// Rentan
DB::table('orders')->whereRaw("total > $minimal")->get();
```

### Binding tidak bisa melindungi nama kolom

`?` hanya menggantikan **nilai**. Nama kolom (`ORDER BY price`), nama tabel, dan
kata kunci (`ASC`/`DESC`) tidak bisa di-binding. Kalau nama kolom berasal dari input
user (misal `?sort=price`), pakai **allowlist**: daftar kolom yang kamu izinkan,
selain itu tolak.

```php
// Contoh pola allowlist di domain lain
$bolehDiurutkan = ['created_at', 'total'];
if (! in_array($sort, $bolehDiurutkan, true)) {
    $sort = 'created_at';
}
```

Pelajari lebih dalam di [Modul Keamanan 03 — SQL Injection](../../../modul-keamanan-web/03-sql-injection/README.md).

---

## 12. Transaction: Semua atau Tidak Sama Sekali

Checkout = kurangi stok + buat order + catat pembayaran. Kalau langkah kedua gagal,
stok sudah terlanjur berkurang. Data jadi tidak konsisten.

```php
DB::transaction(function () use ($cart) {
    // semua query di sini berhasil bersama, atau dibatalkan bersama
    DB::table('stocks')->where('product_id', $cart->productId)->decrement('qty', $cart->qty);
    DB::table('orders')->insert([...]);
});
```

Kalau ada exception di dalam closure, Laravel otomatis **rollback** semua perubahan
di transaction itu.

**Analogi:** transfer bank. Uang keluar dari rekening A dan masuk ke rekening B harus
terjadi berdua. Tidak boleh cuma salah satu.

---

## 13. Kesalahan Umum

| Kesalahan | Akibat | Yang benar |
|---|---|---|
| Edit migration yang sudah jalan di server | Server tidak ikut berubah, schema beda-beda | Buat migration baru |
| `down()` kosong atau salah urutan | Rollback gagal saat darurat | Uji rollback setiap bikin migration |
| Harga pakai `float` | Selisih pembulatan | Integer rupiah atau `decimal` |
| Lupa index di kolom yang sering dicari | Halaman lambat saat data besar | Index berdasarkan pola query |
| Index di semua kolom | Insert/update lambat, boros ruang | Index secukupnya |
| `cascadeOnDelete` tanpa berpikir | Satu klik hapus = ratusan data ikut hilang | Pilih perilaku sesuai bisnis |
| `migrate:fresh` di production | **Semua data hilang** | Hanya di lokal |
| Variabel ditempel di `whereRaw`/`DB::select` | SQL injection | Binding `?` |
| Nama kolom sort dari URL langsung ke `orderBy` | Injection lewat identifier | Allowlist |
| Seeder berisi password asli | Bocor lewat Git | Data palsu saja |

---

## 14. Glosarium

| Istilah | Arti |
|---|---|
| Schema | Bentuk database: tabel, kolom, tipe, relasi, index |
| Migration | File yang mencatat satu perubahan schema |
| Batch | Kelompok migration yang jalan bersama |
| Rollback | Membatalkan migration dengan menjalankan `down()` |
| Primary key | Kolom pengenal unik setiap baris (`id`) |
| Foreign key | Kolom yang menunjuk primary key tabel lain |
| Constraint | Aturan yang dipaksakan database (unique, foreign key, not null) |
| Index | Struktur bantu supaya pencarian cepat |
| Seeder | Pengisi data awal |
| Factory | Pembuat data palsu |
| Idempotent | Diulang berkali-kali hasilnya sama |
| Query Builder | API PHP untuk menyusun query SQL |
| Binding | Nilai dikirim terpisah dari teks query |
| Identifier | Nama kolom/tabel di SQL |
| Allowlist | Daftar yang diizinkan; selain itu ditolak |
| Transaction | Kumpulan query yang sukses bersama atau batal bersama |

---

## 15. Uji Pemahaman (Jawab Tanpa Melihat)

1. Kenapa `down()` harus diuji, padahal jarang dipakai?
2. Kolom `category_id` di `products`: kapan kamu pilih `restrict`, kapan `set null`?
3. Kenapa unique index tetap perlu walaupun aplikasi sudah memvalidasi `unique:products,slug`?
4. Tulis dengan kata-katamu sendiri kenapa `?` membuat query aman.
5. Kenapa `?` tidak bisa dipakai untuk `ORDER BY`?

---

## Referensi Resmi

- [Laravel Docs: Migrations](https://laravel.com/docs/13.x/migrations)
- [Laravel Docs: Seeding](https://laravel.com/docs/13.x/seeding)
- [Laravel Docs: Database — Getting Started](https://laravel.com/docs/13.x/database)
- [Laravel Docs: Query Builder](https://laravel.com/docs/13.x/queries)
- [OWASP: SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

Lanjut praktik: [materi-praktikum/05-database-migration](../../materi-praktikum/05-database-migration/README.md).
