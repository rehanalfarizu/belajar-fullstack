# MATERI TEORI 09 — REST API dengan Laravel

> Target: Laravel 13 (rilis Maret 2026) dan PHP 8.3+. Semua yang dibahas di
> sini juga jalan di Laravel 12.

Sampai bab 08, aplikasi kamu mengirim HTML ke browser. Di bab ini kamu belajar
mengirim **data mentah (JSON)** supaya bisa dipakai aplikasi lain: aplikasi
mobile, frontend React/Vue, atau sistem kasir toko sebelah.

Praktikumnya ada di [materi-praktikum/09-rest-api](../../materi-praktikum/09-rest-api/README.md).

---

## 1. Apa Itu API?

**API (Application Programming Interface)** = pintu yang disediakan sebuah
program supaya program lain bisa minta data atau minta sesuatu dikerjakan.

**Analogi:** API itu seperti **loket pemesanan di warung makan**. Pembeli tidak
boleh masuk dapur. Pembeli cukup bilang pesanan di loket dengan format yang
jelas ("nasi goreng, 2, pedas"), lalu menerima makanan lewat loket yang sama.
Dapur (database, logika bisnis) tetap tertutup.

```text
Aplikasi mobile ──HTTP request──▶  Laravel API  ──▶ database
               ◀──JSON response──
```

### Kenapa ini penting buat kerja?

Hampir semua lowongan backend sekarang menyebut "REST API". Frontend developer,
mobile developer, dan tim integrasi akan memakai API buatanmu setiap hari. Kalau
kontraknya berubah-ubah atau bocor data, mereka yang pertama kena.

---

## 2. REST dalam Bahasa Sederhana

REST itu gaya mendesain API. Intinya ada 3 ide:

1. **Resource** — "benda" yang kamu kelola. Contoh: produk, kategori, pesanan.
   Resource diberi alamat (URL) memakai kata benda jamak: `/api/products`.
2. **Method HTTP** — "kata kerja"-nya. Jangan taruh kata kerja di URL.
3. **Stateless** — setiap request membawa semua info yang dibutuhkan (termasuk
   identitas). Server tidak "ingat" request sebelumnya.

| Method | URL | Arti |
|---|---|---|
| `GET` | `/api/products` | Ambil daftar produk |
| `GET` | `/api/products/5` | Ambil satu produk |
| `POST` | `/api/products` | Buat produk baru |
| `PUT` / `PATCH` | `/api/products/5` | Ubah produk (semua / sebagian field) |
| `DELETE` | `/api/products/5` | Hapus produk |

Contoh URL yang **kurang REST**: `/api/getAllProducts`, `/api/deleteProduct?id=5`.

### Idempotent dan aman

- **Aman (safe)**: tidak mengubah data. `GET` harus aman.
- **Idempotent**: dipanggil 1 kali atau 10 kali, hasil akhirnya sama. `GET`,
  `PUT`, dan `DELETE` idempotent. `POST` tidak — dikirim 2 kali bisa membuat 2
  produk.

**Analogi:** menekan tombol lift lantai 5 berkali-kali tetap membawamu ke lantai
5 (idempotent). Memasukkan koin ke mesin minuman dua kali = bayar dua kali
(tidak idempotent).

Kenapa peduli? Jaringan HP sering putus. Client sering mengulang request. Kalau
endpoint idempotent, mengulang itu aman.

---

## 3. Status Code: Bahasa Tubuh API

Status code memberi tahu client hasilnya **tanpa harus membaca body**.

| Kode | Arti | Kapan dipakai |
|---|---|---|
| `200` | OK | GET/PUT sukses |
| `201` | Created | POST berhasil membuat data |
| `204` | No Content | DELETE sukses, tanpa body |
| `401` | Unauthenticated | Belum login / token salah |
| `403` | Forbidden | Sudah login, tapi tidak berhak |
| `404` | Not Found | Data tidak ada |
| `422` | Unprocessable | Input gagal validasi |
| `429` | Too Many Requests | Kena rate limit |
| `500` | Server Error | Bug di server |

**Analogi:** status code itu seperti lampu lalu lintas. Pengemudi tidak perlu
membaca papan panjang; cukup lihat warnanya.

Kesalahan klasik: mengembalikan `200` dengan body `{"error": true}`. Client jadi
harus membaca body untuk tahu gagal. Jangan begitu.

---

## 4. `routes/api.php` dan `install:api`

Di project Laravel baru, file `routes/api.php` **belum ada**. Kamu aktifkan
dengan:

```bash
php artisan install:api
```

Perintah ini:

- Memasang **Laravel Sanctum** (paket autentikasi API).
- Membuat `routes/api.php`.
- Semua route di file itu otomatis diberi awalan `/api` dan masuk middleware
  group `api` (tanpa session, tanpa CSRF).

