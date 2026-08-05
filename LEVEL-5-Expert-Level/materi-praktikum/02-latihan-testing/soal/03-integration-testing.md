# SOAL 03 — Integration Testing

> Testing alur aplikasi lengkap dengan React Testing Library dan MSW.

---

## Deskripsi Soal

Kamu diminta untuk menulis integration test untuk halaman **Product Listing Page** sebuah e-commerce app. Halaman ini terdiri dari:
- Header dengan cart badge
- Filter sidebar (category, price range)
- Product grid
- Pagination

Integration test berarti kamu menguji **bagaimana komponen-komponen ini bekerja bersama**, bukan satu per satu secara terisolasi.

---

## Teori Singkat

### Integration Testing Philosophy

> "The goal of integration tests is to give us confidence that our app works as a user would expect it to, without the brittleness and slowness of E2E tests."

Integration test di React Testing Library berarti:
- Render **multiple components** yang bekerja bersama
- Simulasikan **user interactions** yang realistic
- Verifikasi **side effects** (API calls, navigation, localStorage)
- Minimize **mocking** — hanya mock yang benar-benar perlu (external services)

### Mocking Service Worker (MSW)

MSW (Mock Service Worker) intercepts requests di level network, bukan di level function. Ini membuat test lebih realistis karena browser thinks it's making real requests.

```js
// Handler
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json([
      { id: 1, name: 'Product 1', price: 100000 },
    ]);
  }),
];

export const server = setupServer(...handlers);
```

### Arrange-Act-Assert in Integration Tests

```jsx
describe('Product Listing Page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('loads and displays products', async () => {
    // Arrange — setup done in beforeAll
    renderWithProviders(<ProductListingPage />);

    // Act
    // User waits for loading...

    // Assert
    expect(await screen.findByText('Product 1')).toBeInTheDocument();
  });
});
```

---

## Checklist Pengerjaan

### Bagian A — MSW Setup (20 menit)

**1. Install MSW**

```bash
npm install --save-dev msw@latest
```

**2. Initialize MSW**

```bash
npx msw init ./public --save
```

**3. Define Handlers**

Buat file `src/mocks/handlers.js` dengan handlers untuk:

| Endpoint | Method | Response |
|----------|---------|----------|
| `/api/products` | GET | Array of products + pagination info |
| `/api/categories` | GET | Array of categories |
| `/api/products?category=:id` | GET | Filtered products |
| `/api/cart` | GET | Cart items |
| `/api/cart/add` | POST | Updated cart |

**4. Setup Server di Test**

```js
// src/setupTests.js
import { server } from './mocks/server';

// Reset between tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

**5. Custom Response untuk Specific Tests**

```js
// Contoh: Override handler untuk error scenario
it('shows error when API fails', async () => {
  server.use(
    http.get('/api/products', () => HttpResponse.error())
  );

  renderWithProviders(<ProductListingPage />);
  expect(await screen.findByRole('alert')).toHaveTextContent(/error/i);
});
```

### Bagian B — Page Integration Tests (30 menit)

**1. Initial Load Test**

```jsx
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
```

**2. Cart Integration Test**

```jsx
describe('Product Listing Page — Cart Integration', () => {
  it('adds product to cart when Add to Cart is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />  {/* Contains cart badge */}
        <ProductListingPage />
      </>
    );

    const addButtons = await screen.findAllByRole('button', { name: /add to cart/i });
    await user.click(addButtons[0]);

    expect(screen.getByRole('status', { name: /cart count/i })).toHaveTextContent('1');
  });

  it('cart count persists after page navigation', async () => {
    // Test bahwa cart state tidak reset saat komponen unmount/remount
  });
});
```

**3. Filter Integration Test**

```jsx
describe('Product Listing Page — Filtering', () => {
  it('filters products by category when category is selected', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductListingPage />);

    // Wait for initial load
    await screen.findByRole('list', { name: /products/i });

    // Click category filter
    const categoryFilter = screen.getByRole('combobox', { name: /category/i });
    await user.selectOptions(categoryFilter, 'electronics');

    // Verify URL changed (or filter state updated)
    // Verify product list updated
    expect(await screen.findByText(/electronics/i)).toBeInTheDocument();
  });

  it('shows empty state when no products match filter', async () => {
    // Setup: mock returns empty array for selected filter
    server.use(
      http.get('/api/products', () => HttpResponse.json([], { status: 200 }))
    );

    renderWithProviders(<ProductListingPage />);

    // Apply filter that returns no results
    expect(await screen.findByText(/no products found/i)).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: /products/i })).not.toBeInTheDocument();
  });

  it('price range filter updates product list', async () => {
    // TODO: Implementasikan
  });
});
```

### Bagian C — Error Scenarios (20 menit)

**1. Network Error Handling**

```jsx
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
```

**2. Loading States**

```jsx
describe('Product Listing Page — Loading States', () => {
  it('skeleton is shown during initial load', () => {
    renderWithProviders(<ProductListingPage />);
    expect(screen.getByTestId('product-skeleton')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('pagination does not cause full page reload', async () => {
    // Verify: no progress bar during pagination
  });
});
```

### Bagian D — Performance & Async (15 menit)

**1. Race Condition Handling**

```jsx
it('handles rapid filter changes correctly', async () => {
  const user = userEvent.setup();
  renderWithProviders(<ProductListingPage />);

  // User clicks filter 1 → 2 → 3 rapidly
  const categoryFilter = screen.getByRole('combobox', { name: /category/i });

  await user.selectOptions(categoryFilter, 'cat1');
  await user.selectOptions(categoryFilter, 'cat2');
  await user.selectOptions(categoryFilter, 'cat3');

  // Wait for final result
  await waitFor(() => {
    expect(screen.queryByText(/cat1/)).not.toBeInTheDocument();
  });

  // Verify final result is for cat3, not cat1 or cat2
  expect(await screen.findByText(/category: cat3/i)).toBeInTheDocument();
});
```

**2. Suspense Boundary Testing**

```jsx
it('shows Suspense fallback during lazy loading', () => {
  render(
    <Suspense fallback={<LoadingSpinner />}>
      <LazyProductDetail productId="123" />
    </Suspense>
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
```

### Bagian E — Test Design Critique (15 menit)

**Diskusi dan Kritik**

Baca test yang sudah kamu tulis. Untuk setiap test, jawab:

1. **Apakah test ini menguji behavior atau implementasi?**
   - Jika implementation details → refactor

2. **Apakah mock yang dipakai necessary?**
   - MSW di level network → acceptable
   - Mock function di dalam component → mungkin terlalu coupled

3. **Apakah test brittle?**
   - Perubahan CSS class → tidak boleh break test
   - Perubahan internal structure → tidak boleh break test

4. **Apakah test stable?**
   - Apakah ada race conditions?
   - Apakah ada dependency pada timing (setTimeout, debounce)?

5. **Critical Analysis:**
   > Buat daftar 3 test yang kamu tulis yang berpotensi brittle atau implementation-coupled. Bagaimana kamu akan memperbaikinya?

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| MSW setup yang correct | 15% |
| Integration test untuk page load | 20% |
| Filter & pagination integration | 15% |
| Error scenario coverage | 15% |
| Test stability (no race conditions) | 15% |
| Critical self-review | 20% |

---

## Reference

- [MSW — Getting Started](https://mswjs.io/docs/)
- [MSW — Request Matching](https://mswjs.io/docs/recipes/mocking-rest-api)
- [Testing Library — Integration Testing](https://testing-library.com/docs/unit-testing-vs-integration-testing)
- [Kent C. Dodds — Write tests](https://kentcdodds.com/blog/write-tests)