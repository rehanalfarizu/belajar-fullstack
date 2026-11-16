# MATERI TEORI 03 — Routing, Request, Controller, dan Middleware

> Target: **Laravel 13** (rilis Maret 2026) dengan **PHP 8.3+**. Semua yang
> dibahas di sini juga jalan di Laravel 12, kecuali yang ditandai khusus.

Praktikum topik ini: [materi-praktikum/03-routing-controller](../../materi-praktikum/03-routing-controller/README.md)

---

## 1. Gambaran Besar: Perjalanan Satu Request

Setiap kali browser atau aplikasi mobile menghubungi server Laravel, yang
terjadi selalu urutan ini:

```text
Browser: GET /katalog/produk/keyboard-mekanik
   │
   ▼
public/index.php         ← pintu masuk satu-satunya
   │
   ▼
Router                   ← cocokkan method + URL dengan daftar route
   │
   ▼
Middleware (lapis-lapis) ← satpam: login? CSRF? rate limit? jam buka?
   │
   ▼
Controller / closure     ← kerjakan permintaannya
   │
   ▼
Response                 ← HTML, JSON, redirect, atau file
```

**Analogi:** restoran. Pelanggan (request) masuk lewat satu pintu depan
(`public/index.php`). Pelayan di depan (router) membaca pesanan dan
mengantar ke dapur yang tepat (controller). Di tengah jalan ada pengecekan
(middleware): "Sudah reservasi? Restoran masih buka?" Dapur memasak, lalu
makanan (response) diantar balik lewat jalur yang sama.

**Kenapa penting untuk kerja:** saat ada bug "halaman X error", developer
senior selalu mulai dari pertanyaan "request ini masuk route mana, lewat
middleware apa, ke controller mana?". Kalau kamu hafal alur ini, debugging
jadi jauh lebih cepat.

---

## 2. HTTP Method dan URL

Route selalu terdiri dari **method** + **URL**. URL yang sama dengan method
berbeda adalah route yang berbeda.

| Method | Maksud | Contoh di toko | Aman diulang? |
|---|---|---|---|
| `GET` | Ambil data | Lihat daftar produk | Ya, tidak mengubah apa pun |
| `POST` | Buat data baru | Tambah produk | Tidak, bisa dobel |
| `PUT` | Ganti data utuh | Ubah semua field produk | Ya (hasil sama) |
| `PATCH` | Ubah sebagian | Ubah stok saja | Tergantung |
| `DELETE` | Hapus | Hapus produk | Ya (sudah terhapus) |

**Aturan emas:** `GET` tidak boleh mengubah data. Kalau `GET /hapus/5`
menghapus produk, crawler Google atau prefetch browser bisa menghapus
produkmu tanpa sengaja.

---

## 3. File Route: `web.php` vs `api.php`

```text
routes/
├── web.php      ← halaman untuk browser (session, cookie, CSRF)
├── api.php      ← API stateless, prefix /api (perlu install:api)
└── console.php  ← perintah Artisan & jadwal
```

| | `routes/web.php` | `routes/api.php` |
|---|---|---|
| Ada sejak awal? | Ya | Tidak, buat dengan `php artisan install:api` |
| Prefix URL otomatis | Tidak ada | `/api` |
| Session & cookie | Ya | Tidak |
| Proteksi CSRF | Ya | Tidak (pakai token/Sanctum) |
| Cocok untuk | Blade, form HTML | Mobile app, SPA, integrasi |

`php artisan install:api` sekaligus memasang **Laravel Sanctum** untuk
autentikasi API (dibahas di topik 09).

**Analogi:** `web.php` itu loket bank dengan antrean dan nomor (session).
`api.php` itu mesin ATM: setiap transaksi membawa kartu sendiri (token),
mesin tidak mengingat kamu dari transaksi sebelumnya.

---

## 4. Closure Route vs Controller

### Closure (fungsi langsung di route)

