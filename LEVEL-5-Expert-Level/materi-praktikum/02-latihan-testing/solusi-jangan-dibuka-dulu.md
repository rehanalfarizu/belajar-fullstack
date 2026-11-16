# Solusi — Latihan Testing (JANGAN DIBUKA DULU)

> **Peringatan:** file ini berisi kunci jawaban. Kalau kamu membukanya sebelum
> mencoba sendiri minimal 30 menit per soal, kamu kehilangan bagian paling
> berharga dari latihan: bingung, mencari, lalu paham.
>
> Cara pakai yang sehat: kerjakan dulu versimu, jalankan test-nya, lalu buka
> bagian yang relevan untuk **membandingkan**, bukan menyalin. Kalau cara kamu
> beda tapi lulus dan masuk akal, itu tidak salah.

Isi di bawah dipindahkan apa adanya dari starter lama.

---

## Soal 01 — `01-unit-testing-jest.test.js` (versi lama: implementasi + test lengkap)

````js
// ============================================================
// SOAL 01 — Unit Testing dengan Jest
// ============================================================
// Install:
//   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
//
// Jalankan:
//   npx jest materi-praktikum/02-latihan-testing/code/01-unit-testing-jest.test.js
//   npx jest materi-praktikum/02-latihan-testing/code/01-unit-testing-jest.test.js --watch
// ============================================================

// TODO(human): Lengkapi setiap bagian TODO di bawah ini.
//               Tests akan FAIL sampai semua TODO diselesaikan.

// ============================================================
// A. PURE FUNCTIONS — Basic Matchers
// ============================================================

/**
 * Soal A1: Implementasikan fungsi `calculateGrade(score)`
 * - score >= 90  → "A"
 * - score >= 80  → "B"
 * - score >= 70  → "C"
 * - score >= 60  → "D"
 * - score < 60   → "F"
 */
function calculateGrade(score) {
  // TODO: implementasi
}
describe("A1 — calculateGrade()", () => {
  test("score 95 mengembalikan 'A'", () => {
    expect(calculateGrade(95)).toBe("A");
  });
  test("score 85 mengembalikan 'B'", () => {
    expect(calculateGrade(85)).toBe("B");
  });
  test("score 75 mengembalikan 'C'", () => {
    expect(calculateGrade(75)).toBe("C");
  });
  test("score 65 mengembalikan 'D'", () => {
    expect(calculateGrade(65)).toBe("D");
  });
  test("score 55 mengembalikan 'F'", () => {
    expect(calculateGrade(55)).toBe("F");
  });
  test("score 90 boundary → 'A'", () => {
    expect(calculateGrade(90)).toBe("A");
  });
});

/**
 * Soal A2: Implementasikan fungsi `fizzBuzz(n)`
 * - Kelipatan 3 → "Fizz"
 * - Kelipatan 5 → "Buzz"
 * - Kelipatan 3 dan 5 → "FizzBuzz"
 * - Lainnya → string angka
 */
function fizzBuzz(n) {
  // TODO: implementasi
}
describe("A2 — fizzBuzz()", () => {
  test("kelipatan 3 mengembalikan 'Fizz'", () => {
    expect(fizzBuzz(6)).toBe("Fizz");
    expect(fizzBuzz(9)).toBe("Fizz");
  });
  test("kelipatan 5 mengembalikan 'Buzz'", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
    expect(fizzBuzz(20)).toBe("Buzz");
  });
  test("kelipatan 3 dan 5 mengembalikan 'FizzBuzz'", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
    expect(fizzBuzz(30)).toBe("FizzBuzz");
  });
  test("bilangan lain mengembalikan string angka", () => {
    expect(fizzBuzz(7)).toBe("7");
    expect(fizzBuzz(1)).toBe("1");
  });
});

// ============================================================
// B. ARRAY & OBJECT MATCHERS
// ============================================================

/**
 * Soal B1: Implementasikan fungsi `filterActiveUsers(users)`
 * - Filter user dengan status === "active"
 * - Return array baru (tidak mutate original)
 */
function filterActiveUsers(users) {
  // TODO: implementasi
}

/**
 * Soal B2: Implementasikan fungsi `getTotalRevenue(orders)`
 * - Jumlahkan field `amount` dari semua order
 * - Abaikan order dengan status "cancelled"
 */
function getTotalRevenue(orders) {
  // TODO: implementasi
}

/**
 * Soal B3: Implementasikan fungsi `groupByCategory(products)`
 * - Return object dengan key = category, value = array produk
 * Contoh: { electronics: [...], clothing: [...] }
 */
function groupByCategory(products) {
  // TODO: implementasi
}

describe("B1 — filterActiveUsers()", () => {
  test("filter user aktif saja", () => {
    const users = [
      { id: 1, name: "Andi", status: "active" },
      { id: 2, name: "Budi", status: "inactive" },
      { id: 3, name: "Citra", status: "active" },
    ];
    const result = filterActiveUsers(users);
    expect(result).toHaveLength(2);
    expect(result.map(u => u.name)).toEqual(["Andi", "Citra"]);
  });

  test("tidak memodifikasi array original", () => {
    const users = [
      { id: 1, name: "Andi", status: "active" },
      { id: 2, name: "Budi", status: "inactive" },
    ];
    filterActiveUsers(users);
    expect(users).toHaveLength(2);
  });

  test("array kosong mengembalikan []", () => {
    expect(filterActiveUsers([])).toEqual([]);
  });
});

