# MATERI TEORI 06 — Eloquent ORM

> Target: Laravel 13 (rilis Maret 2026) dengan PHP 8.3+. Semua contoh di sini juga
> jalan di Laravel 12. Kalau ada gaya baru khusus Laravel 13, disebut terpisah.
>
> Praktiknya ada di [materi-praktikum/06-eloquent-orm](../../materi-praktikum/06-eloquent-orm/README.md).

---

## 1. Apa Itu Eloquent?

Di topik 05 kamu menulis query dengan `DB::table('products')->where(...)`. Hasilnya
array/object polos. Eloquent naik satu tingkat: setiap tabel punya **class model**,
dan setiap baris jadi **object** yang punya method sendiri.

```php
// Query Builder: dapat object polos (stdClass)
$row = DB::table('suppliers')->where('id', 1)->first();

// Eloquent: dapat object Supplier, lengkap dengan relasi dan method
$supplier = Supplier::find(1);
$supplier->products;   // relasi
$supplier->save();     // simpan perubahan
```

Pola ini namanya **Active Record**: satu object = satu baris, dan object itu tahu cara
menyimpan dirinya sendiri.

**Analogi:** Query Builder itu kamu memesan ke dapur pakai kertas pesanan. Eloquent
itu kamu punya **pelayan pribadi** yang kenal menu, kenal kebiasaanmu, dan bisa
langsung mengurus pesanan lanjutan ("sekalian minumnya ya").

### Kenapa penting buat kerja?

- Hampir semua kode Laravel di perusahaan memakai Eloquent untuk akses data.
- Kode jadi lebih mudah dibaca rekan tim: `Order::paid()->latest()->get()` lebih jelas daripada SQL 5 baris.
- Tapi pelayan yang terlalu "pintar" bisa diam-diam boros (N+1) atau terlalu penurut (mass assignment). Developer yang paham dua jebakan ini sangat dicari.

---

## 2. Konvensi Model

```bash
php artisan make:model Supplier -mf    # model + migration + factory
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    // Kosong pun sudah bisa dipakai, karena konvensi.
}
```

Laravel menebak banyak hal dari nama:

| Hal | Tebakan default | Cara mengubah |
|---|---|---|
| Nama tabel | `Supplier` → `suppliers` (jamak, snake_case) | `protected $table = 'pemasok';` |
| Primary key | `id`, auto increment | `protected $primaryKey`, `$incrementing`, `$keyType` |
| Timestamps | `created_at`, `updated_at` diisi otomatis | `public $timestamps = false;` |
| Koneksi | Koneksi default di `.env` | `protected $connection` |

**Analogi:** konvensi itu seperti aturan parkir di mal: mobil di basement, motor di
lantai dasar. Kalau kamu ikut aturan, tidak perlu tanya satpam. Kalau beda, kamu harus
bilang eksplisit.

---

## 3. Mengambil Data

```php
Supplier::all();                          // semua baris (hati-hati kalau tabel besar)
Supplier::find(5);                        // by primary key, null kalau tidak ada
Supplier::findOrFail(5);                  // lempar 404 kalau tidak ada
Supplier::where('city', 'Bandung')->get(); // Collection
Supplier::where('city', 'Bandung')->first();
Supplier::query()->orderBy('name')->paginate(20);
Supplier::where('city', 'Bandung')->count();
```

- `get()` mengembalikan **Collection** (seperti array super).
- `first()` / `find()` mengembalikan **satu model** atau `null`.
- `findOrFail()` / `firstOrFail()` cocok di controller: otomatis jadi 404.

### Data besar: chunk

```php
// Proses 10.000 baris tanpa memuat semuanya ke memori sekaligus
Supplier::query()->orderBy('id')->chunk(500, function ($suppliers) {
    foreach ($suppliers as $supplier) {
        // kirim laporan, dll
    }
});
```

