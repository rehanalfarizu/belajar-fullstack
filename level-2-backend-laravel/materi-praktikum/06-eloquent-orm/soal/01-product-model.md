# Soal 06 — Eloquent Product dan Category

## Tugas

1. Buat model `Product` dan `Category`.
2. `Category hasMany Product`; `Product belongsTo Category`.
3. Definisikan `$fillable` dan casts yang diperlukan.
4. Tambahkan scope `active()` dan `inStock()`.
5. Ambil produk aktif beserta category dengan eager loading.
6. Buat factory dan seeder.

## Analisis

Bandingkan jumlah query dengan dan tanpa `with('category')`. Jelaskan masalah
N+1 dan mengapa eager loading bukan berarti semua relasi harus selalu dimuat.

Tambahkan test untuk relasi, scope, dan mass assignment.
