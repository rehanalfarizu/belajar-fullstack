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

Contoh jawaban sengaja tidak ditaruh di sini. Tulis sendiri dulu berdasarkan checklist di atas. Setelah punyamu jalan, bandingkan dengan [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).

---

## Cara Submit
1. Buat server dengan token refresh flow
2. Test: login → dapat access + refresh
3. Tunggu access token expired → refresh
4. Logout → token tidak bisa dipakai lagi