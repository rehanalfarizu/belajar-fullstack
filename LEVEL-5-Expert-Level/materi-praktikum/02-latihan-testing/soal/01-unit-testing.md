# SOAL 01 — Unit Testing Fundamentals

> Menulis unit test yang reliable untuk pure functions dan logic dengan Jest.

---

## Deskripsi Soal

Tim developer baru saja refactor sebuah modul kalkulasi harga untuk e-commerce platform. Modul ini berisi fungsi-fungsi yang menghitung diskon, pajak, ongkir, dan total harga. Karena perubahan sudah beberapa kali menyebabkan bug production, kamu diminta untuk menulis **unit test yang komprehensif** untuk modul ini.

Tujuan: убедиться bahwa semua edge cases tertutup test, dan regression bisa dideteksi lebih awal.

---

## Teori Singkat

### Unit Test vs Integration Test vs E2E Test

| Tipe | Target | Isolation | Speed | Scope |
|------|--------|-----------|-------|-------|
| Unit | Fungsi/logic individu | High (mock semua deps) | Fast (< 1ms/test) | Small |
| Integration | Interaksi antar modul | Medium | Medium | Medium |
| E2E | User flows di browser | None | Slow (seconds) | Full |

### Arrange-Act-Assert (AAA) Pattern

```js
describe('calculateDiscount', () => {
  it('should return 10% discount for orders above 1M', () => {
    // Arrange
    const price = 1_500_000;
    const expectedDiscount = 0.10;

    // Act
    const result = calculateDiscount(price);

    // Assert
    expect(result).toBe(expectedDiscount);
  });
});
```

### Jest Matchers yang Sering Dipakai

```js
// Value matchers
expect(value).toBe(expected);         // strict equality (===)
expect(value).toEqual(expected);      // deep equality (objects/arrays)
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// Number matchers
expect(value).toBeGreaterThan(n);
expect(value).toBeLessThanOrEqual(n);
expect.closeTo(n, decimalPlaces);

// Array matchers
expect(arr).toContain(item);
expect(arr).toHaveLength(n);

// Object matchers
expect(obj).toHaveProperty('name');
expect(obj).toMatchObject({ name: 'John' });

// Async matchers
expect(Promise).resolves.toBe(expected);
expect(Promise).rejects.toThrow();
```

---

## Checklist Pengerjaan

### Bagian A — Setup Testing Environment (10 menit)

**1. Install Dependencies**

```bash
npm install --save-dev jest @testing-library/jest-dom
```

**2. Configure Jest**

Buat `jest.config.js`:

```js
// TODO: Konfigurasi jest.config.js
// lihat code template untuk referensi
// code/01-math.test.js
```

**3. Add Test Script**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

Jalankan untuk memverifikasi setup:
```bash
npm test
```

### Bagian B — Pure Function Testing (40 menit)

**1. Diskusi: Pure Function**

Jawab pertanyaan berikut secara tertulis:

a) Apa definisi pure function?
b) Mengapa pure functions lebih mudah di-test?
c) Apakah fungsi berikut pure? Jelaskan jawabanmu:
   ```js
   function getCurrentDate() {
     return new Date();
   }
   ```

**2. Testing `formatCurrency`**

```js
function formatCurrency(amount, currency = 'IDR') {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
```

Tulis test untuk:
- Amount positif: `formatCurrency(150000)` → `"Rp 150.000"`
- Amount nol: `formatCurrency(0)` → `"Rp 0"`
- Amount negatif: bagaimana menanganinya?
- Currency USD: `formatCurrency(100, 'USD')` → `"$100"`
- Amount desimal: `formatCurrency(99999.99)` → dibulatkan atau tidak?

**3. Testing `calculateDiscount`**

```js
function calculateDiscount(originalPrice, discountPercentage) {
  if (originalPrice < 0) throw new Error('Price cannot be negative');
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }
  const discountAmount = originalPrice * (discountPercentage / 100);
  return Math.round(originalPrice - discountAmount);
}
```

