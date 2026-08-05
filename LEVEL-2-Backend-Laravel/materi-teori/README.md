# Materi Teori — PHP dan Laravel

Materi ini memakai Laravel 13 dan PHP modern. Fokusnya bukan menghafal
perintah Artisan, tetapi memahami aliran data:

```text
HTTP request
  → route
  → middleware
  → controller
  → validation
  → service/domain logic
  → model/database
  → response (HTML atau JSON)
```

## 01. PHP Modern

PHP berjalan di server. Browser tidak menerima kode PHP; browser hanya
menerima hasil akhirnya, biasanya HTML atau JSON.

```php
<?php

declare(strict_types=1);

function hitungTotal(int $harga, int $jumlah): int
{
    return $harga * $jumlah;
}

$produk = [
    ['nama' => 'Keyboard', 'harga' => 350_000],
    ['nama' => 'Mouse', 'harga' => 175_000],
];

$produkMurah = array_filter(
    $produk,
    fn (array $item): bool => $item['harga'] < 300_000,
);
```

Konsep wajib:

- `declare(strict_types=1)` membantu menemukan type mismatch lebih awal.
- Array PHP dapat menjadi list atau associative array.
- Function sebaiknya memiliki parameter dan return type.
- Exception dipakai untuk kegagalan yang tidak dapat ditangani secara normal.
- OOP meliputi class, object, constructor, visibility, inheritance, interface,
  dan trait.
- Namespace mencegah benturan nama class.

## 02. Struktur Laravel dan Service Container

Folder penting:

| Lokasi | Tanggung jawab |
|---|---|
| `app/Http/Controllers` | Menerima request dan memilih response |
| `app/Http/Requests` | Validasi dan otorisasi input |
| `app/Models` | Model Eloquent dan relasi |
| `app/Services` | Use case atau logika aplikasi yang cukup kompleks |
| `routes/web.php` | Route dengan session, cookie, dan CSRF |
| `routes/api.php` | Route stateless berbasis JSON/API |
| `resources/views` | Blade templates |
| `database/migrations` | Versi schema database |
| `database/factories` | Generator data test |
| `database/seeders` | Data awal |
| `tests` | Feature dan unit tests |

Service container membuat dependency injection bekerja. Controller tidak perlu
membuat semua dependency dengan `new`; Laravel dapat menyediakannya berdasarkan
type hint.

```php
final class CheckoutController
{
    public function __construct(private CheckoutService $checkout) {}
}
```

## 03. Routing, Request, Controller, dan Response

Route menyatakan kontrak URL dan HTTP method:

```php
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{product}', [ProductController::class, 'show']);
```

Gunakan resource controller bila operasinya benar-benar CRUD:

```bash
php artisan make:controller ProductController --resource
```

Controller idealnya tipis. Ia mengorkestrasi input, use case, dan response;
aturan bisnis kompleks sebaiknya dipindahkan ke service/domain object.

## 04. Blade dan Rendering HTML

Blade melakukan escaping pada `{{ $value }}` sehingga lebih aman terhadap XSS.
Sintaks `{!! $value !!}` merender HTML mentah dan hanya boleh dipakai untuk data
yang sudah disanitasi serta benar-benar dipercaya.

```blade
@extends('layouts.app')

@section('content')
    @forelse ($products as $product)
        <article>
            <h2>{{ $product->name }}</h2>
            <p>Rp {{ number_format($product->price) }}</p>
        </article>
    @empty
        <p>Belum ada produk.</p>
    @endforelse
@endsection
```

Pecah UI menjadi layout, component, dan partial. Jangan meletakkan query database
di view.

## 05. Database dan Migration

Migration adalah version control untuk schema. Perubahan schema harus dapat
dijalankan ulang secara konsisten oleh anggota tim dan CI.

```bash
php artisan make:migration create_products_table
php artisan migrate
php artisan migrate:rollback
php artisan migrate:fresh --seed
```

Aturan penting:

- Pilih tipe kolom sesuai domain, bukan sekadar tipe yang mudah.
- Tambahkan foreign key untuk menjaga integritas.
- Tambahkan index berdasarkan pola query nyata.
- Gunakan transaction untuk beberapa write yang harus berhasil atau gagal
  sebagai satu kesatuan.
