# TUGAS — Otorisasi dan Akses

## Hasil Akhir

1. API dengan pengecekan kepemilikan resource
2. Role-based middleware
3. Perbaikan kerentanan IDOR

---

## Bagian A: Identifikasi IDOR

> ⚠️ `01-api-rentan.js` sengaja rentan. Jalankan hanya di laptopmu sendiri
> (server sudah dikunci ke `127.0.0.1`). Jangan coba teknik ini ke sistem orang lain.

1. Masuk ke `kerjakan-di-sini/`, jalankan `npm install`
2. Buka `kerjakan-di-sini/01-api-rentan.js`
3. Jalankan server (`node 01-api-rentan.js`, port 3050)
4. Coba akses order milik user lain dengan mengubah ID di URL
5. Catat hasil di `catatan.md`

---

## Bagian B: Perbaiki IDOR

1. Buka `kerjakan-di-sini/02-api-aman.js` (port 3051), tambahkan pengecekan kepemilikan di setiap endpoint
2. Pastikan user hanya bisa akses resource miliknya
3. Admin bisa akses semua (jika rolenya admin)

---

## Bagian C: Implementasi RBAC

1. Buat middleware `requireRole(role)`
2. Proteksi endpoint admin dengan middleware ini

---

## File yang Perlu Diisi

```
kerjakan-di-sini/
├── 01-api-rentan.js     ← Untuk eksperimen IDOR
├── 02-api-aman.js       ← Perbaiki di sini
├── package.json
└── catatan.md           ← Log eksperimen + pertanyaan
```