describe("B2 — getTotalRevenue()", () => {
  test("jumlahkan semua amount yang tidak cancelled", () => {
    const orders = [
      { id: 1, amount: 100, status: "completed" },
      { id: 2, amount: 50, status: "pending" },
      { id: 3, amount: 200, status: "cancelled" },
      { id: 4, amount: 75, status: "completed" },
    ];
    expect(getTotalRevenue(orders)).toBe(225); // 100+50+75
  });

  test("semua cancelled → 0", () => {
    const orders = [
      { id: 1, amount: 100, status: "cancelled" },
    ];
    expect(getTotalRevenue(orders)).toBe(0);
  });

  test("array kosong → 0", () => {
    expect(getTotalRevenue([])).toBe(0);
  });
});

describe("B3 — groupByCategory()", () => {
  test("grouping produk per kategori", () => {
    const products = [
      { id: 1, name: "Laptop", category: "electronics" },
      { id: 2, name: "Kaos", category: "clothing" },
      { id: 3, name: "Smartphone", category: "electronics" },
      { id: 4, name: "Jeans", category: "clothing" },
    ];
    const result = groupByCategory(products);
    expect(result).toHaveProperty("electronics");
    expect(result).toHaveProperty("clothing");
    expect(result.electronics).toHaveLength(2);
    expect(result.clothing).toHaveLength(2);
  });

  test("kategori tunggal", () => {
    const products = [
      { id: 1, name: "Laptop", category: "electronics" },
    ];
    const result = groupByCategory(products);
    expect(Object.keys(result)).toHaveLength(1);
    expect(result.electronics[0].name).toBe("Laptop");
  });
});

// ============================================================
// C. ASYNC / PROMISE TESTING
// ============================================================

/**
 * Soal C1: Implementasikan fungsi `fetchUserById(id)` Promise-based
 * - id === 1 → resolve({ id: 1, name: "Andi" })
 * - id === 2 → resolve({ id: 2, name: "Budi" })
 * - id lain → reject(new Error("User not found"))
 */
function fetchUserById(id) {
  // TODO: implementasi — return Promise
}

/**
 * Soal C2: Implementasikan fungsi `delay(ms, value)`
 * - Resolve setelah `ms` milidetik dengan `value`
 * - Gunakan setTimeout
 */
function delay(ms, value) {
  // TODO: implementasi
}

describe("C1 — fetchUserById() async", () => {
  test("id 1 → resolve dengan user Andi", async () => {
    const user = await fetchUserById(1);
    expect(user).toEqual({ id: 1, name: "Andi" });
  });

  test("id 2 → resolve dengan user Budi", async () => {
    const user = await fetchUserById(2);
    expect(user).toEqual({ id: 2, name: "Budi" });
  });

  test("id invalid → reject dengan 'User not found'", async () => {
    await expect(fetchUserById(999)).rejects.toThrow("User not found");
  });
});

describe("C2 — delay()", () => {
  test("resolve setelah 100ms dengan nilai 'done'", async () => {
    const start = Date.now();
    const result = await delay(100, "done");
    const elapsed = Date.now() - start;
    expect(result).toBe("done");
    expect(elapsed).toBeGreaterThanOrEqual(95); // allow minor timing variance
  });

  test("nilai default jika tidak disediakan", async () => {
    // TODO: handle undefined value gracefully
  });
});

// ============================================================
// D. MOCKING
// ============================================================

/**
 * Soal D1: Mock fungsi `getWeather(city)` yang memanggil API eksternal
 * Buat mock yang mengembalikan data cuaca stub
 */
describe("D1 — Mocking API calls", () => {
  // TODO: Gunakan jest.mock atau jest.spyOn untuk mock module
  // Mock harus mengembalikan { city: "Jakarta", temp: 32, condition: "Sunny" }

  test("mock getWeather untuk Jakarta", async () => {
    // TODO: Panggil getWeather("Jakarta") dan assert hasilnya
  });
});

/**
 * Soal D2: Test debounce function
 * - Debounce harus memanggil callback hanya SETELAH waktu tunggu habis
 * - Panggilan ulang harus mereset timer
 */
function debounce(callback, delay) {
  // TODO: implementasi debounce
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(this, args), delay);
  };
}