**Analogi:** memindahkan 1 truk pasir pakai ember. Bukan karena malas, tapi karena
kamu tidak kuat mengangkat satu truk sekaligus.

---

## 4. Membuat, Mengubah, Menghapus

```php
// Membuat: cara 1 (satu per satu)
$supplier = new Supplier();
$supplier->name = 'CV Maju';
$supplier->save();

// Membuat: cara 2 (mass assignment)
$supplier = Supplier::create(['name' => 'CV Maju', 'city' => 'Bandung']);

// Mengubah
$supplier->update(['city' => 'Jakarta']);

// Menghapus
$supplier->delete();
```

Cara 1 mengisi properti satu per satu. Cara 2 mengisi banyak kolom dari satu array.
Cara 2 inilah yang disebut **mass assignment**, dan butuh perhatian khusus.

---

## 5. Mass Assignment: Jebakan Paling Klasik

### Masalahnya

```php
// JANGAN di proyek nyata
User::create($request->all());
```

Form registrasi cuma punya `name`, `email`, `password`. Tapi penyerang bisa menambah
field sendiri, misal `role=admin`. `$request->all()` membawa **semua** field, termasuk
yang tidak ada di form.

**Analogi:** kamu menyerahkan formulir kosong ke tamu hotel untuk mengisi nama dan
nomor HP. Tamu itu menambahkan baris sendiri: "kamar upgrade ke suite, gratis". Kalau
resepsionis memproses semua yang tertulis tanpa melihat formulir aslinya, tamu itu
dapat suite.

### Pertahanan dari Eloquent: `$fillable` / `$guarded`

Secara default, model Eloquent **menolak** mass assignment sampai kamu menyatakan
kolom mana yang boleh.

```php
class Supplier extends Model
{
    // Allowlist: hanya ini yang boleh diisi lewat create()/update()/fill()
    protected $fillable = ['name', 'city', 'phone'];
}
```

atau

```php
class Supplier extends Model
{
    // Blocklist: semua boleh KECUALI ini
    protected $guarded = ['is_verified'];
}
```

| | `$fillable` (allowlist) | `$guarded` (blocklist) |
|---|---|---|
| Kolom baru ditambah | Tertutup sampai kamu buka | **Terbuka** sampai kamu ingat menutup |
| Risiko lupa | Fitur tidak jalan (ketahuan cepat) | Celah keamanan (ketahuan telat) |
| `= []` | Tidak ada yang boleh | **Semua** boleh |

Rekomendasi untuk model yang menerima input user: `$fillable`.

### Gaya Laravel 13: atribut

Dokumentasi Laravel 13 menulis hal yang sama dengan atribut PHP di atas class:

```php
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'city', 'phone'])]
class Supplier extends Model
{
}
```

Fungsinya sama. Properti `$fillable` tetap didukung dan masih paling banyak kamu temui
di codebase kantor.

### Kolom milik server

Kolom seperti `user_id` (pemilik), `role`, `is_verified` bukan hak user untuk diisi.
Server yang menentukan. Isi lewat assignment langsung (`$model->kolom = ...`) atau lewat
relasi. Assignment langsung **tidak** dicek oleh `$fillable`.

### Validasi + fillable = dua lapis

1. Validasi (topik 07) memastikan **bentuk** input benar dan membuang field yang tidak ada di rules.
2. `$fillable` jaring pengaman kalau ada yang lolos.

Detail keamanannya: [Modul 02 — Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md)
dan [Modul 05 — Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md).

---

## 6. Casts: Mengubah Tipe Otomatis

Database menyimpan boolean sebagai `0/1`, tanggal sebagai string. Cast membuat Eloquent
mengubahnya ke tipe PHP yang tepat.

```php
class Supplier extends Model
{
    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'joined_at' => 'datetime',
            'settings' => 'array',      // kolom JSON ↔ array PHP
            'status' => SupplierStatus::class, // enum PHP
        ];
    }
}
```

Cast penting di model `User` bawaan Laravel:

