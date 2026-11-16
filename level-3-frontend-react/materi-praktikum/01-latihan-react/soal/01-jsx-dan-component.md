# Latihan 01 — JSX dan Component

## Soal 01: JSX Dasar dan Component Props

### Tujuan
Memahami JSX syntax, perbedaan JSX dengan HTML, cara membuat functional component, dan cara passing data via props.

### Deskripsi
Buat aplikasi sederhana `StudentDirectory` yang menampilkan daftar student dengan profile cards.

**Data students:**
```js
const students = [
  { id: "S001", name: "Reza Pratama", nim: "2023001", major: "Informatika", gpa: 3.85, avatar: "👨‍💻" },
  { id: "S002", name: "Siti Nurhaliza", nim: "2023002", major: "Sistem Informasi", gpa: 3.92, avatar: "👩‍💼" },
  { id: "S003", name: "Budi Santoso", nim: "2023003", major: "Teknik Komputer", gpa: 3.45, avatar: "🧑‍🔧" },
  { id: "S004", name: "Diana Putri", nim: "2023004", major: "Informatika", gpa: 3.78, avatar: "👩‍🎨" },
  { id: "S005", name: "Ahmad Rizki", nim: "2023005", major: "Sistem Informasi", gpa: 3.60, avatar: "👨‍🎓" },
];
```

**Component yang harus dibuat:**

1. **`StudentCard`** — menerima props:
   - `name` (string), `nim` (string), `major` (string), `gpa` (number), `avatar` (emoji)
   - Tampilkan: avatar, nama, NIM, major, IPK
   - IPK badge coloring:
     - gpa >= 3.75 → hijau: "Cum Laude"
     - gpa >= 3.50 → biru: "Baik"
     - gpa >= 3.00 → abu-abu: "Cukup"
     - gpa < 3.00 → merah: "Perlu Perbaikan"
   - `className` bukan `class` pada JSX attribute
   - Semua tags harus ditutup dengan benar

2. **`StudentDirectory`** — parent component:
   - Render `<h1>` judul "Direktori Mahasiswa"
   - Render list `students.map()` dengan `StudentCard`
   - Setiap `StudentCard` punya `key={student.id}`

**Expected Output:**
```
Direktori Mahasiswa
[👨‍💻] Reza Pratama
     NIM: 2023001 | Major: Informatika
     IPK: 3.85 [Cum Laude]
[👩‍💼] Siti Nurhaliza
     NIM: 2023002 | Major: Sistem Informasi
     IPK: 3.92 [Cum Laude]
...
```

### Aturan
- Component name HARUS PascalCase (contoh: `StudentCard`, bukan `studentCard`)
- Props di-destructure di parameter function
- Self-closing tags harus memiliki `/>` (contoh: `<img />`, tidak cukup `<img>`)
- `key` prop HARUS di-level `<li>`/root element yang di-map, bukan di inner elements
- Hindari hardcoded inline objects — pass individual props

### Pertanyaan Analisis
1. Apa yang terjadi jika `key` tidak diberikan? Apakah React akan error atau hanya warning?
2. Mengapa `className` digunakan di JSX bukan `class`?
3. Apa perbedaan antara element dan component dalam React terminology?