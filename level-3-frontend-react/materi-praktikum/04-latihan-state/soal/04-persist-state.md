# Latihan 04 — Persist Middleware

## Soal 01: Persist Middleware untuk useReducer

### Tujuan
Memahami pattern middleware untuk useReducer yang secara otomatis persist state ke localStorage, dan bagaimana mengimplementasikan undo/redo capability.

### Deskripsi
Buat `NotesApp` — aplikasi catatan sederhana dengan persist dan undo/redo functionality.

**Initial State:**
```js
{
  notes: [
    { id: "N001", title: "Belajar React", content: "useState dan useEffect adalah dasar React hooks", createdAt: Date.now(), tags: ["react", "js"] },
    { id: "N002", title: "Meeting Notes", content: "Discuss project timeline dengan tim", createdAt: Date.now(), tags: ["work"] },
  ],
  filter: "all", // "all" | tag name
  sortBy: "newest", // "newest" | "oldest" | "alpha"
}
```

**Middleware Pattern:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "04-persist-state Soal 01 — createPersistMiddleware").

Petunjuk: middleware ini membungkus reducer dan mengembalikan reducer baru. Kapan tepatnya menyimpan: sebelum atau sesudah reducer menghasilkan state baru? Bagaimana kalau `setItem` gagal?

**Undo/Redo Middleware:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "04-persist-state Soal 01 — createUndoMiddleware").

Petunjuk: butuh dua tumpukan (past dan future). Apa yang terjadi pada `future` saat ada aksi baru? Di mana batas 50 entri dipasang?

**Composable Middleware:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "04-persist-state Soal 01 — applyMiddleware").

Petunjuk: komposisi fungsi dari kiri ke kanan atau kanan ke kiri? Coba tukar urutan undo dan persist lalu amati perbedaannya.

**Action Types:**
```js
ADD_NOTE: { type: "ADD_NOTE", payload: { title, content, tags } }
UPDATE_NOTE: { type: "UPDATE_NOTE", payload: { id, title, content, tags } }
DELETE_NOTE: { type: "DELETE_NOTE", payload: { id } }
SET_FILTER: { type: "SET_FILTER", payload: { filter } }
SET_SORT: { type: "SET_SORT", payload: { sortBy } }
UNDO: { type: "UNDO" }
REDO: { type: "REDO" }
HYDRATE: { type: "HYDRATE", payload: { state } } // untuk load dari localStorage
```

**Fitur:**
1. CRUD notes: Create, Read, Update, Delete
2. Tag system: notes bisa punya tags, filter berdasarkan tag
3. Sort: newest, oldest, alphabetical
4. Undo/Redo buttons dengan keyboard shortcut (Ctrl+Z / Ctrl+Shift+Z)
5. Auto-save ke localStorage setiap perubahan
6. Load dari localStorage saat app mount
7. Note editor: modal atau inline editing

**Keyboard Shortcuts:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "04-persist-state Soal 01 — Shortcut keyboard undo/redo").

Petunjuk: pasang listener di mana, dan bagaimana membersihkannya? Bedakan Ctrl+Z dan Ctrl+Shift+Z, dan jangan lupa tombol Cmd di Mac.

### Aturan
- Middleware harus composed dalam urutan yang benar: undo → persist
- localStorage read hanya saat mount (HYDRATE action)
- localStorage write setiap action SETELAH reducer memprosesnya
- Undo history dibatasi 50 entries untuk mencegah memory leak
- Reset future (forward stack) setiap kali action baru dilakukan

### Pertanyaan Analisis
1. Apa perbedaan antara middleware pattern dan useEffect untuk persist?
2. Bagaimana urutan middleware mempengaruhi behavior?
3. Kapan undo/redo history harus dibatasi? Bagaimana menentukan limit yang tepat?
4. Apa risiko persist middleware jika state berisi function atau non-serializable data?