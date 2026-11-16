# Soal 03 — Routing dan Product Controller

## Tugas

Buat endpoint:

| Method | URL | Hasil |
|---|---|---|
| `GET` | `/products` | List produk |
| `GET` | `/products/{id}` | Detail produk |
| `POST` | `/products` | Buat produk |

Gunakan controller, route model binding bila model sudah tersedia, dan status
`201` saat create. Untuk sementara data boleh berupa array in-memory.

## Acceptance Criteria

- ID harus integer positif.
- Produk yang tidak ada menghasilkan `404`.
- Request create tanpa `name` menghasilkan `422`.
- Controller tidak membaca global variable.

Tuliskan feature test untuk happy path dan failure path.
