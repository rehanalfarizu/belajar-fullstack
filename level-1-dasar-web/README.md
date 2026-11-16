# LEVEL-1 — Fundamental Web Development

> Fondasi web: HTML, CSS, JavaScript, aksesibilitas, debugging, dan TypeScript.

---

## 📋 Struktur Folder

```
LEVEL-1/
├── materi-teori/                          → Konsep fundamental
│   ├── 01-html-fundamental/
│   ├── 02-css-fundamental/
│   ├── 03-git-github-fundamental/         → materi Git historis (urutan utama ada di Level 0)
│   ├── 03-javascript-fundamental/
│   ├── 04-typescript-fundamental/
│   └── 05-web-quality-performance-security/
├── materi-praktikum/                      → Latihan fundamental
│   ├── 01-latihan-html/                   → 10 soal HTML (punya folder contoh/)
│   ├── 02-latihan-css/                    → 10 soal CSS
│   ├── 03-latihan-javascript/             → 10 soal JS
│   └── 04-latihan-typescript/             → latihan contract dan narrowing (punya folder contoh/)
├── tutorial/                              → 12 file tutorial (lihat tutorial/README.md)
├── software/                              → Install & setup tools
│   ├── 02-git-github.md
│   └── 02-git-install.md
└── README.md
```

Panduan install VS Code, Node.js, dan Chrome DevTools ada di
[LEVEL-0 software](../level-0-dasar-engineering/software/README.md).

---

## 📖 Materi Teori

Modul disusun dari markup sampai type safety:

1. **Modul 01 — HTML** (`01-html-fundamental`): Element, semantic HTML, dan form.
2. **Modul 02 — CSS** (`02-css-fundamental`): Selector, box model, flexbox, dan responsive design.
3. **Modul 03 — JavaScript**: Variable, function, DOM, dan event.
4. **Modul 04 — TypeScript**: union, generic, narrowing, dan runtime boundary.
5. **Modul 05 — Web quality**: accessibility, browser performance, XSS, URL,
   storage, dan CSP.

Materi Git historis tetap tersedia di level ini, tetapi urutan utama Git ada di
Level 0.

Setelah teori dan praktikum, kerjakan
[Self Problem Solving Level 1](SELF_PROBLEM_SOLVING.md) tanpa membuka solusi.
Materi optimasi/security ada di
[Web Quality](materi-teori/05-web-quality-performance-security/README.md).

---

## 🏋️ Praktikum

### HTML (01-latihan-html)

1. **Biodata Diri** — Heading, paragraf, dan list dasar.
2. **Artikel Blog** — Semantic HTML (`<article>`, `<section>`, `<header>`, `<footer>`).
3. **Tabel Jadwal** — `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `colspan`, dan `rowspan`.
4. **Form Pendaftaran** — `<form>`, `<input>`, `<label>`, `<select>`, `<textarea>`, dan `<fieldset>`.
5. **Halaman Portfolio** — `<img>`, `<iframe>`, `<audio>`, dan multimedia embedding.
6. **Layout Artikel** — Semantic HTML lengkap: `<main>`, `<aside>`, dan `<nav>`.
7. **Navigasi & Dropdown** — `<nav>`, anchor links, relative URL, dan href.
8. **SEO & Accessibility** — Meta tags, `alt`, `aria-label`, dan heading hierarchy.
9. **Form Lanjutan** — Input types, `required`, `pattern`, dan validation.
10. **Document Flow** — Block vs inline, `<div>`, `<span>`, dan konsep box model.

### CSS (02-latihan-css)

1. **Layout Dasar** — CSS reset, selector dasar, box model, dan centering.
2. **Selector & Box Model** — Selector, margin, border, padding, dan `box-sizing`.
3. **Flexbox** — Container, item, alignment, grow, shrink, dan wrapping.
4. **Card Component** — Profile, product, stat, dan feature card dengan badge dan avatar.
5. **Grid System** — Grid container, area, dan responsive grid.
6. **Responsive Design** — Media query, breakpoint, dan mobile-first.
7. **Typography & Warna** — Font, ukuran, warna, dan CSS variables.
8. **Form Styling** — Mendesain input, label, dan state form.
9. **Animasi & Transisi** — Hover effect, `transition`, dan `@keyframes`.
10. **Positioning & Navbar** — `position`, z-index, dan navbar.

### JavaScript (03-latihan-javascript)

1. **Kalkulator Sederhana** — Variabel, operator, `parseFloat`, dan `if/else`.
2. **Cek Bilangan** — `if/else`, `switch`, operator perbandingan, dan modulus.
3. **FizzBuzz** — Loop `for`, kondisi bertingkat, dan array `push`.
4. **Array Manipulation** — `map`, `filter`, `reduce`, `find`, dan `sort`.
5. **Todo List CLI** — CRUD dengan array, fungsi, dan `readline`.
6. **Object & Destructuring** — Object literal, destructuring, dan spread.
7. **Callback & Higher-Order Function** — Callback, closure, dan fungsi sebagai nilai.
8. **Async/Await & Fetch** — Promise, `fetch`, `async/await`, dan `try/catch`.
9. **Class & OOP** — Class, inheritance, dan enkapsulasi.
10. **Error Handling** — `try/catch`, error kustom, dan validasi.

### TypeScript (04-latihan-typescript)

Modelkan katalog produk, validasi data `unknown`, gunakan generic,
discriminated union, dan exhaustive checking. Jalankan `npm run validate:types`.

---

## 🛠️ Software & Tools

Folder `software/` di level ini berisi dua panduan Git:

1. **Git & GitHub** (`software/02-git-github.md`).
2. **Install Git** (`software/02-git-install.md`).

Editor (VS Code), Node.js, dan Chrome DevTools dibahas di
[LEVEL-0 software](../level-0-dasar-engineering/software/README.md).

---

## 🎯 Tujuan Level Ini

Setelah menyelesaikan LEVEL-1, kamu akan mampu:

- Membuat halaman web statis dengan HTML dan CSS yang rapi
- Menulis logika program JavaScript untuk interaktivitas dasar
- Memakai Git dan DevTools untuk mengisolasi masalah
- Memodelkan kontrak data dasar dengan TypeScript
- Menjadi fondasi untuk belajar framework modern di level selanjutnya

---

**Setelah menyelesaikan LEVEL-1, lanjut ke [LEVEL-2](../level-2-backend-nodejs/)**