```php
// routes/api.php — contoh dengan resource "kategori"
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;

Route::apiResource('categories', CategoryController::class);
// URL jadinya /api/categories, /api/categories/{category}, dst.
```

`apiResource` membuat 5 route (index, store, show, update, destroy) tanpa
`create` dan `edit`, karena API tidak butuh halaman form.

Cek hasilnya:

```bash
php artisan route:list --path=api
```

---

## 5. Stateless vs Session

| | Web (`routes/web.php`) | API (`routes/api.php`) |
|---|---|---|
| Identitas | Cookie session | Token (atau cookie Sanctum untuk SPA) |
| CSRF | Ya | Tidak (untuk token) |
| Output | HTML / redirect | JSON |
| Error validasi | Redirect + `$errors` | JSON `422` |

**Analogi:** session itu seperti **gelang tiket konser**: sekali dipasang,
petugas tinggal lihat gelangmu. Token itu seperti **kartu akses** yang kamu
tempelkan setiap kali lewat pintu.

---

## 6. Request dan Response JSON

Client yang baik mengirim header:

```http
Accept: application/json
Content-Type: application/json
```

Header `Accept: application/json` penting. Tanpa itu, saat validasi gagal
Laravel bisa mengira kamu browser lalu **redirect** (302), bukan mengirim `422`.

Mengembalikan JSON:

```php
return response()->json(['message' => 'Halo'], 200);
```

Mengembalikan array atau model dari controller juga otomatis jadi JSON. Tapi
**hati-hati**: mengembalikan model langsung berarti **semua kolom** ikut keluar.
Ini akan kita bahas di bagian API Resource.

---

## 7. Controller API

Buat controller khusus API:

```bash
php artisan make:controller Api/CategoryController --api --model=Category
```

Contoh kerangka (resource kategori, bukan produk):

```php
public function store(StoreCategoryRequest $request): JsonResponse
{
    $category = Category::create($request->validated());

    return (new CategoryResource($category))
        ->response()
        ->setStatusCode(201);
}

public function destroy(Category $category): Response
{
    Gate::authorize('delete', $category);
    $category->delete();

    return response()->noContent(); // 204
}
```

Catatan Laravel 11+: base `Controller` sudah kosong, jadi `$this->authorize()`
**tidak tersedia** kecuali kamu menambahkan trait sendiri. Pakai
`Gate::authorize()` atau `$request->user()->can(...)`.

Laravel 13 juga mendukung attribute seperti `#[Authorize('update', 'post')]` di
method controller. Boleh dipakai, tapi pahami dulu versi "manual" di atas.

---

## 8. API Resource: Kontrak JSON yang Kamu Kendalikan

**API Resource** = class yang mengubah model menjadi array JSON dengan bentuk
yang **kamu pilih sendiri**.

**Analogi:** API Resource itu seperti **etalase toko**. Gudang (tabel database)
berisi semua barang, termasuk nota pembelian dan harga modal. Etalase hanya
memajang barang yang memang boleh dilihat pembeli.

```bash
php artisan make:resource CategoryResource
```

```php
final class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            // kolom lain sengaja tidak ditampilkan
        ];
    }
}
```

Kenapa tidak `return $category;` saja?

1. **Keamanan** — kolom baru di tabel (misal `catatan_internal`) tidak otomatis
   bocor.
2. **Stabil** — kalau kolom database diganti nama, kontrak JSON tetap sama.
3. **Format** — kamu bisa menambah field turunan, misal label harga.

### Collection dan pagination

```php
return CategoryResource::collection(Category::query()->paginate(15));
```

Kalau yang dikirim hasil `paginate()`, Laravel otomatis menambah `links` dan
`meta`:

```json
{
  "data": [{ "id": 1, "name": "Aksesoris" }],
  "links": { "first": "...", "next": "..." },
  "meta": { "current_page": 1, "per_page": 15, "total": 40 }
}
```

### `when()` dan `whenLoaded()`

```php
return [
    'id' => $this->id,
    'name' => $this->name,
    // hanya muncul kalau relasi sudah di-eager-load (mencegah N+1)
    'products' => ProductResource::collection($this->whenLoaded('products')),
    // hanya muncul kalau kondisinya true
    'dibuat_oleh' => $this->when($request->user()?->isAdmin(), $this->user_id),
];
```

Kalau kondisi `false`, key-nya **hilang sama sekali** dari JSON, bukan `null`.

Laravel 13 juga punya **JSON:API resources** bawaan untuk API yang mau patuh
spesifikasi JSON:API. Untuk belajar, `JsonResource` biasa sudah cukup.

