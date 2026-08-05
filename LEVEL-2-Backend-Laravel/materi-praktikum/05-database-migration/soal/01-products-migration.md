# Soal 05 — Migration Products

## Tugas

Buat tabel `products` dengan:

- `id`
- `name` maksimal 120 karakter
- `slug` unik
- `description` nullable
- `price` integer non-negatif
- `stock` integer non-negatif
- `is_active` default `true`
- timestamps

Tambahkan index yang masuk akal untuk query produk aktif dan slug.

## Verifikasi

```bash
php artisan migrate
php artisan migrate:status
php artisan migrate:rollback
php artisan migrate
```

Jelaskan:

- Mengapa harga rupiah aman disimpan sebagai integer?
- Apa konsekuensi unique index?
- Mengapa migration production harus backward-aware?
