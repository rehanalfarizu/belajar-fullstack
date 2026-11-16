# TUGAS — XSS dan CSRF

## Hasil Akhir

1. Pemahaman cara kerja XSS dan CSRF
2. Kemampuan mencegah kedua serangan
3. Implementasi CSRF protection

---

## Bagian A: Eksperimen XSS

> ⚠️ Lab di modul ini sengaja rentan. Buka/jalankan hanya di laptopmu sendiri
> (semua server terkunci ke `127.0.0.1`). Jangan coba payload ke website orang lain.

1. Buka `kerjakan-di-sini/01-xss-lab.html` di browser (cukup double-click file-nya)
2. Coba inject script di form komentar
3. Catat input apa yang berhasil jalan di `catatan.md`

---

## Bagian B: Perbaiki XSS

1. Jalankan `npm install` di `kerjakan-di-sini/`
2. Buka `kerjakan-di-sini/02-xss-fix.js`, lengkapi `escapeHtml()` (cek dengan `node 02-xss-fix.js --cek`)
3. Pakai `escapeHtml()` saat merender komentar, lalu tambahkan header Content-Security-Policy
4. Jalankan `node 02-xss-fix.js` (port 3061) dan test ulang — script tidak boleh jalan

---

## Bagian C: Implementasi CSRF Token

1. Jalankan `node 03-csrf-server.js` (bank di port 3060, halaman penyerang di port 3062)
2. Lakukan eksperimen di komentar atas file, buktikan transfer palsu berhasil
3. Tambahkan CSRF token generation
4. Validasi token di POST request
5. Tambahkan token ke form HTML
6. Set atribut `sameSite` pada cookie session
7. Ulangi eksperimen, transfer palsu harus gagal tapi form asli tetap berhasil

---

## File yang Perlu Diisi

```
kerjakan-di-sini/
├── 01-xss-lab.html      ← Lab XSS
├── 02-xss-fix.js        ← Perbaiki XSS
├── 03-csrf-server.js    ← Implementasi CSRF token
├── attacker-page.html   ← Halaman "penyerang" (hanya menargetkan lab-mu sendiri)
├── package.json
└── catatan.md
```
