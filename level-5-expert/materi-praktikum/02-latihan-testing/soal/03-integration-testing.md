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
// Handler (contoh domain lain: daftar artikel)
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  http.get('/api/articles', () => {
    return HttpResponse.json([
      { id: 1, title: 'Artikel Pertama', author: 'Sari' },
    ]);
  }),
];

export const server = setupServer(...handlers);
```

Handler untuk `/api/products` dan endpoint lain di soal ini kamu tulis sendiri di Bagian A. Belum ketemu? Solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-integration-testing — Teori: Handler MSW untuk `/api/products`*.

### Arrange-Act-Assert in Integration Tests

```jsx
describe('Article List Page', () => {
  it('loads and displays articles', async () => {
    // Arrange: render halaman (server MSW sudah menyala)
    renderWithProviders(<ArticleListPage />);

    // Act: user menunggu loading selesai

    // Assert: data dari API muncul di layar
    expect(await screen.findByText('Artikel Pertama')).toBeInTheDocument();
  });
});
```

Contoh di atas memakai domain artikel. Menyalakan, mereset, dan menutup server di `beforeAll`/`afterEach`/`afterAll` ada di Bagian A langkah 4, dan test untuk halaman produk kamu tulis sendiri di Bagian B. Belum ketemu? Solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-integration-testing — Teori: Test AAA "loads and displays products"*.

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

> **Tulis sendiri dulu.** File setup apa yang dijalankan Jest sebelum semua test, dan bagaimana menyalakan, mereset, dan menutup server MSW di situ?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-integration-testing — 4. Setup Server di Test*.

**5. Custom Response untuk Specific Tests**

> **Tulis sendiri dulu.** Bagaimana menimpa handler MSW untuk satu test saja supaya API "gagal"? Cari `server.use`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-integration-testing — 5. Custom Response untuk Specific Tests*.

### Bagian B — Page Integration Tests (30 menit)

**1. Initial Load Test**

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

**2. Cart Integration Test**

> **Tulis sendiri dulu.** Bagaimana test memastikan klik tombol di satu komponen mengubah badge di komponen lain? Render keduanya dalam satu tree.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-integration-testing — 2. Cart Integration Test*.

**3. Filter Integration Test**

> **Tulis sendiri dulu.** Tulis test filter: pilih kategori, lalu pastikan daftar berubah. Bagaimana kasus "hasil kosong" diuji?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-integration-testing — 3. Filter Integration Test*.

### Bagian C — Error Scenarios (20 menit)

**1. Network Error Handling**

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

**2. Loading States**

> **Tulis sendiri dulu.** Bagaimana menguji tampilan skeleton saat data belum datang?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-integration-testing — 2. Loading States*.

### Bagian D — Performance & Async (15 menit)

**1. Race Condition Handling**

> **Tulis sendiri dulu.** Kalau pengguna mengganti filter cepat-cepat, hasil mana yang harus menang? Bagaimana test menunggu hasil akhir?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-integration-testing — 1. Race Condition Handling*.

**2. Suspense Boundary Testing**

> **Tulis sendiri dulu.** Bagaimana menguji bahwa fallback `Suspense` tampil selama komponen lazy dimuat?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-integration-testing — 2. Suspense Boundary Testing*.

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