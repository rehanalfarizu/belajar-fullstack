# MATERI TEORI 07 — Form Request & Validasi

> Target: Laravel 13 (rilis Maret 2026) dan PHP 8.3+. Semua contoh di sini juga
> jalan di Laravel 12.

Praktikum: [07 — Form Request & Validasi](../../materi-praktikum/07-form-validasi/README.md)

---

## 1. Validasi Itu Apa?

Validasi = **mengecek bentuk data sebelum dipakai**. Kalau tidak cocok, tolak dan
beri tahu alasannya.

**Analogi:** petugas loket bank. Formulir setoran tanpa nomor rekening? Dikembalikan.
Jumlah uang ditulis "seratus ribuan"? Dikembalikan. Petugas tidak menebak-nebak, dan
tidak memproses formulir yang salah.

Validasi menjawab satu pertanyaan saja: **"Apakah bentuk input ini benar?"**

Dia **tidak** menjawab:

- "Siapa user ini?" → itu autentikasi (topik 08)
- "Apakah user ini boleh melakukan aksi ini?" → itu otorisasi (topik 08)
- "Apakah data ini aman ditampilkan di HTML?" → itu escaping (topik 04)

---

## 2. Kenapa Harus di Server?

**Analogi:** tulisan "Wajib pakai helm" di gerbang parkir. Orang yang patuh pakai
helm. Tapi satpam tetap harus mengecek, karena tulisan tidak bisa menghentikan siapa pun.

Validasi HTML (`required`, `min`, `maxlength`, `type="email"`) dan validasi JavaScript
berjalan di **browser pengguna**. Pengguna bisa:

- Mengedit HTML lewat DevTools dan menghapus atributnya
- Mematikan JavaScript
- Tidak memakai browser sama sekali: curl, Postman, script Python, aplikasi mobile

```text
Browser (milik pengguna)          Server (milik kamu)
┌──────────────────────┐          ┌───────────────────────┐
│ required, min="0"    │  ──────► │ $request->validate()  │
│ = KENYAMANAN (UX)    │          │ = PENGAMAN            │
└──────────────────────┘          └───────────────────────┘
   bisa dilewati                     tidak bisa dilewati
```

Jadi aturannya sederhana: **validasi client boleh ada, validasi server wajib ada.**

Kenapa penting buat kerja: data kotor di database itu mahal. Harga minus bisa bikin
laporan keuangan salah. Stok minus bisa bikin pesanan yang tidak bisa dikirim.
Membersihkannya setelah terlanjur masuk jauh lebih repot daripada menolaknya di pintu.

---

## 3. Cara Paling Cepat: `$request->validate()`

```php
public function store(Request $request)
{
    $data = $request->validate([
        'judul' => ['required', 'string', 'max:150'],
        'isi'   => ['required', 'string'],
    ]);

    // Kalau sampai baris ini, $data sudah valid.
    Article::create($data);
}
```

Apa yang terjadi kalau gagal? Laravel melempar `ValidationException`, lalu:

| Jenis request | Respons otomatis |
|---|---|
| Form biasa dari browser | Redirect `302` ke halaman sebelumnya + `$errors` + `old()` |
| Request JSON (`Accept: application/json`) | Status `422` + JSON berisi `message` dan `errors` |

Kamu **tidak perlu** menulis `if` untuk dua kasus itu. Laravel memilih sendiri
berdasarkan header request.

Bentuk JSON 422:

```json
{
  "message": "The judul field is required. (and 1 more error)",
  "errors": {
    "judul": ["The judul field is required."],
    "isi": ["The isi field is required."]
  }
}
```

---

## 4. Form Request: Satpam Punya Ruangan Sendiri

**Analogi:** di warung kecil, kasir sekaligus memeriksa uang palsu. Di supermarket,
ada petugas khusus. Form Request adalah "petugas khusus" itu — aturan validasi pindah
ke class sendiri, controller jadi bersih.

Buat dengan:

```bash
php artisan make:request StoreArticleRequest
```

Hasilnya di `app/Http/Requests/`. Method yang bisa kamu isi, sesuai urutan jalannya:

```text
1. authorize()             → boleh lanjut? false = 403
2. prepareForValidation()  → rapikan input dulu
3. rules()                 → aturan per field
4. after()                 → aturan yang butuh beberapa field
5. passedValidation()      → hook setelah lolos (jarang dipakai)
```

Plus dua method pelengkap:

- `messages()` → pesan error khusus, misal `'isi.required' => 'Isi artikel wajib diisi.'`
- `attributes()` → nama field yang ramah, misal `'isi' => 'isi artikel'`

Contoh (domain artikel, bukan produk):

```php
final class StoreArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Article::class) ?? false;
    }

    public function rules(): array
    {
        return [
            'judul' => ['required', 'string', 'max:150'],
            'isi'   => ['required', 'string'],
        ];
    }

    public function attributes(): array
    {
        return ['judul' => 'judul artikel'];
    }
}
```

Di controller tinggal type-hint:

```php
public function store(StoreArticleRequest $request)
{
    Article::create($request->validated());
}
```

Kalau `authorize()` mengembalikan `false`, user dapat `403` **sebelum** validasi
jalan. Kalau kamu memang tidak memakai otorisasi di sini (misal sudah ditangani
middleware), kembalikan `true` — tapi lakukan itu dengan sadar, bukan asal.

---

## 5. Rule yang Sering Dipakai

| Rule | Arti | Contoh pakai |
|---|---|---|
| `required` | Wajib ada dan tidak kosong | nama |
| `nullable` | Boleh `null` | deskripsi |
| `sometimes` | Cek hanya kalau field dikirim | PATCH |
| `string`, `integer`, `numeric`, `boolean` | Tipe data | |
| `min:x`, `max:x` | Batas (angka = nilai, string = panjang, file = KB) | `max:120` |
| `between:a,b` | Di antara a dan b | rating 1–5 |
| `in:a,b,c` / `Rule::in([...])` | Hanya nilai dari daftar | status |
| `Rule::enum(Status::class)` | Hanya nilai dari PHP enum | status |
| `exists:tabel,kolom` | Harus ada di database | `category_id` |
| `unique:tabel,kolom` | Tidak boleh dobel | slug, email |
| `email`, `url` | Format | |
| `alpha_dash` | Huruf, angka, `-`, `_` | slug |
| `confirmed` | Harus sama dengan `field_confirmation` | password |
| `Password::defaults()` | Aturan password standar aplikasi | register |

Tulis rule sebagai **array**, bukan string `'required|max:120'`. Array lebih mudah
dibaca dan bisa dicampur dengan object rule seperti `Rule::unique(...)`.

### `required` vs `nullable` vs `sometimes`

**Analogi:** formulir pendaftaran lomba.

- `required` — "Nama peserta: wajib diisi"
- `nullable` — "Nama tim: boleh dikosongkan"
- `sometimes` — "Kalau kamu menulis nomor HP, harus 10–13 digit" (tidak menulis = tidak dicek)

### Unik saat edit

Saat edit, data milik sendiri jangan dianggap bentrok:

```php
// Email user unik, kecuali email miliknya sendiri
Rule::unique('users', 'email')->ignore($this->user()->id),
```

Lupa `ignore()` = user tidak bisa menyimpan profil tanpa ganti email. Bug klasik.

### Validasi array

Untuk input berbentuk daftar, misal isi keranjang:

```php
'items'          => ['required', 'array', 'min:1'],
'items.*.id'     => ['required', 'integer', 'exists:products,id'],
'items.*.jumlah' => ['required', 'integer', 'min:1', 'max:99'],
```

Tanda `*` artinya "setiap elemen".

---

## 6. Merapikan Input: `prepareForValidation()`

**Analogi:** petugas pos menulis ulang kode pos yang ditulis "40-1 32" jadi "40132"
sebelum memeriksa apakah kode posnya ada. Merapikan format, bukan mengarang isi.

```php
protected function prepareForValidation(): void
{
    if ($this->has('kode_pos')) {
        $this->merge([
            'kode_pos' => preg_replace('/\D+/', '', (string) $this->input('kode_pos')),
        ]);
    }
}
```