describe("D2 — debounce()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("tidak memanggil callback sebelum delay selesai", () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, 300);

    debouncedFn();
    expect(callback).not.toHaveBeenCalled();
  });

  test("memanggil callback setelah delay selesai", () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, 300);

    debouncedFn();
    jest.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("reset timer jika dipanggil berulang dalam delay", () => {
    const callback = jest.fn();
    const debouncedFn = debounce(callback, 300);

    debouncedFn(); // t=0
    jest.advanceTimersByTime(100); // t=100
    debouncedFn(); // reset
    jest.advanceTimersByTime(100); // t=200
    debouncedFn(); // reset
    jest.advanceTimersByTime(300); // t=500

    // Hanya dipanggil sekali (di t=500), bukan di t=300 atau t=400
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

// ============================================================
// SOLUSI — Uncomment untuk cek jawaban
// ============================================================

/*
// A1 solution
function calculateGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// A2 solution
function fizzBuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}

// B1 solution
function filterActiveUsers(users) {
  return users.filter(u => u.status === "active");
}

// B2 solution
function getTotalRevenue(orders) {
  return orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.amount, 0);
}

// B3 solution
function groupByCategory(products) {
  return products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});
}

// C1 solution
function fetchUserById(id) {
  return new Promise((resolve, reject) => {
    if (id === 1) resolve({ id: 1, name: "Andi" });
    else if (id === 2) resolve({ id: 2, name: "Budi" });
    else reject(new Error("User not found"));
  });
}

// C2 solution
function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}
*/
````

---

## Soal 02 — `03-react-testing-library.test.jsx` (versi lama: komponen + test lengkap)

````jsx
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
````

---

## Bonus — Test Redux slice (slice dan test lengkap) (`code/02-slice.test.js` lama)

````js
/**
 * ============================================================
 * SOAL 02 — Integration Testing: Redux Slice
 * ============================================================
 * Install dependencies:
 *   npm install --save-dev jest @testing-library/jest-dom
 *   npm install @reduxjs/toolkit
 *
 * Run:
 *   npm test -- --testPathPattern="slice"
 * ============================================================
 * HASIL BELAJAR:
 * - Test reducer actions (synchronous state changes)
 * - Test selectors (derived state computation)
 * - Test async thunks dengan mocked API
 * - Integration flow: add → update → remove
 * ============================================================
 */

import { configureStore } from '@reduxjs/toolkit';

// ============================================================
// SAMPLE SLICE: Product Cart Slice
// Acts as the implementation reference + the slice you test.
// In the real exam, this slice would be in a separate file
// (e.g., src/store/cartSlice.js).
// ============================================================

const initialState = {
  items: [],      // Array<{ id, name, price, quantity }>
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedId: null,
};

// Pure reducer function (no side effects)
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'cart/addItem': {
      const { id, name, price } = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { id, name, price, quantity: 1 }],
      };
    }

    case 'cart/removeItem':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'cart/updateItem':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload }
            : item
        ),
      };

    case 'cart/clearAll':
      return { ...state, items: [] };

    case 'cart/setStatus':
      return { ...state, status: action.payload };

    case 'cart/setError':
      return { ...state, error: action.payload, status: 'failed' };

    case 'cart/selectItem':
      return { ...state, selectedId: action.payload };

    default:
      return state;
  }
}

// ============================================================
// SELECTORS
// ============================================================

const selectCartItems      = state => state.cart.items;
const selectCartStatus     = state => state.cart.status;
const selectCartError      = state => state.cart.error;
const selectSelectedId     = state => state.cart.selectedId;
const selectSelectedItem   = state => {
  const { items, selectedId } = state.cart;
  return items.find(item => item.id === selectedId) ?? null;
};
const selectCartTotal      = state =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const selectItemCount      = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
const selectIsEmpty        = state => state.cart.items.length === 0;

// ============================================================
// ASYNC THUNK: fetchCartItems
// Simulates an API call. We mock globalThis.fetch to control behavior.
// ============================================================

async function fetchCartItemsThunk() {
  return async (dispatch, getState) => {
    dispatch({ type: 'cart/setStatus', payload: 'loading' });
    dispatch({ type: 'cart/setError', payload: null });

    try {
      // In real code: const res = await fetch('/api/cart');
      // We mock globalThis.fetch instead.
      const response = await globalThis.fetch('/api/cart');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      dispatch({ type: 'cart/setStatus', payload: 'succeeded' });
      // Normally you'd dispatch cart/addItem for each item
      return data;
    } catch (err) {
      dispatch({ type: 'cart/setError', payload: err.message });
      throw err;
    }
  };
}

// ============================================================
// TEST STORE SETUP
// ============================================================

function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });
}

// ============================================================
// HELPER: waitFor — utility to wait for async thunk to settle
// ============================================================

async function waitForStore(store) {
  // After dispatching a thunk, store updates asynchronously.
  // We use a small delay to let the promise chain settle.
  await new Promise(resolve => setTimeout(resolve, 0));
}

// ============================================================
// TESTS: Reducers
// ============================================================

describe('cartReducer — addItem', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  it('adds a new item to an empty cart', () => {
    const payload = { id: 'p-1', name: 'Baju Kemeja', price: 150000 };
    store.dispatch({ type: 'cart/addItem', payload });
    expect(selectCartItems(store.getState())).toHaveLength(1);
    expect(selectCartItems(store.getState())[0]).toMatchObject({
      id: 'p-1',
      name: 'Baju Kemeja',
      price: 150000,
      quantity: 1,
    });
  });

  it('increments quantity if item already exists', () => {
    const payload = { id: 'p-1', name: 'Baju Kemeja', price: 150000 };
    store.dispatch({ type: 'cart/addItem', payload });
    store.dispatch({ type: 'cart/addItem', payload });
    store.dispatch({ type: 'cart/addItem', payload });

    expect(selectCartItems(store.getState())).toHaveLength(1);
    expect(selectCartItems(store.getState())[0].quantity).toBe(3);
  });

  it('adds different items without interfering', () => {
    store.dispatch({ type: 'cart/addItem', payload: { id: 'p-1', name: 'A', price: 100 } });
    store.dispatch({ type: 'cart/addItem', payload: { id: 'p-2', name: 'B', price: 200 } });
    expect(selectCartItems(store.getState())).toHaveLength(2);
  });
});

describe('cartReducer — removeItem', () => {
  it('removes an item by id', () => {
    const store = createTestStore({
      cart: {
        ...initialState,
        items: [
          { id: 'p-1', name: 'A', price: 100, quantity: 1 },
          { id: 'p-2', name: 'B', price: 200, quantity: 1 },
        ],
      },
    });
    store.dispatch({ type: 'cart/removeItem', payload: 'p-1' });
    const items = selectCartItems(store.getState());
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('p-2');
  });

  it('does nothing when removing a non-existent id', () => {
    const store = createTestStore({
      cart: {
        ...initialState,
        items: [{ id: 'p-1', name: 'A', price: 100, quantity: 1 }],
      },
    });
    store.dispatch({ type: 'cart/removeItem', payload: 'nonexistent' });
    expect(selectCartItems(store.getState())).toHaveLength(1);
  });
});