```php
use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return 'pong';
});
```

Cocok untuk: route sangat kecil, prototipe, health check.

### Controller

```php
// routes/web.php
use App\Http\Controllers\PromoController;

Route::get('/promo', [PromoController::class, 'index']);
```

```php
// app/Http/Controllers/PromoController.php
namespace App\Http\Controllers;

class PromoController extends Controller
{
    public function index()
    {
        return view('promo.index');
    }
}
```

Buat dengan: `php artisan make:controller PromoController`

**Kapan pindah ke controller?** Begitu logikanya lebih dari beberapa baris,
butuh dependency, atau perlu dites terpisah. Di dunia kerja, hampir semua
route memakai controller.

**Analogi:** closure itu menulis catatan di sticky note. Controller itu
menulis di buku catatan yang punya bab. Sticky note cepat, tapi kalau
jumlahnya ratusan, kamu akan tenggelam.

---

## 5. Route Parameter dan Constraint

### Parameter

```php
Route::get('/kupon/{kode}', function (string $kode) {
    return "Kode kupon: $kode";
});

// Parameter opsional: tambahkan ? dan default value
Route::get('/arsip/{tahun?}', function (?int $tahun = null) {
    return $tahun ?? 'semua tahun';
});
```

### Constraint

Constraint memeriksa bentuk parameter **sebelum** closure atau controller
jalan. Tidak cocok = route dianggap tidak ada = `404`.

```php
Route::get('/member/{id}', fn (int $id) => $id)
    ->whereNumber('id');                     // hanya angka

Route::get('/negara/{kode}', fn (string $kode) => $kode)
    ->whereAlpha('kode');                    // hanya huruf

Route::get('/kode-pos/{kode}', fn (string $kode) => $kode)
    ->where('kode', '[0-9]{5}');             // regex bebas
```

**Analogi:** constraint itu **mesin tiket parkir** yang hanya menerima uang
pas. Uang robek ditolak di mesin, petugas di dalam (controller) tidak perlu
repot memeriksa.

**Kenapa penting:** input aneh berhenti di gerbang. Kode controller lebih
pendek, dan permukaan serangan lebih kecil.

---

## 6. Named Route dan Helper `route()`

```php
Route::get('/tentang-kami', fn () => view('tentang'))->name('tentang');

// Di controller atau Blade:
$url = route('tentang');                     // http://localhost/tentang-kami
return redirect()->route('tentang');
```

Dengan parameter:

```php
Route::get('/artikel/{slug}', fn (string $slug) => $slug)->name('artikel.show');

route('artikel.show', ['slug' => 'tips-belanja']);
```

**Analogi:** nama kontak di HP. Kamu menelepon "Bapak Kos", bukan
menghafal nomornya. Kalau nomornya ganti, cukup ubah kontak sekali.

**Kenapa penting:** di project nyata, URL sering berubah karena SEO atau
restrukturisasi. Kalau semua link memakai `route()`, kamu cukup ubah satu
baris di file route.

---

## 7. Route Group: Prefix, Nama, Middleware

Group mengatur hal yang sama untuk banyak route sekaligus.

```php
Route::prefix('admin')
    ->name('admin.')
    ->middleware('auth')
    ->group(function () {
        Route::get('/laporan', fn () => 'laporan')->name('laporan');
        // URL: /admin/laporan
        // Nama: admin.laporan
        // Middleware: auth
    });
```

**Analogi:** satu map plastik berlabel. Semua lembar di dalam map otomatis
"berlabel" sama.

Lihat hasilnya:

```bash
php artisan route:list                 # semua route
php artisan route:list --name=admin    # filter nama
php artisan route:list --path=admin    # filter URL
php artisan route:list -v              # tampilkan middleware juga
```

---

## 8. Route Model Binding

Daripada mengambil ID lalu mencari sendiri di database, Laravel bisa
langsung memberi object model.