---

## 9. Format Error yang Konsisten

Client paling senang kalau semua error punya bentuk yang sama.

### Error validasi (422)

Laravel otomatis mengirim:

```json
{
  "message": "The name field is required.",
  "errors": {
    "name": ["The name field is required."]
  }
}
```

### Error lain

Exception diatur di `bootstrap/app.php`. Contoh: paksa route `api/*` selalu
dijawab JSON, dan ganti pesan 404 supaya tidak menyebut nama class model.

```php
->withExceptions(function (Exceptions $exceptions): void {
    $exceptions->shouldRenderJsonWhen(
        fn (Request $request, Throwable $e) => $request->is('api/*') || $request->expectsJson()
    );

    $exceptions->render(function (NotFoundHttpException $e, Request $request) {
        if ($request->is('api/*')) {
            return response()->json(['message' => 'Data tidak ditemukan.'], 404);
        }
    });
})
```

Kenapa ganti pesan 404? Pesan bawaan route model binding bisa berbunyi
`No query results for model [App\Models\Product] 99`. Itu membocorkan struktur
internal kecil-kecilan.

---

## 10. Autentikasi API dengan Sanctum

Sanctum punya dua mode:

| Mode | Cocok untuk | Cara kerja |
|---|---|---|
| **SPA (cookie)** | Frontend di domain yang sama/serumpun | Pakai session cookie + CSRF |
| **API token** | Aplikasi mobile, script, integrasi | Header `Authorization: Bearer <token>` |

Untuk token, model `User` harus memakai trait `HasApiTokens`:

```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
```

Membuat token dengan **abilities** (hak terbatas):

```php
$token = $user->createToken('laptop-gudang', ['stok:baca'])->plainTextToken;
```

Mengecek ability di request:

```php
if (! $request->user()->tokenCan('stok:baca')) {
    abort(403);
}
```

Hal penting:

- `plainTextToken` hanya bisa dilihat **sekali**. Database menyimpan hash-nya.
- Token = password. Jangan di-log, jangan ditaruh di URL.
- Abilities itu **tambahan**, bukan pengganti policy. User tetap harus berhak
  atas data yang diakses.

**Analogi abilities:** kunci kamar hotel yang hanya membuka kamar 305 dan pintu
gym, tapi tidak membuka ruang staf.

---

## 11. Rate Limiting

Rate limit = membatasi berapa kali seseorang boleh memanggil endpoint dalam
waktu tertentu.

**Analogi:** satpam bank yang bilang "satu orang maksimal 3 kali ambil nomor
antrean per jam".

Di app Laravel baru, limiter bernama `api` **belum didefinisikan**. Kamu yang
mendefinisikan di `AppServiceProvider::boot()`:

```php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});
```

Lalu tempel ke route:

```php
Route::middleware('throttle:api')->group(function () {
    // ...
});
```

Kalau batas terlewati, Laravel mengirim `429 Too Many Requests` dengan header
`Retry-After` (berapa detik harus menunggu). Response normal membawa header
`X-RateLimit-Limit` dan `X-RateLimit-Remaining`.

Endpoint yang **wajib** dibatasi lebih ketat: login, minta token, reset
password, kirim OTP. Tanpa itu, penyerang bisa menebak password jutaan kali.

---

## 12. CORS Singkat

Browser melarang JavaScript dari `https://toko-a.com` memanggil API di
`https://api-toko-b.com` kecuali server API mengizinkan. Aturan izinnya disebut
**CORS**.

```bash
php artisan config:publish cors
```

Lalu atur `config/cors.php` (misal `allowed_origins`). Jangan pakai `*` untuk API
yang memakai cookie. CORS **bukan** fitur keamanan untuk melindungi server dari
curl/Postman — curl tidak peduli CORS.

---

## 13. Versioning, Filter, dan Sorting

### Versioning

```php
Route::prefix('v1')->group(base_path('routes/api_v1.php'));
```

Kalau suatu hari kontrak harus berubah drastis, buat `/api/v2` dan biarkan `v1`
hidup dulu supaya aplikasi mobile lama tidak rusak.

### Filter dan sort dengan allowlist

```php
$allowedSorts = ['name', 'created_at'];
$sort = in_array($request->query('sort'), $allowedSorts, true)
    ? $request->query('sort')
    : 'created_at';
```

Jangan pernah memasukkan nama kolom mentah dari query string ke `orderBy()` atau
`orderByRaw()`. Nama kolom tidak bisa diamankan dengan binding. Allowlist adalah
satu-satunya cara aman.

---

## 14. Testing API

Laravel punya helper khusus JSON:

