# SOAL 02 — React Testing Library

> Testing komponen React dengan React Testing Library — focus pada behavior, bukan implementasi.

---

## Deskripsi Soal

Tim product meminta penambahan fitur "Add to Cart" dengan flow sebagai berikut:
1. User klik tombol "Add to Cart" pada product card
2. Tombol berubah menjadi "Added!" dengan animasi
3. Cart count di header naik 1
4. Jika user klik lagi, item dihapus dari cart (toggle)

Kamu sudah membuat komponen `AddToCartButton.jsx` tapi belum ada test. Tulis comprehensive test suite yang mengikuti filosofi **"The more your tests resemble the way your software is used, the more confidence they can give you."**

---

## Teori Singkat

### Testing Trophy vs Testing Pyramid

```
Testing Pyramid          Testing Trophy (Kent C. Dodds)
                       
   /\
  /  \    E2E            Testing
 /    \                  /\
/      \   Integration    /  \
/________\               /    \  Integration
   Unit                 /______\     /
                         Unit       /
                          Frontend
```

React Testing Library mengarahkan kita untuk fokus pada integration-style testing yang mensimulasikan how users interact with the UI.

### Query Priority (paling spesifik duluan)

```jsx
// 1. Accessible queries (paling preferred)
screen.getByRole('button', { name: /submit/i });
screen.getByRole('textbox', { name: /email/i });
screen.getByRole('img', { name: 'Product image' });

// 2. Semantic queries
screen.getByLabelText('Email address');
screen.getByPlaceholderText('Enter your email');
screen.getByText('Hello, World');

// 3. Test IDs (last resort)
screen.getByTestId('unique-element-id');
```

### Firing Events vs User Interactions

```jsx
// Fire event langsung (kurang ideal)
fireEvent.click(button);

// User interaction (lebih realistis, tapi lebih lambat)
import userEvent from '@testing-library/user-event';
await userEvent.click(button);
await userEvent.type(textbox, 'hello');  // satu per satu
await userEvent.keyboard('{Enter}');     // keyboard event
```

---

## Checklist Pengerjaan

### Bagian A — Component Analysis (15 menit)

**1. Analisis UI Requirements**

Baca deskripsi fitur dan dokumentasikan:

```markdown
## Fitur: Add to Cart Toggle

### User Flow:
1. User melihat tombol [Add to Cart]
2. User klik tombol
3. Button berubah → [Added! ✓]
4. Cart badge di header count +1
5. User klik lagi → kembali ke [Add to Cart]
6. Cart badge count -1

### States:
- Default: "Add to Cart" (outline style)
- Loading: "Adding..." (disabled)
- Added: "Added! ✓" (filled, green)
- Error: kembali ke default (dengan toast error)

### Accessibility:
- Button harus focusable
- harus punya aria-label yang dinamis
- harus announce state change ke screen reader
```

**2. Identifikasi Test Scenarios**

Untuk setiap user flow, tulis skenario test:

| # | Test Scenario | Priority |
|---|--------------|----------|
| 1 | Click button → text changes to "Added!" | P0 |
| 2 | Click button → cart count increases | P0 |
| 3 | Click again → text reverts | P0 |
| ... | ... | ... |

### Bagian B — Setup & First Tests (25 menit)

**1. Setup React Testing Library**

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

Setup `jest.setup.js`:

```js
// TODO: Lihat code template
// code/03-button.test.jsx
```

**2. Render Component**

Buat test pertama — render tanpa crash:

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddToCartButton from './AddToCartButton';

describe('AddToCartButton', () => {
  it('renders without crashing', () => {
    render(<AddToCartButton productId="123" />);
    // ...
  });
});
```

**3. Initial State Test**

> **Tulis sendiri dulu.** Query apa yang paling dianjurkan Testing Library untuk menemukan tombol? Tulis assertion bahwa teks awalnya "Add to Cart".
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 3. Initial State Test*.

**4. Click Behavior Test**

> **Tulis sendiri dulu.** Bagaimana mensimulasikan klik pengguna lalu mengecek teks tombol berubah? Ingat `userEvent.setup()` dan `await`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 4. Click Behavior Test*.

### Bagian C — Cart State Integration (20 menit)

**1. Testing Context Integration**

Karena komponen ini menggunakan CartContext, kamu perlu wrap dengan provider:

> **Tulis sendiri dulu.** Komponen butuh Context. Bagaimana membungkus `render` dengan Provider supaya tidak mengulang kode di tiap test? Cari opsi `wrapper`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 1. Testing Context Integration*.

**2. Test Cart Count Update**

> **Tulis sendiri dulu.** Bagaimana mengecek bahwa fungsi dari context terpanggil dengan argumen yang benar? Pikirkan `jest.fn()` dan matcher `toHaveBeenCalledWith`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 2. Test Cart Count Update*.

**3. Toggle Behavior Test**

> **Tulis sendiri dulu.** Skenario toggle: klik dua kali. Apa yang harus terlihat setelah klik kedua?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 3. Toggle Behavior Test*.

### Bagian D — Error Handling & Edge Cases (20 menit)

**1. Loading State**

Jika ada loading state saat API call:

> **Tulis sendiri dulu.** Bagaimana membuat request palsu yang lambat supaya state loading bisa diamati? Matcher apa untuk tombol nonaktif?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 1. Loading State*.

**2. Error State**

> **Tulis sendiri dulu.** Bagaimana membuat `fetch` gagal di test, lalu menunggu elemen `alert` muncul? Bedakan `getBy`, `queryBy`, dan `findBy`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 2. Error State*.

**3. Edge Cases**

Tulis test untuk:
- Double-click prevention (mencegah duplicate add)
- Empty productId handling
- Component unmount saat loading (cleanup)

### Bagian E — Accessibility Testing (20 menit)

**1. Semantics Check**

> **Tulis sendiri dulu.** Bagaimana mengecek nama aksesibel sebuah tombol? Cari matcher dari jest-dom.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 1. Semantics Check*.

**2. Focus Management**

> **Tulis sendiri dulu.** Bagaimana mengecek elemen bisa difokus lewat keyboard?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 2. Focus Management*.

> **Tulis sendiri dulu.** Bagaimana mensimulasikan tombol Enter pada tombol yang sedang fokus? Lihat `user.keyboard`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 2. Focus Management*.

**3. Screen Reader Announcement**

> **Tulis sendiri dulu.** Bagaimana menjalankan pengecekan aksesibilitas otomatis? Cari paket `jest-axe`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-react-testing — 3. Screen Reader Announcement*.

Pertanyaan diskusi:
- Apa perbedaan `aria-label` dan `<button>` children text untuk accessible name?
- Kapan sebaiknya gunakan `role="status"` vs `role="alert"`?
- Bagaimana cara testing untuk user yang menggunakan screen reader?

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Setup RTL yang benar | 10% |
| Kelengkapan test scenarios | 25% |
| Context/state integration testing | 20% |
| Error & edge case coverage | 15% |
| Accessibility testing | 15% |
| Penggunaan userEvent vs fireEvent | 10% |
| Penggunaan query priority yang tepat | 5% |

---

## Reference

- [Testing Library — Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Which query should I use?](https://testing-library.com/docs/queries/about/#priority)
- [Kent C. Dodds — Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [user-event API](https://testing-library.com/docs/user-event/intro)