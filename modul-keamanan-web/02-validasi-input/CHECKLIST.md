# CHECKLIST — Validasi Input

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri.

---

## Pemahaman Konsep

- [ ] Aku paham perbedaan validasi client-side dan server-side
- [ ] Aku paham kenapa validasi client-side saja TIDAK cukup
- [ ] Aku bisa menjelaskan cara bypass validasi client
- [ ] Aku paham perbedaan validation dan sanitization
- [ ] Aku paham kenapa whitelist lebih aman dari blacklist
- [ ] Aku tahu minimal 2 library validasi di JavaScript

---

## Kemampuan Praktis

- [ ] Aku bisa menambahkan validasi di Express endpoint
- [ ] Aku bisa membuat Zod schema untuk data kompleks
- [ ] Aku bisa mengembalikan error message yang jelas tapi tidak bocorkan info sensitif
- [ ] Aku bisa memvalidasi: string, number, email, enum, optional field
- [ ] Aku bisa test validasi dengan curl atau Postman

---

## Best Practices

- [ ] Aku selalu validasi di server, tidak hanya di client
- [ ] Aku menggunakan library validasi, bukan regex buatan sendiri untuk hal kompleks
- [ ] Aku menggunakan whitelist (apa yang boleh) bukan blacklist (apa yang tidak boleh)
- [ ] Aku memvalidasi di awal handler/controller, sebelum proses bisnis
- [ ] Error message ku tidak mengekspos struktur internal atau query

---

## Siap Lanjut?

Jika semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, 
lanjut ke modul berikutnya: `03-sql-injection/`