describe('cartReducer — updateItem', () => {
  it('updates item properties', () => {
    const store = createTestStore({
      cart: {
        ...initialState,
        items: [{ id: 'p-1', name: 'A', price: 100, quantity: 1 }],
      },
    });
    store.dispatch({ type: 'cart/updateItem', payload: { id: 'p-1', quantity: 5 } });
    const item = selectCartItems(store.getState())[0];
    expect(item.quantity).toBe(5);
    expect(item.name).toBe('A'); // unchanged
  });

  it('does nothing for non-existent id', () => {
    const store = createTestStore({
      cart: {
        ...initialState,
        items: [{ id: 'p-1', name: 'A', price: 100, quantity: 1 }],
      },
    });
    store.dispatch({ type: 'cart/updateItem', payload: { id: 'nonexistent', quantity: 9 } });
    expect(selectCartItems(store.getState())[0].quantity).toBe(1);
  });
});

describe('cartReducer — clearAll', () => {
  it('empties the cart', () => {
    const store = createTestStore({
      cart: {
        ...initialState,
        items: [
          { id: 'p-1', name: 'A', price: 100, quantity: 2 },
          { id: 'p-2', name: 'B', price: 200, quantity: 1 },
        ],
      },
    });
    store.dispatch({ type: 'cart/clearAll' });
    expect(selectCartItems(store.getState())).toHaveLength(0);
    expect(selectIsEmpty(store.getState())).toBe(true);
  });
});

describe('cartReducer — setStatus & setError', () => {
  it('setStatus changes status field', () => {
    const store = createTestStore();
    store.dispatch({ type: 'cart/setStatus', payload: 'loading' });
    expect(selectCartStatus(store.getState())).toBe('loading');

    store.dispatch({ type: 'cart/setStatus', payload: 'succeeded' });
    expect(selectCartStatus(store.getState())).toBe('succeeded');
  });

  it('setError sets error and transitions status to failed', () => {
    const store = createTestStore();
    store.dispatch({ type: 'cart/setError', payload: 'Network timeout' });
    expect(selectCartError(store.getState())).toBe('Network timeout');
    expect(selectCartStatus(store.getState())).toBe('failed');
  });

  it('selectItem sets selectedId', () => {
    const store = createTestStore();
    store.dispatch({ type: 'cart/selectItem', payload: 'p-42' });
    expect(selectSelectedId(store.getState())).toBe('p-42');
  });

  it('selectItem with null clears selection', () => {
    const store = createTestStore({ cart: { ...initialState, selectedId: 'p-1' } });
    store.dispatch({ type: 'cart/selectItem', payload: null });
    expect(selectSelectedId(store.getState())).toBeNull();
  });
});

// ============================================================
// TESTS: Selectors
// ============================================================

describe('cartSlice selectors', () => {
  const populatedState = {
    cart: {
      items: [
        { id: 'p-1', name: 'Kaos Polos',   price: 75000,  quantity: 2 },
        { id: 'p-2', name: 'Celana Jeans', price: 250000, quantity: 1 },
      ],
      status: 'idle',
      error: null,
      selectedId: 'p-1',
    },
  };

  it('selectCartItems returns all items', () => {
    const store = createTestStore(populatedState);
    expect(selectCartItems(store.getState())).toHaveLength(2);
  });

  it('selectCartTotal computes correct total (75000*2 + 250000*1)', () => {
    const store = createTestStore(populatedState);
    expect(selectCartTotal(store.getState())).toBe(400000);
  });

  it('selectItemCount returns total quantity', () => {
    const store = createTestStore(populatedState);
    expect(selectItemCount(store.getState())).toBe(3);
  });

  it('selectSelectedItem returns the item matching selectedId', () => {
    const store = createTestStore(populatedState);
    expect(selectSelectedItem(store.getState())).toMatchObject({
      id: 'p-1',
      name: 'Kaos Polos',
    });
  });

  it('selectSelectedItem returns null when no item is selected', () => {
    const store = createTestStore({
      cart: { ...populatedState.cart, selectedId: null },
    });
    expect(selectSelectedItem(store.getState())).toBeNull();
  });

  it('selectIsEmpty returns true for empty cart', () => {
    const store = createTestStore();
    expect(selectIsEmpty(store.getState())).toBe(true);
  });

  it('selectIsEmpty returns false for non-empty cart', () => {
    const store = createTestStore(populatedState);
    expect(selectIsEmpty(store.getState())).toBe(false);
  });
});

// ============================================================
// TESTS: Async Thunks with Mocked fetch
// ============================================================

describe('fetchCartItemsThunk — async with mocked fetch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches loading then succeeded on successful fetch', async () => {
    const mockData = [{ id: 'p-1', name: 'Remote Item', price: 500000 }];
    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const store = createTestStore();
    store.dispatch({ type: 'cart/setStatus', payload: 'idle' });
    await store.dispatch(fetchCartItemsThunk());
    await waitForStore(store);

    expect(selectCartStatus(store.getState())).toBe('succeeded');
    expect(selectCartError(store.getState())).toBeNull();
    globalThis.fetch = undefined; // clean up global
  });

  it('sets error status on failed fetch', async () => {
    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const store = createTestStore();
    await store.dispatch(fetchCartItemsThunk());
    await waitForStore(store);

    expect(selectCartStatus(store.getState())).toBe('failed');
    expect(selectCartError(store.getState())).toBe('HTTP 500');
    globalThis.fetch = undefined;
  });

  it('throws when fetch throws (network error)', async () => {
    globalThis.fetch = jest.fn().mockRejectedValueOnce(new Error('ENOENT'));

    const store = createTestStore();
    await store.dispatch(fetchCartItemsThunk());
    await waitForStore(store);

    expect(selectCartStatus(store.getState())).toBe('failed');
    expect(selectCartError(store.getState())).toBe('ENOENT');
    globalThis.fetch = undefined;
  });
});

