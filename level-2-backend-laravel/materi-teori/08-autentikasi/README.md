# MATERI TEORI 08 — Autentikasi & Otorisasi

> Target: Laravel 13 (rilis Maret 2026) dan PHP 8.3+. Semua contoh di sini juga
> jalan di Laravel 12.

Praktikum: [08 — Autentikasi & Otorisasi](../../materi-praktikum/08-autentikasi/README.md)

---

## 1. Dua Pertanyaan yang Berbeda

| | Autentikasi | Otorisasi |
|---|---|---|
| Pertanyaan | "Kamu siapa?" | "Kamu boleh melakukan ini?" |
| Bukti | Email + password, token | Aturan: role, kepemilikan, status |
| Kalau gagal | `401 Unauthorized` | `403 Forbidden` (atau `404`) |
| Di Laravel | `Auth`, guard, middleware `auth` | Gate, Policy, `can()` |

**Analogi:** konser musik. Di gerbang, petugas mengecek tiket dan KTP → autentikasi.
Di dalam, gelang warnamu menentukan kamu boleh ke area VIP atau tidak → otorisasi.
Punya tiket tidak berarti boleh naik ke panggung.

Nama status HTTP `401 Unauthorized` memang membingungkan — artinya sebenarnya
"belum terautentikasi". Hafalkan saja: **401 = belum login, 403 = sudah login tapi
tidak boleh.**

Kenapa penting buat kerja: kategori **Broken Access Control** ada di urutan #1 OWASP
Top 10. Bug jenis ini jarang kelihatan saat demo, tapi paling sering dipakai penyerang.

---

## 2. Session dan Cookie: Cara Server Mengingatmu

HTTP itu **pelupa**. Setiap request berdiri sendiri. Lalu bagaimana server tahu
request kedua berasal dari orang yang tadi sudah login?

**Analogi:** penitipan tas di mal. Kamu menitipkan tas, petugas memberimu **kartu
bernomor**. Tasnya tetap di loker petugas. Kamu cukup menunjukkan kartu itu untuk
mengambil tas. Kartu = cookie. Loker = session di server.

```text
1. POST /login (email, password)
       ↓ server cek password, cocok
2. Server simpan "user_id = 7" di session (file/database/redis)
3. Server kirim cookie: laravel_session=abc123 (hanya id, bukan datanya)
4. Request berikutnya: browser otomatis kirim cookie abc123
5. Server cari session abc123 → ketemu user_id = 7 → "oh, ini Budi"
```

Hal penting:

- Cookie hanya berisi **id session** yang terenkripsi, bukan password.
- Cookie session Laravel sudah `HttpOnly` (tidak bisa dibaca JavaScript) secara default.
- Di production, aktifkan `SESSION_SECURE_COOKIE=true` agar cookie hanya lewat HTTPS.

---

## 3. Guard dan Provider

**Guard** = cara mengenali user di setiap request.
**Provider** = dari mana data user diambil (biasanya tabel `users` lewat Eloquent).

| Guard | Cara kerja | Cocok untuk |
|---|---|---|
| `web` | Session + cookie | Aplikasi Blade biasa |
| `sanctum` | Cookie session (SPA first-party) **atau** bearer token | SPA, aplikasi mobile, integrasi API |

Konfigurasinya ada di `config/auth.php`. Untuk belajar, kamu jarang perlu mengubahnya.

```php
// Ambil user yang sedang login (null kalau guest)
$request->user();
Auth::user();
auth()->user();

// Cek sudah login?
Auth::check();
```

Middleware yang sering dipakai:

- `auth` — wajib login. Web: redirect ke route bernama `login`. API/JSON: `401`.
- `guest` — wajib **belum** login (misal halaman login itu sendiri).
- `auth:sanctum` — wajib login lewat guard sanctum.

---

## 4. Password: Hash, Bukan Enkripsi