Aturan emasnya: **jangan ubah nilai yang aneh menjadi valid.** Kalau orang mengetik
"lima ribu" di kolom angka, biarkan rule `integer` yang menolak. Jangan diam-diam
diubah jadi `0`.

---

## 7. Aturan Antar-Field: `after()`

Rule biasa hanya melihat satu field. Kadang aturannya melibatkan dua: "tanggal selesai
harus setelah tanggal mulai" (ini ada rule-nya: `after:tanggal_mulai`), atau "diskon
tidak boleh lebih besar dari harga" (tidak ada rule bawaan).

```php
public function after(): array
{
    return [
        function (Validator $validator): void {
            if ((int) $this->input('diskon') > (int) $this->input('harga')) {
                $validator->errors()->add('diskon', 'Diskon tidak boleh melebihi harga.');
            }
        },
    ];
}
```

Untuk aturan yang dipakai di banyak tempat, buat **Rule class** sendiri:

```bash
php artisan make:rule NomorHpIndonesia
```

---

## 8. Ambil Data yang Sudah Valid

| Cara | Isi |
|---|---|
| `$request->validated()` | Semua field yang ada di `rules()` dan lolos |
| `$request->safe()->only(['a', 'b'])` | Sebagian field yang lolos |
| `$request->safe()->except(['c'])` | Semua yang lolos kecuali beberapa |
| `$request->all()` | **Semua** input, termasuk yang tidak divalidasi ⚠️ |

Kenapa `all()` berbahaya? Penyerang bisa menambah field `is_admin=1` atau
`user_id=5`. Field itu tidak ada di rules, jadi tidak dicek, tapi tetap ikut di `all()`.
Kalau model kebetulan mengizinkan field itu, jadilah celah **mass assignment**
(dibahas di topik 06).

```php
// Pola aman: data dari user + data yang ditentukan server
$artikel = Article::create([
    ...$request->validated(),
    'user_id' => $request->user()->id,  // dari server, bukan dari input
]);
```

---

## 9. Menampilkan Error di Blade

Setelah redirect, view otomatis punya variabel `$errors`.

```blade
<label for="judul">Judul</label>
<input id="judul" name="judul" value="{{ old('judul') }}"
       aria-describedby="judul-error">
@error('judul')
    <p id="judul-error" role="alert">{{ $message }}</p>
@enderror
```

- `old('judul')` mengisi ulang nilai yang tadi diketik, supaya user tidak mengetik ulang.
- `@error('judul') ... @enderror` hanya muncul kalau field itu gagal.
- Jangan pernah `old('password')` — password tidak di-flash ke session, dan memang jangan.

Ringkasan semua error sekaligus:

```blade
@if ($errors->any())
    <ul role="alert">
        @foreach ($errors->all() as $pesan)
            <li>{{ $pesan }}</li>
        @endforeach
    </ul>
@endif
```

---

## 10. Pesan Error Bahasa Indonesia

Dua cara:

1. **Per Form Request:** isi `messages()` dan `attributes()`.
2. **Satu aplikasi:** publish file bahasa lalu terjemahkan.

```bash
php artisan lang:publish
```

Perintah itu membuat folder `lang/en/`. Salin jadi `lang/id/`, terjemahkan
`validation.php`, lalu set `APP_LOCALE=id` di `.env`.

### Pesan error yang aman

Pesan error untuk **pengguna**, bukan untuk developer.

| ❌ Buruk | ✅ Baik |
|---|---|
| "SQLSTATE[23000]: Integrity constraint violation products_slug_unique" | "Slug sudah dipakai." |
| "Category id 99 not found in table categories" | "Kategori tidak ditemukan." |
| "User dengan email ini sudah terdaftar" (di form login) | "Email atau password salah." |

Pesan yang terlalu jujur membocorkan struktur database atau membantu penyerang
menebak data. Detail teknis cukup masuk ke log.

---

## 11. Validasi vs Sanitasi vs Otorisasi

