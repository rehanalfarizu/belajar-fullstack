# 03 — SQL Injection

## ⚠️ PERINGATAN

Lab di modul ini berisi kode yang SENGAJA RENTAN. Tujuannya untuk belajar.

**JANGAN:**
- Deploy kode ini ke internet
- Gunakan teknik ini untuk menyerang sistem orang lain
- Jalankan lab ini dengan database production

**BOLEH:**
- Jalankan di localhost untuk belajar
- Eksperimen cara exploit dan cara perbaiki

---

## Apa itu SQL Injection?

SQL Injection terjadi ketika input user langsung dimasukkan ke query SQL tanpa 
filter atau parameterization. Penyerang bisa "menyuntikkan" perintah SQL mereka 
sendiri.

### Analogi: Formulir yang Bisa Diedit

Bayangkan kamu isi formulir di kantor:

```
Nama: Ahmad
```

Tapi kamu tulis:
```
Nama: Ahmad"; DELETE FROM pegawai; --
```

Kalau sistem langsung copy-paste tulisanmu ke database tanpa cek, perintah 
DELETE bisa jalan!

---

## Cara Kerja SQL Injection

### Kode Rentan
```javascript
// ❌ JANGAN LAKUKAN INI!
const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
```

### Input Normal
```
username: admin
password: rahasia123
```

Query yang terbentuk:
```sql
SELECT * FROM users WHERE username = 'admin' AND password = 'rahasia123'
```

### Input Jahat (SQL Injection)
```
username: admin' --
password: apapun
```

Query yang terbentuk:
```sql
SELECT * FROM users WHERE username = 'admin' --' AND password = 'apapun'
```

`--` adalah komentar SQL. Semua setelahnya diabaikan. Login berhasil tanpa password!

---

## Jenis-jenis SQL Injection

### 1. Classic SQL Injection
Input langsung memodifikasi query.
```
' OR '1'='1
```

### 2. Union-based
Menggabungkan hasil dari query lain.
```
' UNION SELECT username, password FROM users --
```

### 3. Blind SQL Injection
Tidak melihat hasil langsung, tapi bisa "tanya" dengan true/false.
```
' AND (SELECT COUNT(*) FROM users) > 0 --
```

### 4. Time-based Blind
Mengukur waktu response.
```
' AND SLEEP(5) --
```

---

## Cara Mencegah SQL Injection

### 1. Parameterized Queries (WAJIB!)
```javascript
// ✅ Node.js dengan pg (PostgreSQL)
const result = await pool.query(
  'SELECT * FROM users WHERE username = $1 AND password = $2',
  [username, password]
);

// ✅ Node.js dengan mysql2
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE username = ? AND password = ?',
  [username, password]
);
```

### 2. Gunakan ORM
```javascript
// ✅ Sequelize
const user = await User.findOne({
  where: { username, password }
});

// ✅ Prisma
const user = await prisma.user.findFirst({
  where: { username, password }
});
```

### 3. Input Validation (Lapisan Tambahan)
```javascript
// Validasi sebelum query
if (!/^[a-zA-Z0-9_]+$/.test(username)) {
  throw new Error('Invalid username format');
}
```

### 4. Least Privilege
Database user yang dipakai aplikasi hanya punya permission yang dibutuhkan.
- JANGAN pakai user root/admin untuk aplikasi
- Berikan hanya SELECT, INSERT, UPDATE yang diperlukan
- JANGAN berikan DROP, DELETE TABLE kecuali memang perlu

---

## Istilah Penting

| Istilah | Arti |
|---------|------|
| **Parameterized query** | Query dengan placeholder, data dipisah dari perintah |
| **Prepared statement** | Query yang sudah di-compile, parameter diisi kemudian |
| **ORM** | Object-Relational Mapping, abstraksi database |
| **Escaping** | Menambah karakter khusus agar string aman (kurang direkomendasikan) |
| **Least privilege** | Database user dengan permission minimal |

---

## Contoh Kasus Nyata

### Sony PlayStation Network (2011)
- 77 juta data user bocor
- Termasuk nama, alamat, kartu kredit
- Penyebab: SQL injection pada website

### Heartland Payment Systems (2008)
- 134 juta kartu kredit bocor
- Kerugian lebih dari $140 juta
- SQL injection sebagai entry point

---

## Selanjutnya

Setelah memahami SQL Injection, kamu akan belajar tentang **Autentikasi & Password** — 
cara menyimpan password dengan aman dan mengelola session.