```php
use App\Models\Category;

// Tanpa binding: kamu cari sendiri
Route::get('/kategori/{id}', function (int $id) {
    $category = Category::findOrFail($id);
    return $category->name;
});

// Dengan implicit binding: nama parameter = nama variabel bertipe model
Route::get('/kategori/{category}', function (Category $category) {
    return $category->name;   // otomatis 404 kalau tidak ada
});

// Binding lewat kolom lain, misal slug
Route::get('/kategori/{category:slug}', function (Category $category) {
    return $category->name;
});
```

**Syarat:** nama di `{...}` harus sama dengan nama variabel `$category`.
Kalau beda, binding tidak terjadi dan kamu dapat string biasa.

**Catatan keamanan:** binding hanya menjawab "data ini **ada**". Binding
**tidak** menjawab "user ini **boleh** melihat data ini". Itu tugas policy
(topik 08). Banyak celah IDOR terjadi karena developer mengira binding
sudah cukup.

---

## 9. Resource Controller

Untuk CRUD standar, Laravel punya pola 7 method.

```bash
php artisan make:controller SupplierController --resource
```

```php
Route::resource('suppliers', SupplierController::class);
```

| Method | URL | Action | Nama route |
|---|---|---|---|
| GET | `/suppliers` | `index` | `suppliers.index` |
| GET | `/suppliers/create` | `create` | `suppliers.create` |
| POST | `/suppliers` | `store` | `suppliers.store` |
| GET | `/suppliers/{supplier}` | `show` | `suppliers.show` |
| GET | `/suppliers/{supplier}/edit` | `edit` | `suppliers.edit` |
| PUT/PATCH | `/suppliers/{supplier}` | `update` | `suppliers.update` |
| DELETE | `/suppliers/{supplier}` | `destroy` | `suppliers.destroy` |

Batasi kalau tidak semua dipakai:

```php
Route::resource('suppliers', SupplierController::class)->only(['index', 'show']);
Route::apiResource('suppliers', SupplierController::class); // tanpa create & edit
```

**Kenapa penting:** tim lain langsung paham strukturmu karena polanya
standar. Jangan bikin route `GET /hapusSupplier/{id}`.

---

## 10. Request: Membaca Input

```php
use Illuminate\Http\Request;

public function cari(Request $request)
{
    $kata = $request->input('q');              // dari query string atau body
    $hal = $request->query('page', 1);         // hanya query string, default 1
    $adaFilter = $request->filled('kategori'); // ada dan tidak kosong?
    $metode = $request->method();              // "GET", "POST", ...
    $ip = $request->ip();

    // Input yang sudah lolos validasi (topik 07)
    // $data = $request->validated();  // pada Form Request
}
```

**Aturan penting:** `$request->all()` berisi **semua** yang dikirim user,
termasuk field yang tidak kamu minta. Jangan pernah langsung menyimpannya
ke database. Pakai data hasil validasi (topik 06–07, mass assignment).

---

## 11. Response: Mengirim Jawaban

```php
// HTML dari Blade
return view('promo.index', ['promo' => $promo]);

// JSON dengan status code
return response()->json(['message' => 'Dibuat'], 201);

// Redirect
return redirect()->route('tentang');
return back()->with('success', 'Tersimpan!');  // kembali + flash message

// Hentikan dengan error
abort(404);
abort_if($stok < 0, 422, 'Stok tidak valid.');
abort_unless($buka, 503, 'Sedang tutup.');

// Tambah header
return response('ok')->header('X-Versi', '1');
```

Status code yang paling sering dipakai:

| Status | Arti | Contoh |
|---|---|---|
| `200` | OK | Ambil data berhasil |
| `201` | Created | Produk baru dibuat |
| `204` | No Content | Hapus berhasil, tidak ada body |
| `301` | Moved Permanently | URL lama pindah permanen |
| `302` | Found | Redirect sementara (setelah login) |
| `403` | Forbidden | Login tapi tidak berhak |
| `404` | Not Found | Data/route tidak ada |
| `419` | Page Expired | Token CSRF hilang/kedaluwarsa (khas Laravel) |
| `422` | Unprocessable | Validasi gagal |
| `429` | Too Many Requests | Kena rate limit |
| `503` | Service Unavailable | Maintenance / layanan tidak tersedia |

**Kenapa penting:** frontend dan monitoring membaca status code, bukan isi
pesan. Mengirim `200` dengan `{"error": true}` membuat semua tools salah
membaca keadaan.

---

## 12. Middleware: Lapisan Bawang

Middleware adalah kode yang berdiri **di antara** router dan controller.
Satu request bisa melewati banyak middleware.

```text
request ──► [A sebelum] ──► [B sebelum] ──► controller
response ◄── [A sesudah] ◄── [B sesudah] ◄──
```

Bentuk dasarnya:

```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TolakBot
{
    public function handle(Request $request, Closure $next): Response
    {
        // SEBELUM: boleh memeriksa dan menghentikan
        if (str_contains((string) $request->userAgent(), 'BadBot')) {
            abort(403);
        }

        $response = $next($request);   // lanjut ke lapis berikutnya

        // SESUDAH: boleh mengubah response
        $response->headers->set('X-Diperiksa', 'ya');

        return $response;
    }
}
```

Buat dengan `php artisan make:middleware TolakBot`.

### Mendaftarkan Middleware (Laravel 11+)

Sejak Laravel 11 tidak ada lagi `app/Http/Kernel.php`. Semua diatur di
`bootstrap/app.php`:

```php
use Illuminate\Foundation\Configuration\Middleware;

->withMiddleware(function (Middleware $middleware): void {
    // alias, supaya bisa dipanggil ->middleware('tolak.bot')
    $middleware->alias([
        'tolak.bot' => \App\Http\Middleware\TolakBot::class,
    ]);

    // atau tambahkan ke SEMUA route web
    // $middleware->web(append: [\App\Http\Middleware\TolakBot::class]);
})
```

Pasang ke route:

```php
Route::get('/laporan', fn () => '...')->middleware('tolak.bot');
```

### Middleware bawaan yang wajib kamu kenal

| Alias / class | Fungsi |
|---|---|
| `auth` | Harus login |
| `guest` | Harus belum login (halaman login/register) |
| `throttle:nama` | Rate limit (topik 09) |
| `can:aksi,model` | Cek policy sebelum controller (topik 08) |
| `PreventRequestForgery` | Proteksi CSRF di grup web. Laravel 13 menambah cek asal request (`Sec-Fetch-Site`) lalu fallback ke token. Di Laravel 12 namanya `ValidateCsrfToken` |

**Analogi:** middleware itu **pos pemeriksaan di jalan tol**. Setiap
kendaraan lewat pos yang sama, tidak peduli tujuannya. Kamu tidak perlu
menaruh petugas di setiap rumah tujuan.

**Kenapa penting:** aturan lintas-route (login, jam operasional, bahasa,
logging) yang ditulis di setiap controller pasti ada yang terlewat. Celah
keamanan sering muncul dari "satu route yang lupa dicek".

---

## 13. Fallback Route dan Redirect

```php
// Redirect tanpa closure
Route::redirect('/lama', '/baru');            // 302
Route::permanentRedirect('/lama', '/baru');   // 301

// Penangkap semua URL yang tidak cocok — taruh paling akhir!
Route::fallback(function () {
    return response()->view('errors.tidak-ketemu', [], 404);
});
```

Router mencocokkan dari **atas ke bawah**. Route umum (`/produk/{slug}`)
yang ditaruh di atas route khusus (`/produk/terlaris`) akan "menelan" route
khusus itu. Taruh yang spesifik di atas.

---

## 14. Route Caching

