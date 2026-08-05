# Tutorial — LEVEL 3: Frontend React

Folder ini berisi **panduan langkah demi langkah** untuk membangun frontend aplikasi web dengan React. Tutorial di sini fokus pada praktik langsung, bukan teori.

---

## Tutorial yang Tersedia

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | `01-buat-react-pertama.md` | React App Pertama | Vite, JSX, Component, Props |
| 02 | `02-state-dan-hooks.md` | Todo App | useState, useEffect, event handling |
| 03 | `03-react-router.md` | Multi-page App | React Router, navigasi |
| 04 | `04-context-dan-state.md` | State Management | Context API, useReducer |

---

## Cara Pakai

1. **BACA** tutorial dari awal sampai akhir
2. **BUKA** terminal di folder project
3. **KETIK** kode dari 0 — jangan copy-paste
4. **JALANKAN** aplikasi dengan `npm run dev`
5. **BUKA** di browser dan test fitur-fitur yang dibuat
6. **UBAH** nilai dan eksperimen untuk memahami alurnya

---

## Alur Belajar yang Disarankan

```
STEP 1 → Tutorial 01: Buat React app pertama
         → Hasil: Aplikasi React pertama dengan component

STEP 2 → Tutorial 02: State dan Hooks
         → Hasil: Todo app yang interaktif

STEP 3 → Tutorial 03: React Router
         → Hasil: Aplikasi multi-page dengan navigasi

STEP 4 → Tutorial 04: Context dan State Management
         → Hasil: Aplikasi dengan global state
```

---

## Struktur Project yang Akan Kamu Bangun

```
react-app/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx           → Entry point
│   ├── App.jsx            → Root component
│   ├── components/        → Reusable components
│   │   ├── Header.jsx
│   │   ├── TodoList.jsx
│   │   └── TodoItem.jsx
│   ├── pages/             → Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── NotFound.jsx
│   ├── context/           → Context providers
│   │   └── TodoContext.jsx
│   ├── hooks/             → Custom hooks
│   │   └── useLocalStorage.js
│   └── styles/            → CSS files
│       └── App.css
└── .env → Environment variables
```

---

## Checklist Kemampuan React

```
□ Buat project React dengan Vite
□ Tulis JSX dengan benar (single root element)
□ Buat component fungsional
□ Gunakan Props untuk passing data antar component
□ Gunakan useState untuk state management lokal
□ Gunakan useEffect untuk side effects
□ Buat custom hooks
□ Implementasi React Router untuk navigasi
□ Gunakan Context API untuk global state
□ Render list dengan key yang benar
□ Conditional rendering dengan && dan ternary
□ Handle form dengan controlled components
□ Fetch data dari API dengan useEffect
□ Debug dengan React DevTools
```

---

## Tips

```
1. Selalu mulai dari `npm create vite@latest` — jangan pakai CRA
2. Component harus kecil dan fokus pada satu tugas
3. State naik (lift state up) kalau perlu dipakai di banyak component
4. Console.log() di useEffect untuk debug data API
5. Pakai Fragments (<> </>) kalau tidak butuh wrapper div
6. Commit setiap selesai satu fitur, bukan di akhir semua
```

---

**Lanjut ke:** [materi-praktikum/](../materi-praktikum/) untuk latihan soal tambahan
