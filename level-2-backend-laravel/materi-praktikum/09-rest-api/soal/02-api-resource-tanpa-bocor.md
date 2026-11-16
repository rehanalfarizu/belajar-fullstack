# SOAL 02 — API Resource Tanpa Bocor Data

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Menjelaskan risiko **excessive data exposure** (OWASP API3) dengan contoh nyata
- Membuat `ProductResource` dan `CategoryResource` yang hanya mengeluarkan field publik
- Menampilkan field sensitif secara bersyarat dengan `when()` dan policy
- Memakai `whenLoaded()` supaya relasi tidak memicu query N+1
- Membuat format error JSON yang konsisten untuk `404`

**Topik:** `JsonResource`, `toArray()`, `when()`, `whenLoaded()`, `$hidden`, `withExceptions`

**Referensi utama:**

- [Laravel: Eloquent API Resources](https://laravel.com/docs/13.x/eloquent-resources)
- [Laravel: Serialization (`$hidden`)](https://laravel.com/docs/13.x/eloquent-serialization)
- [Laravel: Error Handling](https://laravel.com/docs/13.x/errors)
- [OWASP API3: Broken Object Property Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/)

**Difficulty:** Menengah • **Estimasi:** 90 menit

---

## Briefing

Toko kamu mulai dipakai aplikasi kasir Android. Developer Android minta endpoint
`GET /api/products`. Rekanmu buru-buru menulis `return Product::all();`.

Masalahnya, tabel `products` sekarang punya kolom internal: `harga_modal` (harga
beli dari supplier), `catatan_internal` (misal "supplier telat bayar"), dan
`user_id` (admin yang input). Siapa pun yang membuka aplikasi bisa melihat
margin keuntunganmu. Kompetitor senang sekali.

Tugasmu: tutup kebocoran ini tanpa merusak aplikasi Android.

---

## Deskripsi

Buat `ProductResource` dan `CategoryResource`, pakai di controller API, tambahkan
`$hidden` sebagai lapisan cadangan, dan buat error `404` berbentuk JSON yang
sama untuk semua route `api/*`.

---

## Syarat (Acceptance Criteria)

### Persiapan Data

- [ ] Tabel `products` punya kolom tambahan `harga_modal` (unsigned big integer), `catatan_internal` (text, nullable), dan `user_id` (foreign key ke `users`, nullable; kolom ini sudah ada dari topik 06, cek dulu sebelum menambah)
- [ ] Minimal 3 produk di database (lewat seeder atau `tinker`), minimal 1 dengan `stock = 0`

### `ProductResource`

- [ ] File ada di `app/Http/Resources/ProductResource.php`
- [ ] Field yang keluar **tepat**: `id`, `name`, `slug`, `price`, `price_label`, `stock_status`, `category`, `created_at`, `updated_at` (ditambah `harga_modal` hanya untuk yang berhak)
- [ ] `price_label` berformat `Rp 350.000` (titik sebagai pemisah ribuan)
- [ ] `stock_status` bernilai `"habis"` kalau `stock` = 0, selain itu `"tersedia"`
- [ ] `created_at` dan `updated_at` dalam format ISO 8601 (misal `2026-11-16T08:00:00+00:00`)
- [ ] `category` memakai `CategoryResource` dan **hanya** muncul kalau relasi sudah di-eager-load
- [ ] `harga_modal` hanya muncul kalau user yang login lolos `can('update', $produk)`; untuk guest key ini **tidak ada sama sekali** (bukan `null`)
- [ ] `catatan_internal` dan `user_id` **tidak pernah** muncul

### `CategoryResource`

- [ ] Hanya mengeluarkan `id`, `name`, `slug`

### Model dan Controller

- [ ] Model `Product` punya `$hidden` berisi `harga_modal`, `catatan_internal`, `user_id`
- [ ] `index` mengembalikan `ProductResource::collection(...)` dari hasil `paginate()` dengan `with('category')`
- [ ] `show` mengembalikan `new ProductResource(...)`
- [ ] Tidak ada `return Product::all()` atau `return $product` tersisa di controller API

### Error 404 Konsisten

- [ ] `GET /api/products/99999` menghasilkan status `404` dan body tepat `{"message": "Data tidak ditemukan.", "kode": "TIDAK_DITEMUKAN"}`
- [ ] Body 404 **tidak** menyebut `App\Models\Product`
- [ ] Route web (non-API) tetap memakai halaman 404 biasa

---

## Expected Output

Guest:

```bash
curl -s http://127.0.0.1:8000/api/products/1 -H "Accept: application/json"
```

```json
{
  "data": {
    "id": 1,
    "name": "Keyboard Mekanik",
    "slug": "keyboard-mekanik",
    "price": 350000,
    "price_label": "Rp 350.000",
    "stock_status": "tersedia",
    "created_at": "2026-11-16T08:00:00+00:00",
    "updated_at": "2026-11-16T08:00:00+00:00"
  }
}
```

Perhatikan: di `show` tidak ada `category` kalau kamu tidak me-load relasinya.
Di `index` (yang memakai `with('category')`), `category` muncul.

Produk tidak ada:

```text
HTTP/1.1 404 Not Found
{"message":"Data tidak ditemukan.","kode":"TIDAK_DITEMUKAN"}
```

---

## Panduan Teknis

### Kenapa model langsung itu berbahaya?

Saat model di-return, Laravel memanggil `toArray()` pada model. Semua kolom
ikut, kecuali yang ada di `$hidden`. Artinya **default-nya terbuka**. Setiap kali
ada migration baru, kolom baru otomatis ikut keluar.

API Resource membalik logikanya: **default-nya tertutup**. Hanya field yang kamu
tulis yang keluar. Ini prinsip **allowlist**.

**Analogi:** `$hidden` itu seperti daftar "barang yang tidak boleh dipajang".
API Resource itu daftar "barang yang boleh dipajang". Daftar kedua jauh lebih
aman, karena barang baru tidak otomatis ikut terpajang.

### Pola `when()` (contoh lain, bukan jawaban)

Contoh di resource **pegawai**: gaji hanya untuk HRD.

```php
'gaji' => $this->when(
    $request->user()?->hasRole('hrd') ?? false,
    fn () => $this->gaji,
),
```

Pakai closure (`fn () => ...`) supaya nilainya hanya dihitung kalau kondisinya
`true`.

### `whenLoaded()` dan N+1

`whenLoaded('relasi')` mengecek apakah relasi sudah dimuat. Kalau belum, key
dihapus dan **tidak ada query tambahan**. Jadi yang menentukan relasi ikut atau
tidak adalah controller (lewat `with()`), bukan resource.

### Format tanggal

Kolom `created_at` di model sudah berupa object Carbon. Cari method Carbon yang
menghasilkan string ISO 8601. Jangan lupa kemungkinan nilainya `null`.

### Format rupiah

Fungsi bawaan PHP `number_format()` menerima 4 argumen: angka, jumlah desimal,
pemisah desimal, pemisah ribuan.

### Error 404 di `bootstrap/app.php`

Lihat bagian "Rendering Exceptions" di dokumentasi Error Handling. Kamu perlu
menangkap `NotFoundHttpException` hanya untuk request `api/*`.

---

## Verifikasi Hasil (Wajib Dicek)

```bash
php -l app/Http/Resources/ProductResource.php
php -l app/Http/Resources/CategoryResource.php
php artisan route:list --path=api

# Guest: harga_modal tidak boleh muncul
curl -s http://127.0.0.1:8000/api/products -H "Accept: application/json" | grep -c harga_modal
# harus mencetak 0

# 404 konsisten
curl -i http://127.0.0.1:8000/api/products/99999 -H "Accept: application/json"
```

- [ ] `grep -c harga_modal` mencetak `0` untuk guest
- [ ] `grep -c catatan_internal` mencetak `0` untuk semua user
- [ ] Ada feature test yang memakai `assertJsonMissingPath('data.harga_modal')`
- [ ] Ada feature test untuk admin yang memakai `assertJsonPath('data.harga_modal', ...)`
- [ ] `php artisan test` hijau

---

## Cara Submit

1. Salin `code/02-product-resource.php` ke `toko-latihan/app/Http/Resources/ProductResource.php`
2. Buat `CategoryResource` sendiri dengan `php artisan make:resource CategoryResource`
3. Kerjakan semua `TODO(human)` di starter
4. Jalankan semua perintah di "Verifikasi Hasil"
5. Tulis jawaban Refleksi di `toko-latihan/CATATAN-09.md`

---

## Catatan Penting

- ⚠️ **`$hidden` saja tidak cukup.** Itu lapisan cadangan. Kalau suatu hari ada
  yang memanggil `$product->makeVisible(...)` atau `->toArray()` di tempat lain,
  datanya bisa keluar lagi.
- ⚠️ **Tes pakai user berbeda.** Bug kebocoran biasanya hanya kelihatan dari
  sudut pandang guest.
- ⚠️ **Route publik tidak tahu siapa kamu.** `GET /api/products` tidak memakai
  middleware `auth`, jadi `$request->user()` (guard default `web`) tidak membaca
  bearer token. Cari di dokumentasi cara meminta user dari guard tertentu.
- 💡 Policy `update` untuk produk sudah kamu buat di
  [soal 08](../../08-autentikasi/soal/01-auth-authorization.md). Pakai lagi.
- 📚 Baca [Modul Keamanan 05 — Otorisasi dan Akses](../../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md).

---

## Refleksi

1. Sebutkan 2 kolom lain di aplikasi nyata (bukan toko) yang tidak boleh keluar
   di API publik.
2. Kenapa key yang tidak berhak lebih baik **hilang** daripada bernilai `null`?
3. Kalau tim Android butuh `stock` angka pasti, apa risikonya bagi toko?
4. Apa bedanya allowlist (Resource) dan blocklist (`$hidden`)? Mana yang kamu
   pilih sebagai pertahanan utama, dan kenapa?