Di production, Laravel bisa menyimpan daftar route yang sudah diproses
supaya tidak dibaca ulang setiap request:

```bash
php artisan route:cache    # buat cache
php artisan route:clear    # hapus cache
```

- Jalankan `route:cache` saat **deploy**, bukan saat development.
- Setelah cache aktif, perubahan di `routes/web.php` **tidak terbaca**
  sampai kamu `route:clear` atau cache ulang. Ini sumber kebingungan klasik
  "route baru kok 404 terus?".

---

## 15. Kesalahan Umum

| Kesalahan | Akibat | Perbaikan |
|---|---|---|
| `GET` yang mengubah data | Data berubah karena crawler/prefetch | Pakai `POST/PUT/PATCH/DELETE` |
| URL diketik manual di banyak tempat | Link rusak saat URL berubah | `route('nama')` |
| Fallback di tengah file | Route di bawahnya tidak pernah tercapai | Taruh paling akhir |
| Nama parameter beda dengan nama variabel model | Binding tidak terjadi, dapat string | Samakan `{product}` dan `$product` |
| Mengira binding = otorisasi | IDOR: user lihat data orang lain | Policy (topik 08) |
| `$request->all()` langsung ke `create()` | Mass assignment | `validated()` + `$fillable` |
| Selalu balas `200` | Frontend & monitoring salah baca | Status code yang tepat |
| Lupa `route:clear` setelah `route:cache` | Route baru tidak dikenali | `php artisan route:clear` |
| Controller gendut (ratusan baris) | Susah dites dan dibaca | Pindahkan logika ke service/class lain |
| Mematikan CSRF karena "kena 419" | Form bisa dipalsukan situs lain | Tambah `@csrf`, jangan matikan proteksi |

---

## 16. Latihan Berpikir (Tanpa Kode)

1. Kamu punya route `GET /produk/{slug}` dan `GET /produk/terlaris`. Mana yang harus ditulis duluan? Kenapa?
2. Aturan "hanya admin" berlaku untuk 15 route. Kamu taruh di mana? Kalau hanya 1 route?
3. Endpoint hapus produk mengembalikan `200 {"success": false}` saat produk tidak ada. Apa masalahnya untuk aplikasi mobile yang memanggilnya?
4. Kenapa `public/` adalah satu-satunya folder yang boleh diakses web server?

---

## Glosarium

| Istilah | Arti |
|---|---|
| Route | Pasangan method + URL yang diarahkan ke handler |
| Handler | Closure atau method controller yang mengurus request |
| Controller | Class pengelompok handler |
| Route parameter | Bagian dinamis URL, `{slug}` |
| Constraint | Aturan bentuk parameter (angka, regex) |
| Named route | Route dengan nama untuk dipanggil via `route()` |
| Route group | Kumpulan route berbagi prefix/nama/middleware |
| Route model binding | Konversi otomatis parameter URL jadi model |
| Resource controller | Pola 7 method CRUD standar |
| Middleware | Lapisan pemeriksa sebelum/sesudah controller |
| Alias middleware | Nama pendek untuk class middleware |
| Fallback route | Route penangkap URL tak dikenal |
| Status code | Angka 3 digit yang menjelaskan hasil request |
| CSRF | Pemalsuan request dari situs lain atas nama user yang login |
| Stateless | Server tidak mengingat request sebelumnya (khas API) |

---

## Referensi Resmi

- [Laravel 13: Routing](https://laravel.com/docs/13.x/routing)
- [Laravel 13: Controllers](https://laravel.com/docs/13.x/controllers)
- [Laravel 13: Requests](https://laravel.com/docs/13.x/requests)
- [Laravel 13: Responses](https://laravel.com/docs/13.x/responses)
- [Laravel 13: Middleware](https://laravel.com/docs/13.x/middleware)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

Lanjut ke praktikum: [03 — Routing dan Controller](../../materi-praktikum/03-routing-controller/README.md)
