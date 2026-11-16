# Dokumentasi API: Sistem Pemesanan Jasa Website

> Pasangan dari [PRD](01-prd-pemesanan.md) dan [ERD](02-erd-pemesanan.md).
> Base URL: `/api`. Autentikasi memakai cookie sesi `HttpOnly` yang diset saat login.
> Semua body dan response dalam JSON.

## Ringkasan endpoint

| Method | Path | Akses | Kegunaan |
|---|---|---|---|
| POST | `/auth/register` | publik | daftar klien baru |
| POST | `/auth/login` | publik | login |
| POST | `/auth/logout` | login | logout |
| GET | `/packages` | publik | daftar paket aktif |
| POST | `/orders` | klien | buat pesanan |
| GET | `/orders` | klien, admin | klien: pesanannya sendiri; admin: semua |
| GET | `/orders/:id` | klien (pemilik), admin | detail pesanan |
| POST | `/orders/:id/cancel` | klien (pemilik) | batalkan pesanan |
| PATCH | `/orders/:id/status` | admin | ubah status |
| POST | `/orders/:id/payments` | admin | catat pembayaran |

## Format error

Semua error memakai bentuk yang sama:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Brief wajib diisi",
    "fields": { "brief": "wajib diisi" }
  }
}
```

`fields` hanya ada pada error validasi.

---

## POST /orders

Membuat pesanan baru untuk klien yang sedang login.

**Request body**

| Field | Tipe | Aturan |
|---|---|---|
| `packageId` | integer | wajib, paket harus ada dan aktif |
| `brief` | string | wajib, 1–2.000 karakter |
| `desiredDeadline` | string (`YYYY-MM-DD`) | wajib, minimal 14 hari dari hari ini |

```json
{
  "packageId": 2,
  "brief": "Website company profile untuk toko roti, 5 halaman.",
  "desiredDeadline": "2027-02-01"
}
```

**Response 201**

```json
{
  "id": 41,
  "packageId": 2,
  "packageName": "Company Profile",
  "agreedPrice": 2500000,
  "brief": "Website company profile untuk toko roti, 5 halaman.",
  "desiredDeadline": "2027-02-01",
  "status": "baru",
  "totalPaid": 0,
  "createdAt": "2026-12-03T09:12:44Z"
}
```

**Error**

| Status | `code` | Kapan |
|---|---|---|
| 400 | `VALIDATION_ERROR` | field kosong, salah tipe, brief terlalu panjang, format tanggal salah |
| 401 | `UNAUTHENTICATED` | belum login |
| 403 | `FORBIDDEN` | yang login adalah admin |
| 422 | `PACKAGE_INACTIVE` | paket tidak aktif |
| 422 | `DEADLINE_TOO_SOON` | deadline kurang dari 14 hari |

---

## GET /orders

**Query (opsional):** `status` — filter status, hanya berlaku untuk admin.

**Response 200** — array, terbaru di atas.

```json
[
  {
    "id": 41,
    "clientName": "Sari",
    "packageName": "Company Profile",
    "agreedPrice": 2500000,
    "totalPaid": 1000000,
    "remaining": 1500000,
    "status": "dikerjakan",
    "createdAt": "2026-12-03T09:12:44Z"
  }
]
```

---

## GET /orders/:id

**Response 200** — detail pesanan beserta `payments` dan `statusHistory`.

| Status | `code` | Kapan |
|---|---|---|
| 401 | `UNAUTHENTICATED` | belum login |
| 404 | `NOT_FOUND` | pesanan tidak ada, **atau** milik klien lain |

---

## PATCH /orders/:id/status

**Request body**

```json
{ "status": "dikerjakan" }
```

**Response 200** — pesanan dengan status baru.

| Status | `code` | Kapan |
|---|---|---|
| 400 | `VALIDATION_ERROR` | nilai `status` tidak dikenal |
| 403 | `FORBIDDEN` | bukan admin |
| 404 | `NOT_FOUND` | pesanan tidak ada |
| 422 | `INVALID_TRANSITION` | lompat status, mundur, atau pesanan sudah final |

---

## POST /orders/:id/cancel

Tanpa body. **Response 200** — pesanan dengan status `dibatalkan`.

| Status | `code` | Kapan |
|---|---|---|
| 404 | `NOT_FOUND` | pesanan tidak ada atau milik klien lain |
| 422 | `INVALID_TRANSITION` | pesanan sudah `selesai` atau `dibatalkan` |

---

## POST /orders/:id/payments

**Request body**

| Field | Tipe | Aturan |
|---|---|---|
| `amount` | integer | wajib, lebih dari 0 |
| `method` | string | wajib, `transfer` atau `tunai` |
| `paidAt` | string (`YYYY-MM-DD`) | wajib, tidak boleh di masa depan |
| `proofUrl` | string | opsional |

**Response 201** — pembayaran yang baru dicatat beserta `totalPaid` dan
`remaining` pesanan.

| Status | `code` | Kapan |
|---|---|---|
| 400 | `VALIDATION_ERROR` | field tidak valid |
| 403 | `FORBIDDEN` | bukan admin |
| 404 | `NOT_FOUND` | pesanan tidak ada |
| 422 | `OVERPAYMENT` | total pembayaran akan melebihi `agreedPrice` |
