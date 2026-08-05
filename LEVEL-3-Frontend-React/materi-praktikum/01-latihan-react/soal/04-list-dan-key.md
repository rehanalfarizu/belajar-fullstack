# Latihan 01 — List dan Key

## Soal 01: List Rendering dengan Key yang Tepat

### Tujuan
Memahami aturan keys di React, perbedaan antara index dan ID sebagai key, dan kapan index sebagai key masih acceptable.

### Deskripsi
Buat `KanbanBoard` — aplikasi Kanban board sederhana dengan drag-drop (tanpa actual drag-drop, cukup dengan click to move).

**Data:**
```js
const initialTasks = [
  { id: "T001", title: "Setup project", description: "Initialize React project dengan Vite", status: "todo", priority: "high" },
  { id: "T002", title: "Design mockup", description: "Buat wireframe untuk halaman utama", status: "todo", priority: "medium" },
  { id: "T003", title: "Implement auth", description: "Login dan register feature", status: "in-progress", priority: "high" },
  { id: "T004", title: "Write docs", description: "Dokumentasi API endpoints", status: "in-progress", priority: "low" },
  { id: "T005", title: "Deploy staging", description: "Deploy ke server staging", status: "done", priority: "medium" },
  { id: "T006", title: "Unit testing", description: "Test semua utility functions", status: "done", priority: "low" },
];
```

**Columns:**
- `todo` — kolom "To Do"
- `in-progress` — kolom "In Progress"
- `done` — kolom "Done"

**Component Structure:**
```
KanbanBoard
├── Column (3x: todo, in-progress, done)
│   └── TaskCard (key={task.id}) × N
```

**Fitur:**
1. Render setiap column dengan tasks yang sesuai status
2. Setiap `TaskCard` punya `key={task.id}` — WAJIB gunakan ID, BUKAN index
3. Priority badge dengan warna: high=merah, medium=kuning, low=abu-abu
4. Click tombol "Move Left"/"Move Right" untuk memindahkan task antar columns
5. Task count per column: "To Do (2)", "In Progress (2)", "Done (2)"

**Demonstrasi Problem dengan Index Key:**

Di comment kode, jelaskan dan tunjukkan apa yang terjadi jika:
- Kita menggunakan `key={index}` untuk TaskCard dalam list
- Task dipindahkan dari kolom A ke kolom B
- React akan melihat index 0, 1, 2... tapi task di position tersebut sudah berbeda

**Critical Analysis Questions (di comment atau dokumentasi):**

1. Jika task T001 (id="T001") di posisi index 0, dan kita tambahkan task baru di awal array → apa yang React render? Apakah posisi semua task akan berubah di DOM?
2. Jika kita move T001 dari "todo" ke "done", tapi menggunakan `key={index}` → apakah React akan update dengan benar atau seluruh list di-re-render?
3. Apa yang terjadi dengan focus state, input values, atau animasi jika keys tidak stabil?

### Aturan
- key HARUS unik di antara sibling elements (tasks dalam satu column)
- key TIDAK perlu globally unique
- Menggunakan `task.id` adalah best practice karena ID stabil tidak peduli posisi dalam array
- State update harus immutable: `setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))`

### Pertanyaan Analisis
1. Apakah ada kasus di mana index sebagai key adalah acceptable? Jelaskan.
2. Apakah `Math.random()` atau `Date.now()` sebagai key acceptable? Apa masalahnya?
3. Jika kamu fetch data dari API, dari mana sebaiknya key berasal?