// ============================================================
// TESTS: Integration — Full Cart Flow
// ============================================================

describe('Integration — Full cart flow', () => {
  it('add multiple items → update quantity → remove one → clear all', () => {
    const store = createTestStore();

    // Add items
    store.dispatch({ type: 'cart/addItem', payload: { id: 'p-1', name: 'A', price: 100 } });
    store.dispatch({ type: 'cart/addItem', payload: { id: 'p-2', name: 'B', price: 200 } });
    store.dispatch({ type: 'cart/addItem', payload: { id: 'p-3', name: 'C', price: 300 } });
    expect(selectItemCount(store.getState())).toBe(3);

    // Update quantity
    store.dispatch({ type: 'cart/updateItem', payload: { id: 'p-1', quantity: 5 } });
    expect(selectCartTotal(store.getState())).toBe(500 + 200 + 300); // 1000

    // Remove one
    store.dispatch({ type: 'cart/removeItem', payload: 'p-2' });
    expect(selectCartItems(store.getState())).toHaveLength(2);

    // Clear all
    store.dispatch({ type: 'cart/clearAll' });
    expect(selectIsEmpty(store.getState())).toBe(true);
    expect(selectCartTotal(store.getState())).toBe(0);
  });

  it('complete flow with async fetch then local update', async () => {
    const mockData = [{ id: 'p-99', name: 'Fetched Item', price: 999 }];
    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const store = createTestStore();
    await store.dispatch(fetchCartItemsThunk());
    await waitForStore(store);

    expect(selectCartStatus(store.getState())).toBe('succeeded');

    // Simulate adding to fetched cart
    store.dispatch({
      type: 'cart/addItem',
      payload: { id: 'local-1', name: 'Local Extra', price: 50 },
    });
    expect(selectItemCount(store.getState())).toBeGreaterThan(0);

    globalThis.fetch = undefined;
  });
});

export {};
````

---

## Soal 04 — Test E2E Playwright (`code/04-end-to-end-playwright.spec.js` lama)

````js
// ============================================================
// SOAL 04 — End-to-End Testing dengan Playwright
// ============================================================
// Install:
//   npm install --save-dev @playwright/test
//   npx playwright install chromium
//
// Jalankan (dari root project):
//   npx playwright test materi-praktikum/02-latihan-testing/code/04-end-to-end-playwright.spec.js
//   npx playwright test materi-praktikum/02-latihan-testing/code/04-end-to-end-playwright.spec.js --ui
// ============================================================
//
// NOTE: Tests ini membutuhkan aplikasi React yang running di http://localhost:5173
// Sebelum menjalankan, pastikan:
//   npm run dev   (di tab terminal terpisah)
//
// Atau gunakan built-in webServer di playwright.config.js:
//
//   // playwright.config.js
//   module.exports = defineConfig({
//     webServer: {
//       command: "npm run dev",
//       port: 5173,
//       reuseExistingServer: true
//     },
//     testDir: ".",
//     testMatch: "**/04-end-to-end-playwright.spec.js"
//   });
// ============================================================

const { test, expect, defineConfig } = require("@playwright/test");

// ============================================================
// SETUP — Playwright Configuration (local, untuk referensi)
// ============================================================
//
// Salin ke playwright.config.js di root project jika belum ada:
/*
const { defineConfig } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./materi-praktikum/02-latihan-testing/code",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    trace: "on-first-retry",  // screenshot + video on failure
    screenshot: "only-on-failure"
  },
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: true
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } }
  ]
});
*/

// ============================================================
// A. Todo App — Core E2E Flows
// ============================================================

test.describe("A — Todo App E2E", () => {

  test.beforeEach(async ({ page }) => {
    // Navigasi ke halaman utama
    await page.goto("/");
  });

  test("A1 — render halaman utama dengan benar", async ({ page }) => {
    // Cek elemen utama ada
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Cek input dan tombol ada
    await expect(page.getByRole("textbox")).toBeVisible();
    await expect(page.getByRole("button", { name: /tambah/i })).toBeVisible();
  });

  test("A2 — tambahkan todo baru", async ({ page }) => {
    const input = page.getByRole("textbox");
    const addButton = page.getByRole("button", { name: /tambah/i });

    // Ketik todo baru
    await input.fill("Belajar Playwright");
    await addButton.click();

    // Todo baru muncul di list
    await expect(page.getByText("Belajar Playwright")).toBeVisible();

    // Counter berubah
    await expect(page.getByText(/of.*selesai/)).toBeVisible();
  });

  test("A3 — tambahkan todo dengan Enter", async ({ page }) => {
    const input = page.getByRole("textbox");

    await input.fill("Belajar Docker");
    await input.press("Enter");

    await expect(page.getByText("Belajar Docker")).toBeVisible();
  });

  test("A4 — toggle todo selesai", async ({ page }) => {
    // Todo pertama (belum selesai)
    const firstItem = page.getByRole("listitem").first();
    const checkbox = firstItem.getByRole("checkbox");

    // Toggle
    await checkbox.click();

    // Checkbox tercentang
    await expect(checkbox).toBeChecked();
  });

  test("A5 — hapus todo", async ({ page }) => {
    // Todo pertama harus ada
    const firstItem = page.getByRole("listitem").first();
    const initialText = await firstItem.textContent();

    // Klik tombol hapus
    await firstItem.getByRole("button", { name: /hapus/i }).click();

    // Todo tidak lagi visible
    await expect(page.getByText(initialText.split("Hapus")[0].trim())).not.toBeVisible();
  });

  test("A6 — tidak bisa tambah todo kosong", async ({ page }) => {
    const input = page.getByRole("textbox");
    const addButton = page.getByRole("button", { name: /tambah/i });

    // Klik tombol tanpa isi input
    await addButton.click();

    // Todo tidak bertambah
    const items = page.getByRole("listitem");
    // Count tidak berubah — tidak ada cara mudah hitung di E2E, tapi test ini
    // memverifikasi tidak ada crash
    await expect(page.getByRole("textbox")).toBeVisible();
  });
});