**Analogi:** blender. Masukkan mangga, keluar jus. Dari jus kamu tidak bisa
mengembalikan mangga utuh. Tapi mangga yang sama, diblender dengan cara yang sama,
menghasilkan jus yang bisa dibandingkan.

| | Enkripsi | Hash |
|---|---|---|
| Bisa dibalik? | Ya, dengan kunci | Tidak |
| Kalau kunci bocor | Semua password terbuka | Tidak ada kunci untuk bocor |
| Untuk password? | ❌ | ✅ |

Kenapa tidak `md5()` atau `sha1()`? Karena **terlalu cepat**. GPU biasa bisa
mencoba miliaran tebakan per detik. Algoritma password (bcrypt, Argon2):

- **Sengaja lambat** (bisa diatur lewat "cost"/"rounds")
- Pakai **salt** acak, jadi password sama menghasilkan hash berbeda
- Tahan terhadap tabel tebakan siap pakai (rainbow table)

Laravel memakai bcrypt secara default:

```php
use Illuminate\Support\Facades\Hash;

$hash = Hash::make('kopi-susu-123');     // "$2y$12$...."
Hash::check('kopi-susu-123', $hash);     // true
Hash::needsRehash($hash);                // true kalau cost/algoritma berubah
```

### Cast `hashed`

Model `User` bawaan Laravel punya:

```php
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
```

Artinya: setiap kali kolom `password` diisi teks biasa, Laravel otomatis meng-hash-nya
sebelum disimpan. Nilai yang sudah berupa hash tidak di-hash ulang.

Aturan yang tidak boleh dilanggar:

- Jangan simpan password asli di mana pun: database, log, email, session.
- Jangan `dd($request->all())` di form login lalu lupa menghapusnya.
- Jangan kirim password lewat query string (`?password=...`) — tercatat di log server.

---

## 5. Alur Login Manual

Starter kit menyembunyikan ini. Kamu perlu paham isinya.

```text
validasi bentuk input
   → cek rate limit (sudah kebanyakan gagal?)
   → Auth::attempt(kredensial, ingat?)
        gagal → tambah hitungan gagal → pesan error UMUM
        berhasil → hapus hitungan → regenerate session → redirect
```

`Auth::attempt()` melakukan tiga hal: mencari user berdasarkan email, mencocokkan
password dengan `Hash::check`, lalu menyimpan user ke session kalau cocok.

```php
// Ilustrasi bentuk pemanggilan, bukan solusi lengkap
if (Auth::attempt(['email' => $email, 'password' => $password], $ingat)) {
    // berhasil
}
```

Parameter kedua `true` = **remember me**: Laravel menyimpan token di kolom
`remember_token` dan cookie tahan lama, jadi user tetap login setelah browser ditutup.

### Pesan error yang umum

| ❌ Membocorkan | ✅ Aman |
|---|---|
| "Email tidak terdaftar" | "Email atau password salah." |
| "Password salah" | "Email atau password salah." |

Pesan yang berbeda membantu penyerang mengecek email mana yang punya akun
(**user enumeration**). Hal yang sama berlaku di form "lupa password": jawab
"Kalau email terdaftar, link sudah dikirim."

### Session fixation

**Analogi:** kartu kamar hotel. Kalau kartu yang sama tetap dipakai setelah kamu
upgrade ke suite, orang yang sempat menyalin kartumu ikut masuk suite. Hotel yang baik
**mengganti kartu** saat statusmu naik.

Penyerang bisa "menanam" id session tertentu ke korban sebelum korban login. Kalau id
itu tidak diganti setelah login, penyerang ikut login. Solusinya:

```php
$request->session()->regenerate();   // setelah login berhasil
```

### Logout yang benar

Logout yang benar punya tiga langkah, bukan satu:

1. Lupakan user dari guard (`Auth::logout()`).
2. Buang **seluruh** data session lama dan buat id baru.
3. Buat token CSRF baru, supaya token lama tidak bisa dipakai lagi.

