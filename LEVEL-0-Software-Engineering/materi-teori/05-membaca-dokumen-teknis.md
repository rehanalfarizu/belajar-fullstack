# Membaca Dokumen Teknis: ERD, PRD, API, dan Diagram

Di dunia kerja, kamu jarang langsung disuruh ngoding. Biasanya kamu diberi dokumen
dulu: PRD dari product manager, ERD dari backend lead, dokumentasi API, tiket, atau
desain Figma. Kemampuan membaca dokumen ini menentukan apakah kode yang kamu tulis
menyelesaikan masalah yang benar.

Semua dokumen itu menjawab empat pertanyaan yang sama dari sudut berbeda:

| Pertanyaan | Dokumen yang menjawab |
|---|---|
| Masalahnya apa dan untuk siapa? | PRD, user story |
| Data apa yang disimpan dan bagaimana hubungannya? | ERD |
| Bagaimana bagian-bagian sistem berbicara? | Dokumentasi API, sequence diagram |
| Alurnya bagaimana dan kapan dianggap selesai? | Flowchart, wireframe, acceptance criteria |

Praktikum untuk materi ini: [Latihan Membaca Dokumen](../materi-praktikum/01-latihan-membaca-dokumen/README.md).

---

## 1. ERD (Entity Relationship Diagram)

ERD adalah peta database: tabel apa saja yang ada, kolomnya apa, dan bagaimana
tabel saling terhubung.

### Komponen

- **Entity (kotak)** = satu tabel, misalnya `users`, `orders`.
- **Attribute (isi kotak)** = kolom, misalnya `email`, `created_at`.
- **PK (primary key)** = kolom identitas unik tiap baris, biasanya `id`.
- **FK (foreign key)** = kolom yang menyimpan PK milik tabel lain, misalnya
  `orders.user_id` menunjuk ke `users.id`.
- **Relationship (garis)** = hubungan antar tabel, lengkap dengan cardinality di
  kedua ujungnya.

### Notasi crow's foot (paling sering dipakai)

Simbol dibaca di ujung garis yang menempel pada tabel tujuan:

| Simbol di ujung garis | Arti |
|---|---|
| `||` | tepat satu |
| `o|` | nol atau satu |
| `|<` | satu atau banyak |
| `o<` | nol atau banyak |

Di Mermaid (dirender otomatis oleh GitHub) simbolnya ditulis `||--o{`, artinya
"tepat satu" di kiri dan "nol atau banyak" di kanan.

### Cara membaca ERD, empat langkah

1. **Baca nama semua tabel dulu.** Tebak domainnya: ini sistem apa?
2. **Cari PK dan FK di tiap tabel.** FK menunjukkan siapa "milik" siapa.
3. **Ucapkan setiap garis sebagai dua kalimat, satu per arah.**
4. **Cek dengan kasus nyata.** "Kalau user menghapus akun, pesanannya bagaimana?"

Contoh:

```text
users ||──o< orders
```

- "Satu user punya **nol atau banyak** order."
- "Satu order dimiliki **tepat satu** user."

Kalau kamu bisa mengucapkan semua garis seperti itu tanpa ragu, kamu sudah
memahami ERD-nya.

### Dari ERD ke SQL

| Hubungan | Cara implementasi |
|---|---|
| 1–1 | FK + `UNIQUE` di salah satu tabel |
| 1–N | FK di sisi "banyak" (`orders.user_id`) |
| N–N | tabel perantara berisi dua FK (`order_items.order_id`, `order_items.product_id`) |
| ke diri sendiri | FK ke tabel yang sama (`employees.manager_id` → `employees.id`) |

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

`NOT NULL` pada `orders.user_id` adalah cara database menegakkan "tepat satu
user". Kalau kolomnya boleh `NULL`, artinya "nol atau satu".

### Kesalahan umum saat membaca

