# 📘 MATERI TEORI 02 — Testing (Jest, RTL, Playwright)

## 1. Jenis Testing

```
Pyramid Testing:
 /\
        /E2E\          E2E — sedikit, lambat, mahal
       /──────\
 /Integra-\
     /  tion    \ Integration — sedang
 /────────────\
   /   Unit Test \   Unit — banyak, cepat, murah
  /────────────────\

Unit Test     → Test fungsi/component individual secara terisolasi
Integration  → Test interaksi antar komponen / modul
E2E          → Test alur lengkap di browser (seperti user asli)
```

---

## 2. Jest — Unit & Integration Testing

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

```javascript
// sum.js
function sum(a, b) {
  return a + b;
}

module.exports = sum;

// sum.test.js
const sum = require("./sum");

describe("sum", () => {
  test("menjumlahkan dua angka positif", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("menjumlahkan angka negatif", () => {
    expect(sum(-1, -1)).toBe(-2);
  });

  test("menjumlahkan dengan nol", () => {
    expect(sum(5, 0)).toBe(5);
  });
});
```

### Matchers Umum

```javascript
// Equality
expect(value).toBe(5);         // exact equality (===)
expect(value).toEqual({...});  // deep equality (object/array)

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();

// Numbers
expect(value).toBeGreaterThan(5);
expect(value).toBeLessThan(10);
expect(value).toBeGreaterThanOrEqual(5);
expect(value).toBeCloseTo(3.14, 2); // floating point

// Strings
expect(str).toMatch(/regex/);
expect(str).toContain("hello");

// Arrays
expect(arr).toContain(5);
expect(arr).toHaveLength(3);

// Objects
expect(obj).toHaveProperty("name");
expect(obj).toMatchObject({ name: "Andi" });

// Exceptions
expect(() => run()).toThrow("Error message");

// Async
await expect(fetchData()).resolves.toBe("data");
await expect(fetchData()).rejects.toThrow();
```

---

## 3. React Testing Library (RTL)

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Setup Jest

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
```

```javascript
// jest.setup.js
import "@testing-library/jest-dom";
```

### Testing Component

```jsx
// LoginForm.jsx
import { useState } from "react";

export function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Email tidak valid");
      return;
    }
    onLogin(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="email-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p data-testid="error-msg">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
```

```jsx
// LoginForm.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  test("render form dengan benar", () => {
    render(<LoginForm onLogin={jest.fn()} />);

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("tampilkan error kalau email tidak valid", async () => {
    const user = userEvent.setup();
    render(<LoginForm onLogin={jest.fn()} />);

    await user.type(screen.getByTestId("email-input"), "invalid-email");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByTestId("error-msg")).toHaveTextContent("Email tidak valid");
  });

  test("panggil onLogin kalau email valid", async () => {
    const user = userEvent.setup();
    const onLogin = jest.fn();
    render(<LoginForm onLogin={onLogin} />);

    await user.type(screen.getByTestId("email-input"), "andi@email.com");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(onLogin).toHaveBeenCalledWith("andi@email.com");
    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  test("reset error saat user ketik ulang", async () => {
    const user = userEvent.setup();
    render(<LoginForm onLogin={jest.fn()} />);

    // Submit invalid
    await user.type(screen.getByTestId("email-input"), "invalid");
    await user.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByTestId("error-msg")).toBeInTheDocument();

    // Ketik ulang dengan valid
    await user.clear(screen.getByTestId("email-input"));
    await user.type(screen.getByTestId("email-input"), "valid@email.com");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });
});
```

### Query Priority (RTL)

```javascript
// Prioritas dari atas ke bawah (yang di atas lebih direkomendasikan)

// 1. Accessible queries (paling bagus)
screen.getByRole("button", { name: /submit/i })
screen.getByRole("textbox", { name: /email/i })
screen.getByLabelText(/email/i)

//2. Semantic queries
screen.getByText("Tambahkan")
screen.getByAltText("Foto profil")

// 3. Test ID (last resort — hanya kalau tidak bisa pakai yang lain)
screen.getByTestId("submit-btn")
```

---

## 4. Mocking

```javascript
// Mock module
jest.mock("./api", () => ({
  fetchUser: jest.fn()
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 1, name: "Andi" })
  })
);

// Mock timer
jest.useFakeTimers();

test("debounce working", async () => {
  const callback = jest.fn();
  debounce(callback, 300);

  jest.advanceTimersByTime(300);
  expect(callback).toHaveBeenCalled();
});

// Restore
jest.useRealTimers();
```

---

## 5. Playwright — E2E Testing

```bash
npm install --save-dev @playwright/test
npx playwright install chromium
```

```javascript
// playwright.config.js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:5173",
    headless: true
  },
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: true
  }
});
```

```javascript
// e2e/login.spec.js
const { test, expect } = require("@playwright/test");

test.describe("Login Flow", () => {
  test("login berhasil dengan kredensial valid", async ({ page }) => {
    await page.goto("/login");

    // Isi form
    await page.getByLabel(/email/i).fill("andi@email.com");
    await page.getByLabel(/password/i).fill("password123");
    await page.getByRole("button", { name: /login/i }).click();

    // Verifikasi redirect ke dashboard
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByText(/halo, andi/i)).toBeVisible();
  });

  test("tampilkan error dengan kredensial invalid", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel(/email/i).fill("salah@email.com");
    await page.getByLabel(/password/i).fill("salah");
    await page.getByRole("button", { name: /login/i }).click();

    await expect(page.getByText(/email atau password salah/i)).toBeVisible();
  });

  test("navigasi antar halaman", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /blog/i }).click();
    await expect(page).toHaveURL("/blog");
  });
});
```

```bash
# Run test
npx playwright test

# Run dengan UI
npx playwright test --ui

# Run satu file
npx playwright test e2e/login.spec.js

# Generate test dari recording
npx playwright codegen http://localhost:5173
```

---

## 6. Test Coverage

```bash
# Run dengan coverage
npx jest --coverage

# Coverage threshold
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
```

---

## Ringkasan

```
Testing
├── Jest        → test runner, matchers, describe/test
├── RTL         → render, screen, userEvent, fireEvent
├── Query Order → getByRole > getByLabel > getByText > getByTestId
├── Mocking     → jest.mock, jest.fn, fake timers
├── Playwright  → E2E, browser automation, page actions
├── Coverage    → --coverage, threshold enforcement
└── Pyramid → Unit (banyak) → Integration (sedang) → E2E (sedikit)
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/02-latihan-testing/`