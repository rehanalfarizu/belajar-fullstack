// ============================================================
// SOAL 05 — TODO LIST CLI
// ============================================================
// Tujuan: Array CRUD, functions, loop interaktif

// ============================================================
// DATA
// ============================================================
let todos = [
  { id: 1, task: "Belajar JavaScript", done: false },
  { id: 2, task: "Buat project portfolio", done: true },
  { id: 3, task: "Latihan coding setiap hari", done: false },
];

// ============================================================
// TODO 1: tampilkan()
// ============================================================
// Tampilkan semua todo dalam format:
// 1. [ ] Belajar JavaScript
// 2. [x] Buat project portfolio
// Hint: done ? "x" : " "

// ============================================================
// TODO 2: tambah(task)
// ============================================================
// - Auto-generate id (max + 1)
// - Push object baru { id, task, done: false }
// - Return string konfirmasi

// ============================================================
// TODO 3: hapus(id)
// ============================================================
// - Cari index dengan findIndex
// - splice(index, 1)
// - Return konfirmasi

// ============================================================
// TODO 4: selesai(id)
// ============================================================
// - Cari todo dengan find
// - Set done = true
// - Return konfirmasi

// ============================================================
// TODO 5: belumSelesai()
// ============================================================
// - Filter todos.done === false
// - Return array

// ============================================================
// TODO 6: jumlahSelesai()
// ============================================================
// - Filter todos.done === true
// - Return length

// ============================================================
// TODO 7: MENU INTERAKTIF
// ============================================================
// Tampilkan menu terus-menerus sampai user pilih keluar:
//
// ===== MENU =====
// 1. Lihat Semua Todo
// 2. Tambah Todo
// 3. Hapus Todo
// 4. Tandai Selesai
// 5. Todo Belum Selesai
// 6. Statistik
// 7. Keluar
//
// Hint: pakai while loop + prompt (browser) atau readline (Node.js)
// ============================================================

// ============================================================
// TEST (uncomment satu per satu)
// ============================================================
tampilkan();
// todos.push(todos.length + 1, "Test", false);
// hapus(1);
// selesai(3);
// belumSelesai();
// jumlahSelesai();