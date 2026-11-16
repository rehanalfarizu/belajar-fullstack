# SOAL 03 — IDOR: Ganti Angka di URL, Edit Produk Orang Lain

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Menemukan dan membuktikan celah **IDOR** (Insecure Direct Object Reference) sendiri
- Menulis policy berbasis **kepemilikan** (pemilik boleh, orang lain tidak)
- Memberi admin akses penuh lewat `before()` tanpa mengulang kode
- Membatasi daftar data ke milik user sendiri lewat relasi
- Memilih dengan sadar antara `403` dan `404` untuk akses yang ditolak
- Menulis matriks test akses: guest, pemilik, bukan pemilik, admin

**Topik:** Policy, `Gate::authorize()`, `->can()` di route, `before()`, `Response::denyAsNotFound()`, `Gate::define()`, relasi `hasMany`

**Referensi utama:**

- [Laravel 13: Authorization — Policies](https://laravel.com/docs/13.x/authorization#creating-policies)
- [Laravel 13: Policy Filters (before)](https://laravel.com/docs/13.x/authorization#policy-filters)
- [Laravel 13: Policy Responses](https://laravel.com/docs/13.x/authorization#policy-responses)
- [Laravel 13: Authorizing via Middleware](https://laravel.com/docs/13.x/authorization#via-middleware)
- [Modul Keamanan 05 — Otorisasi dan Akses](../../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md)

**Difficulty:** Lanjut • **Estimasi:** 120–150 menit

---

## Briefing

Toko berkembang jadi **marketplace kecil**: banyak penjual, masing-masing mengelola
produknya sendiri. Kolom `products.user_id` menyimpan siapa pemiliknya.

Seorang penjual iseng mengedit URL dari `/api/penjual/products/12` jadi
`/api/penjual/products/13`. Ternyata dia bisa mengubah harga produk milik penjual lain
menjadi Rp1. Server tidak pernah bertanya "ini produk kamu bukan?".

Inilah IDOR. Tugasmu: buktikan, perbaiki, dan kunci dengan test.

Catatan: di soal 01 aturan update/delete adalah "hanya admin". Di soal ini aturannya
**diperluas**: admin boleh semua, penjual boleh mengelola **miliknya sendiri**.

---

## Deskripsi

Pakai starter `code/03-product-ownership-policy.php` (SENGAJA RENTAN). Kerjakan:
A reproduksi bug, B perbaiki dengan policy, C batasi daftar produk, D test matriks.

---

## Syarat (Acceptance Criteria)

### A. Reproduksi bug (sebelum diperbaiki)

- [ ] Ada dua user penjual (A dan B) dan satu admin
- [ ] Ada produk milik A
- [ ] Catatan di `catatan-08.md`: B berhasil `PATCH` harga produk A (status `200`) — ini bukti bug

### B. Perbaikan dengan policy

- [ ] Controller memakai route model binding (`Product $product`), bukan `int $id` + `findOrFail`
- [ ] Ada pengecekan policy `update` dan `delete` (lewat `Gate::authorize()` **atau** `->can()` di route — pilih satu, jangan dobel)
- [ ] `ProductPolicy::update` dan `delete` mengizinkan hanya pemilik (`user_id` sama)
- [ ] `ProductPolicy::before` mengizinkan admin untuk semua aksi dan mengembalikan `null` untuk selain admin
- [ ] Tidak ada `if ($user->id !== ...)` manual di controller
- [ ] Ada Gate `lihat-laporan-penjualan` (hanya admin) di `AppServiceProvider::boot()`

### C. Daftar produk sendiri

- [ ] `GET /api/penjual/products` hanya mengembalikan produk milik user login
- [ ] Query lewat relasi `$request->user()->products()`, bukan `where('user_id', $request->input(...))`
- [ ] `user_id` produk baru diisi dari server, **tidak** diterima dari input

### D. Matriks test

| Aktor | PATCH produk A | DELETE produk A |
|---|---|---|
| Guest | `401` | `401` |
| Pemilik (A) | `200` | `204` |
| Bukan pemilik (B) | `403` atau `404` (sesuai keputusanmu) | sama |
| Admin | `200` | `204` |

- [ ] Semua sel tabel di atas punya test
- [ ] Test "bukan pemilik" juga memastikan data **tidak berubah** di database
- [ ] Keputusan `403` vs `404` ditulis alasannya di `catatan-08.md`

---

## Expected Output

```text
Sebelum:
B → PATCH /api/penjual/products/1 {"price":1}   → 200   ← BUG (IDOR)

Sesudah:
B → PATCH /api/penjual/products/1 {"price":1}   → 404 (atau 403)
A → PATCH /api/penjual/products/1 {"price":1}   → 200
admin → DELETE /api/penjual/products/1          → 204
guest → PATCH /api/penjual/products/1           → 401
```

---

## Panduan Teknis

### IDOR itu apa?

**Analogi:** loker sekolah dengan nomor. Kunci loker sebenarnya tidak dicek, satpam
hanya memastikan kamu murid sekolah itu. Jadi murid mana pun bisa membuka loker
nomor berapa pun. "Sudah login" (murid sekolah) bukan berarti "boleh membuka loker
ini" (pemilik loker).

Autentikasi menjawab **siapa kamu**. Otorisasi menjawab **boleh atau tidak**.
IDOR terjadi kalau hanya yang pertama yang dicek.

### Policy berbasis kepemilikan (contoh domain lain)

```php
// Contoh: komentar hanya boleh diedit penulisnya. BUKAN jawaban soal.
final class CommentPolicy
{
    public function update(User $user, Comment $comment): bool
    {
        return $user->id === $comment->user_id;
    }
}
```

Laravel menemukan policy otomatis kalau namanya cocok: model `App\Models\Comment`
→ `App\Policies\CommentPolicy`.

### `before()`: jalur VIP

`before()` jalan **sebelum** method aksi. Tiga kemungkinan nilai balik:

- `true` → langsung izinkan
- `false` → langsung tolak
- `null` → "aku tidak memutuskan", lanjut ke method aksi

Pikirkan: kalau `before()` mengembalikan `false` untuk non-admin, apa yang terjadi
pada pemilik produk?

### 403 atau 404?

- `403 Forbidden`: "produk ini ada, tapi kamu tidak boleh". Jujur, tapi penyerang tahu id itu ada.
- `404 Not Found`: "tidak ada" (padahal ada). Menyembunyikan keberadaan data.

Laravel menyediakan `Response::deny()` dan `Response::denyAsNotFound()` dari
`Illuminate\Auth\Access\Response`. Untuk data pribadi (pesanan, alamat), 404
biasanya lebih tepat. Pilih, lalu tulis alasanmu.

### Gate untuk aksi tanpa model

Policy cocok untuk "aksi terhadap satu model". Untuk aksi umum seperti "lihat laporan
penjualan", pakai Gate:

```php
// Contoh lain: halaman pengaturan toko
Gate::define('ubah-pengaturan-toko', fn (User $user) => $user->role === 'admin');
```

### Mengecek policy di controller (Laravel 11+)

Base `Controller` di Laravel 11 ke atas **kosong** — tidak ada `$this->authorize()`.
Pakai `Gate::authorize('aksi', $model)` atau `->can('aksi', 'parameter')` di route.

---

## Verifikasi Hasil

```bash
php -l app/Http/Controllers/PenjualProductController.php
php -l app/Policies/ProductPolicy.php
php artisan route:list --path=penjual

php artisan tinker
>>> $a = App\Models\User::factory()->create(['role' => 'penjual'])
>>> $b = App\Models\User::factory()->create(['role' => 'penjual'])
>>> $p = $a->products()->create(['name' => 'Kabel USB', 'slug' => 'kabel-usb', 'price' => 25000, 'stock' => 10, 'category_id' => 1])
>>> $b->can('update', $p)       // harus false setelah diperbaiki
>>> $a->can('update', $p)       // true

php artisan test --filter=PenjualProductAccess
```

Untuk uji pakai curl, buat token Sanctum di tinker:

```bash
>>> $b->createToken('uji')->plainTextToken
```

```bash
curl -i -X PATCH http://127.0.0.1:8000/api/penjual/products/1 \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_USER_B" \
  -d '{"price":1}'
```

Token itu cuma untuk latihan lokal. Jangan ditempel ke file yang di-commit.

---

## Cara Submit

1. Controller dan policy yang sudah aman
2. Migration `user_id` + relasi di model `User` dan `Product`
3. `tests/Feature/PenjualProductAccessTest.php` mencakup seluruh matriks
4. `catatan-08.md`: bukti bug sebelum, keputusan 403/404, jawaban Refleksi

---

## Catatan Penting

- ⚠️ **Menyembunyikan tombol "Edit" di Blade (`@can`) bukan pengaman.** Request bisa dikirim langsung tanpa tombol.
- ⚠️ **Jangan masukkan `user_id` ke `$fillable`** kalau ada kemungkinan diisi dari input user. Isi dari server.
- ⚠️ **Cek otorisasi di SEMUA pintu:** web, API, export, job antrean. Satu pintu lupa = celah.
- 💡 Kolom `role` di tabel `users` sudah dipakai sejak soal 01. Kalau belum ada, buat migration-nya dulu.
- 📚 [Modul Keamanan 05 — Otorisasi dan Akses](../../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md)

---

## Refleksi

1. Kenapa id berurutan (1, 2, 3, ...) membuat IDOR lebih mudah dieksploitasi? Apakah UUID menyelesaikan masalahnya? (Petunjuk: tidak sepenuhnya. Kenapa?)
2. Apa risikonya kalau pengecekan dilakukan di Blade saja dan di controller lupa?
3. Selain update/delete, endpoint mana lagi di toko yang rawan IDOR? Sebutkan minimal tiga.
