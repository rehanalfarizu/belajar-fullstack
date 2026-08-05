# SOAL 04 — End-to-End Testing dengan Playwright

> E2E testing dengan Playwright — menguji complete user flows dari browser perspective.

---

## Deskripsi Soal

Kamu diminta untuk membuat E2E test suite untuk e-commerce app yang mencakup:
1. Login flow
2. Product search dan filter
3. Add to cart dan checkout
4. Order confirmation

E2E test berada di level tertinggi—semua berjalan di browser nyata, seluruh
network call juga nyata, dan tidak ada mocking.

---

## Teori Singkat

### Kapan E2E Test?

```
Speed:    E2E (s)  >  Integration (ms)  >  Unit (μs)
Scope:    E2E (full) > Integration (partial) > Unit (function)
Reliability: E2E (flakey) > Integration (stable) > Unit (very stable)
Cost:     E2E (expensive) > Integration (cheap) > Unit (very cheap)
```

**Gunakan E2E untuk:**
- Critical user journeys (checkout, login, payment)
- flows yang melibatkan multiple systems
- regression detection untuk high-priority features

**Jangan gunakan E2E untuk:**
- Testing logic/unit-level behavior
- edge cases yang bisa di-test di unit level
- anything that changes frequently

### Playwright Architecture

```
┌─────────────��────────────────────────────────────────┐
│                    Test Runner (Jest/Vitest)         │
└──────────────────────┬──────────────────────────────┘
                       │
        Playwright Test API (page, expect, request)
                       │
┌──────────────────────▼──────────────────────────────┐
│                  Playwright Driver                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │ Chromium   │  │  Firefox   │  │  WebKit    │   │
│  │ (Chrome)   │  │  (Gecko)   │  │  (Safari)  │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
└──────────────────────────────────────────────────────┘
                       │
              Actual Browser Rendering
              (DOM, Network, JavaScript Engine)
```

---

## Checklist Pengerjaan

### Bagian A — Playwright Setup (20 menit)

**1. Install Playwright**

```bash
npm install --save-dev @playwright/test
npx playwright install --with-deps chromium
```

**2. Configure Playwright**

Buat `playwright.config.js`:

```js
// TODO: Lihat code template untuk referensi
// code/04-playwright.spec.js

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
```

**3. Verify Setup**

```bash
npx playwright test --project=chromium --grep "smoke"
```

### Bagian B — Login Flow E2E (25 menit)

**1. Test Structure**

```jsx
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
```

**2. Authentication Storage**

```jsx
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
```

### Bagian C — Shopping Flow E2E (30 menit)

**1. Product Search and Filter**

```jsx
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
```

**2. Add to Cart Flow**

```jsx
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
```

### Bagian D — Checkout Flow (20 menit)

```jsx
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
```

### Bagian E — CI Integration & Reporting (15 menit)

**1. Add to GitHub Actions**

```yaml
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
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps chromium

      - name: Run Playwright tests
        run: npx playwright test

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
```

**2. Analyze Test Results**

Setelah menjalankan test suite lengkap, jawab:

a) Berapa total test yang run?
b) Berapa yang PASS? Berapa FAIL?
c) Berapa lama total execution time?
d) Berapa banyak flaky tests (PASS/FAIL tidak konsisten)?
e) Diantara test yang fail, apakah fail karena bug di aplikasi atau karena test yang ditulis tidak reliable?

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Playwright setup yang correct | 10% |
| Login flow E2E (5+ tests) | 20% |
| Shopping flow E2E (search, filter, cart) | 25% |
| Checkout flow E2E | 15% |
| CI integration | 15% |
| Test result analysis | 15% |

---

## Reference

- [Playwright — Getting Started](https://playwright.dev/docs/intro)
- [Playwright — Test Configuration](https://playwright.dev/docs/test-configuration)
- [Playwright — Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright — CI GitHub Actions](https://playwright.dev/docs/ci-github-actions)
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
