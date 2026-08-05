# Soal 10 — Production Readiness dan Deployment

## Tugas

Siapkan deployment plan yang memuat:

1. Build artifact dan dependency installation.
2. Environment/secret.
3. Database migration.
4. Cache dan queue worker.
5. Web root ke `public/`.
6. HTTPS dan security headers.
7. Health check, log, metrics, alert.
8. Backup dan restore drill.
9. Rollback.

## Simulasi

Buat script/checklist yang gagal bila:

- `APP_DEBUG=true`.
- `APP_KEY` kosong.
- `APP_ENV` bukan `production`.
- Database belum dapat dihubungi.

Jangan benar-benar mengubah server production untuk latihan. Dokumentasikan
command, expected output, failure mode, dan rollback command.
