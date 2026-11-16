# TUGAS — Validasi Input

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:
1. Form dengan validasi client-side DAN server-side
2. Pemahaman kenapa client-side saja tidak cukup
3. Pengalaman pakai library validasi (Zod/Yup)

---

## Bagian A: Bypass Validasi Client (Demo)

### Langkah

1. Buka file `kerjakan-di-sini/01-form-rentan.html` di browser
2. Form ini punya validasi client-side (required, pattern, dll)
3. Buka DevTools (F12) → Elements
4. Cari input email, hapus atribut `required` dan `type="email"`
5. Submit form dengan data tidak valid
6. Catat apa yang terjadi di `kerjakan-di-sini/01-catatan-bypass.md`

### Verifikasi
- [ ] Berhasil submit form dengan email tidak valid
- [ ] Paham kenapa ini masalah

---

## Bagian B: Tambahkan Validasi Server

### Langkah

1. Buka file `kerjakan-di-sini/02-server-validasi.js`
2. Ada endpoint `/register` yang BELUM ada validasi
3. Tambahkan validasi untuk:
   - `username`: string, 3-50 karakter, hanya huruf/angka/underscore
   - `email`: format email valid
   - `password`: minimal 8 karakter
   - `age`: angka, 13-120

4. Gunakan Zod (sudah di-install) atau validasi manual

### File yang perlu diedit
`kerjakan-di-sini/02-server-validasi.js` — cari bagian `TODO(human)`

### Verifikasi
- [ ] Request dengan data valid berhasil (status 200)
- [ ] Request dengan email invalid ditolak (status 400)
- [ ] Request dengan password < 8 karakter ditolak
- [ ] Error message jelas dan tidak bocorkan info sensitif

---

## Bagian C: Validasi dengan Zod Schema

### Langkah

1. Buka file `kerjakan-di-sini/03-zod-schema.js`
2. Buat schema Zod untuk data produk e-commerce:
   - `name`: string, 1-200 karakter
   - `price`: number, positif, maksimal 1 miliar
   - `stock`: integer, minimal 0
   - `category`: enum dari daftar yang diizinkan
   - `description`: string, optional, maksimal 2000 karakter

### File yang perlu diedit
`kerjakan-di-sini/03-zod-schema.js` — cari bagian `TODO(human)`

### Verifikasi
- [ ] Schema bisa memvalidasi data valid
- [ ] Schema menolak harga negatif
- [ ] Schema menolak kategori yang tidak ada di daftar
- [ ] Error message deskriptif

---

## Petunjuk Kalau Macet

1. **Tidak tahu syntax Zod?**
   - Dokumentasi: https://zod.dev/
   - Cari: "zod string validation example"

2. **Bingung cara test?**
   - Pakai Postman atau curl untuk kirim request
   - Atau buat file test sederhana

3. **Error "module not found"?**
   - Jalankan `npm install` di folder ini dulu

---

## Cara Mengecek Hasil Sendiri

1. Test dengan data valid → harus berhasil
2. Test dengan setiap jenis data invalid → harus ditolak dengan pesan jelas
3. Test bypass: kirim request langsung dengan curl, tanpa lewat form

Contoh test dengan curl:
```bash
# Harus ditolak (email invalid)
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "email": "bukan-email", "password": "12345678"}'

# Harus berhasil
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "email": "test@example.com", "password": "12345678"}'
```

---

## File yang Perlu Diisi

```
kerjakan-di-sini/
├── 01-form-rentan.html         ← Form untuk demo bypass
├── 01-catatan-bypass.md        ← Catat hasil eksperimen
├── 02-server-validasi.js       ← Tambahkan validasi server
└── 03-zod-schema.js            ← Buat schema Zod
```
