# SOAL 02 — Route Group, Named Route, dan Constraint

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Mengelompokkan route dengan prefix URL dan prefix nama.
- Membuat URL dari **nama route** dengan helper `route()`, bukan string manual.
- Membatasi bentuk parameter URL dengan constraint di level router.
- Membuat redirect permanen dan fallback route yang membalas JSON 404.

**Topik:** `Route::prefix()`, `->name()`, `->group()`, `->where()`, `->whereNumber()`, `route()`, `Route::permanentRedirect()`, `Route::fallback()`

**Referensi utama:**

- [Laravel Docs: Routing — Named Routes](https://laravel.com/docs/13.x/routing#named-routes)
- [Laravel Docs: Routing — Route Groups](https://laravel.com/docs/13.x/routing#route-groups)
- [Laravel Docs: Routing — Regular Expression Constraints](https://laravel.com/docs/13.x/routing#parameters-regular-expression-constraints)
- [Laravel Docs: Routing — Fallback Routes](https://laravel.com/docs/13.x/routing#fallback-routes)

**Difficulty:** Menengah • **Estimasi:** 60–90 menit

---

## Briefing

Toko latihanmu mau punya halaman katalog publik. Tim marketing sudah
menyebar link lama `/produk` di Instagram, jadi link itu tidak boleh mati.
Tim frontend juga minta: "Tolong kasih URL produk di response JSON, jangan
suruh kami merakit URL sendiri." Kalau suatu hari URL katalog berubah,
cukup satu tempat yang diganti.

---

## Deskripsi

Lengkapi `code/02-routes-katalog.php` lalu tempel di bawah
`toko-latihan/routes/web.php`. Hasilnya: 3 route katalog di dalam satu group,
1 redirect permanen, dan 1 fallback JSON 404.

---

## Syarat (Acceptance Criteria)

### Group dan Nama

- [ ] Ada tepat **satu** `group` yang memberi prefix URL `katalog` dan prefix nama `katalog.`
- [ ] `php artisan route:list --name=katalog` menampilkan tepat 3 route: `katalog.index`, `katalog.produk.show`, `katalog.kategori.show`
- [ ] Tidak ada string `"/katalog/produk/"` yang diketik manual di dalam closure (URL dibuat dengan `route()`)

### Endpoint

- [ ] `GET /katalog` → `200`, JSON `data` berisi 3 produk, setiap item punya `slug`, `nama`, `harga`, `url`
- [ ] `GET /katalog/produk/keyboard-mekanik` → `200`
- [ ] `GET /katalog/produk/tidak-ada` → `404`
- [ ] `GET /katalog/produk/Keyboard_Mekanik` → `404` dan ditolak oleh **constraint router**, bukan oleh `if` di closure
- [ ] `GET /katalog/kategori/1` → `200`, berisi nama kategori + daftar slug produknya
- [ ] `GET /katalog/kategori/abc` → `404` karena constraint angka

### Redirect dan Fallback

- [ ] `GET /produk` → `301` dengan header `Location` mengarah ke `/katalog`
- [ ] `GET /apa-saja-yang-tidak-ada` dengan header `Accept: application/json` → `404` dan JSON `{"message": "Halaman tidak ditemukan."}`
- [ ] Fallback ditulis paling akhir di `routes/web.php`

---

## Expected Output

```bash
$ php artisan route:list --name=katalog
  GET|HEAD  katalog ............................ katalog.index
  GET|HEAD  katalog/kategori/{id} ...... katalog.kategori.show
  GET|HEAD  katalog/produk/{slug} ........ katalog.produk.show
```

```bash
$ curl -s http://127.0.0.1:8000/katalog
{"data":[{"slug":"keyboard-mekanik","nama":"Keyboard Mekanik","harga":350000,"url":"http://127.0.0.1:8000/katalog/produk/keyboard-mekanik"}, ...]}

$ curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8000/katalog/produk/Keyboard_Mekanik
404

$ curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://127.0.0.1:8000/produk
301 http://127.0.0.1:8000/katalog
```

Urutan dan jumlah titik di `route:list` bisa beda sedikit tergantung lebar
terminal. Yang penting nama dan URL-nya.

---

## Panduan Teknis

### Cara Kerja Named Route

Nama route itu seperti **nama kontak di HP**. Kamu menelepon "Ibu", bukan
menghafal nomornya. Kalau Ibu ganti nomor, cukup ubah kontaknya sekali.
Begitu juga `route('nama')`: URL boleh berubah, kode yang memanggil tidak perlu
diubah.

Contoh di domain LAIN (blog), bukan jawaban soal:

```php
// Route dengan nama
Route::get('/artikel/{tahun}', fn (int $tahun) => "Arsip $tahun")
    ->name('arsip');

// Di tempat lain: URL dibuat dari nama + parameter
$link = route('arsip', ['tahun' => 2026]); // http://.../artikel/2026
```

### Group: Atur Sekali, Berlaku ke Banyak Route

Group itu seperti **satu map plastik** berisi banyak lembar. Label di map
(prefix, middleware, nama) otomatis berlaku ke semua lembar di dalamnya.
Cari di dokumentasi bagaimana menggabungkan `prefix()` dan `name()` sebelum
`group()`.

### Constraint: Satpam di Pintu Router

Constraint memeriksa bentuk parameter **sebelum** closure jalan. Kalau tidak
cocok, router langsung bilang "route tidak ada" (404). Untung dua: kode
closure lebih bersih, dan input aneh tidak pernah sampai ke logikamu.

```php
// Domain lain: kode voucher hanya huruf besar dan angka
Route::get('/voucher/{kode}', fn (string $kode) => $kode)
    ->where('kode', '[A-Z0-9]+');
```

Pikirkan sendiri regex untuk slug: huruf kecil, angka, tanda minus.

### Redirect dan Fallback

- Redirect `301` artinya "pindah permanen". Browser dan Google akan
  mengingatnya. `302` artinya "sementara".
- Fallback menangkap URL yang tidak cocok dengan route mana pun. Karena
  router mencocokkan dari atas ke bawah, fallback harus di bawah.

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php -l routes/web.php
php artisan route:list --name=katalog
php artisan serve
# terminal lain:
curl -i http://127.0.0.1:8000/katalog
curl -i http://127.0.0.1:8000/katalog/produk/mouse-wireless
curl -i http://127.0.0.1:8000/katalog/produk/Keyboard_Mekanik
curl -i http://127.0.0.1:8000/katalog/kategori/2
curl -i http://127.0.0.1:8000/katalog/kategori/abc
curl -i http://127.0.0.1:8000/produk
curl -i -H "Accept: application/json" http://127.0.0.1:8000/ngawur
```

- [ ] Semua status code sama dengan Syarat di atas
- [ ] Field `url` di `/katalog` bisa dibuka dan menghasilkan `200`
- [ ] Ubah prefix group jadi `toko` sebentar → field `url` ikut berubah tanpa kamu edit closure. Kembalikan lagi ke `katalog`.

---

## Cara Submit

1. Simpan versi final di `toko-latihan/routes/web.php`.
2. Tulis minimal 4 feature test di `tests/Feature/KatalogRouteTest.php`
   (index, slug ditolak, kategori bukan angka, redirect 301).
3. Jalankan `php artisan test` sampai hijau.
4. Tulis jawaban Refleksi di `catatan-routing.md` di project kamu.

---

## Catatan Penting

- ⚠️ **Fallback yang ditaruh di tengah file** akan "menelan" route di bawahnya. Selalu taruh paling akhir.
- ⚠️ **Tanpa header `Accept: application/json`**, `abort(404)` merender halaman HTML. Itu normal. Test pakai `getJson()`.
- 💡 `php artisan route:list -v` menampilkan middleware tiap route. Berguna buat soal 03.
- 📚 Baca juga [teori routing & controller](../../../materi-teori/03-routing-controller/README.md).

---

## Refleksi

1. Kenapa constraint di router lebih baik daripada `if (! preg_match(...))` di dalam closure?
2. Apa yang rusak kalau frontend merakit URL produk sendiri lalu kamu ganti prefix `katalog`?
3. Kapan kamu pakai `301` dan kapan `302`? Apa risikonya salah pilih?
4. Kenapa urutan route penting? Beri satu contoh dua route yang saling "bertabrakan".
