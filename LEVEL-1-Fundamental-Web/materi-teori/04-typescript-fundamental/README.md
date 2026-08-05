# TypeScript Fundamental

TypeScript menambahkan pemeriksaan tipe statis di atas JavaScript. Tipe hilang saat
runtime, jadi TypeScript tidak menggantikan validasi data dari network, form, file,
atau database.

## Setup minimal

```bash
npm install --save-dev typescript
npx tsc --init
npx tsc --noEmit
```

Mulai dengan `strict: true`. Hindari mematikan error dengan `any`; gunakan
`unknown`, lakukan narrowing, lalu ubah data eksternal menjadi tipe domain.

## Konsep inti

```typescript
type ProductId = string;

interface Product {
  id: ProductId;
  name: string;
  price: number;
  status: "draft" | "published";
  tags?: readonly string[];
}

type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function formatPrice(product: Pick<Product, "price">): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(product.price);
}
```

- `type` dan `interface` membentuk kontrak; pilih konsisten, bukan dogmatis.
- Union mendeskripsikan beberapa kemungkinan valid.
- Literal/discriminated union membuat state ilegal sulit direpresentasikan.
- Generic mempertahankan relasi tipe tanpa menggantinya dengan `any`.
- `readonly` menyatakan niat immutable pada compile time.
- Utility type seperti `Pick`, `Omit`, `Partial`, dan `Record` menurunkan tipe
  baru dari sumber kebenaran.

## Narrowing dan data eksternal

```typescript
function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.price === "number" &&
    (candidate.status === "draft" || candidate.status === "published")
  );
}
```

Type assertion `as Product` tidak memvalidasi apa pun. Untuk schema besar, gunakan
validator runtime dan infer tipe darinya agar kontrak runtime dan compile time
tidak menyimpang.

## Async dan error

```typescript
async function fetchProduct(id: string): Promise<Result<Product>> {
  try {
    const response = await fetch(`/api/products/${encodeURIComponent(id)}`);
    if (!response.ok) return { ok: false, error: `HTTP ${response.status}` };

    const value: unknown = await response.json();
    return isProduct(value)
      ? { ok: true, data: value }
      : { ok: false, error: "Response tidak sesuai kontrak" };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

## TypeScript pada React

```tsx
type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "danger";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  return (
    <button type="button" data-variant={variant} onClick={onClick}>
      {children}
    </button>
  );
}
```

Gunakan tipe event yang spesifik. Jangan memakai `React.FC` hanya karena kebiasaan;
fungsi biasa biasanya memberi kontrak props yang lebih jelas.

## Anti-pattern

- `any`, `as unknown as X`, atau `!` untuk membungkam compiler.
- Membuat semua property optional agar error hilang.
- Enum untuk data yang cukup dengan union literal.
- Menganggap compile success berarti data runtime valid.
- Menyalin tipe response API di banyak frontend.

## Kriteria lulus

Kamu mampu memodelkan loading/error/success sebagai discriminated union, membuat
generic yang berguna, memvalidasi `unknown`, dan menyelesaikan proyek dengan
`npx tsc --noEmit` tanpa `any`.
