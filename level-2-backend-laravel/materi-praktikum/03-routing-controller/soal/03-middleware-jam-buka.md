# SOAL 03 — Middleware Jam Buka Toko

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Menulis middleware kustom dengan logika **sebelum** dan **sesudah** controller.
- Menghentikan request lebih awal dengan response JSON dan status code yang tepat.
- Mendaftarkan alias middleware di `bootstrap/app.php` dan memasangnya ke route group.
- Menguji logika berbasis waktu dengan **time travel**, bukan menunggu jam sungguhan.

**Topik:** `php artisan make:middleware`, `handle(Request, Closure $next)`, `$middleware->alias()`, `->middleware()`, status `503`, `$this->travelTo()`

**Referensi utama:**

- [Laravel Docs: Middleware](https://laravel.com/docs/13.x/middleware)
- [Laravel Docs: Middleware — Aliases](https://laravel.com/docs/13.x/middleware#middleware-aliases)
- [Laravel Docs: Mocking — Interacting With Time](https://laravel.com/docs/13.x/mocking#interacting-with-time)
- [MDN: 503 Service Unavailable](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503)

**Difficulty:** Lanjut • **Estimasi:** 90–120 menit

---

## Briefing

Pemilik toko cuma bisa memproses pesanan jam 08.00–21.00 WIB. Di luar jam
itu, pembeli tetap boleh **melihat** katalog, tapi tidak boleh **mengubah**
apa pun (pesan, ubah, hapus). Aturan ini berlaku ke banyak route, jadi tidak
masuk akal ditulis ulang di setiap controller. Ini tugas middleware.

---

## Deskripsi

Lengkapi `code/03-middleware-jam-buka.php` menjadi
`app/Http/Middleware/PastikanTokoBuka.php`, daftarkan alias `toko.buka`,
pasang ke group katalog dari Soal 02, tambah satu route `POST /katalog/pesan`
untuk latihan, lalu buktikan dengan feature test berbasis waktu.

---

## Syarat (Acceptance Criteria)

### Middleware

- [ ] Class `App\Http\Middleware\PastikanTokoBuka` punya method `handle(Request $request, Closure $next): Response`
- [ ] Jam buka dan tutup dibaca dari `config()` dengan default `8` dan `21` (tidak di-hardcode di dalam `if`)
- [ ] Zona waktu yang dipakai `Asia/Jakarta`, bukan zona waktu server
- [ ] Toko dianggap buka bila `jam >= jam_buka` dan `jam < jam_tutup` (21:00 tepat = tutup)
- [ ] Saat tutup, request `POST`, `PUT`, `PATCH`, `DELETE` dibalas `503` dengan JSON `{"message": "Toko sedang tutup"}`
- [ ] Saat tutup, request `GET` tetap diteruskan ke controller
- [ ] **Semua** response (termasuk `503`) punya header `X-Toko-Status` bernilai `buka` atau `tutup`

### Registrasi

- [ ] Alias `toko.buka` didaftarkan di `bootstrap/app.php` lewat `->withMiddleware(...)`
- [ ] Group katalog dari Soal 02 memakai middleware `toko.buka`
- [ ] `php artisan route:list -v --name=katalog` menampilkan `toko.buka` / `PastikanTokoBuka` di route katalog

### Test

- [ ] Ada `tests/Feature/PastikanTokoBukaTest.php` dengan minimal 4 test: POST jam 10 (lolos), POST jam 22 (`503`), GET jam 22 (`200`), POST jam 21:00 tepat (`503`)
- [ ] Test memakai time travel, sehingga hasilnya sama kapan pun dijalankan
- [ ] `php artisan test --filter=PastikanTokoBuka` hijau semua

---

## Expected Output

```bash
$ php artisan test --filter=PastikanTokoBuka

   PASS  Tests\Feature\PastikanTokoBukaTest
  ✓ POST saat buka berhasil
  ✓ POST saat tutup ditolak 503
  ✓ GET saat tutup tetap boleh
  ✓ jam 21:00 tepat sudah tutup

  Tests:    4 passed
```

```bash
$ curl -i http://127.0.0.1:8000/katalog
HTTP/1.1 200 OK
X-Toko-Status: buka        # atau "tutup", tergantung jam laptopmu
Content-Type: application/json
```

Nama test di output tergantung judul yang kamu tulis.

---

## Panduan Teknis

### Middleware = Lapisan Bawang

Bayangkan request itu tamu yang masuk ke rumah lewat beberapa pintu. Setiap
pintu (middleware) boleh:

1. **Sebelum** membuka pintu berikutnya: memeriksa tamu, atau mengusirnya.
2. Memanggil `$next($request)` untuk membuka pintu berikutnya.
3. **Sesudah** tamu kembali membawa jawaban (response): menempel sesuatu.

```text
request → [middleware A: sebelum] → [middleware B: sebelum] → controller
response ← [middleware A: sesudah] ← [middleware B: sesudah] ←
```

Contoh di domain LAIN (mencatat lama proses), bukan jawaban soal:

```php
public function handle(Request $request, Closure $next): Response
{
    $mulai = microtime(true);          // SEBELUM

    $response = $next($request);       // lanjut ke dalam

    $ms = (microtime(true) - $mulai) * 1000;
    $response->headers->set('X-Durasi-Ms', (string) round($ms));  // SESUDAH

    return $response;
}
```

Perhatikan: kalau kamu `return` sebelum memanggil `$next`, controller tidak
pernah jalan. Itu cara middleware "mengusir tamu".

### Kenapa 503, bukan 403?

- `403` = "kamu tidak berhak". Masalahnya di **orangnya**.
- `503` = "layanan sedang tidak tersedia". Masalahnya di **kondisi server/toko**.

Pikirkan: kalau besok pagi orang yang sama mencoba lagi, apakah berhasil?

### Waktu di dalam Test

Jangan menulis test yang hanya lulus kalau dijalankan malam hari. Laravel
bisa "memutar jam" di dalam test. Cari `travelTo` di halaman Mocking. Buat
waktu dengan zona `Asia/Jakarta` supaya jam 22 benar-benar jam 22 WIB.

### CSRF dan curl

Route di `routes/web.php` dilindungi middleware CSRF (`PreventRequestForgery`
di Laravel 13, `ValidateCsrfToken` di Laravel 12). Jadi `curl -X POST` tanpa
token akan dapat `419`, sebelum middleware kamu sempat bekerja. Itu normal.
Untuk menguji POST, pakai feature test (CSRF otomatis nonaktif saat test).

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php -l app/Http/Middleware/PastikanTokoBuka.php
php -l bootstrap/app.php
php artisan route:list -v --name=katalog
php artisan test --filter=PastikanTokoBuka
php artisan serve
# terminal lain:
curl -i http://127.0.0.1:8000/katalog              # cek header X-Toko-Status
curl -i -X POST http://127.0.0.1:8000/katalog/pesan # kemungkinan 419 (CSRF) — jelaskan kenapa
```

- [ ] Ganti sementara `jam_tutup` jadi jam sekarang lewat `config/toko.php` (buat file ini kalau belum ada, isinya array `jam_buka`, `jam_tutup`, `zona_waktu`) → `GET /katalog` menampilkan `X-Toko-Status: tutup`. Kalau sebelumnya kamu menjalankan `php artisan config:cache`, jalankan `php artisan config:clear` dulu.
- [ ] Hapus panggilan `$next($request)` sebentar → apa yang terjadi pada test GET? Kembalikan lagi.

---

## Cara Submit

1. File final: `app/Http/Middleware/PastikanTokoBuka.php`, `bootstrap/app.php`, `routes/web.php`, `tests/Feature/PastikanTokoBukaTest.php`.
2. `php artisan test` hijau.
3. Jawab Refleksi di `catatan-routing.md`.

---

## Catatan Penting

- ⚠️ **Jangan pakai `date('H')` tanpa zona waktu.** Server production sering memakai UTC. Jam 22 WIB = jam 15 UTC.
- ⚠️ **Header harus ada juga di response `503`.** Response yang kamu buat sendiri tidak melewati bagian "sesudah".
- 💡 Middleware cocok untuk aturan yang berlaku ke **banyak** route. Aturan untuk satu aksi saja lebih cocok di controller atau policy.
- 📚 Baca bagian middleware di [teori routing & controller](../../../materi-teori/03-routing-controller/README.md).

---

## Refleksi

1. Gambar urutan "sebelum/sesudah" kalau ada dua middleware di group yang sama. Mana yang jalan duluan?
2. Kenapa aturan jam buka lebih cocok di middleware daripada di setiap controller?
3. Apa beda `503` dan `403` menurutmu? Kenapa status code yang tepat penting untuk frontend dan monitoring?
4. Bagaimana kalau toko buka 22.00–02.00 (lewat tengah malam)? Logika `>=` dan `<` kamu masih benar? Tulis idenya, tidak perlu kode.
