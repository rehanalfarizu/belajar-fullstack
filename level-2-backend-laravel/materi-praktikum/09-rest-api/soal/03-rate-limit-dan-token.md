# SOAL 03 — Rate Limit dan Token API

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Mendefinisikan beberapa rate limiter bernama di `AppServiceProvider`
- Membuat endpoint tukar email+password menjadi token Sanctum dengan ability terbatas
- Mencabut token (logout API) dengan benar
- Membuktikan rate limit bekerja lewat status `429` dan header `Retry-After`
- Menjelaskan kenapa pesan login gagal harus generik

**Topik:** `RateLimiter::for`, `Limit::perMinute`, `throttle:`, Sanctum, `createToken`, `tokenCan`, `Hash::check`

**Referensi utama:**

- [Laravel: Rate Limiting di Routing](https://laravel.com/docs/13.x/routing#rate-limiting)
- [Laravel: Sanctum — API Token Authentication](https://laravel.com/docs/13.x/sanctum#api-token-authentication)
- [Laravel: Hashing](https://laravel.com/docs/13.x/hashing)
- [OWASP API4: Unrestricted Resource Consumption](https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/)

**Difficulty:** Lanjut • **Estimasi:** 120 menit

---

## Briefing

Aplikasi kasir Android sekarang perlu **menambah dan mengubah produk**, bukan
cuma membaca. Aplikasi mobile tidak memakai cookie session, jadi butuh token.

Minggu lalu log server menunjukkan satu IP mencoba login 4.000 kali dalam 10
menit memakai daftar password bocor. Endpoint login API kamu harus tahan
terhadap serangan tebak-tebakan seperti itu, dan token yang dibagikan harus
punya hak sesempit mungkin.

---

## Deskripsi

Definisikan 3 rate limiter, buat `POST /api/token` dan `DELETE /api/token`,
lindungi route tulis produk dengan `auth:sanctum` + limiter + cek ability, lalu
buktikan semuanya dengan curl dan feature test.

---

## Syarat (Acceptance Criteria)

### Persiapan

- [ ] `php artisan install:api` sudah dijalankan (ada `routes/api.php` dan tabel `personal_access_tokens`)
- [ ] Model `User` memakai trait `Laravel\Sanctum\HasApiTokens`

### Rate Limiter (di `AppServiceProvider::boot()`)

- [ ] Limiter `api`: 60 request/menit, kunci = id user kalau login, selain itu IP
- [ ] Limiter `login-api`: 5 request/menit, kunci = gabungan email (huruf kecil) + IP
- [ ] Limiter `login-api` mengembalikan JSON `429` dengan body `{"message": "Terlalu banyak percobaan. Coba lagi nanti."}`
- [ ] Limiter `tulis-produk`: 10 request/menit per user

### Endpoint Token

- [ ] `POST /api/token` menerima `email`, `password`, `device_name` (ketiganya wajib, divalidasi)
- [ ] Kalau email tidak ada **atau** password salah, response `422` dengan pesan yang **sama persis** untuk kedua kasus
- [ ] Kalau benar, response `201` berisi `{"token": "..."}` dengan ability **hanya** `produk:tulis`
- [ ] Route ini memakai `throttle:login-api`
- [ ] `DELETE /api/token` (butuh `auth:sanctum`) menghapus **token yang sedang dipakai saja**, response `204`

### Route Tulis Produk

- [ ] `POST`, `PUT`/`PATCH`, `DELETE` `/api/products...` memakai `auth:sanctum` dan `throttle:tulis-produk`
- [ ] Controller menolak dengan `403` kalau token tidak punya ability `produk:tulis`
- [ ] Controller **tetap** menjalankan policy (`Gate::authorize`) — ability bukan pengganti policy
- [ ] Route baca (`GET`) memakai `throttle:api`

### Keamanan

- [ ] Token tidak pernah ditulis ke log
- [ ] Password tidak pernah dikembalikan di response mana pun

---

## Expected Output

Login benar:

```text
HTTP/1.1 201 Created
{"token":"1|AbCdEf..."}
```

Login salah (email ada atau tidak ada, hasilnya sama):

```text
HTTP/1.1 422 Unprocessable Content
{"message":"Email atau password salah.","errors":{"email":["Email atau password salah."]}}
```

Percobaan login ke-6 dalam satu menit:

```text
HTTP/1.1 429 Too Many Requests
Retry-After: 54
{"message":"Terlalu banyak percobaan. Coba lagi nanti."}
```

Token tanpa ability `produk:tulis` mencoba `POST /api/products` → `403`.

---

## Panduan Teknis

### Limiter dengan kunci (contoh lain, bukan jawaban)

Limiter untuk endpoint **kirim OTP**: 3 kali per 10 menit per nomor HP.

```php
RateLimiter::for('kirim-otp', function (Request $request) {
    return Limit::perMinutes(10, 3)->by('otp|' . $request->input('phone'));
});
```

Pertanyaan untukmu: kenapa kunci login sebaiknya gabungan email **dan** IP?
Apa yang terjadi kalau kuncinya hanya IP? Hanya email?

### Response custom saat limit habis

Object `Limit` punya method `response()` yang menerima closure. Closure itu
menerima request dan array header. Header itu berisi `Retry-After` — jangan
dibuang.

### Kenapa pesan login harus generik?

Kalau pesannya "email tidak terdaftar" vs "password salah", penyerang bisa
mengecek email mana saja yang punya akun di tokomu. Ini disebut **user
enumeration**.

### Mencabut token

Dokumentasi Sanctum punya bagian "Revoking Tokens". Bedakan menghapus **semua**
token user dengan menghapus token **yang sedang dipakai** request ini.

### Ability vs policy

Ability menjawab: "token ini dibuat untuk keperluan apa?"
Policy menjawab: "user ini boleh mengubah produk ini?"
Keduanya harus lolos.

---

## Verifikasi Hasil (Wajib Dicek)

```bash
php -l app/Providers/AppServiceProvider.php
php -l routes/api.php
php artisan route:list --path=api -v   # lihat middleware tiap route

# Minta token
curl -i -X POST http://127.0.0.1:8000/api/token \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{"email":"admin@toko.test","password":"password-latihan","device_name":"kasir-1"}'

# Tebak password 7 kali, lihat status ke-6 dan ke-7
for i in 1 2 3 4 5 6 7; do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://127.0.0.1:8000/api/token \
    -H "Accept: application/json" -H "Content-Type: application/json" \
    -d '{"email":"admin@toko.test","password":"salah","device_name":"x"}'
done
# harus: 422 422 422 422 422 429 429

# Pakai token untuk menulis (ganti TOKEN)
curl -i -X POST http://127.0.0.1:8000/api/products \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name":"Mouse Wireless","slug":"mouse-wireless","price":175000,"stock":5,"category_id":1}'

# Cabut token, lalu coba pakai lagi → harus 401
curl -i -X DELETE http://127.0.0.1:8000/api/token \
  -H "Accept: application/json" -H "Authorization: Bearer TOKEN"
```

- [ ] Loop curl menghasilkan `429` di percobaan ke-6
- [ ] Response `429` punya header `Retry-After`
- [ ] Response sukses punya header `X-RateLimit-Remaining`
- [ ] Token yang sudah dicabut menghasilkan `401`
- [ ] Ada feature test untuk: login benar `201`, login salah `422`, tanpa ability `403`, setelah revoke `401`
- [ ] `php artisan test` hijau

---

## Cara Submit

1. Kerjakan `code/03-rate-limiter-api.php` (isinya potongan untuk 3 file berbeda; salin tiap bagian ke file tujuannya)
2. Jalankan semua perintah di "Verifikasi Hasil"
3. Simpan hasil loop curl ke `toko-latihan/CATATAN-09.md`
4. Jawab Refleksi di file yang sama

---

## Catatan Penting

- ⚠️ **Cache limiter.** Rate limiter memakai cache. Kalau angkanya "nyangkut"
  saat latihan, jalankan `php artisan cache:clear`.
- ⚠️ **Jangan simpan token di repo** atau di file catatan. Pakai placeholder
  `TOKEN` saat menulis catatan.
- 💡 Saat test, kamu bisa pakai `Sanctum::actingAs($user, ['produk:tulis'])`
  supaya tidak perlu login sungguhan.
- 📚 Baca [Modul Keamanan 04 — Autentikasi dan Password](../../../../modul-keamanan-web/04-autentikasi-dan-password/README.md).

---

## Refleksi

1. Penyerang memakai 1.000 IP berbeda (botnet). Apakah limiter `login-api`
   masih menolong? Apa lapisan tambahan yang bisa dipakai?
2. Kenapa `plainTextToken` hanya bisa dilihat sekali?
3. Kapan sebaiknya token diberi masa berlaku (expiration)?
4. Apa yang terjadi pada aplikasi kasir kalau limiter `api` diset 5/menit?
