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

```jsx
it('shows "Add to Cart" by default', () => {
  render(<AddToCartButton productId="123" />);
  expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
});
```

**4. Click Behavior Test**

```jsx
it('changes to "Added!" after click', async () => {
  const user = userEvent.setup();
  render(<AddToCartButton productId="123" />);

  const button = screen.getByRole('button', { name: /add to cart/i });
  await user.click(button);

  expect(screen.getByRole('button', { name: /added/i })).toBeInTheDocument();
});
```

### Bagian C — Cart State Integration (20 menit)

**1. Testing Context Integration**

Karena komponen ini menggunakan CartContext, kamu perlu wrap dengan provider:

```jsx
// Helper untuk render dengan context
const renderWithContext = (ui, { cartState = {}, ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => (
    <CartContext.Provider value={{ ...cartState }}>
      {children}
    </CartContext.Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
```

**2. Test Cart Count Update**

```jsx
it('increases cart count by 1 when added', async () => {
  const user = userEvent.setup();
  const onCartUpdate = jest.fn();

  render(
    <CartContext.Provider value={{ addToCart: onCartUpdate }}>
      <AddToCartButton productId="123" />
    </CartContext.Provider>
  );

  await user.click(screen.getByRole('button'));
  expect(onCartUpdate).toHaveBeenCalledWith('123');
});
```

**3. Toggle Behavior Test**

```jsx
it('toggles back to default on second click', async () => {
  const user = userEvent.setup();
  render(<AddToCartButton productId="123" />);

  const button = screen.getByRole('button', { name: /add to cart/i });
  await user.click(button);
  await user.click(screen.getByRole('button', { name: /added/i }));

  expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
});
```

### Bagian D — Error Handling & Edge Cases (20 menit)

**1. Loading State**

Jika ada loading state saat API call:

```jsx
it('shows loading text while adding', async () => {
  // Setup: mock API call yang lambat
  global.fetch = jest.fn(() =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ ok: true }), 3000)
    )
  );

  const user = userEvent.setup();
  render(<AddToCartButton productId="123" />);

  await user.click(screen.getByRole('button'));
  expect(screen.getByRole('button', { name: /adding/i })).toBeDisabled();
});
```

**2. Error State**

```jsx
it('shows error and reverts on API failure', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

  const user = userEvent.setup();
  render(<AddToCartButton productId="123" />);
  render(<ErrorToast />); // Component yang menampilkan error

  await user.click(screen.getByRole('button'));

  expect(await screen.findByRole('alert')).toHaveTextContent(/error/i);
  expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
});
```

**3. Edge Cases**

Tulis test untuk:
- Double-click prevention (mencegah duplicate add)
- Empty productId handling
- Component unmount saat loading (cleanup)

### Bagian E — Accessibility Testing (20 menit)

**1. Semantics Check**

```jsx
it('button has correct accessible name', () => {
  render(<AddToCartButton productId="123" />);

  const button = screen.getByRole('button');
  expect(button).toHaveAccessibleName(/add to cart/i);
});
```

**2. Focus Management**

```jsx
it('can be focused with keyboard', async () => {
  render(<AddToCartButton productId="123" />);

  const button = screen.getByRole('button');
  button.focus();
  expect(button).toHaveFocus();
});
```

```jsx
it('toggles on Enter key press', async () => {
  const user = userEvent.setup();
  render(<AddToCartButton productId="123" />);

  const button = screen.getByRole('button');
  await user.keyboard('{Enter}');

  expect(screen.getByRole('button', { name: /added/i })).toBeInTheDocument();
});
```

**3. Screen Reader Announcement**

```jsx
it('announces state change to screen reader', async () => {
  const user = userEvent.setup();
  render(<AddToCartButton productId="123" />);

  // Gunakan jest-axe untuk automated a11y check
  const { container } = render(<AddToCartButton productId="123" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

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