```php
'password' => 'hashed',
```

Artinya: setiap kali kamu mengisi `password`, Eloquent otomatis meng-hash-nya. Kamu
tidak perlu memanggil `Hash::make()` manual (dan jangan di-hash dua kali).

**Analogi:** cast itu seperti penerjemah otomatis di pintu masuk. Data dari database
masuk dalam "bahasa database", keluar dalam "bahasa PHP".

---

## 7. Accessor dan Mutator

Accessor mengubah nilai **saat dibaca**, mutator **saat ditulis**.

```php
use Illuminate\Database\Eloquent\Casts\Attribute;

class Supplier extends Model
{
    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucwords($value),     // saat dibaca
            set: fn (string $value) => strtolower(trim($value)), // saat ditulis
        );
    }
}
```

Pakai secukupnya. Logika bisnis yang rumit lebih baik di service, bukan di accessor.

---

## 8. Relasi

Relasi adalah inti Eloquent. Yang paling sering:

| Relasi | Contoh | Foreign key ada di |
|---|---|---|
| `hasMany` | Supplier punya banyak Product | tabel `products` (`supplier_id`) |
| `belongsTo` | Product milik satu Supplier | tabel `products` (`supplier_id`) |
| `hasOne` | User punya satu Profile | tabel `profiles` (`user_id`) |
| `belongsToMany` | Product punya banyak Tag, Tag punya banyak Product | tabel pivot `product_tag` |

```php
class Supplier extends Model
{
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}

class Product extends Model
{
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }
}
```

Cara pakai:

```php
$supplier->products;            // property: Collection hasil query
$supplier->products()->where('stock', '>', 0)->get(); // method: query builder, bisa ditambah kondisi
$supplier->products()->create([...]); // foreign key supplier_id diisi otomatis
```

Perhatikan beda `products` (tanpa kurung, hasil) dan `products()` (dengan kurung,
query yang belum dijalankan).

**Cara mengingat:** yang menyimpan foreign key adalah yang `belongsTo`. "Produk
**milik** supplier", jadi kolom `supplier_id` ada di produk.

---

## 9. Eager Loading dan Masalah N+1

### Masalahnya

```php
$products = Product::all();          // 1 query

foreach ($products as $product) {
    echo $product->supplier->name;   // 1 query PER produk
}
```

100 produk = 1 + 100 = **101 query**. Itulah N+1. Di laptop dengan 5 produk tidak
terasa. Di production dengan 5.000 produk, halaman bisa butuh detik-an.

**Analogi:** kamu disuruh mengecek harga 100 barang di daftar belanja. Cara N+1: lari
ke rak, cek satu barang, balik ke meja, lari lagi untuk barang berikutnya. Cara eager
loading: bawa daftarnya, ambil semua label harga sekali jalan.

### Solusinya: `with()`

```php
$products = Product::with('supplier')->get(); // 2 query, berapa pun jumlah produknya
```

Query kedua kira-kira `select * from suppliers where id in (1, 2, 3, ...)`.

Variasi:

```php
Product::with('supplier:id,name')->get();         // ambil kolom tertentu saja dari relasi
Product::with(['supplier', 'tags'])->get();        // beberapa relasi
$products->load('supplier');                        // eager load setelah model sudah diambil
```

> ⚠️ Kalau kamu memakai `select([...])` di query utama, **foreign key harus ikut diambil**,
> kalau tidak Laravel tidak bisa mencocokkan relasinya.

### Jangan menebak, ukur

```php
DB::enableQueryLog();
// ... jalankan kodenya
count(DB::getQueryLog());
```

### Pengaman development: preventLazyLoading

Di `app/Providers/AppServiceProvider.php`:

```php
public function boot(): void
{
    Model::preventLazyLoading(! $this->app->isProduction());
}
```

Di lokal, setiap lazy loading (relasi diakses tanpa eager load) akan **melempar
exception**. N+1 jadi ketahuan saat kamu coding, bukan saat pelanggan mengeluh.

