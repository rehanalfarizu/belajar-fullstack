# Software — LEVEL 2: Backend Node.js & Express

Folder ini berisi panduan install dan setup **software yang dibutuhkan** untuk belajar backend development.

---

## Daftar Software

| # | File | Software | Keterangan |
|---|------|----------|-------------|
| 01 | `01-nodejs-install.md` | Node.js & npm | Runtime JavaScript untuk server |
| 02 | `02-postgresql-install.md` | PostgreSQL | Database SQL |
| 03 | `03-mongodb-install.md` | MongoDB | Database NoSQL |
| 04 | `04-docker-install.md` | Docker | Container untuk database & services |
| 05 | `05-postman-insomnia.md` | Postman / Insomnia | API testing tool |

---

## Cara Pakai

1. **Install software** sesuai urutan dari atas ke bawah
2. **Cek versi** setelah install untuk memastikan berhasil
3. ** Ikuti instruksi** di setiap file dengan teliti

---

## Urutan Install yang Disarankan

```
STEP 1 → Install Node.js (wajib, untuk semua level)
STEP 2 → Install PostgreSQL (untuk database SQL)
STEP 3 → Install MongoDB (untuk database NoSQL)
STEP 4 → Install Docker (untuk containerisasi)
STEP 5 → Install Postman/Insomnia (untuk testing API)
```

---

## Verifikasi Install

```bash
# Cek Node.js
node --version
npm --version

# Cek PostgreSQL
psql --version

# Cek MongoDB
mongod --version

# Cek Docker
docker --version
docker-compose --version

# Cek Postman
postman --version
```

---

**Lanjut ke:** [tutorial/](../tutorial/) untuk panduan setup project