- Membaca garis hanya satu arah, padahal arti tiap ujung berbeda.
- Mengira FK ada di sisi "satu". FK selalu di sisi "banyak".
- Lupa bahwa N–N tidak bisa langsung, harus lewat tabel perantara.
- Tidak bertanya apa yang terjadi saat data induk dihapus (`ON DELETE`).

---

## 2. PRD (Product Requirements Document)

PRD menjelaskan **apa** yang mau dibangun dan **kenapa**, bukan bagaimana cara
ngodingnya.

### Bagian yang biasanya ada

1. Latar belakang dan masalah
2. Tujuan dan metrik keberhasilan
3. Pengguna (persona/role)
4. Scope: yang termasuk dan **yang tidak termasuk** (out of scope)
5. User story dan acceptance criteria
6. Requirement non-fungsional: keamanan, performa, aksesibilitas
7. Pertanyaan terbuka, risiko, timeline

### Urutan membaca yang efektif

Jangan langsung ke daftar fitur. Urutannya:

1. **Masalah dan tujuan.** Kalau kamu tidak tahu masalahnya, kamu tidak bisa
   mengambil keputusan kecil dengan benar.
2. **Out of scope.** Mencegah kamu membangun hal yang tidak diminta.
3. **User story.** Siapa melakukan apa.
4. **Acceptance criteria.** Ini definisi selesai. Reviewer dan QA mengecek ini.
5. **Non-fungsional.** Sering jadi sumber bug keamanan kalau dilewati.

### User story dan acceptance criteria

```text
Sebagai klien,
saya ingin melihat status pesanan saya,
supaya saya tidak perlu bertanya lewat WhatsApp.

Acceptance criteria:
- Given saya sudah login
  When saya membuka halaman "Pesanan Saya"
  Then saya melihat semua pesanan saya, terbaru di atas, beserta statusnya
- Given saya belum punya pesanan
  When saya membuka halaman itu
  Then saya melihat pesan "Belum ada pesanan" dan tombol "Buat pesanan"
- Given saya login sebagai klien A
  When saya mencoba membuka pesanan milik klien B lewat URL
  Then saya mendapat 404
```

Setiap baris Given/When/Then bisa langsung jadi satu test case.

### Ubah setiap requirement menjadi tiga hal

| Requirement | Data (ERD) | Endpoint (API) | Layar (UI) |
|---|---|---|---|
| Klien melihat status pesanannya | `orders.status`, `orders.user_id` | `GET /api/orders` | Halaman "Pesanan Saya" |

Kalau satu requirement tidak bisa kamu isi ketiga kolomnya, berarti ada yang belum
kamu pahami. Itu saatnya bertanya.

### Mencari ambiguitas

Untuk setiap fitur, tanyakan:

- **Siapa** yang boleh melakukannya? Siapa yang tidak boleh?
- **Kapan** boleh? Ada batas status atau waktu?
- **Berapa** batasnya? Maksimal karakter, ukuran file, jumlah item?
- **Kalau kosong** tampilkan apa?
- **Kalau gagal** apa yang terjadi, dan apa yang dilihat user?
- **Kalau dilakukan dua kali** (klik ganda, request ganda) bagaimana?

Tulis pertanyaannya, jangan ditebak. Di dunia kerja, junior yang bertanya
"pesanan boleh dibatalkan sampai status apa?" dianggap teliti, bukan lambat.

---

## 3. Dokumentasi API

Dokumentasi API (sering dalam format OpenAPI/Swagger) adalah kontrak antara
frontend dan backend. Baca setiap endpoint dengan urutan:

1. **Method + path** — `POST /api/orders`
2. **Autentikasi** — perlu login? role apa?
3. **Request** — path param, query param, body, beserta tipe dan aturannya
4. **Response sukses** — status code dan bentuk JSON
5. **Response gagal** — status code apa saja dan kapan muncul

Status code yang wajib hafal:

