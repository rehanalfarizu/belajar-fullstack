# Solusi — Latihan Performa (JANGAN DIBUKA DULU)

> **Peringatan:** file ini berisi kunci jawaban. Audit bundle-mu sendiri dulu,
> tulis perubahan import dan pemecahan chunk versimu, lalu bandingkan di sini.
> Kalau hasil ukuran bundle-mu lebih kecil dengan cara lain, itu tidak salah.

---


## 03-bundle-optimization — B2. Selective Imports

```js
// BAD — import seluruh library
import _ from 'lodash';
const sorted = _.sortBy(items, 'name');

// GOOD — import fungsi spesifik (tree-shakeable)
import sortBy from 'lodash/sortBy';
const sorted = sortBy(items, 'name');

// BETTER — import individual functions (lodash-es)
import { sortBy } from 'lodash-es';
```


## 03-bundle-optimization — C1. Manual Dynamic Imports

```jsx
// BEFORE — selalu di-load
import HeavyChart from './components/HeavyChart';
import AdminPanel from './components/AdminPanel';

// AFTER — hanya di-load saat dibutuhkan
const HeavyChart = lazy(() => import('./components/HeavyChart'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
```


## 03-bundle-optimization — C2. Route-Based Splitting

```jsx
// Contoh: setiap route jadi chunk terpisah
<Route
  path="/dashboard"
  element={<Suspense fallback={<Spinner />}><Dashboard /></Suspense>}
/>
```
