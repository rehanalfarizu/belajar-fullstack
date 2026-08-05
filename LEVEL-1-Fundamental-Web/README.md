# LEVEL-1 — Fundamental Web Development

> Fondasi web: HTML, CSS, JavaScript, aksesibilitas, debugging, dan TypeScript.

---

## 📋 Struktur Folder

```
LEVEL-1/
├── materi-teori/                  → Konsep fundamental
│   ├── 01-html/
│   ├── 02-css/
│   ├── 03-javascript-fundamental/
│   └── 04-typescript-fundamental/
├── materi-praktikum/             → Latihan fundamental
│   ├── 01-latihan-html/          → 10 soal HTML
│   ├── 02-latihan-css/           → 10 soal CSS
│   ├── 03-latihan-javascript/    → 10 soal JS
│   └── 04-latihan-typescript/    → latihan contract dan narrowing
├── tutorial/                       → Study case & panduan langkah demi langkah
│   └── tutorial bertahap dari workspace sampai portfolio
├── software/                       → Install & setup tools
│   ├── 01-vscode-install.md
│   ├── 02-chrome-devtools.md
│   └── 03-git-install.md
└── README.md
```

---

## 📖 Materi Teori

Modul disusun dari markup sampai type safety:

1. **Modul 01 — HTML**: Element, semantic HTML, dan form.
2. **Modul 02 — CSS**: Selector, box model, flexbox, dan responsive design.
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

1. **Selector & Properti Dasar** — Class, ID, dan property warna/typography.
2. **Box Model** — Margin, border, padding, dan box-sizing.
3. **Layout Sederhana** — Float, clear, dan positioning.
4. **Flexbox Intro** — Container, item, dan alignment.
5. **Flexbox Lanjutan** — Grow, shrink, basis, dan wrapping.
6. **Responsive Design** — Media query, breakpoint, dan mobile-first.
7. **CSS Variables** — Custom property dan tema.
8. **Transition & Animation** — Hover effect, keyframes, dan timing function.
9. **Pseudo-class & Pseudo-element** — `:hover`, `:focus`, `::before`, dan `::after`.
10. **CSS Grid** — Grid container, area, dan responsive grid.

### JavaScript (03-latihan-javascript)

1. **Variable & Tipe Data** — `let`, `const`, string, number, dan boolean.
2. **Function & Scope** — Declaration, expression, arrow function, dan scope.
3. **Array & Method** — `map`, `filter`, `reduce`, dan `find`.
4. **Object & Destructuring** — Property access, spread, dan destructuring.
5. **Conditional & Loop** — `if/else`, `switch`, `for`, dan `while`.
6. **DOM Selection** — `querySelector`, `getElementById`, dan traversal.
7. **DOM Manipulation** — `textContent`, `innerHTML`, dan classList.
8. **Event Handling** — `addEventListener`, event object, dan delegation.
9. **Form Validation** — Client-side validation dan feedback UI.
10. **Async & Fetch** — Promise, `async/await`, dan Fetch API.

### TypeScript (04-latihan-typescript)

Modelkan katalog produk, validasi data `unknown`, gunakan generic,
discriminated union, dan exhaustive checking. Jalankan `npm run validate:types`.

---

## 🛠️ Software & Tools

Tiga panduan instalasi dan setup tools pendukung:

1. **VSCode Install** — Editor utama untuk menulis kode.
2. **Chrome DevTools** — Inspect element, console, dan network tab.
3. **Git Install** — Version control system.

---

## 🎯 Tujuan Level Ini

Setelah menyelesaikan LEVEL-1, kamu akan mampu:

- Membuat halaman web statis dengan HTML dan CSS yang rapi
- Menulis logika program JavaScript untuk interaktivitas dasar
- Memakai Git dan DevTools untuk mengisolasi masalah
- Memodelkan kontrak data dasar dengan TypeScript
- Menjadi fondasi untuk belajar framework modern di level selanjutnya

---

**Setelah menyelesaikan LEVEL-1, lanjut ke [LEVEL-2](../LEVEL-2-Backend-Node-Express/)**
