# 08 — Proyek Akhir: Audit Aplikasi Sendiri

## 🎯 Tujuan

Ini adalah proyek penutup modul keamanan. Kamu akan mengaudit salah satu aplikasi 
yang pernah kamu buat menggunakan checklist OWASP, lalu menulis laporan temuan 
dan memperbaikinya.

**Hasil akhir:** Portofolio dengan bagian "Keamanan yang Diterapkan" yang bisa 
kamu tunjukkan saat interview.

---

## Pilih Aplikasi untuk Diaudit

Pilih salah satu:
1. Proyek dari Level 2-4 di repo ini
2. Proyek pribadi yang pernah kamu buat
3. Clone proyek open source sederhana

**Syarat minimal:**
- Ada form input
- Ada interaksi dengan database
- Ada autentikasi (login)

---

## Checklist Audit

### 1. Input & Validation
- [ ] Semua input divalidasi di server
- [ ] Tidak ada SQL injection
- [ ] Tidak ada command injection
- [ ] File upload divalidasi (tipe, ukuran)

### 2. Authentication
- [ ] Password di-hash (bcrypt/Argon2)
- [ ] Session/token dikelola dengan aman
- [ ] Ada rate limiting untuk login
- [ ] Logout benar-benar menghapus session

### 3. Authorization
- [ ] User hanya bisa akses data sendiri
- [ ] Admin route dilindungi
- [ ] Tidak ada IDOR

### 4. XSS & CSRF
- [ ] Output di-escape
- [ ] CSRF token untuk form penting
- [ ] Cookie dengan HttpOnly dan SameSite

### 5. Configuration
- [ ] Secret tidak di-hardcode
- [ ] .env tidak di-commit
- [ ] Error tidak bocorkan internal info
- [ ] Security headers terpasang

### 6. Dependencies
- [ ] npm audit clean
- [ ] Tidak ada package dengan known vulnerabilities

---

## Format Laporan

Tulis laporan di `kerjakan-di-sini/laporan-audit.md`:

```markdown
# Laporan Audit Keamanan: [Nama Aplikasi]

## Ringkasan
- Tanggal audit: ...
- Aplikasi: ...
- Total temuan: ... (X critical, Y high, Z medium, W low)

## Temuan

### [1] [Severity] - [Judul Temuan]
**Lokasi:** file.js:baris
**Deskripsi:** Apa masalahnya
**Bukti:** Screenshot/code snippet
**Dampak:** Apa yang bisa terjadi
**Rekomendasi:** Cara memperbaiki
**Status:** Fixed/Pending

### [2] ...

## Perbaikan yang Dilakukan
- [x] Temuan 1: ...
- [x] Temuan 2: ...

## Keamanan yang Diterapkan (untuk README portofolio)
- Input validation dengan Zod
- Password hashing dengan bcrypt
- Session dengan HttpOnly cookie
- CSRF protection
- Rate limiting 100 req/min
- Security headers dengan Helmet
```

---

## Setelah Selesai

1. Perbaiki semua temuan yang ditemukan
2. Copy bagian "Keamanan yang Diterapkan" ke README proyek
3. Simpan laporan sebagai bukti kemampuan security audit

**Ini yang bisa kamu ceritakan saat interview:**
> "Saya melakukan security audit pada proyek saya sendiri menggunakan checklist OWASP. 
> Menemukan X kerentanan dan memperbaiki semuanya. Sekarang aplikasi sudah menerapkan 
> [list keamanan]."
