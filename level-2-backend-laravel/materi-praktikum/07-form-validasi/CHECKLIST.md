# CHECKLIST — Form Request & Validasi

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan kenapa validasi HTML/JavaScript saja tidak cukup
- [ ] Aku tahu beda validasi (menolak), sanitasi (merapikan), dan otorisasi (boleh atau tidak)
- [ ] Aku tahu beda status `401`, `403`, `419`, dan `422`
- [ ] Aku tahu urutan Form Request: `authorize()` → `prepareForValidation()` → `rules()` → `after()`
- [ ] Aku paham kenapa `validated()` lebih aman daripada `all()`
- [ ] Aku paham arti `sometimes`, `nullable`, dan `required` serta bedanya

---

## Kemampuan Praktis

- [ ] Aku bisa membuat Form Request dengan `php artisan make:request`
- [ ] Aku bisa menulis rule unik yang mengabaikan data milik sendiri saat edit
- [ ] Aku bisa menulis aturan antar-field dengan `after()`
- [ ] Aku bisa menampilkan error dengan `@error` dan mengisi ulang form dengan `old()`
- [ ] Aku bisa membobol validasi HTML dengan DevTools dan curl
- [ ] Aku bisa menulis test dengan `assertUnprocessable()` dan `assertJsonValidationErrors()`

---

## Best Practices

- [ ] Aku selalu validasi di server, walau form sudah punya `required`
- [ ] Aku menyimpan hanya `$request->validated()` (atau `safe()->only(...)`)
- [ ] Aku memisahkan Form Request untuk create dan update kalau aturannya beda
- [ ] Pesan error-ku jelas dalam bahasa Indonesia dan tidak membocorkan nama tabel/query
- [ ] Aku tidak "memaksa" nilai aneh jadi valid di `prepareForValidation()`

---

## Siap Lanjut?

Jika semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang,
lanjut ke topik berikutnya: [`08-autentikasi/`](../08-autentikasi/README.md)