Tulis test untuk:
- Diskon reguler: `calculateDiscount(100000, 10)` → `90000`
- Diskon 0%: `calculateDiscount(100000, 0)` → `100000`
- Diskon 100%: `calculateDiscount(100000, 100)` → `0`
- Boundary: `calculateDiscount(0, 50)` → `0`
- Price negatif (harus throw): ?
- Diskon negatif (harus throw): ?
- Diskon > 100% (harus throw): ?

**4. Testing `calculateTax`**

```js
function calculateTax(amount, taxRate = 11) {
  return Math.round(amount * (taxRate / 100));
}
```

Tulis test untuk:
- Tax rate default 11% (PPN Indonesia)
- Tax rate kustom
- Amount nol
- Amount besar (cek overflow/precision)

### Bagian C — Parametrized Tests (20 menit)

**1. Table-Driven Tests**

Gunakan `test.each()` untuk menguji multiple cases:

```js
test.each`
  originalPrice | discount | expected
  ${100000}     | ${10}    | ${90000}
  ${200000}     | ${25}    | ${150000}
  ${500000}     | ${50}    | ${250000}
  ${1000000}    | ${0}     | ${1000000}
`('calculateDiscount($originalPrice, $discount) = $expected', 
  ({ originalPrice, discount, expected }) => {
    expect(calculateDiscount(originalPrice, discount)).toBe(expected);
  }
);
```

Implementasikan table-driven test untuk `formatCurrency` dengan minimal 10 kasus termasuk:
- Mata uang berbeda (IDR, USD, EUR, JPY)
- Amount besar vs kecil
- Amount desimal
- Edge cases (nol, negatif)

**2. Edge Cases Discussion**

Untuk setiap fungsi, identifikasi edge cases yang mungkin terlewat. Diskusikan:
- Apa yang terjadi jika input adalah `null`? `undefined`? `NaN`?
- Bagaimana floating point precision dapat memengaruhi hasil?
- Kapan sebaiknya gunakan `toBe` vs `toBeCloseTo` vs `toEqual`?

### Bagian D — Mocking & Stubbing (20 menit)

**1. Testing Fungsi dengan Side Effects**

Fungsi berikut memiliki side effect (bergantung pada tanggal):

```js
function getShippingFee(weight, destination) {
  const baseRates = {
    jakarta: 15000,
    bandung: 25000,
    surabaya: 35000,
  };
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;
  const rate = baseRates[destination] ?? 50000;
  const weekendSurcharge = isWeekend ? 5000 : 0;
  return rate + (weight * 1000) + weekendSurcharge;
}
```

Gunakan `jest.spyOn` untuk mock `Date`:
- Test weekday → weekendSurcharge = 0
- Test weekend → weekendSurcharge = 5000
- Test unknown destination → default rate + weekendSurcharge

**2. Module Mocking**

Jika ada fungsi yang membaca dari localStorage:

```js
function getCartTotal() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
```

Gunakan `jest.mock('localStorage', ...)` untuk mengisolasi test.

### Bagian E — Code Coverage (10 menit)

**1. Run Coverage Report**

```bash
npm run test:coverage
```

**2. Analisis Coverage Report**

Buka `coverage/lcov-report/index.html`.

Analisis:
- Line coverage vs branch coverage — apa bedanya?
- Function coverage mana yang paling rendah?
- Apakah 100% coverage menjamin kualitas test? Mengapa atau mengapa tidak?

**3. Critical Thinking**

Diskusikan secara tertulis (mínimo 3 paragraf):

> Apakah 100% code coverage adalah target yang realistis dan valuable? Kapan 80% coverage sudah cukup? Kapan 100% coverage diperlukan? Berikan contoh spesifik dari project nyata.

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Setup Jest yang benar | 10% |
| Kelengkapan test cases per fungsi | 30% |
| Penggunaan parametrized tests | 15% |
| Mocking yang tepat | 20% |
| Analisis coverage report | 10% |
| Kedalaman critical thinking | 15% |

---

## Reference

- [Jest — Getting Started](https://jestjs.io/docs/getting-started)
- [Jest — Using Matchers](https://jestjs.io/docs/using-matchers)
- [Jest — Mock Functions](https://jestjs.io/docs/mock-functions)
- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
