# 07 — Form Request & Validasi

## Apa Ini?

Validasi adalah langkah **mengecek bentuk data** yang masuk sebelum dipakai.
Apakah harga berupa angka? Apakah nama tidak kosong? Apakah kategori yang dipilih
benar-benar ada?

Di Laravel ada dua cara utama:

- `$request->validate([...])` langsung di controller (cepat, cocok untuk yang kecil)
- **Form Request** — class khusus berisi `authorize()`, `rules()`, `messages()`, dan
  kawan-kawan (rapi, bisa dipakai ulang, controller jadi tipis)

## Analogi

Bayangkan **satpam gudang** yang memeriksa barang masuk. Dia punya daftar: "kardus
harus berlabel, berat maksimal 30 kg, nama pengirim terdaftar". Barang yang tidak
sesuai **dikembalikan dengan catatan alasannya** — bukan dibuang diam-diam, dan bukan
dimasukkan saja ke gudang.

Tulisan "harap kardus berlabel" di pintu depan (validasi HTML) membantu pengirim
yang jujur. Tapi satpam tetap wajib memeriksa, karena tidak semua pengirim jujur.

## Kenapa Penting Buat Kerja?

- Hampir semua bug data kotor ("harga minus", "tanggal 31 Februari") berawal dari
  validasi yang hilang di server.
- Reviewer di kantor hampir pasti menolak PR yang menyimpan `$request->all()`.
- Pertanyaan wawancara backend yang sering keluar: "Kenapa validasi frontend tidak
  cukup?" dan "Apa beda 401, 403, dan 422?".
- Validasi yang bagus = pesan error jelas = tiket support berkurang.

## Glosarium

| Istilah | Arti singkat |
|---|---|
| Rule | Satu aturan cek, misal `required`, `max:120` |
| Form Request | Class berisi aturan validasi + otorisasi untuk satu aksi |
| `validated()` | Data yang sudah lolos validasi (hanya field yang ada di rules) |
| `old()` | Nilai input sebelumnya, untuk mengisi ulang form setelah gagal |
| `$errors` | Kumpulan pesan error yang dikirim ke view |
| 422 | Status HTTP "Unprocessable Content" — input tidak lolos validasi |
| `sometimes` | Cek aturan hanya kalau field-nya dikirim |
| Sanitasi | Merapikan/membersihkan input (beda dari validasi yang menolak) |

## Daftar Soal

| # | Soal | Level |
|---|---|---|
| 01 | [StoreProductRequest](soal/01-store-product-request.md) | Pemula–Menengah |
| 02 | [UpdateProductRequest: Edit Sebagian, Slug Unik, Aturan Antar-Field](soal/02-update-product-request.md) | Menengah |
| 03 | [Validasi Server Itu Wajib: Bobol Dulu, Baru Perbaiki](soal/03-validasi-server-wajib.md) | Menengah–Lanjut |

Langkah kerja ada di [TUGAS.md](TUGAS.md). Cek pemahaman di [CHECKLIST.md](CHECKLIST.md).

## Baca Dulu

- Teori: [Materi Teori 07 — Form Request & Validasi](../../materi-teori/07-form-validasi/README.md)
- Keamanan: [Modul Keamanan 02 — Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md)
- Setup proyek latihan: [Materi Praktikum README](../README.md)