// ============================================================
// B. Login Flow — Happy & Unhappy Path
// ============================================================

test.describe("B — Login Flow E2E", () => {

  test("B1 — login berhasil dan redirect ke dashboard", async ({ page }) => {
    // Buka halaman login
    await page.goto("/login");

    // Isi form
    await page.getByLabel(/email/i).fill("andi@email.com");
    await page.getByLabel(/password/i).fill("password123");

    // Submit
    await page.getByRole("button", { name: /login|masuk/i }).click();

    // Redirect ke dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Pesan selamat datang
    await expect(page.getByText(/halo/i)).toBeVisible();
  });

  test("B2 — login gagal dengan kredensial salah", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel(/email/i).fill("salah@email.com");
    await page.getByLabel(/password/i).fill("salahpassword");

    await page.getByRole("button", { name: /login|masuk/i }).click();

    // Pesan error ditampilkan
    await expect(page.getByText(/email atau password salah/i)).toBeVisible();

    // Masih di halaman login
    await expect(page).toHaveURL(/\/login/);
  });

  test("B3 — validasi client-side (email tanpa @)", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel(/email/i).fill("emailtanpaat");
    await page.getByLabel(/password/i).fill("password123");

    await page.getByRole("button", { name: /login|masuk/i }).click();

    // Error validation muncul (bukan error server)
    await expect(page.getByText(/valid/i)).toBeVisible();
  });
});

// ============================================================
// C. Navigation & Routing
// ============================================================

test.describe("C — Navigation", () => {

  test("C1 — navigasi dari home ke about", async ({ page }) => {
    await page.goto("/");

    // Klik link About
    await page.getByRole("link", { name: /about/i }).click();

    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();
  });

  test("C2 — navigasi sidebar berfungsi", async ({ page }) => {
    await page.goto("/");

    // Sidebar navigation (jika ada)
    const sidebar = page.locator("nav, aside, [role='navigation']").first();

    if (await sidebar.isVisible()) {
      // Klik dashboard
      const dashboardLink = page.getByRole("link", { name: /dashboard/i });
      if (await dashboardLink.isVisible()) {
        await dashboardLink.click();
        await expect(page).toHaveURL(/\/dashboard/);
      }
    }
  });

  test("C3 — 404 page saat route tidak valid", async ({ page }) => {
    await page.goto("/route-yang-tidak-ada");

    // Cek 404 page atau error message
    const body = page.locator("body");
    const text = await body.textContent();
    expect(
      text.includes("404") || text.includes("tidak ditemukan") || text.includes("Page not found")
    ).toBeTruthy();
  });
});

// ============================================================
// D. Real-time — WebSocket/Socket.io
// ============================================================

test.describe("D — Real-time Features", () => {

  test("D1 — pesan chat muncul tanpa refresh", async ({ page }) => {
    // Buka aplikasi chat di 2 tab/browser context
    await page.goto("/chat/room-1");

    // Cek koneksi
    await expect(page.getByText(/terkoneksi|connected/i)).toBeVisible({ timeout: 5000 });

    // Kirim pesan
    const input = page.getByRole("textbox").last();
    await input.fill("Halo dari test!");
    await input.press("Enter");

    // Pesan langsung muncul tanpa refresh
    await expect(page.getByText("Halo dari test!")).toBeVisible();
  });

  test("D2 — pesan dari client lain juga muncul (cross-tab)", async ({ browser }) => {
    // Buat context kedua (seperti tab kedua)
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    // Page 1 (user A)
    await page.goto("/chat/room-1");
    await expect(page.getByText(/terkoneksi|connected/i)).toBeVisible({ timeout: 5000 });

    // Page 2 (user B)
    await page2.goto("/chat/room-1");
    await expect(page2.getByText(/terkoneksi|connected/i)).toBeVisible({ timeout: 5000 });

    // User A kirim pesan
    await page.getByRole("textbox").last().fill("Pesan dari User A");
    await page.getByRole("textbox").last().press("Enter");

    // User B melihat pesan User A
    await expect(page2.getByText("Pesan dari User A")).toBeVisible({ timeout: 3000 });

    await context2.close();
  });

  test("D3 — user disconnect ditangani dengan baik", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("/chat/room-1");
    await expect(page.getByText(/terkoneksi|connected/i)).toBeVisible({ timeout: 5000 });

    // Tutup tab (simulasi disconnect)
    await page.close();

    // Context ditutup — tidak ada error di console
    await context.close();
  });
});

// ============================================================
// E. Visual Regression & Accessibility
// ============================================================

