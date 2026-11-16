# ERD: Sistem Pemesanan Jasa Website

> Pasangan dari [PRD](01-prd-pemesanan.md). Diagram di bawah dirender otomatis oleh
> GitHub. Kalau dibuka di VS Code, pasang ekstensi Markdown Preview Mermaid Support,
> atau baca versi teks di bawahnya.

```mermaid
erDiagram
    USERS ||--o{ ORDERS : "membuat"
    PACKAGES ||--o{ ORDERS : "dipilih dalam"
    ORDERS ||--o{ PAYMENTS : "dibayar lewat"
    ORDERS ||--o{ ORDER_STATUS_LOGS : "punya riwayat"
    USERS ||--o{ ORDER_STATUS_LOGS : "mengubah"
    USERS ||--o{ PAYMENTS : "mencatat"

    USERS {
        int id PK
        string name
        string email UK
        string password_hash
        string role "client | admin"
        timestamp created_at
    }
    PACKAGES {
        int id PK
        string name
        text description
        int price "rupiah"
        boolean is_active
        timestamp created_at
    }
    ORDERS {
        int id PK
        int user_id FK
        int package_id FK
        int agreed_price "rupiah"
        text brief
        date desired_deadline
        string status
        timestamp created_at
        timestamp updated_at
    }
    PAYMENTS {
        int id PK
        int order_id FK
        int amount "rupiah"
        string method "transfer | tunai"
        date paid_at
        string proof_url "boleh NULL"
        int recorded_by FK
        timestamp created_at
    }
    ORDER_STATUS_LOGS {
        int id PK
        int order_id FK
        string from_status "NULL untuk status pertama"
        string to_status
        int changed_by FK
        timestamp changed_at
    }
```

## Versi teks

```text
users ||──o< orders >o──|| packages
                │
                ├──o< payments >o──|| users (recorded_by)
                │
                └──o< order_status_logs >o──|| users (changed_by)
```

| Tabel | Kolom penting | Catatan |
|---|---|---|
| `users` | `id` PK, `email` UNIQUE, `role` | klien dan admin di satu tabel, dibedakan `role` |
| `packages` | `id` PK, `price`, `is_active` | paket tidak dihapus, cukup dinonaktifkan |
| `orders` | `id` PK, `user_id` FK, `package_id` FK, `agreed_price`, `status` | satu pesanan = satu paket |
| `payments` | `id` PK, `order_id` FK, `amount`, `recorded_by` FK | satu pesanan bisa dibayar beberapa kali |
| `order_status_logs` | `id` PK, `order_id` FK, `changed_by` FK | riwayat perubahan status |

Semua uang disimpan sebagai bilangan bulat rupiah, bukan desimal.
