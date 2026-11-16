# SOAL 03 — Scope Pencarian Aman dan Masalah N+1

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Menemukan SQL injection yang bersembunyi di dalam scope Eloquent (`whereRaw`)
- Menulis scope yang aman dan bisa dirangkai (`search`, `priceBetween`)
- Mengukur jumlah query sebuah endpoint, bukan cuma menebak
- Menghilangkan N+1 dengan eager loading, `select`, dan pagination
- Mengaktifkan `preventLazyLoading` supaya N+1 ketahuan saat development

**Topik:** local scope, `whereRaw` + binding, `when()`, `with()`, `select()`, `paginate()`, `DB::enableQueryLog()`, `Model::preventLazyLoading`

**Referensi utama:**

- [Laravel Docs: Eloquent — Local Scopes](https://laravel.com/docs/13.x/eloquent#local-scopes)
- [Laravel Docs: Relationships — Eager Loading](https://laravel.com/docs/13.x/eloquent-relationships#eager-loading)
- [Laravel Docs: Query Builder — Raw Expressions](https://laravel.com/docs/13.x/queries#raw-expressions)
- [Laravel Docs: Pagination](https://laravel.com/docs/13.x/pagination)
- [Modul Keamanan 03 — SQL Injection](../../../../modul-keamanan-web/03-sql-injection/README.md)

**Difficulty:** Lanjut • **Estimasi:** 120 menit

---

## Briefing

Halaman `/produk-cari` sudah jalan di lokal dengan 5 produk. Setelah toko punya 500
produk, halaman itu butuh 3 detik untuk terbuka, dan log database penuh query
`select * from categories where id = ?` yang berulang ratusan kali.

Saat kamu menyelidiki, kamu juga menemukan scope pencarian yang memakai `whereRaw`
dengan input user ditempel langsung. Dua masalah, satu endpoint. Bereskan keduanya.

---

## Deskripsi

Pakai `code/03-scope-search-aman.php`. Bagian model punya scope `search` yang
**SENGAJA RENTAN** dan scope `priceBetween` yang belum diisi. Bagian controller
(di komentar bawah) **SENGAJA LAMBAT**. Ukur, buktikan, perbaiki, ukur lagi.

---

## Syarat (Acceptance Criteria)

### Persiapan Data

- [ ] Ada minimal 3 kategori dan minimal 50 produk (pakai factory + seeder)
- [ ] Setiap produk punya `category_id` yang valid

### Scope `search`

- [ ] Sebelum diperbaiki: payload `x' OR '1'='1` membuat `Product::search(...)->count()` sama dengan `Product::count()` (catat buktinya)
- [ ] Sesudah diperbaiki: payload yang sama menghasilkan `0`
- [ ] Tidak ada variabel PHP di dalam string `whereRaw` (kalau masih pakai `whereRaw`, nilai lewat `?`)
- [ ] `search(null)` dan `search('')` tidak memfilter apa pun

### Scope `priceBetween`

- [ ] `priceBetween(null, null)` = tanpa filter
- [ ] `priceBetween(100000, null)` = harga ≥ 100.000
- [ ] `priceBetween(null, 200000)` = harga ≤ 200.000
- [ ] Kasus `min > max` ditangani sesuai keputusanmu dan alasannya tertulis
- [ ] Scope bisa dirangkai: `Product::search('a')->priceBetween(1, 500000)->get()` jalan

### Endpoint `/produk-cari`

- [ ] Jumlah query **sebelum** diperbaiki tercatat (angka nyata, bukan tebakan)
- [ ] Sesudah diperbaiki, jumlah query **tidak bertambah** walaupun jumlah produk bertambah
- [ ] Response memakai pagination 20 per halaman
- [ ] Query produk hanya mengambil kolom yang dipakai
- [ ] `?min=` dan `?max=` divalidasi; `?min=abc` menghasilkan `422`, bukan `500`

### Pengaman Development

- [ ] `Model::preventLazyLoading` aktif di luar production
- [ ] Kamu sudah melihat sendiri exception-nya muncul dengan controller versi lama

---

## Expected Output

```text
# Sebelum (50 produk)
> count(DB::getQueryLog())
= 51

# Sesudah
> count(DB::getQueryLog())
= 2
```

```bash
curl -s "http://127.0.0.1:8000/produk-cari?q=a&min=100000&max=500000" | head -c 300
# {"current_page":1,"data":[{"name":"...","price":...,"category":"..."}, ...],"per_page":20, ...}

curl -i "http://127.0.0.1:8000/produk-cari?min=abc"
# HTTP/1.1 302 Found   (atau 422 kalau pakai header Accept: application/json)
```

Catatan: tanpa header `Accept: application/json`, error validasi pada route web
akan me-redirect (302). Pakai `-H "Accept: application/json"` untuk melihat `422`.

---

## Panduan Teknis

### N+1 Itu Apa?

Analogi: kamu belanja 50 barang di minimarket. Cara N+1: ambil daftar belanja (1x
jalan), lalu untuk **setiap** barang kamu bolak-balik ke rak yang sama untuk cek
harganya (50x jalan). Total 51 perjalanan. Cara eager loading: ambil daftar, lalu
sekali jalan ambil semua label harga sekaligus. Total 2 perjalanan.

Di kode, N+1 muncul saat kamu mengakses **relasi di dalam loop** dan relasinya belum
dimuat.

### Cara Mengukur

Jangan menebak. Hitung.

```php
// Contoh di domain lain (posts + author), BUKAN jawabanmu
DB::enableQueryLog();
Post::all()->each(fn ($post) => $post->author->name);
count(DB::getQueryLog()); // berapa?
```

Coba hal yang sama untuk produk + kategori. Lalu coba dengan eager loading. Bandingkan.

### Kenapa `select()` Butuh Hati-hati

Kalau kamu memilih kolom tertentu dengan `select`, jangan lupa kolom yang dipakai
untuk **mencocokkan** relasi. Pikirkan: kalau `category_id` tidak ikut diambil,
bagaimana Laravel tahu produk ini milik kategori yang mana?

### Scope yang Aman

Scope itu cuma method yang menambah kondisi ke query. Aman atau tidaknya tergantung
isinya. `where('kolom', 'like', $nilai)` aman karena nilai dikirim lewat binding.
`whereRaw("... $nilai ...")` tidak aman karena nilai jadi bagian teks SQL.

Untuk kondisi opsional, cari method `when()` di dokumentasi Query Builder
(*Conditional Clauses*). Ia membuat kode scope tetap rapi tanpa banyak `if`.

### Data Uji dengan Factory

Buat `ProductFactory` dan `CategoryFactory` (`php artisan make:factory`). Jangan lupa `use HasFactory;` di model supaya `Product::factory()` dikenali. Di
`DatabaseSeeder`, buat beberapa kategori lalu banyak produk yang masing-masing
memilih salah satu kategori itu.

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php -l app/Models/Product.php
php -l app/Http/Controllers/KatalogController.php
php artisan migrate:fresh --seed     # HANYA di lokal
php artisan route:list --path=produk-cari
php artisan tinker
```

Di tinker:

```php
App\Models\Product::count();
App\Models\Product::search("x' OR '1'='1")->count();     // harus 0 setelah diperbaiki
App\Models\Product::priceBetween(100000, null)->min('price'); // >= 100000

DB::enableQueryLog();
// panggil logika yang sama dengan controller di sini
count(DB::getQueryLog());
```

Lewat HTTP (jalankan `php artisan serve` di terminal lain):

```bash
curl -s -H "Accept: application/json" "http://127.0.0.1:8000/produk-cari?q=a"            # 200
curl -s -H "Accept: application/json" "http://127.0.0.1:8000/produk-cari?min=abc" -o /dev/null -w "%{http_code}\n"  # 422
curl -s -H "Accept: application/json" "http://127.0.0.1:8000/produk-cari?page=2" | head -c 200
```

---

## Cara Submit

1. Tabel di catatanmu: jumlah produk → jumlah query sebelum → jumlah query sesudah (coba 10, 50, 200 produk)
2. Bukti payload `search` sebelum dan sesudah
3. Commit terpisah: "bukti N+1", "perbaiki N+1", "amankan scope search"

---

## Catatan Penting

- ⚠️ **`migrate:fresh` menghapus semua data.** Hanya untuk lokal.
- ⚠️ Eager loading bukan berarti "selalu `with()` semua relasi". Muat yang dipakai saja.
- 💡 `preventLazyLoading` cuma aktif di lokal. Di production, N+1 tidak melempar error, cuma bikin lambat. Makanya harus ketahuan sebelum deploy.
- 💡 Di Laravel 13, dokumentasi menulis scope dengan atribut `#[Scope]`. Gaya `scopeNama()` di soal ini tetap didukung.
- 📚 [Modul Keamanan 03 — SQL Injection](../../../../modul-keamanan-web/03-sql-injection/README.md)

---

## Refleksi

1. Kenapa jumlah query N+1 bertambah seiring jumlah data, sedangkan versi eager loading tidak?
2. Apa bedanya `with('category')` dan `load('category')`? Kapan pakai yang kedua?
3. Scope `search` sekarang aman. Apakah fitur pencarian ini sudah aman sepenuhnya? (Petunjuk: pikirkan panjang input dan performa `LIKE '%...%'`.)