---

## 10. Local Scope: Kondisi yang Bisa Dipakai Ulang

```php
class Supplier extends Model
{
    public function scopeVerified(Builder $query): Builder
    {
        return $query->where('is_verified', true);
    }

    public function scopeInCity(Builder $query, string $city): Builder
    {
        return $query->where('city', $city);
    }
}

// Pemakaian: awalan "scope" dihilangkan
Supplier::verified()->inCity('Bandung')->get();
```

Di Laravel 13, dokumentasi menulis scope dengan atribut `#[Scope]` pada method
`protected` tanpa awalan `scope`:

```php
use Illuminate\Database\Eloquent\Attributes\Scope;

#[Scope]
protected function verified(Builder $query): void
{
    $query->where('is_verified', true);
}
```

Dua gaya ini memberi hasil sama. Gaya `scopeNama()` jalan di Laravel 12 dan 13.

### Kondisi opsional dengan `when()`

```php
Supplier::query()
    ->when($city, fn ($q) => $q->where('city', $city))   // hanya kalau $city diisi
    ->get();
```

### Scope bukan jaminan aman

Scope cuma wadah. Kalau isinya `whereRaw("city = '$city'")`, scope itu tetap rentan SQL
injection. Aturan dari topik 05 tetap berlaku: nilai dari user **selalu** lewat binding.
Lihat [Modul Keamanan 03 — SQL Injection](../../../modul-keamanan-web/03-sql-injection/README.md).

---

## 11. Soft Delete

```php
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use SoftDeletes;   // tabel butuh kolom deleted_at ($table->softDeletes())
}

$supplier->delete();             // isi deleted_at, baris tidak benar-benar hilang
Supplier::all();                 // otomatis tidak menampilkan yang sudah dihapus
Supplier::withTrashed()->get();  // termasuk yang dihapus
$supplier->restore();            // kembalikan
$supplier->forceDelete();        // hapus permanen
```

**Analogi:** soft delete itu **tempat sampah** di laptop. Dihapus, tapi masih bisa
dikembalikan sebelum tempat sampahnya dikosongkan.

---

## 12. Collection vs Query Builder

```php
Supplier::where('city', 'Bandung')->get();   // filter di DATABASE
Supplier::all()->where('city', 'Bandung');   // ambil SEMUA, filter di PHP
```

Hasilnya mirip, tapi yang kedua menarik seluruh tabel ke memori dulu. Untuk 100 baris
tidak masalah. Untuk 1 juta baris, server bisa kehabisan memori.

Aturan sederhana: **sebelum** `get()` = database yang bekerja. **Sesudah** `get()` = PHP
yang bekerja. Biarkan database melakukan filter, urut, dan hitung.

---

## 13. Strictness: Biar Kesalahan Ketahuan Cepat

Laravel menyediakan beberapa pengaman, umumnya dipasang di `AppServiceProvider::boot()`:

```php
Model::preventLazyLoading(! $this->app->isProduction());
Model::preventSilentlyDiscardingAttributes(! $this->app->isProduction());
```

- `preventLazyLoading`: lempar exception saat terjadi lazy loading (N+1).
- `preventSilentlyDiscardingAttributes`: lempar exception saat kamu mengisi kolom yang tidak ada di `$fillable`. Default-nya Laravel **membuang diam-diam**, sehingga bug "kok kolomnya tidak tersimpan?" sulit dilacak.

Kenapa dimatikan di production? Supaya user tidak melihat error karena hal yang
sebenarnya tidak fatal. Tujuannya menangkap bug saat development.

---

## 14. Factory untuk Test dan Data Dummy

```php
// database/factories/SupplierFactory.php
public function definition(): array
{
    return [
        'name' => fake()->company(),
        'city' => fake()->city(),
        'is_verified' => fake()->boolean(),
    ];
}
```

