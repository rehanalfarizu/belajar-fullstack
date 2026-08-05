# Software — LEVEL 4: Fullstack Integration

Folder ini berisi panduan install dan setup **software yang dibutuhkan** untuk belajar fullstack integration, deployment, dan security.

---

## Daftar Software

| # | File | Software | Keterangan |
|---|------|----------|-------------|
| 01 | `01-vercel-install.md` | Vercel CLI | Deploy frontend React |
| 02 | `02-railway-render-install.md` | Railway / Render | Deploy backend Node.js |
| 03 | `03-database-production.md` | PostgreSQL Production | Database untuk production |
| 04 | `04-environment-vars.md` | Environment Variables | Setup .env untuk production |
| 05 | `05-security-tools.md` | Security Tools | OWASP ZAP, Burp Suite (optional) |

---

## Cara Pakai

1. **Install software** sesuai urutan dari atas ke bawah
2. **Cek versi** setelah install untuk memastikan berhasil
3. **Ikuti instruksi** di setiap file dengan teliti
4. **Setup account** di platform deployment yang dipilih

---

## Urutan Install yang Disarankan

```
STEP 1 → Install Vercel CLI (untuk deploy frontend)
STEP 2 → Install Railway/Render CLI (untuk deploy backend)
STEP 3 → Setup PostgreSQL production database
STEP 4 → Setup Environment Variables dengan benar
STEP 5 → (Optional) Install security scanning tools
```

---

## Verifikasi Install

```bash
# Cek Vercel CLI
vercel --version

# Cek Railway CLI
railway --version

# Login ke platform
vercel login
railway login
```

---

## Platform Deployment yang Direkomendasikan

| Platform | Untuk | Harga |
|----------|-------|-------|
| Vercel | Frontend (React, Next.js) | Gratis |
| Railway | Backend (Node.js, Express) | Mulai $5/bulan |
| Render | Backend alternatif | Gratis tier tersedia |
| Supabase | PostgreSQL database | Gratis tier tersedia |
| MongoDB Atlas | MongoDB database | Gratis tier tersedia |

---

**Lanjut ke:** [tutorial/](../tutorial/) untuk panduan deployment
