# Soal Praktikum Vue

## 01 — Counter

Buat counter dengan increment, decrement, dan reset. Count tidak boleh negatif.
Tambahkan computed status: `Kosong`, `Sedikit` (1–4), `Banyak` (>=5).

## 02 — Product Filter

Render list memakai key ID, filter produk aktif, pencarian case-insensitive,
empty state, dan tombol reset.

## 03 — Product Card

Buat props tervalidasi untuk name/price/stock. Gunakan named slot `actions`.
Jangan memutasi props.

## 04 — Emit

Child emit event `add` berisi `{ productId, quantity }`. Validator event menolak
ID/quantity invalid. Parent memperbarui cart.

## 05 — Cart Reactivity

Gunakan ref/reactive dan computed untuk subtotal, jumlah item, pajak, dan total.
Jangan menyimpan total sebagai state terpisah.

## 06 — Lifecycle

Fetch data saat mounted, tampilkan loading/error/success, sediakan retry, dan
batalkan request saat unmounted.

## 07 — Composable

Ekstrak counter menjadi `useCounter(initial, minimum)`. Public API hanya count,
increment, decrement, reset, dan isMinimum. Tulis unit test.

## 08 — Router

Buat route public dan protected. Simpan tujuan awal agar setelah login user
kembali ke halaman yang diminta. Jelaskan mengapa guard bukan authorization.

## 09 — Pinia

Buat cart store dengan add, update quantity, remove, clear, totalItems, dan
subtotal. Cegah quantity nol/negatif.

## 10 — HTTP

Buat halaman produk dengan pagination/filter, loading/error/empty state, abort
request lama saat filter berubah, dan tombol retry.

## Rubrik per Modul

- 40% perilaku benar.
- 20% failure/edge case.
- 15% aksesibilitas.
- 15% struktur dan readability.
- 10% test/refleksi.

## Soal Lengkap

Brief di atas adalah ringkasan. Versi lengkap (tujuan, bagian per bagian,
edge case, petunjuk bertingkat, verifikasi) ada di file berikut. Cara
menjalankan starter ada di [TUGAS.md](../TUGAS.md).

1. [01 — Counter](01-counter.md)
2. [02 — Product Filter](02-product-filter.md)
3. [03 — Product Card](03-product-card.md)
4. [04 — Add to Cart (emit)](04-add-to-cart.md)
5. [05 — Cart Reactivity](05-cart-reactivity.md)
6. [06 — Products Lifecycle](06-products-lifecycle.md)
7. [07 — useCounter Composable](07-use-counter.md)
8. [08 — Router dan Guard](08-router.md)
9. [09 — Cart Store (Pinia)](09-cart-store.md)
10. [10 — Products API](10-products-api.md)
11. [11 — Render Aman tanpa v-html](11-render-aman-tanpa-v-html.md) (soal keamanan tambahan)

Solusi referensi ada di [contoh](../contoh/README.md). Buka hanya setelah
jawabanmu sendiri jalan.
