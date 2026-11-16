#!/usr/bin/env bash
# SOLUSI REFERENSI soal 10-03 — script deploy sederhana untuk toko-latihan.
#
# Pemakaian (dari folder project di server):
#   ./deploy.sh
# Latihan aman tanpa menjalankan apa pun (hanya mencetak perintah):
#   DRY_RUN=1 ./deploy.sh
# Opsional: URL rahasia saat maintenance
#   MAINTENANCE_SECRET="isi-sendiri-yang-panjang" ./deploy.sh

# -e: berhenti kalau ada perintah gagal
# -u: error kalau memakai variabel yang belum diisi
# -o pipefail: pipa dianggap gagal kalau salah satu bagiannya gagal
set -euo pipefail

APP_DIR="${APP_DIR:-$(pwd)}"
DRY_RUN="${DRY_RUN:-0}"
SEDANG_DOWN=0

# Cetak perintah, lalu jalankan kecuali mode DRY_RUN.
jalankan() {
    echo "+ $*"
    if [[ "$DRY_RUN" != "1" ]]; then
        "$@"
    fi
}

gagal() {
    echo "DEPLOY DIBATALKAN: $*" >&2
    exit 1
}

# Dipanggil saat script keluar. Kalau keluar karena error dan aplikasi
# masih di mode maintenance, naikkan lagi supaya situs tidak "nyangkut" 503.
saat_keluar() {
    local status=$?
    if [[ $status -ne 0 && $SEDANG_DOWN -eq 1 ]]; then
        echo "Deploy gagal (exit $status). Mengeluarkan aplikasi dari maintenance..." >&2
        jalankan php artisan up || true
        echo "Cek storage/logs/laravel.log dan pertimbangkan rollback." >&2
    fi
}
trap saat_keluar EXIT

cd "$APP_DIR"

# ---------------------------------------------------------------
# 1. Penjaga: tolak deploy kalau konfigurasi berbahaya
# ---------------------------------------------------------------
[[ -f .env ]] || gagal ".env tidak ditemukan di $APP_DIR"

# APP_DEBUG=true (atau 1/on/yes, dengan/tanpa kutip, huruf besar/kecil)
if grep -Eiq '^[[:space:]]*APP_DEBUG[[:space:]]*=[[:space:]]*"?(true|1|on|yes)"?[[:space:]]*$' .env; then
    gagal "APP_DEBUG masih true. Ubah jadi false sebelum deploy."
fi

# APP_KEY kosong. Nilainya TIDAK dicetak.
if ! grep -Eq '^[[:space:]]*APP_KEY[[:space:]]*=[[:space:]]*"?[^"[:space:]]+' .env; then
    gagal "APP_KEY kosong. Jalankan php artisan key:generate sekali di server ini."
fi

echo "Penjaga lulus. Mulai deploy di $APP_DIR (DRY_RUN=$DRY_RUN)"

# ---------------------------------------------------------------
# 2. Maintenance mode
# ---------------------------------------------------------------
if [[ -n "${MAINTENANCE_SECRET:-}" ]]; then
    # Jangan lewat jalankan(): rahasia tidak boleh tercetak di log CI.
    echo "+ php artisan down --retry=60 --secret=[disamarkan]"
    if [[ "$DRY_RUN" != "1" ]]; then
        php artisan down --retry=60 --secret="$MAINTENANCE_SECRET"
    fi
else
    jalankan php artisan down --retry=60
fi
SEDANG_DOWN=1

# ---------------------------------------------------------------
# 3. Ambil kode dan dependency
# ---------------------------------------------------------------
jalankan git pull --ff-only
jalankan composer install --no-dev --optimize-autoloader --no-interaction

if [[ -f package.json ]]; then
    jalankan npm ci
    jalankan npm run build
fi

# ---------------------------------------------------------------
# 4. Database dan cache
# ---------------------------------------------------------------
# --force wajib di production (tanpa itu artisan minta konfirmasi).
jalankan php artisan migrate --force

# Cache config/route/view/event. Setelah ini .env tidak dibaca lagi.
jalankan php artisan optimize

# Worker queue lama memakai kode lama di memori; suruh restart.
jalankan php artisan queue:restart

# ---------------------------------------------------------------
# 5. Selesai
# ---------------------------------------------------------------
jalankan php artisan up
SEDANG_DOWN=0

echo "Deploy selesai."
