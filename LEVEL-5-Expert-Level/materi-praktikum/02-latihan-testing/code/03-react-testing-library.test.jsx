// ============================================================
// SOAL 02 — React Testing Library
// ============================================================
// Install:
//   npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event identity-obj-proxy
//
// Jalankan:
//   npx jest materi-praktikum/02-latihan-testing/code/03-react-testing-library.test.jsx
// ============================================================
//
// FILE INI: Test-driven exercise untuk komponen React.
// Setiap test FAIL sampai kamu mengimplementasikan komponen yang benar.
//
// Pola yang digunakan:
//   Arrange → Act → Assert
//   Given / When / Then
//
// Query Priority (RTL):
//   1. getByRole       (paling direkomendasikan)
//2. getByLabelText  (form fields)
//   3. getByText       (non-interactive text)
//   4. getByTestId     (last resort)
// ============================================================

import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// ============================================================
// A. Counter Component
// ============================================================
//
// Tested component: <Counter initialValue={number}>
// Fitur:
//   - Tampilkan nilai saat ini
//   - Tombol "+" untuk increment (+1)
//   - Tombol "-" untuk decrement (-1)
//   - Tombol "Reset" untuk reset ke 0
//   - Tidak bisa decrement di bawah 0
//
// Contoh komponen yang benar:
/*
import { useState } from "react";

export function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => Math.max(0, c - 1));
  const reset = () => setCount(0);

  return (
    <div>
      <p data-testid="count-display">{count}</p>
      <button onClick={increment} data-testid="increment-btn">+</button>
      <button onClick={decrement} data-testid="decrement-btn">-</button>
      <button onClick={reset} data-testid="reset-btn">Reset</button>
    </div>
  );
}
*/

// TODO(human): Buat file ./Counter.jsx dengan implementasi yang benar,
//              lalu import dan jalankan test di bawah.
// Untuk sekarang, gunakan komponen mock:
function Counter({ initialValue = 0 }) {
  const { useState } = require("react");
  const [count, setCount] = useState(initialValue);
  return (
    <div>
      <p data-testid="count-display">{count}</p>
      <button onClick={() => setCount(c => c + 1)} data-testid="increment-btn">+</button>
      <button onClick={() => setCount(c => Math.max(0, c - 1))} data-testid="decrement-btn">-</button>
      <button onClick={() => setCount(0)} data-testid="reset-btn">Reset</button>
    </div>
  );
}

