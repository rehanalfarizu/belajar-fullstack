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

const statuses: readonly ProductStatus[] = ["draft", "published", "archived"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    typeof value.status === "string" &&
    statuses.includes(value.status as ProductStatus)
  );
}

export function parseProducts(value: unknown): Result<Product[]> {
  if (!Array.isArray(value)) {
    return { ok: false, error: "Root response harus berupa array" };
  }

  const invalidIndex = value.findIndex(item => !isProduct(item));
  return invalidIndex >= 0
    ? { ok: false, error: `Produk pada indeks ${invalidIndex} tidak valid` }
    : { ok: true, data: value };
}

export function filterItems<T>(
  items: readonly T[],
  predicate: (item: T) => boolean,
): T[] {
  return items.filter(predicate);
}

export function publishedTotal(products: readonly Product[]): number {
  return filterItems(products, product => product.status === "published")
    .reduce((total, product) => total + product.price, 0);
}

export function statusLabel(status: ProductStatus): string {
  switch (status) {
    case "draft":
      return "Draf";
    case "published":
      return "Terbit";
    case "archived":
      return "Arsip";
    default:
      return assertNever(status);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}