- Jangan menjalankan `migrate:fresh` pada production karena menghapus data.

## 06. Eloquent ORM

Eloquent memetakan row database menjadi object model.

```php
$products = Product::query()
    ->where('is_active', true)
    ->with('category')
    ->latest()
    ->paginate(20);
```

Pahami masalah N+1. Tanpa `with('category')`, loop 100 produk dapat menghasilkan
101 query. Periksa query dengan test, log, atau profiler.

Mass assignment membutuhkan `$fillable` atau `$guarded`. Jangan mengisi model
dengan seluruh input mentah tanpa validasi:

```php
$product = Product::create($request->validated());
```

Relasi utama: `hasOne`, `hasMany`, `belongsTo`, dan `belongsToMany`.

## 07. Validasi dan Form Request

Client-side validation membantu UX, tetapi server-side validation tetap wajib.

```php
final class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Product::class) ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'price' => ['required', 'integer', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
        ];
    }
}
```

Validasi menjawab “apakah bentuk input benar?”, sedangkan authorization
menjawab “apakah user ini boleh melakukan aksi tersebut?”.

## 08. Authentication dan Authorization

Untuk aplikasi Blade tradisional, session/cookie adalah pilihan alami. Untuk SPA
first-party, Sanctum mendukung autentikasi berbasis cookie. Token API cocok untuk
client non-browser atau integrasi yang memang membutuhkan bearer token.

Lapisan keamanan:

1. Authentication: siapa user ini?
2. Authorization: aksi apa yang boleh dilakukan?
3. Validation: input apa yang diterima?
4. Rate limiting: seberapa sering endpoint boleh dipanggil?
5. Audit/logging: apa yang terjadi?

Gunakan policy atau gate untuk authorization. Menyembunyikan tombol di UI bukan
authorization; server tetap harus menolak akses ilegal.

## 09. REST API dan API Resource

Response API harus stabil dan konsisten:

```php
return ProductResource::collection(
    Product::query()->latest()->paginate(20)
);
```

Status yang sering dipakai:

| Status | Arti |
|---|---|
| `200` | Request sukses |
| `201` | Resource berhasil dibuat |
| `204` | Sukses tanpa body |
| `400` | Request malformed |
| `401` | Belum terautentikasi |
| `403` | Terautentikasi tetapi tidak berhak |
| `404` | Resource tidak ditemukan |
| `409` | Konflik state |
| `422` | Input gagal validasi |
| `429` | Terlalu banyak request |

API Resource memisahkan bentuk database dari kontrak JSON publik.

## 10. Testing dan Deployment

Feature test lebih bernilai daripada menguji detail internal controller:

```php
test('admin dapat membuat produk', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->postJson('/api/products', [
            'name' => 'Keyboard',
            'price' => 350000,
            'stock' => 5,
        ])
        ->assertCreated()
        ->assertJsonPath('data.name', 'Keyboard');
});
```

Checklist production:

- `APP_ENV=production`, `APP_DEBUG=false`, dan `APP_KEY` valid.
- Secret hanya berada di environment/secret manager.
- Web server menunjuk ke folder `public/`, bukan root project.
- Jalankan migration dengan proses deployment yang terkontrol.
- Jalankan cache/optimasi sesuai dokumentasi versi yang dipakai.
- Queue worker dan scheduler dikelola process manager.
- HTTPS, backup, health check, log, metrics, dan alert tersedia.
- Deployment memiliki strategi rollback.

## Cara Menguji Pemahaman

Untuk setiap bab, jawab tanpa melihat catatan:

1. Data masuk dari mana dan divalidasi di mana?
2. Bagian mana yang merupakan aturan bisnis?
3. Apa yang terjadi jika database gagal di tengah proses?
4. Siapa yang boleh menjalankan aksi?
5. Bagaimana membuktikannya dengan test?

Lanjutkan ke [praktikum](../materi-praktikum/README.md) setelah mampu menjelaskan
alur request dari route sampai response.
