# Materi Tutorial — LEVEL 3: Frontend React

Folder ini berisi **panduan langkah demi langkah** untuk membangun frontend aplikasi web nyata dengan React. Tutorial di sini berbeda dari materi-teori — fokusnya bukan penjelasan konsep, tapi **praktik langsung** di mana kamu akan membuat sesuatu yang bisa langsung dilihat di browser.

---

## Isi Folder

Tutorial yang tersedia di folder ini:

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | `01-component-dan-jsx.md` | Component Pertama | JSX, Props, Component composition |
| 01 | `01-vite-setup.md` | Setup Vite | Install, configure, project structure |
| 02 | `02-hooks-dasar.md` | Counter App | useState, useEffect, event handling |
| 02 | `02-state-management.md` | Todo App | useState, lifting state, CRUD lokal |
| 03 | `03-react-router.md` | Multi-page App | Routes, nested routes, URL params |
| 03 | `03-api-integration.md` | Fetch API | useEffect, fetch, loading, error states |
| 04 | `04-context-api.md` | Global State | Context API, Provider, useContext |
| 04 | `04-custom-hooks.md` | Custom Hooks | Reusable logic, custom hook patterns |

---

## Cara Pakai

1. **BACA** tutorial yang kamu mau kerjakan dari awal sampai akhir
2. **BUKA** VSCode dan buat project baru dengan Vite
3. **KETIK** kode dari 0 — jangan copy-paste, ketik sendiri
4. **JALANKAN** aplikasi dengan `npm run dev`
5. **UBAH** nilai dan eksperimen — pahami kenapa kodenya begitu
6. **SIMPAN** hasilnya di GitHub sebagai portfolio

---

## Alur Belajar yang Disarankan

```
STEP 1 → Tutorial01: Component dan JSX
         → Hasil: Component React pertama

STEP 2 → Tutorial02: Hooks Dasar
         → Hasil: Todo app interaktif

STEP 3 → Tutorial03: Router dan API Integration
         → Hasil: Aplikasi multi-page yang fetch data dari API

STEP 4 → Tutorial04: Context dan Custom Hooks
         → Hasil: Aplikasi dengan global state management

STEP 5 → Push semua project ke GitHub
         → Bangun portfolio frontend pertamamu
```

---

## Project yang Akan Kamu Bangun

### Todo App dengan React
```
todo-app/
├── src/
│   ├── App.jsx              → Root component
│   ├── components/
│   │   ├── TodoForm.jsx     → Form tambah/edit todo
│   │   ├── TodoList.jsx     → List semua todo
│   │   └── TodoItem.jsx     → Single todo item
│   ├── context/
│   │   └── TodoContext.jsx  → Global state
│   ├── hooks/
│   │   └── useTodos.js      → Custom hook untuk todos
│   └── App.css → Styling
└── package.json
```

### Checklist Feature Todo App
```
□ Tambah todo baru
□ Tandai todo selesai / belum selesai
□ Edit todo yang sudah ada
□ Hapus todo
□ Filter: semua / aktif / selesai
□ Persist data ke localStorage
□ Animasi saat tambah/hapus todo
□ Responsive design
□ Global state dengan Context API
□ Custom hook untuk reusable logic
```

---

## Tips

```
1. Selalu mulai dari Vite — lebih cepat dari Create React App
2. Component harus kecil dan fokus pada satu tugas
3. State naik (lift state up) kalau perlu dipakai di banyak component
4. Console.log() di useEffect untuk debug data API
5. Pakai Fragments (<> </>) kalau tidak butuh wrapper div
6. Commit setiap selesai satu fitur, bukan di akhir semua
```

---

**Lanjut ke:** [materi-praktikum/](../materi-praktikum/) untuk latihan soal tambahan
