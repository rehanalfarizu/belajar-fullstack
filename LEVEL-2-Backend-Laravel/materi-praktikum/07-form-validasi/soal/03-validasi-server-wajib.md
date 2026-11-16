# SOAL 03 — Validasi Server Itu Wajib: Bobol Dulu, Baru Perbaiki

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuktikan sendiri bahwa validasi HTML (`required`, `min`, `maxlength`) bisa dilewati
- Menambahkan validasi di server dan menyimpan **hanya** data yang lolos
- Menampilkan error di Blade dengan `@error` dan `old()`
- Mengembalikan `422` + JSON error untuk client API
- Menulis feature test yang mengunci perilaku validasi

**Topik:** `$request->validate()`, Form Request, `@error`, `old()`, `assertUnprocessable()`, `assertJsonValidationErrors()`

**Referensi utama:**

- [Laravel 13: Validation Quickstart](https://laravel.com/docs/13.x/validation#validation-quickstart)
- [Laravel 13: Displaying the Validation Errors](https://laravel.com/docs/13.x/validation#quick-displaying-the-validation-errors)
- [Laravel 13: Validation Error Response Format](https://laravel.com/docs/13.x/validation#validation-error-response-format)
- [Laravel 13: HTTP Tests](https://laravel.com/docs/13.x/http-tests)
- [Modul Keamanan 02 — Validasi Input](../../../../modul-keamanan-web/02-validasi-input/README.md)

**Difficulty:** Menengah–Lanjut • **Estimasi:** 90–120 menit

---

## Briefing

Teman satu tim bilang: "Form-nya sudah aman kok, ada `required` dan `min="0"`."
Lalu dia mendorong controller yang langsung menyimpan `$request->input(...)` ke
database. Seminggu kemudian ada produk dengan harga **-50.000** dan nama sepanjang
satu novel di katalog.

Tugasmu: **bobol dulu** form itu untuk membuktikan masalahnya, lalu perbaiki di
server dan kunci dengan test supaya tidak terulang.

---

## Deskripsi

Pakai starter `code/03-store-controller-tanpa-validasi.php` (SENGAJA RENTAN) dan
form di bawah. Kerjakan empat bagian: A bobol, B validasi server, C tampilkan error,
D test.

Form yang dipakai (salin ke `resources/views/latihan/products/create.blade.php`):

```blade
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tambah Produk (Latihan)</title>
</head>
<body>
    <h1>Tambah Produk</h1>

    @if (session('success'))
        <p role="status">{{ session('success') }}</p>
    @endif

    <form method="POST" action="{{ route('latihan.products.store') }}">
        @csrf

        <label for="name">Nama produk</label>
        <input id="name" name="name" required maxlength="120">

        <label for="slug">Slug</label>
        <input id="slug" name="slug" required>

        <label for="price">Harga (rupiah)</label>
        <input id="price" name="price" type="number" min="0" required>

        <label for="stock">Stok</label>
        <input id="stock" name="stock" type="number" min="0" required>

        <label for="category_id">ID kategori</label>
        <input id="category_id" name="category_id" type="number" required>

        {{-- TODO(human): tampilkan error per field dan isi ulang nilai lama --}}

        <button type="submit">Simpan</button>
    </form>
</body>
</html>
```

---

## Syarat (Acceptance Criteria)

### A. Bukti bobol (sebelum diperbaiki)

- [ ] Ada catatan di `catatan-07.md` berisi perintah curl yang berhasil menyimpan harga negatif
- [ ] Ada catatan langkah DevTools (hapus atribut `min`/`required`) dan hasilnya
- [ ] Dicatat: kenapa curl ke route **web** gagal `419` dan kenapa route **api** tidak

### B. Validasi server

- [ ] `name`: wajib, string, maksimal 120
- [ ] `slug`: wajib, `alpha_dash`, unik di `products`
- [ ] `price` dan `stock`: wajib, integer, minimal 0
- [ ] `category_id`: wajib, harus ada di tabel `categories`
- [ ] `Product::create()` hanya menerima data hasil validasi (bukan `$request->all()` / `input()`)

### C. Menampilkan error

- [ ] Setiap input punya `@error('field')` yang menampilkan `{{ $message }}`
- [ ] Nilai lama terisi lagi lewat `old('field')` setelah gagal
- [ ] Request dengan `Accept: application/json` yang gagal mendapat `422` + objek `errors`

### D. Feature test

- [ ] Minimal 5 test: valid (`201`), harga negatif, nama 10.000 karakter, kategori tidak ada, form web redirect dengan error
- [ ] Test memakai `assertUnprocessable()` + `assertJsonValidationErrors([...])` untuk JSON
- [ ] Test memakai `assertSessionHasErrors([...])` untuk form web
- [ ] `php artisan test` hijau

---

## Expected Output

Sebelum diperbaiki:

```text
curl ... -d '{"name":"x","slug":"x","price":-50000,"stock":1,"category_id":1}'
→ 201  {"data":{"price":-50000, ...}}     ← BUG: harga negatif tersimpan
```

Sesudah diperbaiki:

```text
→ 422
{
  "message": "Harga tidak boleh negatif.",
  "errors": { "price": ["Harga tidak boleh negatif."] }
}
```

---

## Panduan Teknis

### Kenapa validasi HTML bisa dilewati?

Validasi di browser itu seperti tulisan "Dilarang masuk" di pintu yang tidak dikunci.
Orang jujur patuh. Orang iseng tinggal dorong pintunya. Browser milik **pengguna**,
jadi pengguna bebas mengubah HTML, mematikan JavaScript, atau tidak memakai browser
sama sekali (curl, Postman, script Python).

Validasi client = **kenyamanan** (error cepat muncul). Validasi server = **pengaman**.

### Kenapa curl ke route web kena 419?

Route di `routes/web.php` dilindungi CSRF (di Laravel 13 middleware-nya bernama
`PreventRequestForgery`). Tanpa token `_token`, request ditolak `419`. Itu bukan berarti
validasinya aman — itu cuma CSRF. Untuk uji curl, daftarkan route latihan di
`routes/api.php` (stateless, tanpa CSRF). Feature test juga otomatis melewati CSRF.

### Pola validasi (contoh domain lain, bukan jawaban)

```php
// Contoh form komentar
$data = $request->validate([
    'isi' => ['required', 'string', 'max:500'],
]);

Comment::create([...$data, 'user_id' => $request->user()->id]);
```

### Menampilkan error di Blade (contoh field lain)

```blade
<input id="email" name="email" value="{{ old('email') }}">
@error('email')
    <p role="alert">{{ $message }}</p>
@enderror
```

### Test validasi (contoh endpoint lain)

```php
test('komentar kosong ditolak', function () {
    $this->postJson('/api/comments', ['isi' => ''])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['isi']);
});
```

---

## Verifikasi Hasil

```bash
php -l app/Http/Controllers/LatihanProductController.php
php artisan route:list --path=latihan

# Harus 422 setelah diperbaiki
curl -i -X POST http://127.0.0.1:8000/api/latihan/products \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{"name":"x","slug":"x","price":-50000,"stock":1,"category_id":1}'

php artisan test --filter=LatihanProductValidation
```

---

## Cara Submit

1. Catatan bukti bobol (bagian A) di `catatan-07.md`
2. Controller yang sudah aman + view dengan `@error`/`old()`
3. File test di `tests/Feature/LatihanProductValidationTest.php`
4. Screenshot / salin output `php artisan test` ke `catatan-07.md`

---

## Catatan Penting

- ⚠️ **Jangan deploy starter ini.** Ia sengaja rentan untuk latihan.
- ⚠️ **`validate()` sudah tahu jenis request.** Browser → redirect 302 + error di session. JSON → 422. Kamu tidak perlu menulis if/else sendiri.
- 💡 **Tabel `categories` harus ada** (soal 05/06). Buat minimal satu kategori lewat tinker sebelum uji.
- 📚 Lanjutkan pemahaman di [Modul Keamanan 02 — Validasi Input](../../../../modul-keamanan-web/02-validasi-input/README.md).

---

## Refleksi

1. Sebutkan 3 cara orang bisa mengirim data ke server **tanpa** lewat form-mu.
2. Apa beda status `419`, `422`, dan `500` dalam kasus ini?
3. Kalau kamu pakai `$request->all()` setelah `validate()`, field liar seperti `is_admin` bisa ikut masuk. Kenapa?
