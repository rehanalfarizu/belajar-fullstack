# Soal 02 — Setup Laravel dan Health Check

## Tugas

1. Buat project Laravel baru.
2. Verifikasi versi PHP, Composer, Laravel, Node, dan npm.
3. Pastikan `.env` tidak masuk Git dan `.env.example` tersedia.
4. Tambahkan route `GET /health` yang mengembalikan JSON:

```json
{
  "status": "ok",
  "app": "belajar-laravel"
}
```

5. Tambahkan feature test untuk status `200` dan struktur JSON.

## Verifikasi

```bash
php artisan about
php artisan route:list
php artisan test
```

Jelaskan mengapa health check tidak boleh membocorkan secret, stack trace, atau
detail infrastruktur.
