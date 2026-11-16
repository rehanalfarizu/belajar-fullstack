#!/usr/bin/env bash
# Starter soal 10-03 — script deploy sederhana untuk toko-latihan.
#
# Salin ke root project:  cp 03-deploy.sh ~/latihan-laravel/toko-latihan/deploy.sh
# Beri izin jalan:        chmod +x deploy.sh
# Latihan aman:           DRY_RUN=1 ./deploy.sh   (hanya mencetak perintah)
#
# Starter ini SENGAJA belum lengkap. Setiap langkah yang kosong berhenti
# dengan exit 1 supaya kamu tidak mengira script sudah jadi.

# TODO(human): aktifkan mode "berhenti saat error" dan "error kalau variabel
# belum diisi" (tiga opsi set untuk bash strict mode).
echo "TODO: strict mode belum diaktifkan" >&2
exit 1

APP_DIR="${APP_DIR:-$(pwd)}"
DRY_RUN="${DRY_RUN:-0}"
SEDANG_DOWN=0

jalankan() {
    # TODO(human): cetak perintah dengan awalan "+ ", lalu jalankan
    # hanya kalau DRY_RUN bukan "1".
    echo "TODO: fungsi jalankan() belum dibuat" >&2
    exit 1
}

saat_keluar() {
    # TODO(human): kalau script keluar dengan status bukan 0 DAN aplikasi
    # sedang di maintenance, naikkan lagi aplikasinya.
    echo "TODO: fungsi saat_keluar() belum dibuat" >&2
    exit 1
}
# TODO(human): pasang saat_keluar() sebagai trap untuk event EXIT.

cd "$APP_DIR"

# ---- 1. Penjaga ----
# TODO(human): tolak deploy (pesan ke STDERR, exit 1) kalau:
#   - file .env tidak ada
#   - APP_DEBUG di .env bernilai true
#   - APP_KEY di .env kosong (jangan cetak nilainya!)
echo "TODO: penjaga belum dibuat" >&2
exit 1

# ---- 2. Maintenance mode ----
# TODO(human): php artisan down dengan --retry=60, lalu tandai SEDANG_DOWN=1.

# ---- 3. Kode dan dependency ----
# TODO(human): git pull yang hanya boleh fast-forward.
# TODO(human): composer install untuk production (tanpa paket dev, autoloader
#              dioptimasi, tanpa pertanyaan interaktif).
# TODO(human): npm ci lalu npm run build — hanya kalau ada package.json.

# ---- 4. Database, cache, queue ----
# TODO(human): jalankan migration dengan flag yang dibutuhkan di production.
# TODO(human): cache config/route/view/event dengan satu perintah artisan.
# TODO(human): suruh queue worker restart.

# ---- 5. Selesai ----
# TODO(human): php artisan up, reset SEDANG_DOWN=0, cetak "Deploy selesai."
echo "TODO: langkah deploy belum lengkap" >&2
exit 1
