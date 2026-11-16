# Soal 07 — StoreProductRequest

## Tugas

Validasi:

- `name`: required, string, max 120.
- `slug`: required, format slug, unik.
- `description`: nullable, string, max 2000.
- `price`: required, integer, min 0.
- `stock`: required, integer, min 0.
- `category_id`: required dan harus ada.

Gunakan `validated()` saat membuat model. Tambahkan pesan error Indonesia yang
berguna tanpa membocorkan detail internal.

## Kasus Uji

- Payload valid menghasilkan `201`.
- Slug duplikat menghasilkan `422`.
- Category tidak ada menghasilkan `422`.
- Field tambahan seperti `is_admin` tidak tersimpan.
