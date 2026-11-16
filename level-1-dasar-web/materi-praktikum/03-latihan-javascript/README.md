# Materi Praktikum 03 -- Latihan JavaScript

## Tujuan Pembelajaran

Modul ini memperkenalkan **JavaScript** -- bahasa pemrograman yang membuat halaman web menjadi interaktif. Berbeda dengan HTML (struktur) dan CSS (tampilan), JavaScript menangani **logika dan perilaku** halaman web.

Pada modul ini kamu akan menguasai:

- Variabel, tipe data, dan operator aritmatika.
- Percabangan: `if/else` dan `switch`.
- Perulangan: `for`, `while`, `forEach`.
- Array dan Object, serta method-method penting.
- Fungsi: declaration, expression, arrow function.
- DOM manipulation (mengubah HTML dari JavaScript).
- Async: Promise, `async/await`, `fetch`.

---

## Cara Pakai

Lima langkah kerja:

1. **BACA** `soal/01-nama-soal.md` untuk pahami apa yang diminta.
2. **BUKA** `code/01-nama-soal.js` — template kode JavaScript.
3. **KETIK** dari 0 di VS Code (jangan copy-paste!).
4. **JALANKAN** di browser atau Node.js untuk lihat hasilnya.
5. **UBAH** logikanya untuk eksperimen.

### Tiga Opsi Menjalankan JavaScript

1. **Di browser (untuk DOM manipulation)** — buka file `.html` yang menyertakan script kamu, tekan `F12` ke tab Console untuk melihat `console.log`.
2. **Di Node.js (untuk logic/CLI)** — jalankan `node 01-kalkulator-sederhana.js`.
3. **Di browser langsung** — buat file HTML dengan tag `<script>` di dalam `<body>`, atau buka DevTools Console browser langsung dan ketik kode.

---

## Reset JavaScript (Wajib)

```javascript
// ========== TODO 1: AMBIL INPUT ==========
// parseFloat / parseInt / prompt → konversi string ke angka
// Di Node.js: const readline = require('readline')
```

---

## Daftar Latihan

### PEMULA (Soal 01–04)

Empat soal fondasi JavaScript:

1. **Kalkulator Sederhana** — `const`, `let`, operator aritmatika, `parseFloat`, `console.log`.
2. **Cek Bilangan** — `if/else`, `switch`, operator perbandingan, modulus `%`.
3. **FizzBuzz** — loop `for`, kondisi bertingkat, array `push`.
4. **Array Manipulation** — `map`, `filter`, `reduce`, `find`, `sort`, `some`, `every`.

### MENENGAH (Soal 05–07)

Tiga soal menengah:

5. **Todo List CLI** — Array CRUD (Create, Read, Update, Delete), fungsi, loop.
6. **Object & Destructuring** — Object literal, destructuring `{}`, spread operator `...`.
7. **Callback & Higher-Order** — Arrow function, `forEach`, `map`, `filter` sebagai callback.

### LANJUT (Soal 08–10)

Tiga soal untuk topik lanjutan:

8. **Async/Await** — `Promise`, `fetch`, `async/await`, `try/catch`.
9. **Class & OOP** — `class`, `constructor`, `method`, `this`, inheritance.
10. **Error Handling** — `try/catch/finally`, `throw`, custom error, debugging.

---

## Tips Penting JavaScript

Delapan tips yang langsung terasa dampaknya:

1. KETIK dari 0 — jangan copy-paste. Menulis melatih muscle memory coding.
2. `console.log()` adalah temanmu — tampilkan setiap step untuk debugging.
3. UBAH nilainya — coba edge cases (kosong, negatif, nol, sangat besar).
4. ERROR itu biasa — baca pesan error dengan seksama, selalu mulai dari baris pertama.
5. `parseFloat` vs `parseInt`: `parseFloat` untuk desimal (1.5), `parseInt` untuk integer (1).
6. `NaN` = Not a Number — cek dengan `isNaN()`.
7. `===` vs `==`: SELALU gunakan `===` (strict equality) — tidak pernah `==` (loose equality).
8. `let` vs `const`: gunakan `const` secara default — ganti ke `let` hanya kalau nilainya berubah.

---

## Konsep Penting per Soal

Sepuluh ringkasan konsep per soal:

1. **Soal 01 — Variabel & Aritmatika** — `const angka1 = parseFloat(prompt("Angka pertama:"))`; operator `+ - * / %`; output `console.log(\`${a} ${op} ${b} = ${hasil}\`)`.
2. **Soal 02 — Percabangan** — `if/else if/else` untuk kondisi banyak kemungkinan; `switch` untuk nilai terbatas; operator `===`, `!==`, `>`, `<`, `>=`, `<=`, `%` (modulus).
3. **Soal 03 — Loop & Array** — `for (let i = 1; i <= limit; i++) { ... }`; `array.push(item)` untuk tambah ke array; cek kelipatan `% 15` (FizzBuzz), `% 3` (Fizz), `% 5` (Buzz).
4. **Soal 04 — Array Methods** — `map` transformasi, `filter` pilih yang memenuhi kondisi, `reduce` akumulasi, `find` cari pertama, `some` cek ada yang cocok, `every` cek semua cocok, `sort` urutkan.
5. **Soal 05 — CRUD Array** — Create `array.push({ id, task, done: false })`; Read `array.forEach` atau `for`; Update `array.find` lalu ubah property; Delete `array.splice(index, 1)` atau `array.filter`.
6. **Soal 06 — Object & Destructuring** — Object literal `{ nama, umur, city }`; destructuring `const { nama, umur } = person`; spread `const clone = { ...original }`.
7. **Soal 07 — Higher-Order Functions** — Arrow function `(item) => item * 2`; callback `array.map(function(item) { return item * 2 })`; method chaining `array.filter(...).map(...)`.
8. **Soal 08 — Async/Await** — Promise `new Promise((resolve, reject) => { ... })`; async/await `async function() { const data = await fetch(url) }`; try/catch `try { ... } catch (err) { ... }`.
9. **Soal 09 — Class & OOP** — `class NamaClass { constructor(param) { this.property = param } }`; method `namaMethod() { return this.property }`; inheritance `class Child extends Parent { ... }`.
10. **Soal 10 — Error Handling** — `try { kode yang mungkin error } catch (err) { tangani error }`; `throw new Error("Pesan error")`; `finally { selalu jalan, mau error atau tidak }`.

---

## Struktur Template Kode

```javascript
// ============================================================
// SOAL 01 — KALKULATOR SEDERHANA
// ============================================================
// Tujuan: Variabel, operator aritmatika, parseInt/parseFloat
//
// TODO 1: Ambil input dari user (uncomment untuk browser)
// const angka1 = parseFloat(prompt("Masukkan angka pertama:"));
```

Tiga hal yang perlu dipahami dari template:

- Comment `// TODO N:` menunjukkan bagian yang perlu kamu isi.
- Baris yang di-comment (diawali `//`) adalah kode contoh atau placeholder.
- Hapus `//` untuk mengaktifkan kode, atau tulis sendiri dari 0.

---

**Target: 10/10 soal dikerjakan dari 0 → fondasi JavaScript SOLID!**

Setelah menyelesaikan 3 modul fundamental ini, kamu siap masuk ke Level 2 (Backend Node.js) dan Level 3 (Frontend React).