```php
Supplier::factory()->count(50)->create();
Supplier::factory()->has(Product::factory()->count(3))->create(); // dengan relasi
```

Factory membuat test kamu mandiri: setiap test menyiapkan datanya sendiri, tidak
bergantung pada isi database orang lain.

---

## 15. Kesalahan Umum

| Kesalahan | Akibat | Yang benar |
|---|---|---|
| `Model::create($request->all())` | Mass assignment, privilege escalation | Validasi + `$fillable` |
| `$guarded = []` di model yang menerima input | Semua kolom terbuka | `$fillable` |
| `user_id` diambil dari input | User bisa mengaku jadi orang lain | Isi dari `$request->user()` |
| Akses relasi di loop tanpa `with()` | N+1, halaman lambat | Eager loading |
| `with()` semua relasi "biar aman" | Query dan memori boros | Muat yang dipakai saja |
| `select()` tanpa foreign key | Relasi selalu `null` | Sertakan FK |
| `Model::all()` lalu filter di PHP | Memori habis di data besar | `where()` sebelum `get()` |
| `whereRaw` dengan string tempelan | SQL injection | Binding `?` |
| Hash password manual + cast `hashed` | Password di-hash dua kali, login gagal | Pilih salah satu (cast saja) |
| Tidak pakai pagination di list | Response raksasa | `paginate()` |

---

## 16. Glosarium

| Istilah | Arti |
|---|---|
| ORM | Object-Relational Mapper, penerjemah tabel ↔ object |
| Active Record | Pola di mana satu object mewakili satu baris dan bisa menyimpan dirinya |
| Model | Class Eloquent untuk satu tabel |
| Collection | Kumpulan model hasil `get()`, punya method seperti `map`, `filter` |
| Mass assignment | Mengisi banyak kolom dari satu array |
| `$fillable` | Allowlist kolom untuk mass assignment |
| `$guarded` | Blocklist kolom untuk mass assignment |
| Cast | Konversi tipe otomatis saat baca/tulis |
| Accessor / Mutator | Pengubah nilai saat dibaca / ditulis |
| Relasi | Hubungan antar model |
| Pivot table | Tabel penghubung untuk relasi many-to-many |
| Eager loading | Memuat relasi di awal (`with`) |
| Lazy loading | Memuat relasi saat pertama diakses |
| N+1 | Pola query berulang: 1 + satu per item |
| Local scope | Method model untuk kondisi query yang dipakai ulang |
| Soft delete | Hapus dengan menandai `deleted_at`, bisa dikembalikan |
| Factory | Pembuat data palsu |

---

## 17. Uji Pemahaman (Jawab Tanpa Melihat)

1. Apa beda `$supplier->products` dan `$supplier->products()`?
2. Kenapa `$fillable` lebih aman dari `$guarded` untuk model yang menerima input user?
3. Kalau `user_id` tidak ada di `$fillable`, bagaimana cara mengisinya?
4. Gambarkan N+1 untuk 20 order yang masing-masing menampilkan nama pelanggan. Berapa query? Berapa setelah eager loading?
5. Kenapa `preventLazyLoading` hanya dinyalakan di luar production?

---

## Referensi Resmi

- [Laravel Docs: Eloquent — Getting Started](https://laravel.com/docs/13.x/eloquent)
- [Laravel Docs: Eloquent Relationships](https://laravel.com/docs/13.x/eloquent-relationships)
- [Laravel Docs: Mutators and Casting](https://laravel.com/docs/13.x/eloquent-mutators)
- [Laravel Docs: Eloquent Collections](https://laravel.com/docs/13.x/eloquent-collections)
- [Laravel Docs: Eloquent Factories](https://laravel.com/docs/13.x/eloquent-factories)
- [Laravel Docs: Pagination](https://laravel.com/docs/13.x/pagination)

Lanjut praktik: [materi-praktikum/06-eloquent-orm](../../materi-praktikum/06-eloquent-orm/README.md).
