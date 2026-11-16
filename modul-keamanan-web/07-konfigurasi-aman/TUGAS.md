# TUGAS — Konfigurasi Aman

## Hasil Akhir

1. Setup environment variables yang benar
2. Security headers terpasang
3. Error handling yang aman

---

## Bagian A: Environment Variables

1. Masuk ke `kerjakan-di-sini/`, jalankan `npm install`, lalu `node 01-server-config.js` (port 3070)
2. Pindahkan semua hardcoded secret di `01-server-config.js` ke .env
3. `.env.example` sudah disediakan dengan placeholder kosong. Salin jadi `.env`, isi nilainya sendiri
4. Pastikan .env ada di .gitignore (cek dengan `git check-ignore -v .env`)
5. Amankan route `/debug/config` yang membocorkan secret

---

## Bagian B: Security Headers

1. Buka `kerjakan-di-sini/01-server-config.js`
2. Tambahkan helmet atau set headers manual
3. Test dengan browser DevTools → Network → Response Headers

---

## Bagian C: Dependency Audit

1. Jalankan `npm audit` di folder project
2. Fix semua vulnerabilities yang bisa di-fix
3. Catat yang tidak bisa di-fix dan alasannya

---

## Bagian D: Error Handling Aman

1. Perbaiki error handler agar tidak bocorkan info
2. Pastikan ada logging untuk debugging (tanpa mencatat password/token)
3. Test dengan trigger error (`GET /api/produk/1`) dan lihat response

---

## File yang Perlu Diisi

```
kerjakan-di-sini/
├── .env.example          ← Template environment (sudah ada, salin jadi .env)
├── 01-server-config.js   ← Secret, headers, log, error handler
├── package.json
└── catatan.md            ← Termasuk hasil npm audit
```
