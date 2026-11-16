// ============================================================
// SOAL 04 — LIST DAN KEY
// ============================================================
// Setup: npm create vite@latest latihan-react -- --template react
// Jalankan: cd latihan-react && npm start
// ============================================================

import React, { useState } from "react";

// ============================================================
// SOAL 4A — ScoreBoard (List dengan ID Unik)
// Component menerima prop players: array of objects
// players = [
//   { id: "P001", name: "Budi", score: 850, rank: 1 },
//   { id: "P002", name: "Ani", score: 720, rank: 2 },
// ]
//
// Render sebagai tabel dengan kolom: Peringkat, Nama Pemain, Skor
// Sort berdasarkan rank ascending (rank 1 di atas)
// Player rank 1 (skor tertinggi): style khusus (background gold)
// Key WAJIB: key={player.id} — BUKAN index
// Jika array kosong: <tr><td colSpan="3">Belum ada pemain</td></tr>
// ============================================================

const initialPlayers = [
  { id: "P001", name: "Budi Santoso", score: 850, rank: 1 },
  { id: "P002", name: "Ani Wijaya", score: 720, rank: 2 },
  { id: "P003", name: "Citra Dewi", score: 920, rank: 3 },
  { id: "P004", name: "Doni Pratama", score: 680, rank: 4 },
];

function ScoreBoard({ players = [] }) {
  // TODO(human): Implementasikan ScoreBoard
  // - Sort players berdasarkan rank ascending
  // - Render sebagai <table> dengan .map()
  // - Key WAJIB: key={player.id}
  // - Rank 1 (skor tertinggi): styling khusus
  // - Footer: total pemain

  return (
    <div>
      {/* TODO(human): Render ScoreBoard di sini */}
    </div>
  );
}

// ============================================================
// SOAL 4B — CategoryMenu (Nested List)
// Component menerima prop categories:
// categories = [
//   {
//     id: "CAT001",
//     name: "Minuman",
//     items: [
//       { id: "M001", name: "Es Teh Manis", price: 8000 },
//       { id: "M002", name: "Es Jeruk", price: 10000 },
//     ]
//   },
//   ...
// ]
//
// Render nested list dengan format:
// 🍵 Minuman (3 items)
//   - Es Teh Manis ............ Rp 8.000
//   - Es Jeruk ................ Rp 10.000
//
// Key strategy:
// - Outer <ul> → key={`cat-${category.id}`}
// - Inner <ul> → key={`item-${item.id}`}
// - JANGAN gunakan index di level manapun
// ============================================================

const menuData = [
  {
    id: "CAT001",
    name: "Minuman",
    items: [
      { id: "M001", name: "Es Teh Manis", price: 8000 },
      { id: "M002", name: "Es Jeruk", price: 10000 },
      { id: "M003", name: "Kopi Hitam", price: 12000 },
    ]
  },
  {
    id: "CAT002",
    name: "Makanan",
    items: [
      { id: "F001", name: "Nasi Goreng", price: 25000 },
      { id: "F002", name: "Mie Goreng", price: 22000 },
    ]
  },
  {
    id: "CAT003",
    name: "Dessert",
    items: [
      { id: "D001", name: "Es Krim Vanila", price: 15000 },
      { id: "D002", name: "Puding Coklat", price: 12000 },
      { id: "D003", name: "Tahu Crispy", price: 10000 },
      { id: "D004", name: "Pisang Goreng", price: 8000 },
    ]
  },
];

function CategoryMenu({ categories = [] }) {
  // TODO(human): Implementasikan CategoryMenu
  // - Nested .map() untuk categories dan items
  // - Key outer: `cat-${category.id}`, key inner: `item-${item.id}`
  // - Format harga: price → "Rp X.XXX" (toLocaleString ID)
  // - Total item per kategori: "Minuman (3 items)"
  // - Total keseluruhan item

  return (
    <div>
      {/* TODO(human): Render CategoryMenu di sini */}
    </div>
  );
}

// ============================================================
// SOAL 4C — FilterablePostList
// Component ini memiliki state:
// - posts (data array, sudah provided)
// - filter: "all" | "tech" | "career"
// - sortBy: "id" | "likes" | "az"
//
// Fitur:
// - Filter berdasarkan category (3 tombol: Tech, Career, All)
// - Sort berdasarkan: ID, Most Liked (descending likes), A-Z (title)
// - Animasi fade out saat filter berubah (CSS opacity transition)
//
// Rendering: card dengan title, author, category badge, likes
// Key: key={post.id}
// ============================================================

const postsData = [
  { id: "POST001", title: "Belajar React dari Nol", author: "Rehan", category: "tech", likes: 42 },
  { id: "POST002", title: "Tips Produktivitas Kerja", author: "Ani", category: "career", likes: 28 },
  { id: "POST003", title: "React useEffect Best Practices", author: "Rehan", category: "tech", likes: 67 },
  { id: "POST004", title: "Cara Memulai Freelance", author: "Budi", category: "career", likes: 35 },
  { id: "POST005", title: "State Management di React", author: "Citra", category: "tech", likes: 55 },
];

