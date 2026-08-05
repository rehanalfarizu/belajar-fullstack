# SOFTWARE 02 — Testing & CI/CD Setup

## Tujuan
Kamu akan belajar menulis test (unit, integration, E2E) dan setup automated CI/CD pipeline.

---

## 1. Jest — Unit Testing

### Install

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Setup

`jest.config.js`:

```javascript
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testMatch: ['**/*.test.jsx', '**/*.test.js'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/']
};
```

`jest.setup.js`:

```javascript
import '@testing-library/jest-dom';
```

### Contoh Test

`src/utils/calculator.test.js`:

```javascript
import { add, subtract, multiply, divide } from './calculator';

describe('Calculator', () => {
  test('add: should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test('subtract: should subtract two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(3, 5)).toBe(-2);
  });

  test('multiply: should multiply two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(0, 5)).toBe(0);
  });

  test('divide: should divide two numbers', () => {
    expect(divide(6, 3)).toBe(2);
    expect(() => divide(1, 0)).toThrow('Cannot divide by zero');
  });
});
```

---

## 2. React Testing Library — Component Testing

`src/components/Button.test.jsx`:

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```

---

## 3. Playwright — End-to-End Testing

### Install

```bash
npm install --save-dev @playwright/test
npx playwright install chromium
```

### Contoh Test

`tests/e2e/login.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="email"]', 'wrong@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.click('[type="submit"]');

    await expect(page.locator('.error-message')).toContainText(
      'Email atau password salah'
    );
  });
});
```

---

## 4. GitHub Actions CI/CD

`.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/
```

---

## Ringkasan

```
Testing:
├── Jest              → Unit testing untuk JS
├── React Testing Lib → Component testing
├── Playwright        → E2E testing (browser automation)
└── Coverage → % kode yang di-test

CI/CD:
├── GitHub Actions    → Automated pipeline
├── on: push/pr → Trigger events
├── jobs             → Unit test, lint, build, deploy
├── services → Database service untuk test
├── upload-artifact   → Simpan build output
└── needs → Job dependency
```