| Kode | Arti | Contoh penyebab |
|---|---|---|
| 200 | OK | data berhasil diambil/diubah |
| 201 | Created | data baru berhasil dibuat |
| 204 | No Content | berhasil, tidak ada body (biasanya DELETE) |
| 400 | Bad Request | body tidak valid |
| 401 | Unauthorized | belum login / token tidak valid |
| 403 | Forbidden | sudah login tapi tidak berhak |
| 404 | Not Found | data tidak ada (atau sengaja disembunyikan) |
| 409 | Conflict | bentrok, misalnya email sudah terdaftar |
| 422 | Unprocessable | format benar tapi melanggar aturan bisnis |
| 500 | Server Error | bug di server |

---

## 4. Tiket (Jira, Trello, GitHub Issues)

Tiket adalah potongan kecil PRD yang siap dikerjakan. Biasanya berisi judul, user
story, acceptance criteria, desain terkait, dan estimasi. Baca acceptance
criteria-nya dulu, lalu cek tiket lain yang terkait (blocked by / blocks).

Sebelum mulai mengerjakan, tulis ulang tiket dengan kata sendiri dalam 2–3
kalimat. Kalau tidak bisa, tanyakan dulu.

---

## 5. Flowchart dan sequence diagram

**Flowchart** menggambarkan alur keputusan.

- Kotak = langkah, belah ketupat = keputusan ya/tidak, panah = arah alur.
- Cek: apakah setiap cabang keputusan punya ujung? Adakah loop yang tidak pernah
  berhenti?

**Sequence diagram** menggambarkan siapa memanggil siapa, berurutan.

- Pelaku dibaca dari kiri ke kanan, waktu dari atas ke bawah.

```text
Browser          API              Database
   | POST /login   |                  |
   |-------------->|                  |
   |               | SELECT user      |
   |               |----------------->|
   |               |<-----------------|
   |               | cek hash password|
   | 200 + cookie  |                  |
   |<--------------|                  |
```

Pertanyaan yang selalu diajukan: langkah mana yang bisa gagal, dan apa yang
terjadi kalau gagal di tengah jalan?

---

## 6. Wireframe dan desain Figma

Untuk setiap layar, cari:

- Data yang tampil berasal dari endpoint mana?
- Tombol mana yang memicu request? Apa yang terjadi setelah sukses?
- Empat keadaan: **memuat, error, kosong, berhasil**. Desainer sering hanya
  menggambar keadaan "berhasil". Tanyakan tiga lainnya.
- Validasi form: pesan error tampil di mana?

---

## 7. Alur kerja nyata

```text
PRD ──► daftar pertanyaan ──► ERD ──► kontrak API ──► UI ──► test dari acceptance criteria
```

Urutan ini juga yang kamu pakai saat menyusun spesifikasi proyek portofolio:
mulai dari masalah, baru data, baru endpoint, baru layar.

---

## 8. Di interview

Pertanyaan yang sering muncul:

- "Ini ERD-nya. Jelaskan hubungan antar tabel."
- "Kalau kami mau menambah fitur X, tabel apa yang berubah?"
- "Tulis query untuk menampilkan Y." (biasanya butuh JOIN)
- "Dari requirement ini, endpoint apa saja yang kamu buat?"
- "Apa yang kurang jelas dari requirement ini?"

Pertanyaan terakhir sering jadi pembeda. Kandidat yang bisa menemukan ambiguitas
menunjukkan dia akan menulis kode yang benar, bukan hanya kode yang jalan.

---

## Cek pemahaman

Jawab tanpa melihat materi:

1. Di hubungan 1–N, foreign key diletakkan di tabel mana? Kenapa?
2. Kenapa hubungan N–N butuh tabel perantara?
3. Bagian PRD mana yang dibaca kedua, dan kenapa?
4. Bedanya 401 dan 403?
5. Empat keadaan layar yang harus selalu ditanyakan ke desainer?
6. Ubah requirement "admin bisa menonaktifkan paket" menjadi data, endpoint, dan layar.