function FilterablePostList() {
  const [posts] = useState(postsData);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");

  // TODO(human): Implementasikan filter dan sort logic
  // - .filter() terlebih dahulu, lalu .sort()
  // - Sort ID: berdasarkan id ascending
  // - Sort likes: descending (most liked di atas)
  // - Sort A-Z: title.toLowerCase() ascending

  const filteredAndSorted = posts; // TODO(human): Ganti dengan hasil filter + sort

  return (
    <div>
      {/* Filter buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {/* TODO(human): 3 tombol filter: All, Tech, Career */}
      </div>

      {/* Sort buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {/* TODO(human): 3 tombol sort: Terbaru, Most Liked, A-Z */}
      </div>

      {/* Post cards */}
      {/* TODO(human): Render post cards dengan .map() + key={post.id} */}
    </div>
  );
}

// ============================================================
// SOAL 4D — PlaylistManager (Add, Remove, Reorder, Duplicate)
// State: array of songs [{ id, title, artist, duration }]
// Fitur:
// - Add song: form dengan title, artist, duration
// - Remove song: tombol hapus per song
// - Move up / Move down: ubah urutan (disable batas)
// - Total duration: format "3:15" untuk 195 detik
// - Duplicate song: clone dengan ID baru (Date.now())
//
// Key: key={song.id}
// Move up/down: swap element di array (bukan mutate langsung)
//
// Analisis questions (JAWAB di comment):
// 1. Mengapa key={song.id} BUKAN index?
// 2. Apa yang terjadi jika pakai index saat move up/down?
// 3. Apakah key baru (duplicate) menyebabkan React create baru atau reuse?
// ============================================================

const initialSongs = [
  { id: "S001", title: "Hymn to the Sea", artist: "Two Steps From Hell", duration: 195 },
  { id: "S002", title: "Careless Whisper", artist: "George Michael", duration: 318 },
  { id: "S003", title: "Experience", artist: "Ludovico Einaudi", duration: 342 },
];

function PlaylistManager() {
  const [songs, setSongs] = useState(initialSongs);
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newDuration, setNewDuration] = useState("");

  const formatDuration = (seconds) => {
    // TODO(human): Format detik ke "M:SS"
    // Contoh: 195 → "3:15", 318 → "5:18", 342 → "5:42"
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  };

  const totalDuration = songs.reduce((sum, s) => sum + s.duration, 0);

  const handleAdd = (e) => {
    e.preventDefault();
    // TODO(human): Validasi dan tambah lagu baru
    // ID baru: Date.now().toString()
    // Reset form setelah submit
  };

  const handleRemove = (id) => {
    // TODO(human): Hapus lagu dari array
  };

  const handleMoveUp = (index) => {
    // TODO(human): Swap dengan element sebelumnya
    // Jika index === 0: tidak perlu apa-apa
    // [...prev.slice(0, idx-1), prev[idx], prev[idx-1], ...prev.slice(idx+1)]
  };

  const handleMoveDown = (index) => {
    // TODO(human): Swap dengan element berikutnya
    // Jika index === last: tidak perlu apa-apa
  };

  const handleDuplicate = (song) => {
    // TODO(human): Clone song dengan ID baru (Date.now().toString())
    // Masukkan persis di bawah song asli
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2>Playlist Manager</h2>

      {/* Add song form */}
      <form onSubmit={handleAdd} style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {/* TODO(human): Input title, artist, duration */}
        <button type="submit">Tambah Lagu</button>
      </form>

      {/* Playlist */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {/* TODO(human): Render lagu dengan .map() + key={song.id} */}
        {/* Setiap li: title, artist, duration + tombol: Up, Down, Duplicate, Remove */}
        {/* Disable Up untuk index 0, Disable Down untuk index terakhir */}
      </ul>

      {/* Total duration */}
      <p style={{ marginTop: "16px", fontWeight: "bold" }}>
        Total: {formatDuration(totalDuration)}
      </p>

      {/* ANALISIS: Jawab 3 pertanyaan di comment kode di atas */}
    </div>
  );
}

// ============================================================
// App.jsx — Main Component
// ============================================================
function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Demo: List dan Key</h1>

      {/* SOAL 4A */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 4A — ScoreBoard</h2>
        <ScoreBoard players={initialPlayers} />
      </section>

      {/* SOAL 4B */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 4B — CategoryMenu</h2>
        <CategoryMenu categories={menuData} />
      </section>

      {/* SOAL 4C */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 4C — FilterablePostList</h2>
        <FilterablePostList />
      </section>

      {/* SOAL 4D */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 4D — PlaylistManager</h2>
        <PlaylistManager />
      </section>
    </div>
  );
}

export default App;
