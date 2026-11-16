# 07 — Konfigurasi Aman

## Environment Variables

### ❌ Jangan Commit Secret

```javascript
// ❌ JANGAN!
const smtpPassword = 'kata-sandi-email-123';
const mapsToken = 'pk.abc123xyz';
```

### ✅ Gunakan Environment Variables

Nilai rahasia dibaca dari lingkungan saat program jalan, bukan ditulis di kode.
Di Node, nilai itu tersedia lewat objek `process.env`. Pertanyaan: bagaimana
file `.env` bisa dimuat di Node 22+ tanpa library tambahan? (Cari di dokumentasi
Node.) Dan apa yang sebaiknya terjadi kalau variabel wajib ternyata kosong?

### File .env

```bash
# .env (JANGAN commit!)
SMTP_PASSWORD=isi-nilai-aslinya-di-sini
MAPS_TOKEN=isi-nilai-aslinya-di-sini
```

```bash
# .env.example (Commit ini, tanpa nilai sebenarnya)
SMTP_PASSWORD=
MAPS_TOKEN=
```

### .gitignore

```
# Wajib ada!
.env
.env.local
.env.*.local
```

---

## Security Headers

Beberapa header yang penting dan fungsinya:

| Header | Untuk apa |
|--------|-----------|
| `X-Frame-Options` | Mencegah halamanmu dibungkus iframe situs lain (clickjacking) |
| `X-Content-Type-Options` | Mencegah browser "menebak" tipe file |
| `Content-Security-Policy` | Membatasi dari mana script dan resource boleh dimuat |
| `Strict-Transport-Security` | Memaksa browser memakai HTTPS |

Di Express ada paket `helmet` yang memasang banyak header sekaligus. Baca
README-nya, lalu bandingkan hasil `curl -i` sebelum dan sesudah. Header apa yang
muncul, dan header mana yang hilang (misal `X-Powered-By`)?

---

## Dependency Security

```bash
# Cek vulnerabilities
npm audit

# Update packages yang vulnerable
npm audit fix

# Cek outdated packages
npm outdated
```

### Dependabot (GitHub)

Aktifkan Dependabot untuk auto-update dependencies dengan security patches.

---

## Error Handling

```javascript
// ❌ Error terlalu detail ke user
app.use((err, req, res, next) => {
  res.status(500).json({ 
    error: err.message,
    stack: err.stack,
    query: err.sql  // Bocorkan struktur database!
  });
});
```

Perbaikannya: apa yang harus dicatat di **server** (untuk debugging), dan apa
yang boleh dilihat **pengguna**? Bagaimana kamu melacak satu kejadian error
tanpa membocorkan isinya (petunjuk: ID unik per request)? Tulis error handler
versimu sendiri di lab.

---

## Checklist Deployment

1. [ ] Semua secret di environment variables
2. [ ] .env tidak di-commit
3. [ ] HTTPS aktif
4. [ ] Security headers terpasang
5. [ ] npm audit clean
6. [ ] Error tidak bocorkan internal info
7. [ ] Debug mode off di production
8. [ ] Log tidak mengandung password/token
