# SOAL 03 — SQL Injection Prevention

## Tujuan
Mengidentifikasi dan mencegah SQL Injection attacks menggunakan parameterized queries, ORM, dan input validation.

---

## Briefing
SQL Injection terjadi ketika attacker bisa memanipulasi query SQL melalui input yang tidak di-sanitize. Hasilnya bisa catastrophic: data theft, data destruction, bahkan remote code execution.

---

## Famous SQL Injection Cases

```
1999: Yahoo! — Hacker mengakses source code dengan '
2008: Sony BMG — 1 juta user data breached
2012: Yahoo! — 450,000 passwords stolen
2014: SnapChat — 4.6 million phone numbers leaked
```

---

## Studi Kasus — Vulnerable Query

```javascript
// VULNERABLE: String concatenation di query
app.get('/api/users/search', (req, res) => {
  const { name } = req.query;
  // DANGER: direct interpolation
  const query = `SELECT * FROM users WHERE name LIKE '%${name}%'`;
  // Attacker input: "'; DROP TABLE users; --"
  // Result: SELECT * FROM users WHERE name LIKE '%; DROP TABLE users; --%'
});
```

---

## Tugas

### Soal 3A — Vulnerability Analysis

```bash
# Analisis setiap kode berikut. Identifikasi vulnerability dan exploit payload:

# 1. Login query
const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
# Attacker input untuk email: admin'--
# Exploit:

# 2. Order lookup
const query = `SELECT * FROM orders WHERE id = ${req.params.id}`;
# Attacker input untuk id: 1 OR 1=1
# Exploit:

# 3. User profile update
const query = `UPDATE users SET bio = '${bio}' WHERE id = ${userId}`;
# Attacker input untuk bio: ' WHERE role = 'admin
# Exploit:

# 4. Category filter
const query = `SELECT * FROM posts WHERE category = '${category}' ORDER BY ${sort}`;
# Attacker input untuk sort: id; DROP TABLE posts;--
# Exploit:
```

### Soal 3B — Parameterized Queries Implementation
Lihat file `code/03-sql-injection.js`. Lengkapi:

```javascript
// ============================================
// PART 1: PARAMETERIZED QUERIES (Vanilla SQL)
// ============================================

// TODO 1: Parameterized SELECT
// Sebelum: `SELECT * FROM users WHERE email = '${email}'`
// Sesudah: `SELECT * FROM users WHERE email = $1`
// Dengan: pool.query(query, [email])

// TODO 2: Parameterized INSERT
// INSERT INTO users (name, email) VALUES ($1, $2)
// Params: [name, email]

// TODO 3: Parameterized UPDATE
// UPDATE users SET bio = $1 WHERE id = $2
// Params: [bio, id]

// TODO 4: Parameterized DELETE
// DELETE FROM posts WHERE id = $1

// TODO 5: LIKE clause (dengan escaping)
// - Gunakan parameterized query
// - Escape special LIKE characters (% dan _)
// function safeSearch(term) {
//   // Escape: replace % → \pct, _ → \underscore
//   // Return escaped term untuk LIKE query
// }

// TODO 6: ORDER BY clause (dengan allowlist)
// - ORDER BY harus di-allowlist, BUKAN dari user input langsung
// function safeOrderBy(allowedColumns, userInput) {
//   if (allowedColumns.includes(userInput)) {
//     return userInput;
//   }
//   return 'id'; // default
// }

// ============================================
// PART 2: ORM ALTERNATIVES
// ============================================

// TODO 7: Prisma example
/*
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Safe by default — Prisma uses parameterized queries internally
const users = await prisma.user.findMany({
  where: { email: userInput }
});

// vs raw query (tetap harus parameterized):
const users = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${userInput}`;
// CATATAN: tagged template ini baru di Prisma 4+
*/

// TODO 8: Sequelize example
/*
const { User } = require('./models');

const users = await User.findAll({
  where: { email: userInput } // Sequelize auto-parameterizes
});
*/

// ============================================
// PART 3: INPUT VALIDATION + SANITIZATION
// ============================================

// TODO 9: Type coercion untuk numeric IDs
// function getUserId(id) {
//   // ParseInt dengan default
//   // JikaNaN, throw 400 Bad Request
// }

// TODO 10: SQL comment stripping
// function removeSQLComments(input) {
//   // Remove --, /*, */ patterns
//   // Ini defense-in-depth, BUKAN primary defense
// }

// ============================================
// PART 4: ERROR HANDLING
// ============================================

// TODO 11: Database error handler
// - Catch database errors
// - Log error (DO NOT expose to client)
// - Return generic error message: "Internal server error"
// - DO NOT return: SQL syntax, stack trace, table names

// function handleDatabaseError(err, res) {
//   console.error('[DB ERROR]', err.message);
//   res.status(500).json({ error: 'Terjadi kesalahan sistem' });
// }

// ============================================
// PART 5: SECURITY CHECKLIST
// ============================================

/*
CHECKLIST SQL Injection Prevention:

[ ] Semua user input melewati validation (Zod/middleware)
[ ] Semua SQL queries menggunakan parameterized statements
[ ] ORM menggunakan parameterized queries (tidak raw jika bisa)
[ ] ORDER BY columns di-allowlist
[ ] LIKE wildcards di-escape
[ ] Error messages TIDAK expose SQL details
[ ] Database user punya least privilege (bukan root/admin)
[ ] Logging aktif untuk query yang mencurigakan
[ ] WAF (Web Application Firewall) di-depan untuk extra protection
*/
```

### Soal 3C — Defense Questions

```bash
# 1. Mengapa parameterized queries TIDAK bisa digunakan untuk ORDER BY atau LIMIT?
#    Alternatif apa yang digunakan untuk field-column tersebut?
# Jawaban:

# 2. ORM seperti Sequelize/Prisma — apakah automatically safe dari SQL injection?
#    Kapan masih bisa vulnerable?
# Jawaban:

# 3. Apa itu "ORM bypass"? Kapan attacker bisa bypass ORM dan menggunakan raw queries?
# Jawaban:

# 4. Same input dari frontend vs attacker (curl/postman) — bagaimana server harus memperlakukan keduanya?
# Jawaban:
```

---

## Kriteria Penilaian
- [ ] Semua query menggunakan parameterized statements ($1, $2 placeholder)
- [ ] LIKE wildcards (% dan _) di-escape dengan benar
- [ ] ORDER BY menggunakan allowlist (bukan direct user input)
- [ ] Numeric IDs di-convert dengan type coercion + validation
- [ ] Error messages TIDAK expose SQL details
- [ ] Memahami bahwa ORM tidak automatically safe di semua case