| | Pertanyaan | Kalau gagal | Contoh |
|---|---|---|---|
| Validasi | Bentuknya benar? | `422` | harga harus angka ≥ 0 |
| Sanitasi | Perlu dirapikan? | (dirapikan, tidak ditolak) | trim spasi, hapus titik ribuan |
| Otorisasi | Boleh melakukan ini? | `403` | hanya admin yang boleh edit |
| Escaping | Aman ditampilkan? | (di-escape saat output) | `{{ }}` di Blade |

Keempatnya saling melengkapi. Validasi tidak menggantikan escaping: deskripsi produk
`<b>Murah</b>` lolos validasi `string`, tapi tetap harus di-escape saat ditampilkan.

---

## 12. Menguji Validasi

Test adalah bukti bahwa aturanmu benar-benar jalan.

```php
test('judul kosong ditolak', function () {
    $this->postJson('/api/articles', ['judul' => '', 'isi' => 'abc'])
        ->assertUnprocessable()                 // status 422
        ->assertJsonValidationErrors(['judul']); // error ada di field judul
});

test('form web kembali dengan error', function () {
    $this->from('/articles/create')
        ->post('/articles', ['judul' => ''])
        ->assertRedirect('/articles/create')
        ->assertSessionHasErrors(['judul']);
});
```

Feature test otomatis melewati pengecekan CSRF, jadi kamu bisa fokus ke validasi.

Pola yang bagus: satu payload valid, lalu **ubah satu field per test**. Dengan begitu
kalau test gagal, kamu langsung tahu aturan mana yang bermasalah.

---

## 13. Kesalahan Umum

1. **Hanya validasi di frontend.** Sudah dibahas — selalu validasi di server.
2. **Menyimpan `$request->all()`.** Pakai `validated()`.
3. **`authorize()` return `true` tanpa mikir.** Hasilnya semua orang boleh.
4. **Lupa `ignore()` di rule unique saat update.** User tidak bisa simpan tanpa ganti nilai.
5. **Satu Form Request untuk create dan update** padahal aturannya beda (PATCH butuh `sometimes`).
6. **Mengubah nilai aneh jadi valid** di `prepareForValidation()`.
7. **Pesan error membocorkan detail database.**
8. **Menulis `if (empty($request->name))` manual** di mana-mana, bukan memakai rules.
9. **Tidak menulis test untuk kasus gagal.** Happy path saja tidak cukup.
10. **Mengira `419` artinya validasi bekerja.** `419` itu CSRF, bukan validasi.

---

## 14. Catatan Laravel 13

Laravel 13 memperluas dukungan **PHP attributes** di banyak tempat (controller,
Eloquent, queue, juga validation). Cara klasik dengan method `rules()`, `messages()`,
dan `attributes()` tetap didukung dan masih paling banyak dipakai di codebase kantor,
jadi materi ini memakai cara klasik.

---

## 15. Glosarium

| Istilah | Arti |
|---|---|
| Validasi | Mengecek bentuk input, menolak yang salah |
| Sanitasi | Merapikan input tanpa menolak |
| Rule | Satu aturan validasi |
| Form Request | Class khusus validasi + otorisasi |
| `ValidationException` | Exception yang dilempar saat validasi gagal |
| `$errors` | Kumpulan pesan error di view (`MessageBag`) |
| `old()` | Nilai input sebelumnya dari session |
| Flash session | Data session yang hanya hidup untuk satu request berikutnya |
| `422 Unprocessable Content` | Input tidak lolos validasi |
| `419` | Token CSRF hilang/kedaluwarsa (khusus Laravel) |
| Mass assignment | Mengisi banyak kolom model sekaligus dari array |

---

## Bacaan Lanjut

- [Laravel 13: Validation](https://laravel.com/docs/13.x/validation)
- [Laravel 13: HTTP Tests](https://laravel.com/docs/13.x/http-tests)
- [Laravel 13: Localization](https://laravel.com/docs/13.x/localization)
- [OWASP: Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [Modul Keamanan 02 — Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md)

Lanjut praktik: [Praktikum 07](../../materi-praktikum/07-form-validasi/README.md)
