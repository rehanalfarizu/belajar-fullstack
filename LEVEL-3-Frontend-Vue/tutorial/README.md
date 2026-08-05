# Tutorial — Product Explorer dengan Vue

## Scope

Bangun SPA yang memiliki:

- List dan detail produk.
- Search/filter yang tersimpan di URL query.
- Cart dengan Pinia.
- Loading, error, empty, dan retry state.
- Route lazy loading.
- Component dan E2E tests.

## Langkah Vertikal

1. Scaffold Vue dengan Router, Pinia, Vitest, dan Playwright.
2. Bangun halaman list memakai data statis.
3. Pecah `ProductCard`.
4. Tambahkan cart store.
5. Sinkronkan filter ke query URL.
6. Ganti data statis dengan REST API.
7. Tambahkan abort/stale-request protection.
8. Tambahkan detail route.
9. Uji alur search → detail → add cart.
10. Build dan preview:

```bash
npm run test:unit
npm run test:e2e
npm run build
npm run preview
```

## Definition of Done

- Refresh halaman mempertahankan URL state.
- Tidak ada error console.
- List memakai key stabil.
- Form memiliki label.
- Semua request state tertangani.
- Cart tidak menerima quantity invalid.
- Backend tetap melakukan validation dan authorization.
