# Praktikum TypeScript — Product Catalog

Kerjakan [starter](code/01-product-catalog.ts) tanpa membuka
[contoh solusi](contoh/01-product-catalog.ts) terlebih dahulu.

## Tugas

1. Buat union `ProductStatus`, interface `Product`, dan `Result<T>`.
2. Implementasikan type guard untuk memvalidasi satu produk dari `unknown`.
3. Implementasikan parser array yang mengembalikan error beserta indeks invalid.
4. Buat filter generic yang menerima predicate.
5. Hitung total harga produk published tanpa mutasi.
6. Tangani exhaustive checking dengan fungsi `assertNever`.
7. Pastikan `npx tsc --strict --noEmit code/01-product-catalog.ts` lulus.

## Kasus uji wajib

- array valid;
- `price` berupa string;
- status tidak dikenal;
- root bukan array;
- array kosong;
- harga nol dan nama kosong.

Tuliskan keputusan: apakah harga nol/nama kosong valid, dan di layer mana aturan
bisnis itu seharusnya diletakkan.