Cari nama method untuk langkah 2 dan 3 di bagian "Logging Out" dokumentasi
Authentication.

Logout harus lewat **POST** + CSRF. Logout via GET bisa dipicu dari `<img>` di
situs lain.

---

## 6. Membatasi Percobaan Login

**Analogi:** ATM menelan kartu setelah 3 kali PIN salah. Tanpa batas, pencuri tinggal
mencoba semua kombinasi.

Laravel punya `RateLimiter`:

| Method | Fungsi |
|---|---|
| `tooManyAttempts($kunci, $maks)` | Sudah melewati batas? |
| `hit($kunci, $detik)` | Tambah satu hitungan, berlaku `$detik` detik |
| `availableIn($kunci)` | Berapa detik lagi boleh coba |
| `clear($kunci)` | Reset hitungan |

Kunci biasanya gabungan **email + IP**:

- Hanya IP → satu kantor/kampus (IP sama) bisa saling mengunci.
- Hanya email → penyerang bisa sengaja mengunci akun orang lain dari banyak IP.
- Gabungan → kompromi yang wajar untuk aplikasi kecil-menengah.

Untuk route API, ada juga middleware `throttle` dengan limiter bernama yang
didefinisikan di `AppServiceProvider::boot()` (dibahas di topik 09).

---

## 7. Starter Kit vs Manual

Sejak Laravel 12, starter kit resmi berbasis **React, Vue, atau Livewire** (Breeze
bukan lagi pilihan default). Starter kit memberi login, register, reset password,
verifikasi email, dan halaman profil dalam satu perintah.

| | Manual | Starter kit |
|---|---|---|
| Waktu | Lama | Menit |
| Paham isinya | Ya | Belum tentu |
| Cocok untuk | Belajar, kebutuhan khusus | Proyek nyata |

Saran: tulis manual **sekali** untuk paham, lalu pakai starter kit di proyek nyata.
Saat ada bug, kamu tahu harus mencari di mana.

Fitur lain yang perlu kamu tahu ada (baca dokumentasinya saat butuh):

- **Verifikasi email** — model `User` mengimplementasikan `MustVerifyEmail`, route pakai middleware `verified`.
- **Reset password** — broker password, token sekali pakai, kedaluwarsa.
- **Sanctum token** — `$user->createToken('nama')->plainTextToken` untuk client non-browser.

---

## 8. Otorisasi: Gate

**Gate** = aturan berbentuk closure untuk aksi yang **tidak terikat satu model**.

**Analogi:** satpam di pintu ruang rapat direksi. Dia tidak peduli dokumen apa yang
kamu bawa, dia cuma cek "kamu direksi atau bukan".

Definisikan di `app/Providers/AppServiceProvider.php`:

```php
use Illuminate\Support\Facades\Gate;

public function boot(): void
{
    Gate::define('akses-panel-admin', fn (User $user) => $user->role === 'admin');
}
```

Pakai:

```php
Gate::allows('akses-panel-admin');     // true/false
Gate::authorize('akses-panel-admin');  // lempar 403 kalau tidak boleh
```

---

## 9. Otorisasi: Policy

**Policy** = class berisi aturan untuk **satu model**. Satu method per aksi.

**Analogi:** buku aturan perpustakaan untuk "buku". Siapa boleh pinjam, siapa boleh
memperpanjang, siapa boleh menghapus data buku.

```bash
php artisan make:policy ArticlePolicy --model=Article
```

Method standar: `viewAny`, `view`, `create`, `update`, `delete`, `restore`, `forceDelete`.

```php
final class ArticlePolicy
{
    public function update(User $user, Article $article): bool
    {
        return $user->id === $article->user_id;   // hanya penulisnya
    }

    public function create(User $user): bool       // tanpa model
    {
        return $user->role === 'penulis';
    }
}
```

