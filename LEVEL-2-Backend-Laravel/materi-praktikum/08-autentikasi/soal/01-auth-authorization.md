# Soal 08 — Authentication dan Authorization

## Tugas

1. Aktifkan autentikasi sesuai jenis aplikasi: session untuk Blade atau Sanctum
   cookie auth untuk SPA first-party.
2. Lindungi route create/update/delete dengan middleware `auth`.
3. Buat `ProductPolicy`.
4. User biasa hanya boleh melihat produk.
5. Admin boleh mengelola produk.
6. Tambahkan rate limit pada login.

## Kasus Uji

- Guest mendapat `401` atau redirect login sesuai jenis endpoint.
- User biasa mendapat `403`.
- Admin berhasil.
- Mengubah tampilan tombol tidak boleh menjadi satu-satunya authorization.

Jelaskan beda authentication, authorization, session, cookie, dan API token.