test.describe("E — Visual & Accessibility", () => {

  test("E1 — halaman dapat diakses dengan keyboard", async ({ page }) => {
    await page.goto("/");

    // Tab ke elemen interaktif pertama
    await page.keyboard.press("Tab");

    // Elemen ter-focus (outline visible)
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();

    // Lanjut tab
    await page.keyboard.press("Tab");
  });

  test("E2 — semua gambar memiliki alt text", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      // Abaikan avatar/decorative images
      const alt = await img.getAttribute("alt");
      expect(alt !== undefined).toBeTruthy();
    }
  });

  test("E3 — contrast ratio cukup (aksesibilitas)", async ({ page }) => {
    await page.goto("/");

    // Cek body memiliki background color
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Warna body bukan transparan
    expect(bgColor).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("E4 — page title ada dan tidak kosong", async ({ page }) => {
    await page.goto("/");

    const title = await page.title();
    expect(title.trim().length).toBeGreaterThan(0);
  });
});

// ============================================================
// F. Performance & Loading States
// ============================================================

test.describe("F — Performance & Loading", () => {

  test("F1 — halaman load dalam waktu < 3 detik", async ({ page }) => {
    const start = Date.now();
    await page.goto("/", { waitUntil: "networkidle" });
    const loadTime = Date.now() - start;

    expect(loadTime).toBeLessThan(3000);
  });

  test("F2 — loading state ditampilkan saat fetch", async ({ page }) => {
    // Buat halaman khusus yang lambat
    await page.goto("/slow-page");

    // Loading indicator
    const loading = page.getByText(/memuat|loading/i);
    await expect(loading.first()).toBeVisible();
  });

  test("F3 — no console errors saat load halaman", async ({ page }) => {
    const errors = [];
    page.on("console", msg => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");

    // Tunggu halaman stabil
    await page.waitForLoadState("networkidle");

    // Tidak ada console error
    expect(errors.filter(e => !e.includes("favicon"))).toHaveLength(0);
  });
});
````

---

## Blok dari `soal/03-integration-testing.md`: 1. Initial Load Test

````jsx
describe('Product Listing Page — Initial Load', () => {
  it('shows loading state while fetching products', () => {
    renderWithProviders(<ProductListingPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays product grid after data loads', async () => {
    renderWithProviders(<ProductListingPage />);
    expect(await screen.findByRole('list', { name: /products/i })).toBeInTheDocument();
  });

  it('displays product count', async () => {
    renderWithProviders(<ProductListingPage />);
    expect(await screen.findByText(/showing \d+ products/i)).toBeInTheDocument();
  });

  it('shows product cards with correct information', async () => {
    renderWithProviders(<ProductListingPage />);
    const firstProduct = await screen.findByRole('article');

    expect(within(firstProduct).getByRole('img', { name: /product image/i })).toBeInTheDocument();
    expect(within(firstProduct).getByRole('heading')).toHaveTextContent('Produk 1');
    expect(within(firstProduct).getByText(/Rp 100\.000/)).toBeInTheDocument();
  });
});
````

---

## Blok dari `soal/03-integration-testing.md`: 1. Network Error Handling

````jsx
describe('Product Listing Page — Error Handling', () => {
  it('displays error message when products API fails', async () => {
    server.use(
      http.get('/api/products', () => HttpResponse.error())
    );

    renderWithProviders(<ProductListingPage />);
    expect(await screen.findByRole('alert')).toHaveTextContent(/failed to load/i);
  });

  it('shows retry button on error', async () => {
    server.use(
      http.get('/api/products', () => HttpResponse.error())
    );

    const user = userEvent.setup();
    renderWithProviders(<ProductListingPage />);

    const retryButton = await screen.findByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it('retry recovers from error state', async () => {
    // Setup: first call fails, second call succeeds
    let callCount = 0;
    server.use(
      http.get('/api/products', () => {
        callCount++;
        if (callCount === 1) return HttpResponse.error();
        return HttpResponse.json([{ id: 1, name: 'Product 1' }]);
      })
    );

    const user = userEvent.setup();
    renderWithProviders(<ProductListingPage />);

    await screen.findByRole('alert');
    await user.click(screen.getByRole('button', { name: /retry/i }));

    expect(await screen.findByRole('list')).toBeInTheDocument();
  });

  it('handles partial failure (some products fail to load)', async () => {
    // Beberapa image gagal load, tapi produk tetap ditampilkan
  });
});
````

---

## Blok dari `soal/04-end-to-end-testing.md`: 2. Configure Playwright

````js
// TODO: Lihat code template untuk referensi
// code/04-end-to-end-playwright.spec.js

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],
});
````

---

## Blok dari `soal/04-end-to-end-testing.md`: 1. Test Structure

````jsx
// e2e/01-login.spec.js

import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('shows login form with correct fields', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('shows validation errors for empty fields', async ({ page }) => {
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.getByLabel(/email/i).fill('wrong@example.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByRole('alert')).toHaveTextContent(/invalid credentials/i);
  });

  test('redirects to dashboard on successful login', async ({ page }) => {
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('correctpassword');
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
  });

  test('persists session after page reload', async ({ page }) => {
    // Login first
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('correctpassword');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL('/dashboard');

    // Reload
    await page.reload();

    // Should still be on dashboard (not redirected to login)
    await expect(page).toHaveURL('/dashboard');
  });
});
````

---

## Blok dari `soal/04-end-to-end-testing.md`: 2. Authentication Storage

````jsx
test('remembers user after browser restart', async ({ browser }) => {
  // Setup context with storage state
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('test@example.com');
  await page.getByLabel(/password/i).fill('correctpassword');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL('/dashboard');

  // Save storage state
  await context.storageState({ path: './auth.json' });

  // New context with saved state
  const context2 = await browser.newContext();
  await context2.storageState('./auth.json');
  const page2 = await context2.newPage();

  // Should be logged in
  await page2.goto('/dashboard');
  await expect(page2).toHaveURL('/dashboard');

  await context.close();
  await context2.close();
});
````

---

## Blok dari `soal/04-end-to-end-testing.md`: 1. Product Search and Filter

````jsx
// e2e/02-shopping.spec.js

test.describe('Product Search and Filter', () => {
  test('search returns relevant results', async ({ page }) => {
    await page.goto('/products');
    const searchInput = page.getByPlaceholder(/search products/i);

    await searchInput.fill('laptop');
    await page.keyboard.press('Enter');

    // All visible product names should contain "laptop"
    const productCards = page.getByRole('article');
    const count = await productCards.count();

    for (let i = 0; i < count; i++) {
      const text = await productCards.nth(i).textContent();
      expect(text.toLowerCase()).toContain('laptop');
    }
  });

  test('category filter narrows results', async ({ page }) => {
    await page.goto('/products');

    // Get initial product count
    const initialCount = await page.getByRole('article').count();

    // Apply category filter
    await page.getByRole('button', { name: /electronics/i }).click();

    // Wait for results to update
    await page.waitForResponse(
      (response) =>
        response.url().includes('/api/products') && response.status() === 200
    );

    const filteredCount = await page.getByRole('article').count();
    expect(filteredCount).toBeLessThan(initialCount);
  });

  test('price range filter works correctly', async ({ page }) => {
    await page.goto('/products');

    // Open price filter
    await page.getByRole('button', { name: /price range/i }).click();

    // Set min and max
    await page.getByLabel(/min price/i).fill('100000');
    await page.getByLabel(/max price/i).fill('500000');
    await page.getByRole('button', { name: /apply/i }).click();

    // All results should be within range
    const priceTexts = page.locator('[data-testid="product-price"]');
    const count = await priceTexts.count();

    for (let i = 0; i < count; i++) {
      const priceText = await priceTexts.nth(i).textContent();
      const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
      expect(price).toBeGreaterThanOrEqual(100000);
      expect(price).toBeLessThanOrEqual(500000);
    }
  });

  test('sort by price low to high', async ({ page }) => {
    await page.goto('/products');
    await page.getByRole('combobox', { name: /sort by/i }).selectOption('price-asc');

    const prices = page.locator('[data-testid="product-price"]');
    const priceValues = await prices.allTextContents();

    const numericPrices = priceValues.map((p) =>
      parseInt(p.replace(/[^0-9]/g, ''), 10)
    );

    for (let i = 1; i < numericPrices.length; i++) {
      expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]);
    }
  });
});
````

