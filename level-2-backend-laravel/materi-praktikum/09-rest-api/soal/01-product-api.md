# Soal 09 — REST API Products

## Tugas

Buat API CRUD `/api/products` dengan:

- API Resource.
- Pagination.
- Filter `category`, `active`, dan rentang harga.
- Sorting menggunakan allowlist.
- Response dan status code konsisten.
- Authentication untuk operasi write.

## Kontrak Minimum

```json
{
  "data": [],
  "links": {},
  "meta": {}
}
```

## Kasus Uji

- Query sort yang tidak diizinkan ditolak.
- Resource tidak ada menghasilkan `404`.
- Create menghasilkan `201`.
- Delete menghasilkan `204`.
- Response tidak membocorkan kolom internal.
