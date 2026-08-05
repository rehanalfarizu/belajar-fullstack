# SOAL 01 — Register & Login dengan bcrypt & JWT

## Tujuan
Memahami cara hash password, generate JWT token, dan auth flow lengkap.

---

## Briefing
Buat auth system dengan register, login, dan JWT token generation.

---

## Syarat (Checklist)

### Setup
- [ ] `npm install express bcryptjs jsonwebtoken cors dotenv`
- [ ] Buat `.env` dengan `JWT_SECRET`, `PORT`

### User Model (simple)
```javascript
const users = []; // array untuk simulasi (nantinya pakai DB)
```

### Register Endpoint
- [ ] `POST /api/auth/register`
- [ ] Validasi: nama, email, password (min 8 char)
- [ ] Check email sudah ada
- [ ] Hash password dengan `bcrypt.hash(password, 10)`
- [ ] Simpan user dengan password hash
- [ ] Return success (tanpa password)

### Login Endpoint
- [ ] `POST /api/auth/login`
- [ ] Validasi email + password
- [ ] Compare hash dengan `bcrypt.compare()`
- [ ] Generate JWT: `jwt.sign({ id, email }, secret, { expiresIn: "7d" })`
- [ ] Return token

### Protected Route
- [ ] Middleware untuk verify JWT
- [ ] `GET /api/auth/me` — return current user

---

## Contoh Code

```javascript
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Validasi
    if (!nama || !email || !password) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password min 8 karakter" });
    }

    // Cek email
    const exist = users.find(u => u.email === email);
    if (exist) {
      return res.status(409).json({ error: "Email sudah terdaftar" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), nama, email, password: hashed };
    users.push(user);

    res.status(201).json({ message: "Registrasi berhasil", user: { id: user.id, nama, email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: "Email/password salah" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Email/password salah" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user.id, nama: user.nama, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## Cara Submit
1. Simpan sebagai `server.js`
2. Install dependencies
3. Buat `.env` dengan `JWT_SECRET` minimal 32 karakter acak dan `PORT=3000`
4. Test: curl register, curl login, curl /me dengan token