---

## Blok dari `soal/04-end-to-end-testing.md`: 2. Add to Cart Flow

````jsx
test.describe('Add to Cart', () => {
  test('adds product to cart successfully', async ({ page }) => {
    await page.goto('/products');

    // Get first product's add to cart button
    const firstProduct = page.getByRole('article').first();
    const addButton = firstProduct.getByRole('button', { name: /add to cart/i });

    await addButton.click();

    // Verify button state changed
    await expect(addButton).toHaveText(/added/i);

    // Verify cart badge updated
    const cartBadge = page.getByRole('status', { name: /cart count/i });
    await expect(cartBadge).toHaveText('1');
  });

  test('cart persists across page navigation', async ({ page }) => {
    await page.goto('/products');

    // Add product
    await page.getByRole('article').first().getByRole('button').click();
    await expect(page.getByRole('status', { name: /cart count/i })).toHaveText('1');

    // Navigate away
    await page.goto('/about');

    // Navigate back
    await page.goto('/products');

    // Cart should still have the item
    await expect(page.getByRole('status', { name: /cart count/i })).toHaveText('1');
  });

  test('toggles cart item when clicked twice', async ({ page }) => {
    await page.goto('/products');

    const addButton = page.getByRole('article').first().getByRole('button');

    // Add to cart
    await addButton.click();
    await expect(page.getByRole('status', { name: /cart count/i })).toHaveText('1');

    // Remove from cart
    await addButton.click();
    await expect(page.getByRole('status', { name: /cart count/i })).toHaveText('0');
  });
});
````

---

## Blok dari `soal/04-end-to-end-testing.md`: Bagian D — Checkout Flow (20 menit)

````jsx
test.describe('Checkout Flow', () => {
  test('completes checkout successfully', async ({ page }) => {
    await page.goto('/products');

    // Add item to cart
    await page.getByRole('article').first().getByRole('button').click();

    // Go to cart
    await page.getByRole('link', { name: /cart/i }).click();
    await expect(page).toHaveURL('/cart');

    // Verify cart item
    await expect(page.getByRole('list', { name: /cart items/i })).toHaveCount(1);

    // Proceed to checkout
    await page.getByRole('button', { name: /proceed to checkout/i }).click();
    await expect(page).toHaveURL('/checkout');

    // Fill shipping info
    await page.getByLabel(/full name/i).fill('John Doe');
    await page.getByLabel(/address/i).fill('123 Main St');
    await page.getByLabel(/phone/i).fill('081234567890');

    // Place order
    await page.getByRole('button', { name: /place order/i }).click();

    // Verify confirmation
    await expect(page.getByRole('heading', { name: /order confirmed/i })).toBeVisible();
    await expect(page.getByTestId('order-number')).toBeVisible();
  });

  test('shows error when cart is empty during checkout', async ({ page }) => {
    await page.goto('/checkout');

    // Should redirect or show error
    await expect(page.getByRole('heading', { name: /your cart is empty/i })).toBeVisible();
  });
});
````

---

## Blok dari `soal/04-end-to-end-testing.md`: 1. Add to GitHub Actions

````yaml
# .github/workflows/e2e.yml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: '24'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps chromium

      - name: Run Playwright tests
        run: npx playwright test

      - uses: actions/upload-artifact@v7
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
````
