# Tutorial — LEVEL 3: Frontend React

Folder ini berisi **panduan langkah demi langkah** untuk membangun frontend aplikasi web dengan React. Tutorial di sini fokus pada praktik langsung, bukan teori.

---

## Tutorial yang Tersedia

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | [01-membuat-aplikasi-react-pertama.md](01-membuat-aplikasi-react-pertama.md) | Todo App pertama | Vite, JSX, Component, useState |
| 01 | [01-membuat-react-app-pertama.md](01-membuat-react-app-pertama.md) | Komponen Card | Vite, struktur folder, Component, styling |
| 02 | [02-react-dengan-api.md](02-react-dengan-api.md) | React + Express API | useEffect, useState, fetch data |

Topik router dan state belum punya tutorial sendiri. Pakai
[materi-teori](../materi-teori/03-react-router/README.md) dan
[latihan state](../materi-praktikum/04-latihan-state/TUGAS.md) untuk itu.

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
STEP 1 → Tutorial 01: Buat React app pertama (pilih salah satu dari dua versi)
STEP 2 → Tutorial 02: Ambil data dari API dengan useEffect
STEP 3 → Lanjut ke materi-praktikum untuk router, state, dan form
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
