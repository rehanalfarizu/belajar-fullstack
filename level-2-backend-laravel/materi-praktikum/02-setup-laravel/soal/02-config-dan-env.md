# SOAL 02 — Config Toko dan File `.env`

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuat file config sendiri di `config/` yang membaca nilai dari `.env`.
- Menjelaskan kenapa `env()` hanya boleh dipanggil di dalam folder `config/`.
- Membuktikan sendiri efek `php artisan config:cache` terhadap `env()`.
- Membuat endpoint yang hanya mengeluarkan data publik, bukan secret.
- Menulis feature test yang mengubah config sementara.

**Topik:** `.env`, `.env.example`, `config/*.php`, `env()`, `config()`, `config:cache`, `config:clear`, `config:show`, feature test

**Referensi utama:**

- [Laravel 13: Configuration](https://laravel.com/docs/13.x/configuration)
- [Laravel 13: Configuration Caching](https://laravel.com/docs/13.x/configuration#configuration-caching)
- [Laravel 13: HTTP Tests](https://laravel.com/docs/13.x/http-tests)
- [Modul Keamanan 07 — Konfigurasi Aman](../../../../modul-keamanan-web/07-konfigurasi-aman/README.md)

**Difficulty:** Menengah • **Estimasi:** 60 menit

---

## Briefing

Pemilik toko ingin nama toko, email kontak, dan batas jumlah barang di keranjang bisa
diganti **tanpa mengubah kode**. Di laptopmu nama tokonya "Toko Latihan". Di server
nanti mungkin "Toko Kampus Jaya". Kodenya harus sama persis, yang beda cuma isi `.env`.

Selain itu, ada endpoint publik `GET /tentang-toko` yang menampilkan info toko untuk
halaman "Tentang Kami". Endpoint ini dibuka siapa saja, jadi **tidak boleh** bocor
satu pun secret.

---

## Deskripsi

Buat `config/toko.php`, tambahkan tiga variabel `TOKO_*` ke `.env` dan `.env.example`,
buat route `GET /tentang-toko`, lalu tulis feature test `TentangTokoTest`.

---

## Syarat (Acceptance Criteria)

### File config

- [ ] Ada file `config/toko.php` yang me-`return` array dengan tepat 3 kunci: `nama`, `kontak_email`, `maks_item_keranjang`.
- [ ] `nama` default `Toko Latihan` kalau `TOKO_NAMA` tidak ada.
- [ ] `kontak_email` **tidak** punya default (null kalau tidak diisi).
- [ ] `maks_item_keranjang` default `20` dan bertipe `int`.

### `.env` dan `.env.example`

- [ ] `.env.example` berisi `TOKO_NAMA`, `TOKO_KONTAK_EMAIL`, `TOKO_MAKS_ITEM_KERANJANG` dengan nilai contoh (placeholder).
- [ ] `.env` berisi tiga variabel yang sama dengan nilai milikmu.
- [ ] `git check-ignore .env` di folder `toko-latihan` mencetak `.env` (artinya `.env` diabaikan Git).

### Route

- [ ] `GET /tentang-toko` mengembalikan status `200` dan JSON dengan 3 kunci di atas.
- [ ] Route **tidak** memanggil `env()`. Semua nilai lewat `config('toko.…')`.
- [ ] Response **tidak** mengandung `APP_KEY`, password database, atau path folder server.

### Test

- [ ] Ada `tests/Feature/TentangTokoTest.php` dengan minimal 2 test: happy path dan "tidak membocorkan `app.key`".
- [ ] Test tidak bergantung pada isi `.env` laptopmu (config diubah di dalam test).
- [ ] `php artisan test --filter=TentangTokoTest` hijau.

---

## Expected Output

```bash
curl -i http://127.0.0.1:8000/tentang-toko
```

```text
HTTP/1.1 200 OK
Content-Type: application/json

{"nama":"Toko Latihan","kontak_email":"halo@tokolatihan.test","maks_item_keranjang":20}
```

Perhatikan `20` tanpa tanda petik. Itu angka, bukan teks.

```bash
php artisan test --filter=TentangTokoTest
```

```text
PASS  Tests\Feature\TentangTokoTest
✓ tentang toko mengembalikan info publik
✓ tentang toko tidak membocorkan app key

Tests:    2 passed
```

---

## Panduan Teknis

### `.env` itu apa?

**Analogi:** `.env` itu kertas catatan di dompetmu: PIN ATM, nomor rekening. Kodenya
(aplikasi) sama di semua laptop, tapi kertas catatannya beda di tiap orang. Kertas itu
**tidak pernah** difotokopi dan ditempel di mading (Git).

`.env.example` adalah **formulir kosong** dengan nama kolom yang sama. Itu yang
di-commit, supaya teman setim tahu variabel apa saja yang perlu diisi.

### Kenapa `env()` cuma boleh di folder `config/`?

Di production, kita menjalankan `php artisan config:cache`. Laravel menggabungkan semua
file `config/*.php` jadi satu file cache yang cepat dibaca. Setelah itu **file `.env`
tidak dibaca lagi**. Akibatnya `env('APA_SAJA')` yang dipanggil di luar folder `config/`
akan mengembalikan `null`.

```text
Tanpa cache:   route ── env('X') ──▶ baca .env ──▶ "nilai"
Dengan cache:  route ── env('X') ──▶ (.env tidak dibaca) ──▶ null   ← bug!
               route ── config('a.x') ──▶ cache ──▶ "nilai"         ← aman
```

Contoh config di kasus lain (fitur newsletter), bukan jawaban soal:

```php
// config/newsletter.php
return [
    'aktif' => (bool) env('NEWSLETTER_AKTIF', false),
    'pengirim' => env('NEWSLETTER_PENGIRIM', 'noreply@contoh.test'),
];

// di controller
if (config('newsletter.aktif')) { /* ... */ }
```

### Semua isi `.env` itu teks

`TOKO_MAKS_ITEM_KERANJANG=20` dibaca sebagai string `"20"` (kecuali beberapa nilai khusus
seperti `true`, `false`, `null` yang dikonversi Laravel). Kalau kamu butuh angka, ubah
tipenya **sekali** di file config.

### Mengubah config di dalam test

Test tidak boleh bergantung pada `.env` laptopmu. Cari di dokumentasi Configuration:
bagaimana cara **mengisi** nilai config saat program berjalan (runtime). Cara yang
sama berlaku di dalam test.

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

Jalankan dari folder `toko-latihan`:

```bash
php -l config/toko.php
php artisan config:show toko                 # tampilkan isi config toko
php artisan route:list --path=tentang-toko   # route terdaftar
php artisan serve                            # terminal 1
curl -i http://127.0.0.1:8000/tentang-toko   # terminal 2 → 200 + JSON
php artisan test --filter=TentangTokoTest
```

Eksperimen cache (wajib, ini inti soalnya):

1. Tambahkan sementara route `/coba-env` yang return `env('TOKO_NAMA')`.
2. Buka `/coba-env` → muncul nama toko.
3. Jalankan `php artisan config:cache`, restart `php artisan serve`, buka lagi `/coba-env` → hasilnya kosong/null.
4. Buka `/tentang-toko` → tetap benar.
5. Jalankan `php artisan config:clear` dan **hapus** route `/coba-env`.

- [ ] Aku sudah melihat sendiri `env()` jadi null setelah `config:cache`.

---

## Cara Submit

1. Pastikan `php artisan test --filter=TentangTokoTest` hijau.
2. Pastikan `git status` di `toko-latihan` tidak menampilkan `.env`.
3. Tulis jawaban Refleksi di catatanmu.
4. Baru bandingkan dengan `contoh/`.

---

## Catatan Penting

- ⚠️ **Jangan pernah commit `.env`.** Kalau sudah terlanjur, menghapusnya dari commit berikutnya tidak cukup. Secret-nya tetap ada di riwayat Git dan harus diganti (rotate).
- ⚠️ Setelah mengubah `.env`, kalau config sedang di-cache, perubahanmu tidak terbaca. Jalankan `php artisan config:clear`.
- 💡 Nilai yang mengandung spasi di `.env` diberi tanda petik: `TOKO_NAMA="Toko Latihan"`.
- 📚 Baca [materi teori 02 — Setup Laravel](../../../materi-teori/02-setup-laravel/README.md) bagian `.env` dan config.

---

## Refleksi

1. Kenapa `kontak_email` sengaja dibuat tanpa default, sedangkan `nama` punya default? Apa untung-ruginya?
2. Apa yang terjadi kalau `maks_item_keranjang` tidak di-cast ke `int` lalu dibandingkan dengan `===` di kode lain?
3. Sebutkan 3 contoh data yang **tidak boleh** keluar dari endpoint publik seperti `/tentang-toko`.