**Auto-discovery:** model `App\Models\Article` otomatis dipasangkan dengan
`App\Policies\ArticlePolicy` kalau nama dan foldernya cocok. Tidak perlu didaftarkan.

### `before()`: filter sebelum semua aksi

```php
// Contoh di ArticlePolicy: pemimpin redaksi boleh semua aksi artikel
public function before(User $user, string $ability): ?bool
{
    if ($user->jabatan === 'pemred') {
        return true;
    }

    return null;
}
```

- `true` → izinkan langsung
- `false` → tolak langsung
- `null` → lanjut ke method aksi

Hati-hati: `false` di `before()` menolak **semua** aksi untuk user itu, termasuk
yang seharusnya boleh.

### Guest di policy

Secara default, guest otomatis ditolak sebelum masuk policy. Kalau ingin guest boleh
(misal melihat produk), pakai parameter nullable: `public function view(?User $user, ...)`.

### Memasang policy

| Cara | Contoh |
|---|---|
| Gate facade di controller | `Gate::authorize('update', $article);` |
| Lewat user | `if ($request->user()->cannot('update', $article)) abort(403);` |
| Di route | `->can('update', 'article')` |
| Aksi tanpa model | `Gate::authorize('create', Article::class);` |

Catatan Laravel 11+: base `Controller` kosong, jadi **tidak ada** `$this->authorize()`
kecuali kamu menambahkan trait `AuthorizesRequests` sendiri. Laravel 13 juga
menyediakan attribute `#[Authorize('update', 'article')]` di method controller —
bagus untuk diketahui, tapi materi ini memakai `Gate::authorize()` yang jalan di 12 dan 13.

### 403 atau 404?

```php
use Illuminate\Auth\Access\Response;

return $user->id === $order->user_id
    ? Response::allow()
    : Response::denyAsNotFound();   // seolah-olah tidak ada
```

- `403` jujur: "ada, tapi bukan untukmu". Penyerang jadi tahu id itu ada.
- `404` menyembunyikan keberadaan data. Cocok untuk data pribadi (pesanan, alamat).

Yang terpenting: **konsisten** di seluruh aplikasi.

---

## 10. `@can` di Blade Hanya Urusan Tampilan

```blade
@can('update', $article)
    <a href="{{ route('articles.edit', $article) }}">Edit</a>
@endcan
```

Ini **hanya menyembunyikan tombol**. Orang tetap bisa mengirim request `PATCH`
langsung pakai curl. Pengecekan **wajib** ada di server (controller/route/Form Request).

**Analogi:** mencopot papan nama ruang server tidak sama dengan mengunci pintunya.

---

## 11. IDOR: Celah Paling Sering

**IDOR (Insecure Direct Object Reference)** = server memakai id dari request tanpa
mengecek apakah data itu milik si peminta.

```php
// ❌ Rentan: siapa pun yang login bisa melihat pesanan siapa pun
public function show(int $id)
{
    return Order::findOrFail($id);
}
```

Penyerang tinggal mengganti `/orders/100` → `/orders/101` → `/orders/102`.

Cara menutupnya (pakai **semua** yang relevan):

1. **Policy** yang mengecek kepemilikan di setiap aksi.
2. **Query lewat relasi** untuk daftar: `$request->user()->orders()->get()` — otomatis
   hanya milik user itu.
3. **Isi kolom pemilik dari server**, jangan terima `user_id` dari input.
4. **Test** dengan dua user berbeda.

ID acak (UUID) membuat id lebih sulit ditebak, tapi **bukan pengganti** otorisasi.
UUID bisa bocor lewat URL yang dibagikan, log, atau email.

---

## 12. CSRF: Pengingat

Route di `routes/web.php` dilindungi CSRF. Setiap form `POST/PUT/PATCH/DELETE` wajib
punya `@csrf`. Di Laravel 13 middleware-nya bernama `PreventRequestForgery` (dulu
`VerifyCsrfToken`), dan sekarang juga memeriksa asal request (origin-aware). Token
hilang/kedaluwarsa → `419`.