```php
test('kategori bisa dilihat publik', function () {
    Category::factory()->create(['name' => 'Aksesoris']);

    $this->getJson('/api/categories')
        ->assertOk()
        ->assertJsonPath('data.0.name', 'Aksesoris')
        ->assertJsonMissingPath('data.0.created_by');
});

test('guest tidak bisa membuat kategori', function () {
    $this->postJson('/api/categories', ['name' => 'X'])
        ->assertUnauthorized(); // 401
});
```

Menguji dari "luar" (status + bentuk JSON) jauh lebih berguna daripada menguji
detail controller.

---

## 15. OWASP API Security Top 10 (yang Paling Sering Kena)

| Risiko | Artinya | Penangkal di Laravel |
|---|---|---|
| **API1 — BOLA / IDOR** | User A bisa akses `/api/orders/12` milik user B | Policy + query yang di-scope ke pemilik |
| **API2 — Broken Authentication** | Token lemah, login bisa di-brute force | Sanctum, hash password, rate limit login |
| **API3 — Excessive Data Exposure** | Response membawa kolom rahasia | API Resource, `$hidden` |
| **API4 — Unrestricted Resource Consumption** | Tidak ada batas request / ukuran halaman | Rate limit, batasi `per_page` |
| **API5 — Broken Function Level Authorization** | User biasa bisa panggil endpoint admin | Policy/gate di setiap aksi |

Baca juga modul keamanan:

- [05 — Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md)
- [04 — Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md)

---

## 16. Kesalahan Umum

1. **`return Product::all();` langsung dari controller.** Semua kolom bocor,
   termasuk yang ditambah bulan depan.
2. **Lupa header `Accept: application/json`** saat tes pakai curl, lalu bingung
   kenapa dapat redirect 302.
3. **Status selalu 200.** Client tidak bisa membedakan sukses dan gagal.
4. **Memakai `$this->authorize()` di Laravel 11+** tanpa trait. Error "method
   does not exist".
5. **Pakai `throttle:api` tapi limiter `api` belum didefinisikan.** Laravel akan
   error karena limiter tidak ditemukan.
6. **Token disimpan di log atau dikirim lewat query string** (`?token=...`).
7. **Menganggap ability token sudah cukup** tanpa cek kepemilikan data.
8. **Pesan error membocorkan detail** (nama tabel, query SQL, stack trace).
9. **`per_page` bebas diisi client** sampai 1.000.000.
10. **Sorting pakai kolom mentah** dari query string.

---

## 17. Glosarium

| Istilah | Arti singkat |
|---|---|
| **API** | Pintu bagi program lain untuk minta data/aksi |
| **REST** | Gaya desain API berbasis resource + method HTTP |
| **Endpoint** | Kombinasi method + URL, misal `GET /api/products` |
| **Resource** | "Benda" yang dikelola API (produk, kategori) |
| **API Resource (Laravel)** | Class yang membentuk JSON dari model |
| **Idempotent** | Diulang berkali-kali hasilnya sama |
| **Stateless** | Server tidak menyimpan status antar request |
| **Bearer token** | Token di header `Authorization: Bearer ...` |
| **Sanctum** | Paket autentikasi API resmi Laravel |
| **Ability** | Hak terbatas yang menempel di token |
| **Rate limit** | Batas jumlah request per waktu |
| **CORS** | Aturan browser untuk request lintas domain |
| **Payload** | Isi data yang dikirim di body request |
| **Contract (kontrak)** | Janji bentuk request/response yang dipegang client |
| **BOLA / IDOR** | Akses data milik orang lain hanya dengan ganti ID |

---

## 18. Cek Pemahaman (Jawab Tanpa Lihat Catatan)

1. Kenapa `POST` tidak idempotent, sedangkan `PUT` idempotent?
2. Apa beda `401` dan `403`? Beri contoh di toko online.
3. Kenapa API Resource lebih aman daripada mengembalikan model langsung?
4. Apa yang terjadi kalau `whenLoaded('category')` dipakai tapi relasi tidak
   di-load?
5. Kenapa endpoint login perlu limit yang lebih ketat dari endpoint katalog?
6. CORS melindungi siapa? Apakah CORS mencegah serangan dari curl?

---

## Referensi Resmi

- [Laravel — Routing (API routes, rate limiting)](https://laravel.com/docs/13.x/routing)
- [Laravel — Eloquent API Resources](https://laravel.com/docs/13.x/eloquent-resources)
- [Laravel — Sanctum](https://laravel.com/docs/13.x/sanctum)
- [Laravel — Error Handling](https://laravel.com/docs/13.x/errors)
- [Laravel — HTTP Tests](https://laravel.com/docs/13.x/http-tests)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)

Lanjut ke praktikum: [09-rest-api](../../materi-praktikum/09-rest-api/README.md).
