# Soal 04 — Blade Product List

## Tugas

Buat layout dan halaman list produk:

1. Gunakan `@extends`, `@section`, dan Blade component atau partial.
2. Tampilkan nama, harga, stok, dan status.
3. Gunakan `@forelse` untuk empty state.
4. Beri link ke halaman detail dengan `route()`.
5. Tampilkan flash message setelah create/update.

## Keamanan dan Aksesibilitas

- Gunakan `{{ }}`, bukan raw HTML.
- Struktur heading harus berurutan.
- Link dan tombol harus memiliki label jelas.
- Jangan menjalankan query Eloquent di Blade.

Uji halaman dengan data kosong, satu produk, dan banyak produk.
