# SOAL 03 — Token Refresh

## Tujuan
Memahami access token + refresh token pattern untuk keamanan.

---

## Briefing
Buat sistem dengan access token (short-lived) dan refresh token (long-lived).

---

## Syarat (Checklist)

### Refresh Token
- [ ] Generate 2 tokens saat login:
  - Access token: expires 15 menit
  - Refresh token: expires 7 hari
- [ ] Store refresh token (array/database)
- [ ] `POST /api/auth/refresh` — exchange refresh token untuk access token baru
- [ ] `POST /api/auth/logout` — invalidate refresh token

### Security
- [ ] Refresh token rotation — setiap use, generate token baru
- [ ] Jangan expose refresh token di URL
- [ ] Validate refresh token sebelum issue access token baru

---

## Contoh Code

```javascript
const refreshTokens = []; // store refresh tokens

app.post("/api/auth/login", async (req, res) => {
  // ... verify email/password ...

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

app.post("/api/auth/refresh", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: "Refresh token invalid" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: "Refresh token expired" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  const { refreshToken } = req.body;
  const index = refreshTokens.indexOf(refreshToken);
  if (index > -1) refreshTokens.splice(index, 1);
  res.json({ message: "Logout berhasil" });
});
```

---

## Cara Submit
1. Buat server dengan token refresh flow
2. Test: login → dapat access + refresh
3. Tunggu access token expired → refresh
4. Logout → token tidak bisa dipakai lagi