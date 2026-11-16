# SOAL 02 — Mass Assignment: Jangan Percaya `$request->all()`

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuktikan celah mass assignment dengan request yang menyelipkan field tambahan
- Menjelaskan beda `$fillable` dan `$guarded`, lengkap dengan untung-ruginya
- Memastikan kolom milik server (`user_id`, `is_featured`) tidak pernah diisi dari input
- Mengaktifkan pengaturan Eloquent yang membuat kesalahan ini ketahuan saat development

**Topik:** `$fillable`, `$guarded`, `create()`, `update()`, `$request->validate()`, relasi `hasMany`, `preventSilentlyDiscardingAttributes`

**Referensi utama:**

- [Laravel Docs: Eloquent — Mass Assignment](https://laravel.com/docs/13.x/eloquent#mass-assignment)
- [Laravel Docs: Eloquent — Configuring Eloquent Strictness](https://laravel.com/docs/13.x/eloquent#configuring-eloquent-strictness)
- [Laravel Docs: Relationships — The Create Method](https://laravel.com/docs/13.x/eloquent-relationships#the-create-method)
- [Modul Keamanan 02 — Validasi Input](../../../../modul-keamanan-web/02-validasi-input/README.md)
- [Modul Keamanan 05 — Otorisasi dan Akses](../../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md)

**Difficulty:** Menengah • **Estimasi:** 75 menit

---

## Briefing

Toko kampus berkembang jadi marketplace kecil. Sekarang setiap produk punya
**penjual** (`user_id`), dan ada produk **unggulan** (`is_featured`) yang tampil di
halaman depan. Hanya admin yang boleh menandai unggulan.

Form "Tambah Produk" di frontend cuma punya field nama, slug, harga, stok, dan
deskripsi. Tapi backend-nya menyimpan pakai `Product::create($request->all())`.
Seorang penjual iseng membuka DevTools, menambah field `is_featured=1`, dan
produknya langsung nangkring di halaman depan. Gratis.

---

## Deskripsi

Pakai `code/02-mass-assignment-aman.php` (controller **SENGAJA RENTAN**). Buktikan
celahnya, lalu perbaiki model, controller, dan `AppServiceProvider` supaya field
yang bukan hak user tidak pernah bisa diisi lewat request.

---

## Syarat (Acceptance Criteria)

### Persiapan

- [ ] Tabel `products` punya kolom `user_id` (FK ke `users`) dan `is_featured` (boolean, default false)
- [ ] Model `Product` sementara memakai `$guarded = []` supaya celahnya bisa dibuktikan

### Bukti Serangan (Sebelum Diperbaiki)

- [ ] Ada 1 request (feature test, tinker, atau curl) yang mengirim `is_featured=1` dan berhasil tersimpan
- [ ] Ada 1 request yang mengirim `user_id` milik user lain dan berhasil tersimpan
- [ ] Hasil kedua bukti tercatat (isi baris database sebelum dan sesudah)

### Perbaikan Model

- [ ] `Product` memakai `$fillable`, bukan `$guarded = []`
- [ ] `$fillable` tidak memuat `user_id` dan `is_featured`
- [ ] Ada komentar 2–3 kalimat: kenapa memilih `$fillable` daripada `$guarded`

### Perbaikan Controller

- [ ] `store()` dan `update()` tidak lagi memakai `$request->all()`
- [ ] Data yang disimpan hanya data yang lolos validasi
- [ ] `user_id` diisi dari user yang login, bukan dari input
- [ ] `update()` pada produk milik user lain menghasilkan `403`

### Pengaman Development

- [ ] `AppServiceProvider::boot()` mengaktifkan exception saat atribut non-fillable diisi, **hanya** di luar production

### Bukti Setelah Diperbaiki

- [ ] Request yang sama dengan bukti serangan menghasilkan baris dengan `is_featured = false` dan `user_id` = user yang login
- [ ] Minimal 1 feature test otomatis membuktikan poin di atas

---

## Expected Output

Sebelum diperbaiki (di tinker setelah request jahat):

```text
> App\Models\Product::latest('id')->first()->only(['name', 'user_id', 'is_featured'])
= [
    "name" => "Keyboard Murah",
    "user_id" => 999,
    "is_featured" => 1,
  ]
```

Setelah diperbaiki:

```text
= [
    "name" => "Keyboard Murah",
    "user_id" => 1,          // id user yang login
    "is_featured" => false,
  ]
```

```text
php artisan test --filter=MassAssignment

PASS  Tests\Feature\ProductMassAssignmentTest
✓ user tidak bisa menyusupkan owner dan featured
```

---

## Panduan Teknis

### Apa Itu Mass Assignment?

Mass assignment = mengisi banyak kolom sekaligus dari satu array. `create([...])`,
`update([...])`, dan `fill([...])` semuanya mass assignment.

Analogi: kamu kasih tukang parkir kunci mobil supaya dia **memindahkan mobil**.
`$request->all()` itu seperti menyerahkan **seluruh gantungan kunci**: kunci mobil,
kunci rumah, kunci brankas. Mungkin tukangnya jujur. Mungkin juga tidak.

### `$fillable` vs `$guarded`

| | `$fillable` | `$guarded` |
|---|---|---|
| Cara kerja | Daftar kolom yang **boleh** diisi massal | Daftar kolom yang **dilarang** diisi massal |
| Gaya | Allowlist | Blocklist |
| Kolom baru ditambah | Otomatis terlindungi | Otomatis **terbuka**, kecuali kamu ingat menambahkannya |
| `$guarded = []` | – | Semua kolom terbuka. Bahaya kalau input tidak disaring |

Di Laravel 13, dokumentasi juga menunjukkan gaya atribut `#[Fillable([...])]` di
atas class. Fungsinya sama. Soal ini memakai properti `$fillable` supaya jalan di
Laravel 12 dan 13.

### Dua Lapis Pertahanan

1. **Saring input**: hanya ambil field yang lolos validasi.
2. **Lindungi model**: `$fillable` sebagai jaring pengaman kalau lapis 1 kebobolan.

Kolom seperti "pemilik" dan "status unggulan" bukan input user. Server yang
menentukan. Cari di dokumentasi relasi: membuat model **lewat relasi** membuat
Laravel mengisi foreign key-nya sendiri.

### Contoh Pola (Domain Berbeda)

Ini contoh di domain blog, **bukan** jawabanmu:

```php
// Rentan: penulis bisa mengirim author_id orang lain, atau is_pinned=1
Post::create($request->all());

// Pola aman: validasi dulu, pemilik dari server
$data = $request->validate(['title' => ['required', 'string', 'max:200']]);
$post = new Post($data);
$post->author_id = $request->user()->id; // assignment langsung, bukan dari input
$post->save();
```

Pertanyaan untukmu: kenapa `$post->author_id = ...` tetap jalan walaupun
`author_id` tidak ada di `$fillable`?

### Cara Mengirim Request Saat Belum Ada Login

Login baru dibahas di topik 08. Cara paling mudah membuktikan celah sekarang:
**feature test** dengan `actingAs($user)`. Laravel melewati cek CSRF saat test, jadi
kamu bisa langsung `postJson('/products', [...])`.

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php -l app/Http/Controllers/ProductController.php
php -l app/Models/Product.php
php artisan route:list --path=products
php artisan test --filter=MassAssignment
```

Di tinker, coba langsung ke model:

```php
App\Models\Product::create(['name' => 'X', 'slug' => 'x', 'price' => 1, 'stock' => 1, 'is_featured' => true]);
// Di lokal: harus MELEMPAR exception (karena pengaman development aktif)
```

---

## Cara Submit

1. Commit versi rentan + bukti serangan (test yang **gagal** atau catatan tinker)
2. Commit perbaikan + test yang **lulus**
3. Tulis di catatanmu: jawaban Refleksi di bawah

---

## Catatan Penting

- ⚠️ **`$request->validated()` tidak otomatis aman kalau rules-mu sendiri memuat `user_id`.** Validasi menjawab "bentuknya benar?", bukan "user ini boleh mengisi ini?".
- ⚠️ `$guarded = []` sering muncul di tutorial supaya cepat. Di proyek kerja, itu bendera merah saat code review.
- 💡 `preventSilentlyDiscardingAttributes` membuat bug kelihatan di lokal. Di production tetap "buang diam-diam" supaya user tidak melihat error.
- 📚 Baca [teori 06 bagian Mass Assignment](../../../materi-teori/06-eloquent-orm/README.md).

---

## Refleksi

1. Kalau `$fillable` sudah benar, kenapa kita masih perlu validasi? Dan sebaliknya?
2. Kapan `$guarded` justru masuk akal dipakai?
3. Endpoint "jadikan unggulan" khusus admin: bagaimana kamu mengisi `is_featured` di sana tanpa memasukkannya ke `$fillable`?
