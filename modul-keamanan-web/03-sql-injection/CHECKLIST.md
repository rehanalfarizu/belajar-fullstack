# CHECKLIST — SQL Injection

---

## Pemahaman Konsep

- [ ] Aku paham apa itu SQL injection dan cara kerjanya
- [ ] Aku bisa menjelaskan kenapa string concatenation berbahaya
- [ ] Aku paham perbedaan classic, union-based, dan blind SQL injection
- [ ] Aku tahu apa itu parameterized query / prepared statement
- [ ] Aku paham prinsip least privilege untuk database user

---

## Kemampuan Praktis

- [ ] Aku berhasil melakukan SQL injection di lab
- [ ] Aku bisa mengidentifikasi kode yang rentan SQL injection
- [ ] Aku bisa memperbaiki kode rentan menjadi aman
- [ ] Aku bisa menulis parameterized query di Node.js (pg atau mysql2)
- [ ] Aku bisa menggunakan ORM dengan aman

---

## Best Practices

- [ ] Aku SELALU menggunakan parameterized query, tidak pernah string concatenation
- [ ] Aku menggunakan ORM yang sudah handle parameterization
- [ ] Aku memvalidasi input sebelum digunakan di query (sebagai lapisan tambahan)
- [ ] Aku menggunakan database user dengan permission minimal
- [ ] Aku tidak menampilkan error SQL mentah ke user

---

## Siap Lanjut?

Jika semua item sudah tercentang, lanjut ke modul berikutnya: `04-autentikasi-dan-password/`
