# CHECKLIST — Blade Template

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri, bukan untuk dinilai orang lain.

---

## Pemahaman Konsep

- [ ] Aku paham Blade dikompilasi jadi PHP biasa dan hasilnya HTML
- [ ] Aku bisa menjelaskan apa yang dilakukan `{{ }}` terhadap `<`, `>`, `"`, `'`, `&`
- [ ] Aku paham kenapa `{!! !!}` dengan data user = XSS
- [ ] Aku paham escape HTML tidak cukup untuk atribut URL (`javascript:`) dan konteks JavaScript
- [ ] Aku paham beda `@yield` dan `@stack`
- [ ] Aku paham beda props, attributes, dan slot di komponen
- [ ] Aku bisa menjelaskan beda XSS dan CSRF
- [ ] Aku paham kenapa view tidak boleh menjalankan query database

---

## Kemampuan Praktis

- [ ] Aku bisa membuat layout dan halaman yang `@extends` layout itu
- [ ] Aku bisa membuat anonymous component dengan `@props` dan default value
- [ ] Aku bisa menggabungkan class dengan `$attributes->merge()`
- [ ] Aku bisa memakai `@forelse` untuk empty state
- [ ] Aku bisa menampilkan teks multi-baris dengan aman (`e()` lalu `nl2br`)
- [ ] Aku bisa mengirim data PHP ke JavaScript dengan `Js::from()`
- [ ] Aku bisa membuat form update dengan `@csrf`, `@method('PUT')`, `old()`, dan `@error`
- [ ] Aku bisa menulis test yang membuktikan payload XSS tidak dirender mentah

---

## Best Practices

- [ ] Default-ku selalu `{{ }}`. `{!! !!}` hanya untuk HTML yang sudah disanitasi di server
- [ ] Aku memvalidasi URL dari user (http/https saja) **dan** tetap curiga di view
- [ ] Link ke situs luar memakai `rel="noopener noreferrer"`
- [ ] Bagian tampilan yang berulang aku jadikan komponen, bukan copy-paste
- [ ] Aku cek View Page Source, bukan cuma tampilan, saat menguji XSS
- [ ] Aku tidak mematikan CSRF hanya karena "form-nya error 419"

---

## Siap Lanjut?

Jika semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang,
lanjut ke topik berikutnya: [05 — Database Migration](../05-database-migration/soal/01-products-migration.md).
