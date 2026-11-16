# CHECKLIST — Autentikasi dan Password

## Pemahaman Konsep

- [ ] Aku paham kenapa menyimpan password plain text berbahaya
- [ ] Aku paham apa itu hashing dan bedanya dengan encryption
- [ ] Aku paham fungsi salt dalam password hashing
- [ ] Aku paham perbedaan session-based dan token-based auth
- [ ] Aku paham kenapa localStorage tidak aman untuk token

## Kemampuan Praktis

- [ ] Aku bisa hash password dengan bcrypt
- [ ] Aku bisa verify password saat login
- [ ] Aku bisa implementasi session dengan HttpOnly cookie
- [ ] Aku bisa implementasi rate limiting sederhana
- [ ] Aku bisa protect route yang butuh autentikasi

## Best Practices

- [ ] Aku SELALU hash password, tidak pernah plain text
- [ ] Aku menggunakan bcrypt atau Argon2, bukan MD5/SHA1
- [ ] Aku menyimpan token di HttpOnly cookie untuk web
- [ ] Aku implementasi rate limiting untuk endpoint login
- [ ] Error message ku tidak mengungkap apakah username atau password yang salah
