# SOAL 03 — XSS, Escape, dan Form Aman di Blade

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuktikan sendiri bahwa `{!! !!}` dengan data user bisa menjalankan JavaScript penyerang (XSS).
- Memilih cara escape yang benar untuk **konteks** yang berbeda: isi HTML, atribut `href`, dan JavaScript.
- Menampilkan teks multi-baris dengan aman (`e()` dulu, baru `nl2br`).
- Menambahkan `@csrf` dan `@method('PUT')` pada form update.
- Menulis feature test yang membuktikan payload XSS tidak dirender mentah.

**Topik:** `{{ }}`, `{!! !!}`, `e()`, `nl2br()`, `Js::from()`, `@csrf`, `@method`, `assertSee()`, `assertDontSee()`

**Referensi utama:**

- [Laravel Docs: Blade — Displaying Data](https://laravel.com/docs/13.x/blade#displaying-data)
- [Laravel Docs: Blade — Rendering JSON](https://laravel.com/docs/13.x/blade#rendering-json)
- [Laravel Docs: CSRF Protection](https://laravel.com/docs/13.x/csrf)
- [OWASP: Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- Modul repo ini: [06 — XSS dan CSRF](../../../../modul-keamanan-web/06-xss-dan-csrf/README.md)

**Difficulty:** Lanjut • **Estimasi:** 120 menit

---

## Briefing

Toko latihanmu sekarang jadi marketplace kecil: **penjual lain** boleh
mengisi nama produk, deskripsi, dan link website toko mereka. Developer
sebelumnya menulis halaman detail produk pakai `{!! !!}` di mana-mana
"biar baris baru di deskripsi tampil". Seorang penjual iseng memasukkan
`<script>` di deskripsinya. Sekarang setiap pembeli yang membuka halaman itu
menjalankan script si penjual.

Kamu diminta jadi "tukang tambal": buktikan lubangnya, tambal, lalu buktikan
lagi lubangnya sudah tertutup.

---

## Deskripsi

Pasang `code/03-detail-produk-aman.blade.php` (versi **SENGAJA RENTAN**) sebagai
`resources/views/products/show.blade.php`. Serang dengan payload di bawah,
catat hasilnya, perbaiki minimal 5 lubang, lalu tulis feature test.

Payload yang dipakai:

```text
<script>alert('xss')</script>
<img src=x onerror=alert(1)>
javascript:alert(document.cookie)
Toko '; alert(1); //
```

---

## Syarat (Acceptance Criteria)

### Bukti Serangan (sebelum diperbaiki)

- [ ] File `catatan-xss.md` di project kamu berisi tabel: lubang ke-n, baris kode, payload yang dipakai, apa yang terjadi di browser
- [ ] Minimal 5 lubang tercatat (judul, pencarian `?q=`, deskripsi, link website, script JS, form tanpa CSRF)

### Perbaikan

- [ ] Tidak ada lagi `{!! ... !!}` yang membungkus data dari user **secara langsung**
- [ ] Satu-satunya `{!! !!}` yang boleh tersisa adalah untuk deskripsi multi-baris, dan isinya sudah di-escape dengan `e()` **sebelum** `nl2br()`
- [ ] Payload `<script>alert('xss')</script>` di nama, deskripsi, dan `?q=` tampil sebagai **teks**, tidak muncul popup
- [ ] Website dengan skema selain `http`/`https` (misal `javascript:`) **tidak** dirender sebagai link
- [ ] Data ke dalam `<script>` dikirim dengan `Js::from()` (atau `@json`), bukan dibungkus kutip manual
- [ ] Form punya `@csrf` dan `@method('PUT')`, dan `action` dibuat dengan `route()`
- [ ] Komentar `{{-- RENTAN #n diperbaiki: ... --}}` menjelaskan setiap tambalan

### Test

- [ ] `tests/Feature/ProductShowXssTest.php` punya minimal 2 test: payload script tidak dirender mentah, dan website `javascript:` tidak jadi link
- [ ] `php artisan test --filter=ProductShowXss` hijau

---

## Expected Output

Sebelum diperbaiki, View Page Source berisi tag mentah:

```html
<h1><script>alert('xss')</script></h1>
```

Sesudah diperbaiki, tag berubah jadi entity, jadi browser menampilkannya
sebagai teks:

```html
<h1>&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;</h1>
```

```bash
$ php artisan test --filter=ProductShowXss
   PASS  Tests\Feature\ProductShowXssTest
  ✓ payload script tidak dirender mentah
  ✓ website javascript: tidak jadi link
```

---

## Panduan Teknis

### Escape = Bungkus Plastik

Escape itu seperti **membungkus barang kiriman dengan plastik**. Isinya tetap
sampai utuh dan bisa dilihat, tapi tidak bisa "bocor" keluar dan mengotori
barang lain. `{{ $x }}` membungkus `<` jadi `&lt;`, jadi browser menampilkan
tanda kurung, bukan membuat tag baru.

`{!! $x !!}` = kirim tanpa plastik. Cuma aman kalau isinya **sudah kamu
bersihkan sendiri** di server.

### Konteks Itu Penting

Escape HTML tidak otomatis aman di semua tempat:

| Konteks | Contoh | Bahaya | Arah solusi |
|---|---|---|---|
| Isi tag HTML | `<p>...</p>` | `<script>` | `{{ }}` |
| Atribut URL | `href="..."` | `javascript:` tidak mengandung `<` sama sekali | cek skema URL |
| Di dalam `<script>` | `const x = '...'` | `'` menutup string, `</script>` menutup tag | encode sebagai JSON |

Contoh di domain LAIN (komentar blog), bukan jawaban soal:

```blade
{{-- Aman: isi komentar jadi teks biasa --}}
<p>{{ $komentar->isi }}</p>

{{-- Data ke JavaScript: biarkan Laravel yang meng-encode --}}
<script>
    const penulis = {{ Js::from($komentar->penulis) }};
</script>
```

### Baris Baru di Deskripsi

`nl2br()` mengubah baris baru jadi `<br>`. Tapi `nl2br()` tidak menghapus
tag HTML lain. Pikirkan urutannya: kalau kamu escape **sesudah** `nl2br`,
apa yang terjadi pada `<br>`? Kalau tidak escape sama sekali?

### CSRF dan Method Spoofing

Form HTML cuma bisa `GET` dan `POST`. Untuk `PUT`, Laravel membaca field
tersembunyi `_method`. Laravel 13 memeriksa asal request (`Sec-Fetch-Site`)
dan token CSRF lewat middleware `PreventRequestForgery`. Coba submit form
tanpa `@csrf` dan lihat status code yang muncul.

### Dua Lapis Pertahanan untuk URL

Lapis pertama: validasi input saat penjual menyimpan website (topik 07).
Lapis kedua: view tetap curiga. Data lama di database mungkin sudah kotor
sebelum validasi ditambahkan.

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php artisan tinker
# > $p = App\Models\Product::first();
# > $p->name = "<script>alert('xss')</script>";
# > $p->description = "Baris satu\n<img src=x onerror=alert(1)>";
# > $p->website = "javascript:alert(document.cookie)";
# > $p->save();
php artisan serve
curl -s "http://127.0.0.1:8000/products/1?q=%3Cscript%3Ealert(1)%3C/script%3E" | grep -n "script"
php artisan test --filter=ProductShowXss
```

Kalau model kamu belum punya kolom `website`, tambahkan dulu lewat migration
baru (`php artisan make:migration add_website_to_products_table`) dan
tambahkan ke `$fillable`.

- [ ] Buka halaman di browser: **tidak ada popup** sama sekali
- [ ] View Page Source: tidak ada `<script>alert` mentah dari data user
- [ ] Baris baru di deskripsi tetap tampil sebagai baris baru
- [ ] Link website hilang untuk `javascript:...`, muncul untuk `https://contoh.test`
- [ ] Hapus `@csrf` sebentar lalu submit form → status `419`. Kembalikan lagi.

---

## Cara Submit

1. `resources/views/products/show.blade.php` versi aman + komentar `RENTAN #n`.
2. `catatan-xss.md` berisi tabel bukti sebelum dan sesudah.
3. `tests/Feature/ProductShowXssTest.php` hijau.

---

## Catatan Penting

- ⚠️ **Jangan menyerang aplikasi orang lain.** Latihan ini hanya di `toko-latihan` milikmu sendiri di localhost.
- ⚠️ **`strip_tags()` bukan solusi XSS.** Ia tidak membersihkan atribut berbahaya dan gampang dikelabui.
- 💡 Kalau suatu hari kamu butuh rich text (bold, list) dari user, pakai library **HTML purifier** dengan allowlist tag di server, baru tampilkan dengan `{!! !!}`.
- 💡 `assertSee($teks)` meng-escape `$teks` dulu. `assertSee($teks, false)` mencari versi mentahnya. Pikirkan mana yang kamu butuhkan untuk membuktikan payload **tidak** dirender mentah.
- 📚 [Teori Blade](../../../materi-teori/04-blade-template/README.md) bagian XSS dan konteks.

---

## Refleksi

1. Kenapa `{{ $product->website }}` di dalam `href` masih bisa berbahaya walaupun sudah di-escape?
2. Siapa korban XSS di toko ini: penjual, pembeli, atau admin? Apa yang bisa dicuri?
3. Kenapa validasi input (topik 07) saja tidak cukup, dan view tetap harus escape?
4. Apa beda XSS dan CSRF? Kenapa `@csrf` tidak membantu sama sekali kalau halamanmu kena XSS?