Detailnya di topik 04 dan [Modul Keamanan 06 — XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md).

---

## 13. Menguji Akses

Test otorisasi paling berguna dalam bentuk **matriks**:

| Aktor | lihat | ubah | hapus |
|---|---|---|---|
| Guest | ? | 401 | 401 |
| Pemilik | 200 | 200 | 204 |
| Bukan pemilik | 404 | 404 | 404 |
| Admin | 200 | 200 | 204 |

```php
test('bukan pemilik tidak bisa melihat pesanan orang lain', function () {
    $pemilik = User::factory()->create();
    $lain = User::factory()->create();
    $order = Order::factory()->for($pemilik)->create();

    $this->actingAs($lain)
        ->getJson("/api/orders/{$order->id}")
        ->assertNotFound();
});
```

Helper yang sering dipakai: `actingAs($user)`, `assertAuthenticated()`,
`assertGuest()`, `assertUnauthorized()` (401), `assertForbidden()` (403),
`assertNotFound()` (404).

---

## 14. Kesalahan Umum

1. **Mengira login = boleh semua.** Itu akar IDOR.
2. **Menyimpan password polos atau dengan md5.**
3. **Pesan login berbeda untuk email salah dan password salah.**
4. **Lupa `session()->regenerate()` setelah login.**
5. **Logout lewat GET.**
6. **Tidak ada batas percobaan login.**
7. **Otorisasi hanya di Blade (`@can`)**, controller tidak mengecek.
8. **`before()` mengembalikan `false`** untuk non-admin, lalu bingung kenapa pemilik ditolak.
9. **Menerima `user_id` dari input** saat membuat data.
10. **Memakai `$this->authorize()`** di Laravel 11+ tanpa trait, lalu kena error method tidak ada.
11. **Cek otorisasi di web, lupa di API/export/job.**

---

## 15. Glosarium

| Istilah | Arti |
|---|---|
| Autentikasi | Membuktikan identitas |
| Otorisasi | Mengecek izin melakukan aksi |
| Session | Data user di server, dikenali lewat cookie |
| Cookie | Data kecil yang disimpan browser dan dikirim di setiap request |
| Guard | Mekanisme Laravel mengenali user (`web`, `sanctum`) |
| Provider | Sumber data user (tabel `users`) |
| Hash | Ubahan satu arah, tidak bisa dibalik |
| Salt | Data acak yang dicampur sebelum hash |
| Bcrypt / Argon2 | Algoritma hash khusus password, sengaja lambat |
| Remember me | Tetap login setelah browser ditutup |
| Session fixation | Penyerang memaksa korban memakai id session yang ia ketahui |
| User enumeration | Mengetahui akun mana yang ada lewat perbedaan respons |
| Rate limiting | Membatasi jumlah request/percobaan |
| Gate | Aturan izin berbentuk closure |
| Policy | Class aturan izin untuk satu model |
| IDOR | Akses objek orang lain dengan mengganti id |
| 401 / 403 / 404 | Belum login / tidak boleh / tidak ditemukan (atau disembunyikan) |

---

## Bacaan Lanjut

- [Laravel 13: Authentication](https://laravel.com/docs/13.x/authentication)
- [Laravel 13: Authorization](https://laravel.com/docs/13.x/authorization)
- [Laravel 13: Hashing](https://laravel.com/docs/13.x/hashing)
- [Laravel 13: Rate Limiting](https://laravel.com/docs/13.x/rate-limiting)
- [Laravel 13: Starter Kits](https://laravel.com/docs/13.x/starter-kits)
- [Laravel 13: Sanctum](https://laravel.com/docs/13.x/sanctum)
- [OWASP: Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP: Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Modul Keamanan 04 — Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md)
- [Modul Keamanan 05 — Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md)

Lanjut praktik: [Praktikum 08](../../materi-praktikum/08-autentikasi/README.md)