describe("A — Counter Component", () => {
  test("A1 — render nilai awal (default 0)", () => {
    render(<Counter />);
    expect(screen.getByTestId("count-display")).toHaveTextContent("0");
  });

  test("A2 — render nilai awal custom (misal 5)", () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByTestId("count-display")).toHaveTextContent("5");
  });

  test("A3 — increment (+1)", async () => {
    const user = userEvent.setup();
    render(<Counter />);
    await user.click(screen.getByTestId("increment-btn"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("1");
    await user.click(screen.getByTestId("increment-btn"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("2");
  });

  test("A4 — decrement (-1), tidak boleh di bawah 0", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={3} />);
    await user.click(screen.getByTestId("decrement-btn"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("2");
    await user.click(screen.getByTestId("decrement-btn"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("1");
    await user.click(screen.getByTestId("decrement-btn"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("0");
    // Tidak boleh kurang dari 0
    await user.click(screen.getByTestId("decrement-btn"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("0");
  });

  test("A5 — reset ke 0", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={10} />);
    expect(screen.getByTestId("count-display")).toHaveTextContent("10");
    await user.click(screen.getByTestId("reset-btn"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("0");
  });
});

// ============================================================
// B. Todo List Component
// ============================================================
//
// Tested component: <TodoList>
// Fitur:
//   - Input teks + tombol "Tambah" untuk add todo
//   - Tekan Enter juga menambah todo
//   - List todo dengan checkbox dan tombol hapus
//   - Toggle checkbox = toggle completed
//   - Counter: "X of Y selesai"
//   - Tombol "Hapus semua selesai" untuk clear completed
//
// TODO(human): Buat ./TodoList.jsx lalu jalankan test berikut.
// Gunakan komponen mock sementara untuk demonstrasi:
function TodoList() {
  const { useState } = require("react");
  const [todos, setTodos] = useState([
    { id: 1, text: "Belajar React", completed: false },
    { id: 2, text: "Belajar Testing", completed: true },
  ]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: input.trim(), completed: false }
    ]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div>
      <h1 data-testid="title">Todo List</h1>
      <p data-testid="counter">{completedCount} of {todos.length} selesai</p>

      <div>
        <input
          data-testid="todo-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
          placeholder="Apa yang perlu dilakukan?"
        />
        <button data-testid="add-btn" onClick={addTodo}>Tambah</button>
      </div>

      <ul data-testid="todo-list">
        {todos.map(todo => (
          <li key={todo.id} data-testid={`todo-${todo.id}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-testid={`checkbox-${todo.id}`}
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              data-testid={`delete-${todo.id}`}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>

      {completedCount > 0 && (
        <button data-testid="clear-completed-btn" onClick={clearCompleted}>
          Hapus semua selesai
        </button>
      )}
    </div>
  );
}

describe("B — TodoList Component", () => {
  test("B1 — render 2 todo awal", () => {
    render(<TodoList />);
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("B2 — counter menunjukkan '1 of 2 selesai'", () => {
    render(<TodoList />);
    expect(screen.getByTestId("counter")).toHaveTextContent("1 of 2 selesai");
  });

  test("B3 — tambahkan todo baru via tombol", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByTestId("todo-input"), "Belajar Docker");
    await user.click(screen.getByTestId("add-btn"));

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Belajar Docker")).toBeInTheDocument();
  });

  test("B4 — tambahkan todo baru via Enter", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByTestId("todo-input"), "Belajar CI/CD");
    await user.keyboard("{Enter}");

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test("B5 — toggle checkbox mengubah completed state", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Todo pertama: "Belajar React" (completed: false)
    const firstCheckbox = screen.getByTestId("checkbox-1");
    expect(firstCheckbox).not.toBeChecked();

    await user.click(firstCheckbox);

    // Sekarang counter berubah
    expect(screen.getByTestId("counter")).toHaveTextContent("2 of 2 selesai");
  });

  test("B6 — hapus todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Hapus todo id=1 ("Belajar React")
    await user.click(screen.getByTestId("delete-1"));

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.queryByText("Belajar React")).not.toBeInTheDocument();
  });

  test("B7 — hapus semua todo selesai", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Toggle todo 1 jadi completed
    await user.click(screen.getByTestId("checkbox-1"));

    // Sekarang2 of 2 selesai — tombol hapus semua selesai muncul
    expect(screen.getByTestId("clear-completed-btn")).toBeInTheDocument();

    await user.click(screen.getByTestId("clear-completed-btn"));

    // Semua yang completed (2 item) dihapus, tersisa 0
    expect(screen.getAllByRole("listitem")).toHaveLength(0);
  });

  test("B8 — tidak tambahkan todo kosong", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.click(screen.getByTestId("add-btn"));

    // Jumlah todo tetap 2 (tidak bertambah)
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});

// ============================================================
// C. Search Filter Component
// ============================================================
//
// Tested component: <SearchFilter items={string[]} />
// Fitur:
//   - Input search dengan debounce (300ms)
//   - Filter list items berdasarkan query (case-insensitive)
//   - Tampilkan "Tidak ada hasil" jika tidak ada yang match
//   - Highlight teks yang match (opsional)
//
// TODO(human): Buat ./SearchFilter.jsx
// Test di bawah memverifikasi:
// - Render semua item saat tidak ada query
//   - Filter berfungsi (case-insensitive)
//   - "Tidak ada hasil" ditampilkan saat tidak match
// ============================================================

function SearchFilter({ items = [] }) {
  const { useState, useEffect } = require("react");
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setFiltered(items);
      } else {
        setFiltered(items.filter(item =>
          item.toLowerCase().includes(query.toLowerCase())
        ));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, items]);

  return (
    <div>
      <input
        data-testid="search-input"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Cari..."
      />
      <ul data-testid="items-list">
        {filtered.map((item, i) => (
          <li key={i} data-testid={`item-${i}`}>{item}</li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p data-testid="no-results">Tidak ada hasil</p>
      )}
    </div>
  );
}

describe("C — SearchFilter Component", () => {
  const ITEMS = ["React", "Vue", "Angular", "Svelte", "Next.js"];

  test("C1 — render semua item saat query kosong", () => {
    render(<SearchFilter items={ITEMS} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  test("C2 — filter case-insensitive", async () => {
    const user = userEvent.setup();
    render(<SearchFilter items={ITEMS} />);

    await user.type(screen.getByTestId("search-input"), "re");

    // Tunggu debounce (300ms)
    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
 });
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  test("C3 — 'Tidak ada hasil' saat tidak match", async () => {
    const user = userEvent.setup();
    render(<SearchFilter items={ITEMS} />);

    await user.type(screen.getByTestId("search-input"), "xyz");

    await waitFor(() => {
      expect(screen.getByTestId("no-results")).toBeInTheDocument();
    });
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("C4 — filter part dari kata", async () => {
    const user = userEvent.setup();
    render(<SearchFilter items={ITEMS} />);

    await user.type(screen.getByTestId("search-input"), "vue");

    await waitFor(() => {
      expect(screen.getByText("Vue")).toBeInTheDocument();
    });
    // Tidak ada yang lain
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });
});

// ============================================================
// D. Async Data Fetching Component
// ============================================================
//
// Tested component: <UserProfile userId={number} />
// Fitur:
//   - Fetch user dari API (mock) saat mount
//   - Tampilkan loading state saat fetch
//   - Tampilkan error state jika fetch gagal
//   - Tampilkan nama dan email user jika berhasil
//
// TODO(human): Buat ./UserProfile.jsx
// Gunakan mock fetch function berikut:
//   const fetchUser = (id) => Promise yang resolve/reject sesuai id
// ============================================================

function UserProfile({ userId }) {
  const { useState, useEffect } = require("react");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const MOCK_USERS = {
      1: { id: 1, name: "Andi Pratama", email: "andi@email.com" },
      2: { id: 2, name: "Budi Santoso", email: "budi@email.com" },
    };
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

  if (loading) return <div data-testid="loading">Memuat profil...</div>;
  if (error) return <div data-testid="error" role="alert">{error}</div>;
  if (!user) return null;

  return (
    <div data-testid="user-profile">
      <h2 data-testid="user-name">{user.name}</h2>
      <p data-testid="user-email">{user.email}</p>
    </div>
  );
}

describe("D — UserProfile (async)", () => {
  test("D1 — tampilkan loading saat fetch", () => {
    render(<UserProfile userId={1} />);
    expect(screen.getByTestId("loading")).toHaveTextContent("Memuat profil...");
  });

  test("D2 — tampilkan user setelah loading selesai", async () => {
    render(<UserProfile userId={1} />);
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("user-name")).toHaveTextContent("Andi Pratama");
    expect(screen.getByTestId("user-email")).toHaveTextContent("andi@email.com");
  });

  test("D3 — tampilkan error untuk userId invalid", async () => {
    render(<UserProfile userId={999} />);
    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
    expect(screen.getByTestId("error")).toHaveTextContent("User tidak ditemukan");
  });

  test("D4 — render ulang saat userId berubah", async () => {
    const { rerender } = require("@testing-library/react");
    render(<UserProfile userId={1} />);
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("user-name")).toHaveTextContent("Andi Pratama");

    rerender(<UserProfile userId={2} />);
    // Loading lagi
    expect(screen.getByTestId("loading")).toHaveTextContent("Memuat profil...");
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("user-name")).toHaveTextContent("Budi Santoso");
  });
});

// ============================================================
// SOLUSI (Counter.jsx example)
/*
import { useState } from "react";

export function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => Math.max(0, c - 1));
  const reset = () => setCount(0);

  return (
    <div>
      <p data-testid="count-display">{count}</p>
      <button onClick={increment} data-testid="increment-btn">+</button>
      <button onClick={decrement} data-testid="decrement-btn">-</button>
      <button onClick={reset} data-testid="reset-btn">Reset</button>
    </div>
  );
}
*/
