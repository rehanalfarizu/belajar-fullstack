# SOAL 01 — Deploy Frontend ke Vercel

## Tujuan
Mendeploy aplikasi React (Vite) ke Vercel, mengkonfigurasi build settings, dan memverifikasi deployment berhasil.

---

## Briefing
Anda memiliki aplikasi React yang sudah berjalan dengan baik di localhost. Sekarang diminta untuk mendeploy ke Vercel agar bisa diakses publicly via internet.

---

## Studi Kasus

```
Frontend App:
- React + Vite
- API Backend: http://localhost:3001/api (akan di-deploy terpisah)
- Repository: GitHub

Target deployment:
- Vercel (frontend)
- Railway/Render (backend) — nanti di latihan berikutnya
```

---

## Prerequisites Checklist

- [ ] Akun Vercel (login via GitHub)
- [ ] Repository GitHub (kosong atau sudah ada project)
- [ ] `package.json` dengan scripts yang benar
- [ ] `.gitignore` sudah include `node_modules`, `.env`
- [ ] Build berhasil secara lokal: `npm run build`

---

## Tugas

### Soal 1A — Persiapan Repository
Jawab pertanyaan berikut:

```bash
# 1. Apa yang harus di-include di .gitignore sebelum push ke GitHub?
#    ( минимум 5 items)
# Jawaban:

# 2. Apa yang harus diubah di codebase sebelum deployment?
#    - base URL API (localhost → production URL)
#    - env vars apa saja yang perlu di-set?
# Jawaban:

# 3. Bagaimana cara test build secara lokal sebelum deploy?
#    Perintah apa yang dijalankan?
# Jawaban:
```

### Soal 1B — Langkah Deployment
Urutan langkah deployment ke Vercel:

```bash
# 1. Push project ke GitHub
#    Perintah git apa saja yang diperlukan?

# 2. Di dashboard Vercel
#    - Langkah 1: ?
#    - Langkah 2: ?
#    - Langkah 3: ?
#    - Langkah 4: ?

# 3. Setelah deployment
#    - Bagaimana cara melihat deployment logs?
#    - Jika build gagal, dimana melihat error-nya?
```

### Soal 1C — Konfigurasi Vercel
Lihat file `code/01-vercel-deploy.js`. Lengkapi:

```javascript
// vercel.json configuration
// Buat konfigurasi untuk:

// TODO 1: Routing configuration
// - Semua request ke index.html (client-side routing)
// - Exclude /api/* dari rewrites (karena API di backend terpisah)

// TODO 2: Build settings
// - Build command: npm run build
// - Output directory: dist
// - Install command: npm install

// TODO 3: Environment variables (jika ada)
// - VITE_API_URL ( untuk frontend )
// - Catatan: jangan simpan secrets di VITE_ prefix — itu expose ke browser

// TODO 4: Headers (untuk security)
// - Content-Security-Policy
// - X-Frame-Options
// - Strict-Transport-Security

module.exports = {
  // ...
};
```

### Soal 1D — Troubleshooting
Untuk setiap skenario error, jelaskan penyebab dan solusinya:

```bash
# Error 1: "Cannot find module 'react'"
# Penyebab:
# Solusi:

# Error 2: Build succeed tapi page blank (white screen)
# Penyebab:
# Solusi:

# Error 3: API calls tetap ke localhost:3001
# Penyebab:
# Solusi:

# Error 4: "Failed to load module" di browser console
# Penyebab:
# Solusi:
```

---

## Kriteria Penilaian
- [ ] Repository di-clean dari file yang tidak perlu (.env, node_modules)
- [ ] Build command berjalan sukses di Vercel
- [ ] Aplikasi bisa diakses via vercel.app URL
- [ ] Routing SPA berfungsi (tidak 404 saat refresh di sub-page)
- [ ] Environment variables dikonfigurasi dengan benar di dashboard Vercel
