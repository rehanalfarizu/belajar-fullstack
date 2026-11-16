// ============================================================
// SOAL 02 — React Testing Library
// ============================================================
// Di latihan ini KAMU yang menulis test. Empat komponen sudah disediakan di
// bawah (bagian "KOMPONEN YANG DIUJI"). Ubah setiap `test.todo(...)` jadi test
// sungguhan yang meniru cara USER memakai komponen.
//
// Install:
//   npm install --save-dev @testing-library/react @testing-library/jest-dom \
//     @testing-library/user-event jest jest-environment-jsdom
//
// Jalankan (dari proyek latihanmu, sesuaikan path):
//   npx jest 03-react-testing-library.test.jsx
//
// Urutan prioritas query:
//   1. getByRole      (paling disarankan)
//   2. getByLabelText (field form)
//   3. getByText      (teks non-interaktif)
//   4. getByTestId    (pilihan terakhir)
//
// Kunci jawaban ada di ../solusi-jangan-dibuka-dulu.md. Jangan dibuka dulu.
// ============================================================

import { useState, useEffect } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// ============================================================
// KOMPONEN YANG DIUJI (jangan diubah, kecuali untuk uji mutasi)
// ============================================================

function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);
  return (
    <div>
      <p data-testid="count-display">{count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => Math.max(0, c - 1))}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Belajar React", completed: false },
    { id: 2, text: "Belajar Testing", completed: true },
  ]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };
  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));
  const clearCompleted = () => setTodos((prev) => prev.filter((t) => !t.completed));

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div>
      <h1>Todo List</h1>
      <p data-testid="counter">
        {completedCount} of {todos.length} selesai
      </p>

      <div>
        <input
          aria-label="Todo baru"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Apa yang perlu dilakukan?"
        />
        <button onClick={addTodo}>Tambah</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              aria-label={`Selesai: ${todo.text}`}
            />
            <span>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              aria-label={`Hapus ${todo.text}`}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>

      {completedCount > 0 && (
        <button onClick={clearCompleted}>Hapus semua selesai</button>
      )}
    </div>
  );
}

function SearchFilter({ items = [] }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setFiltered(items);
      } else {
        setFiltered(
          items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
        );
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, items]);

  return (
    <div>
      <input
        aria-label="Cari"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari..."
      />
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {filtered.length === 0 && <p>Tidak ada hasil</p>}
    </div>
  );
}

const MOCK_USERS = {
  1: { id: 1, name: "Andi Pratama", email: "andi@email.com" },
  2: { id: 2, name: "Budi Santoso", email: "budi@email.com" },
};

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      if (MOCK_USERS[userId]) {
        setUser(MOCK_USERS[userId]);
      } else {
        setError("User tidak ditemukan");
      }
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [userId]);

  if (loading) return <div>Memuat profil...</div>;
  if (error) return <div role="alert">{error}</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// ============================================================
// A. Counter
// ============================================================
// Tanyakan: "apa yang user LIHAT dan LAKUKAN?" Bukan "state apa yang berubah?"

describe("A — Counter", () => {
  // TODO(human): Render komponen, cari tombol lewat getByRole('button', { name }),
  //              klik dengan userEvent (ingat: await), lalu cek teks yang tampil.
  // Selesai kalau: tidak ada query yang bergantung pada class CSS atau struktur DOM.
  test.todo("menampilkan nilai awal (default dan custom)");
  test.todo("tombol + menambah satu");
  test.todo("tombol - mengurangi satu, tapi tidak pernah di bawah 0");
  test.todo("Reset mengembalikan ke 0");
});

// ============================================================
// B. TodoList
// ============================================================

describe("B — TodoList", () => {
  // TODO(human): Gunakan getByLabelText untuk input dan checkbox.
  //              userEvent.type untuk mengetik, user.keyboard('{Enter}') untuk Enter.
  // Petunjuk: `getAllByRole('listitem')` berguna untuk menghitung item.
  // Selesai kalau: ada test yang membuktikan todo kosong TIDAK bisa ditambah.
  test.todo("menampilkan dua todo awal dan counter yang benar");
  test.todo("menambah todo lewat tombol");
  test.todo("menambah todo lewat tombol Enter");
  test.todo("mencentang todo mengubah counter");
  test.todo("menghapus satu todo");
  test.todo("Hapus semua selesai hanya membuang yang tercentang");
  test.todo("todo kosong atau spasi saja tidak ditambahkan");
});

// ============================================================
// C. SearchFilter (ada debounce 300ms)
// ============================================================

describe("C — SearchFilter", () => {
  // TODO(human): Hasil filter muncul TERLAMBAT (debounce). Pilih alat yang
  //              tepat: findBy..., waitFor, atau fake timers. Jelaskan
  //              pilihanmu di jurnal.
  // Selesai kalau: test tidak memakai sleep/setTimeout manual di test.
  test.todo("semua item tampil saat query kosong");
  test.todo("filter tidak peduli huruf besar/kecil");
  test.todo("pesan 'Tidak ada hasil' muncul saat tidak ada yang cocok");
});

// ============================================================
// D. UserProfile (async)
// ============================================================

describe("D — UserProfile", () => {
  // TODO(human): Tes tiga keadaan: loading, sukses, error. Untuk error,
  //              cari elemen dengan role "alert".
  // Petunjuk: untuk berganti userId pakai `rerender` yang dikembalikan oleh
  //           render(...).
  test.todo("menampilkan loading lebih dulu");
  test.todo("menampilkan nama dan email setelah data tiba");
  test.todo("menampilkan pesan error untuk user yang tidak ada");
  test.todo("memuat ulang saat userId berubah");
});
