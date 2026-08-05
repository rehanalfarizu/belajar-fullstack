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
