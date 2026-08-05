# Soal 01 — PHP Dasar: Rekap Nilai

## Tujuan

Melatih strict types, array, function, loop, filtering, sorting, dan error
handling tanpa bergantung pada Laravel.

## Tugas

Lengkapi `code/01-katalog-nilai.php`:

1. Validasi nilai harus berada pada rentang 0–100.
2. Hitung rata-rata setiap mahasiswa.
3. Tentukan predikat A/B/C/D/E.
4. Urutkan hasil dari rata-rata tertinggi.
5. Tampilkan hanya mahasiswa yang lulus (`rata-rata >= 60`).

## Kasus Uji

- Array nilai kosong harus menghasilkan error yang jelas.
- Nilai `-1` dan `101` harus ditolak.
- Rata-rata `[80, 90, 70]` harus `80`.
- Input asli tidak boleh berubah setelah diurutkan.

## Refleksi

- Mengapa function pure lebih mudah dites?
- Apa beda `array_map`, `array_filter`, dan `usort`?
- Kapan exception lebih tepat daripada return `false`?
