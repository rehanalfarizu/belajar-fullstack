# TUGAS — SQL Injection

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:
1. Pengalaman melakukan SQL injection di lab aman
2. Pemahaman cara kerja parameterized query
3. Kemampuan memperbaiki kode yang rentan

---

## Bagian A: Eksperimen SQL Injection

### Setup Lab

1. Masuk ke folder `kerjakan-di-sini/`
2. Jalankan:
   ```bash
   npm install
   node 01-server-rentan.js
   ```
3. Server berjalan di http://localhost:3000

### Eksperimen

1. Buka http://localhost:3000 di browser
2. Coba login dengan:
   - Username: `admin`
   - Password: `password123` (benar)
3. Sekarang coba SQL injection:
   - Username: `admin' --`
   - Password: `apapun`
4. Catat hasil di `kerjakan-di-sini/01-catatan-sqli.md`

### Verifikasi
- [ ] Berhasil login tanpa password yang benar
- [ ] Paham kenapa ini bisa terjadi

---

## Bagian B: Perbaiki Kode Rentan

### Langkah

1. Buka file `kerjakan-di-sini/02-server-aman.js`
2. Lihat bagian yang ditandai `TODO(human)`
3. Ganti string concatenation dengan parameterized query
4. Test ulang — SQL injection seharusnya tidak bisa lagi

### File yang perlu diedit
`kerjakan-di-sini/02-server-aman.js`

### Verifikasi
- [ ] Login normal masih berfungsi
- [ ] SQL injection `admin' --` tidak bisa login
- [ ] Error message tidak bocorkan info database

---

## Bagian C: Union-based SQL Injection

### Eksperimen Lanjutan

1. Jalankan `node 01-server-rentan.js` (server rentan)
2. Buka endpoint pencarian: http://localhost:3000/search?q=laptop
3. Coba injection untuk mendapat data user:
   ```
   laptop' UNION SELECT id, username, password FROM users --
   ```
4. Catat hasil dan cara perbaikannya di `01-catatan-sqli.md`

### Verifikasi
- [ ] Berhasil mendapatkan data dari tabel lain
- [ ] Paham kenapa UNION injection berbahaya

---

## Petunjuk Kalau Macet

1. **SQL injection tidak berhasil?**
   - Cek apakah ada spasi setelah `--`
   - Pastikan quote `'` benar (bukan smart quote)

2. **Parameterized query error?**
   - Cek syntax untuk library yang dipakai (pg, mysql2, sqlite3)
   - Placeholder: `$1, $2` untuk pg, `?, ?` untuk mysql2

3. **Lab tidak jalan?**
   - Pastikan port 3000 tidak dipakai
   - Jalankan `npm install` dulu

---

## Cara Mengecek Hasil Sendiri

1. Test di server rentan: SQL injection harus berhasil
2. Test di server aman: SQL injection harus GAGAL
3. Kedua server: login normal harus tetap berhasil

---

## File yang Perlu Diisi

```
kerjakan-di-sini/
├── 01-server-rentan.js     ← Lab untuk eksperimen (jangan diubah)
├── 02-server-aman.js       ← Perbaiki kode di sini
└── 01-catatan-sqli.md      ← Catat hasil eksperimen
```
