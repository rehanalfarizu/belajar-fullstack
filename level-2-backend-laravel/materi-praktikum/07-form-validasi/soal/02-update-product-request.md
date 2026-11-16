# SOAL 02 — UpdateProductRequest: Edit Sebagian, Slug Unik, dan Aturan Antar-Field

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuat Form Request untuk **update** yang berbeda dari Form Request untuk **create**
- Memakai `sometimes` supaya PATCH bisa mengirim sebagian field saja
- Membuat aturan unik yang **mengabaikan data milik sendiri** saat edit
- Merapikan input sebelum divalidasi dengan `prepareForValidation()`
- Menulis aturan yang melibatkan dua field sekaligus lewat `after()`

**Topik:** `FormRequest`, `sometimes`, `Rule::unique()->ignore()`, `prepareForValidation()`, `after()`, `attributes()`

**Referensi utama:**

- [Laravel 13: Form Request Validation](https://laravel.com/docs/13.x/validation#form-request-validation)
- [Laravel 13: Rule unique](https://laravel.com/docs/13.x/validation#rule-unique)
- [Laravel 13: Validating When Present (sometimes)](https://laravel.com/docs/13.x/validation#validating-when-present)
- [Laravel 13: Performing Additional Validation](https://laravel.com/docs/13.x/validation#performing-additional-validation-on-form-requests)

**Difficulty:** Menengah • **Estimasi:** 60–90 menit

---

## Briefing

Admin toko sudah bisa menambah produk (soal 01). Sekarang admin mau **mengedit**
produk. Masalahnya muncul satu per satu:

- Admin cuma mau ganti harga, tapi form lama menolak karena "nama wajib diisi".
- Admin menyimpan produk tanpa mengubah slug, eh ditolak "slug sudah dipakai" —
  padahal yang pakai slug itu produk itu sendiri.
- Admin mengetik harga `350.000` (pakai titik, kebiasaan orang Indonesia) dan
  ditolak "harus berupa angka".
- Ada produk aktif dengan stok 0. Pembeli bisa checkout barang yang tidak ada.

Kamu diminta membuat `UpdateProductRequest` yang menyelesaikan keempat masalah itu.

---

## Deskripsi

Buat `app/Http/Requests/UpdateProductRequest.php` dari starter
`code/02-update-product-request.php`, pasang ke route `PATCH /products/{product}`,
lalu buktikan dengan feature test.

---

## Syarat (Acceptance Criteria)

### Otorisasi

- [ ] `authorize()` memanggil policy `update` untuk produk dari route
- [ ] Guest (tanpa login) mendapat `401` (JSON) atau redirect ke login, bukan error 500
- [ ] User biasa (bukan admin) mendapat `403`

### Update sebagian (PATCH)

- [ ] Request `{"price": 400000}` saja berhasil (`200`) dan field lain tidak berubah
- [ ] Request `{"name": ""}` ditolak `422` (kalau dikirim, tetap tidak boleh kosong)
- [ ] Semua 7 field (`name`, `slug`, `description`, `price`, `stock`, `category_id`, `is_active`) punya aturan

### Slug unik kecuali milik sendiri

- [ ] Menyimpan produk dengan slug miliknya sendiri berhasil `200`
- [ ] Memakai slug milik produk lain ditolak `422` dengan pesan Indonesia

### Merapikan input

- [ ] `{"price": "350.000"}` tersimpan sebagai `350000` (integer)
- [ ] `{"name": "Mouse Gaming", "slug": ""}` menghasilkan slug `mouse-gaming`
- [ ] `{"price": "tiga ratus"}` tetap ditolak `422` (jangan diam-diam jadi `0`)

### Aturan antar-field

- [ ] Produk dengan stok `0` tidak bisa di-set `is_active = true` (`422` di field `is_active`)
- [ ] Aturan ini juga jalan kalau request hanya mengirim `is_active` dan stok di database `0`

### Pesan error

- [ ] `attributes()` mengubah nama field ke bahasa Indonesia (minimal `price` → `harga`, `stock` → `stok`)
- [ ] Pesan error tidak menyebut nama tabel, query, atau path file

---

## Expected Output

```text
PATCH /products/1  {"price": "350.000"}
→ 200  {"data": {"id": 1, "price": 350000, ...}}

PATCH /products/1  {"slug": "mouse"}            (slug milik produk #2)
→ 422  {"message": "Slug sudah dipakai produk lain.", "errors": {"slug": [...]}}

PATCH /products/1  {"stock": 0, "is_active": true}
→ 422  {"errors": {"is_active": ["Produk dengan stok 0 tidak boleh diaktifkan."]}}
```

---

## Panduan Teknis

### Kenapa create dan update dipisah?

Ibarat formulir pendaftaran KTP vs formulir ganti alamat. Pendaftaran butuh semua
data. Ganti alamat cukup alamat baru — tapi alamat itu tetap harus valid.

`sometimes` artinya: "cek aturan ini **hanya kalau field-nya ada** di request".

```php
// Contoh di domain lain (profil user), BUKAN jawaban soal:
'bio' => ['sometimes', 'nullable', 'string', 'max:300'],
```

### Unik, tapi abaikan diri sendiri

Bayangkan nomor kursi di bioskop. Kamu pindah ke kursi yang sama dengan kursimu
sendiri — itu bukan bentrok. `Rule::unique(...)->ignore(...)` menyampaikan hal itu
ke validator. `ignore()` bisa menerima model atau id.

```php
// Contoh: email user unik kecuali milik user yang sedang diedit
Rule::unique('users', 'email')->ignore($this->user()->id),
```

### Merapikan input sebelum dicek

`prepareForValidation()` jalan **sebelum** `rules()`. Pakai `$this->merge([...])`
untuk mengganti nilai. Jangan "memaksa" nilai yang aneh jadi valid; cukup bersihkan
format, lalu biarkan rules yang memutuskan.

```php
// Contoh: rapikan nomor HP "0812-3456-7890" jadi "081234567890"
protected function prepareForValidation(): void
{
    if ($this->has('phone')) {
        $this->merge(['phone' => preg_replace('/\D+/', '', (string) $this->input('phone'))]);
    }
}
```

### Aturan yang butuh dua field

Rule biasa melihat satu field. Untuk "A boleh true hanya kalau B > 0", pakai method
`after()` yang mengembalikan array callable. Di dalamnya kamu dapat `$validator` dan
bisa `->errors()->add('field', 'pesan')`.

Pertanyaan yang harus kamu jawab sendiri: kalau field tidak dikirim, nilai mana yang
benar untuk dibandingkan?

---

## Verifikasi Hasil

```bash
php -l app/Http/Requests/UpdateProductRequest.php
php artisan route:list --path=products
php artisan test --filter=UpdateProduct
```

Uji manual dengan tinker untuk melihat hasil simpanan:

```bash
php artisan tinker
>>> App\Models\Product::find(1)->only(['price', 'slug', 'is_active', 'stock'])
```

---

## Cara Submit

1. Simpan `UpdateProductRequest.php` di `app/Http/Requests/`
2. Pakai di method `update` controller (type-hint menggantikan `Request`)
3. Tulis `tests/Feature/UpdateProductTest.php` minimal 8 test (satu per kriteria utama)
4. Jalankan `php artisan test` sampai hijau semua
5. Catat jawaban Refleksi di `catatan-07.md` di project latihanmu

---

## Catatan Penting

- ⚠️ **`sometimes` + `required` bukan kontradiksi.** Artinya "boleh tidak dikirim, tapi kalau dikirim jangan kosong".
- ⚠️ **`$this->route('product')` sudah berupa model** kalau route pakai `{product}` dan controller type-hint `Product $product`.
- 💡 **Policy `update` sudah ada** dari soal 08/01. Kalau belum, kerjakan dulu atau buat sementara yang mengizinkan admin saja.
- 📚 Teori lengkap: [Materi Teori 07](../../../materi-teori/07-form-validasi/README.md)

---

## Refleksi

1. Kenapa `prepareForValidation()` sebaiknya tidak mengubah `"tiga ratus"` menjadi `0`?
2. Apa yang terjadi kalau `ignore()` lupa dipasang? Coba dan catat pesannya.
3. Kenapa aturan "aktif vs stok" lebih aman dicek di server, padahal bisa juga disembunyikan di UI?
