type ProductStatus = "draft" | "published" | "archived";

interface Product {
  readonly id: string;
  name: string;
  price: number;
  status: ProductStatus;
}

type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function isProduct(value: unknown): value is Product {
  // TODO: validasi seluruh property tanpa memakai `any`.
  return false;
}

export function parseProducts(value: unknown): Result<Product[]> {
  // TODO: pastikan root adalah array dan laporkan indeks item yang invalid.
  return { ok: false, error: "Belum diimplementasikan" };
}

export function filterItems<T>(
  items: readonly T[],
  predicate: (item: T) => boolean,
): T[] {
  // TODO: jangan mutasi items.
  return [];
}

export function publishedTotal(products: readonly Product[]): number {
  // TODO: filter published dan jumlahkan price.
  return 0;
}

export function statusLabel(status: ProductStatus): string {
  // TODO: exhaustive switch; gunakan assertNever di default.
  return status;
}

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}
