<!-- markdownlint-disable MD024 MD028 -->

# SOAL 03 — Tabel Jadwal dengan HTML Table Semantik

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menjelaskan **fungsi** tag-tag tabel: `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`
- Memahami **mengapa** tabel punya struktur 3 lapis (head, body, foot) — bukan cuma `<tr>` random
- Menggunakan `colspan` untuk **merge kolom horizontal**
- Menggunakan `rowspan` untuk **merge baris vertikal**
- Membedakan kapan **boleh** pakai tabel (data tabular) vs kapan **JANGAN** (layout)

**Topik:** `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`, `colspan`, `rowspan`

**Referensi utama:**

- [MDN: `<table>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/table)
- [MDN: `<thead>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/thead)
- [MDN: `colspan` & `rowspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attributes)
- [MDN: HTML Table Basics](https://developer.mozilla.org/id/docs/Learn/HTML/Tables/Basics)

**Difficulty:** Pemula • **Estimasi:** 45-60 menit

---

### Overview Singkat Setiap Tag (Baca Dulu Sebelum Mulai)

Sebelum masuk ke bagian A–G di bawah, pahami dulu logika singkat tiap tag. Nanti di bagian A–G kita bahas lebih dalam dengan contoh kode.

**`<table>`** — *Wadah untuk data tabular.* Ibarat **lembaran Excel di web**: baris dan kolom berisi data. HTML5: `<table>` **hanya** untuk data yang secara alami berbentuk baris × kolom (jadwal, nilai, statistik, harga). **Jangan** pakai untuk layout halaman (itu tugas CSS).

**`<thead>`** — *Bagian kepala tabel.* Ibarat **baris judul kolom** di Excel ("Nama | Nilai | Grade"). Wadah untuk `<tr>` yang berisi `<th>`. Cuma boleh **satu** per tabel.

**`<tbody>`** — *Bagian isi/data utama tabel.* Ibarat **sel-sel data** di Excel. Wadah untuk `<tr>` yang berisi `<td>`. **Wajib** ada (atau browser akan auto-generate, tapi best practice selalu tulis manual).

**`<tfoot>`** — *Bagian kaki tabel (rekapitulasi/total).* Ibarat **baris TOTAL** di Excel: "Total: 10 mata kuliah", "Rata-rata: 85". Cuma boleh **satu** per tabel.

**`<tr>`** — *Table Row = satu baris.* Ibarat **satu baris** di Excel: horizontal, berisi beberapa sel. Tidak punya visual sendiri; tugasnya mengelompokkan sel-sel dalam satu baris.

**`<th>`** — *Table Header = sel judul.* Ibarat **header kolom** di Excel (teks tebal, kadang center). Berisi **label**, bukan data. Wajib di dalam `<tr>` di dalam `<thead>`.

**`<td>`** — *Table Data = sel data biasa.* Ibarat **satu sel** di Excel. Berisi **nilai/data** aktual. Wajib di dalam `<tr>` di dalam `<tbody>` atau `<tfoot>`.

**`colspan`** — *Atribut untuk merge beberapa kolom jadi satu sel.* Ibarat **"Gabungkan & Pusatkan"** di Excel. `<td colspan="3">` artinya sel ini occupies 3 kolom horizontal. Untuk `<th>` juga bisa.

**`rowspan`** — *Atribut untuk merge beberapa baris jadi satu sel.* Ibarat **merge vertikal** di Excel. `<td rowspan="2">` artinya sel ini occupies 2 baris vertikal. Untuk `<th>` juga bisa.

---

## Briefing

Bayangkan kamu mahasiswa semester 5 yang mau **bikin halaman web jadwal kuliah** pribadi. Supaya jadwalnya rapi dan mudah dibaca, kamu perlu menampilkan data dalam bentuk **tabel** — baris untuk tiap mata kuliah, kolom untuk hari, jam, mata kuliah, ruang, dan dosen.

Tapi **tabel bukan cuma "kotak-kotak"**. HTML5 punya struktur **3 lapis** (kepala, isi, kaki) yang punya makna berbeda. Memahami struktur ini akan membuat tabelmu **lulus validasi**, **ramah screen reader**, dan **siap untuk di-styling** dengan CSS di level selanjutnya.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya (mengapa tag ini ada, bukan hanya "untuk apa")
2. **Baca Kapan Pakai & Kapan Jangan** — supaya kamu tidak salah pilih tag
3. **Lihat Yang Terjadi di Browser** — bayangkan output sebelum nulis
4. **Ketik dari 0** di `code/03-tabel-jadwal.html`, cari `TODO(human)`, isi sendiri
5. **Verifikasi** dengan checklist per bagian

---

## Bagian A: Boilerplate + Judul Halaman

### Penjelasan

Standar sama seperti soal 01 dan 02. Bedanya, untuk tabel **konten utama halaman** langsung berisi `<table>` (tidak perlu dibungkus `<article>` / `<main>` dulu, kecuali kamu mau).

### Kapan Pakai

- Boilerplate: **selalu** untuk setiap file HTML.
- Judul `<h1>`: tepat satu per halaman.

### Pola Kode

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jadwal Kuliah Semester 5</title>
  <meta name="description" content="Jadwal lengkap mata kuliah semester 5.">
</head>
<body>
  <h1>Jadwal Kuliah Semester 5</h1>
  <p>Berikut adalah jadwal lengkap perkuliahan semester ini.</p>
  <!-- tabel di sini -->
</body>
</html>
```

### Verifikasi

- [ ] Baris pertama `<!DOCTYPE html>`
- [ ] `<html lang="id">`
- [ ] `<title>` deskriptif
- [ ] Tepat satu `<h1>` di halaman

---

## Bagian B: `<table>` sebagai Wadah + `<thead>` untuk Header

### Penjelasan

`<table>` membungkus **seluruh** struktur tabel. Di dalamnya ada 3 bagian:

1. **`<thead>`** (atas) — untuk header baris, berisi `<tr><th>...</th></tr>`
2. **`<tbody>`** (tengah) — untuk data, berisi `<tr><td>...</td></tr>`
3. **`<tfoot>`** (bawah) — untuk rekapitulasi/total, berisi `<tr><td>...</td></tr>`

**Analogi:** Bayangkan **laporan keuangan Excel**:
- Baris 1 (paling atas): "Item | Q1 | Q2 | Q3 | Q4" → `<thead>`
- Baris 2-100 (tengah): data penjualan → `<tbody>`
- Baris terakhir: "Total: ..." → `<tfoot>`

### Mengapa Butuh 3 Bagian? (Bukan Cuma `<tr>` Random)

Tanpa `<thead>`/`<tbody>`/`<tfoot>`:
- Browser **tetap** menampilkan tabel
- Tapi **screen reader** kesulitan: "Mana header kolom? Mana data? Mana total?"
- **Cetak / PDF**: sulit mengulang header di tiap halaman
- **CSS nanti**: sulit men-style header berbeda dari body

### Kapan Pakai

- `<thead>`: untuk baris header (label kolom). **Wajib** untuk tabel dengan kolom bermakna.
- `<tbody>`: untuk data. **Wajib** (atau browser auto-create, tapi best practice tulis manual).
- `<tfoot>`: untuk rekapitulasi (total, rata-rata, catatan kaki tabel).

### Kapan Jangan

- **Jangan** pakai `<thead>` lebih dari satu per `<table>`.
- **Jangan** pakai `<tfoot>` untuk hal yang **bukan** rekapitulasi (misal catatan kaki tentang copyright).
- **Jangan** pakai tabel untuk **layout** (misal "bikin 2 kolom" pakai `<table>`). Itu tugas CSS Grid / Flexbox.

### Pola Kode

```html
<table>
  <thead>
    <tr>
      <th>Hari</th>
      <th>Jam</th>
      <th>Mata Kuliah</th>
      <th>Ruang</th>
      <th>Dosen</th>
    </tr>
  </thead>
</table>
```

### Yang Terjadi di Browser (TANPA CSS)

- **Tanpa atribut `border`**: tabel **tidak terlihat** kayak tabel! Hanya ada **spasi putih** antar sel. Browser modern tidak auto-garis.
- **Tanpa CSS lain**: `<th>` dan `<td>` tampil **hampir sama** (bedanya cuma `<th>` default-nya **tebal** dan **center**, `<td>` default **regular** dan **left-align**).
- **Cara cepat biar keliatan**: tambah `border="1"` (HTML lawas) atau pakai CSS `border: 1px solid black` (best practice).

### Verifikasi

- [ ] `<table>` membungkus `<thead>`, `<tbody>`, `<tfoot>`
- [ ] `<thead>` berisi tepat satu `<tr>` dengan beberapa `<th>` (label kolom)
- [ ] **Hanya satu** `<thead>` per `<table>`
- [ ] Inspect Element: struktur pohon menunjukkan `table > thead > tr > th`

---

## Bagian C: `<tbody>` + `<tr>` + `<td>` untuk Data

### Penjelasan

`<tbody>` membungkus **semua baris data**. Tiap baris adalah `<tr>`. Tiap sel dalam baris adalah `<td>`.

**Rumus:** Tiap `<tr>` di dalam `<tbody>` harus punya **jumlah `<td>` yang sama** dengan jumlah `<th>` di `<thead>`. Kalau tidak, tabel jadi "berantakan" (ada kolom kosong di akhir / awal).

**Analogi:** Bayangkan **kolom-kolom bioskop**:
- `<thead>` = "Baris 1, 2, 3, 4, 5, 6, 7" (label baris)
- `<tbody>` = kursi-kursi di tiap baris (data)
- Tiap `<tr>` = satu baris (Row 1, Row 2, ...)
- Tiap `<td>` = satu kursi (kursi 1, kursi 2, ...)

### Kapan Pakai

- Setiap **baris data** = satu `<tr>`
- Setiap **sel data** dalam baris = satu `<td>`
- **Hapus `<td>` yang tidak ada datanya** — jangan biarkan `<td></td>` kosong kalau tidak perlu

### Kapan Jangan

- **Jangan** tulis `<td>` lebih atau kurang dari jumlah kolom header (misal header 5 kolom tapi baris cuma 4 `<td>`)
- **Jangan** pakai `<td>` di dalam `<thead>` (yang di header harus `<th>`)
- **Jangan** lupa tutup `</tr>`, `</tbody>`, `</table>`

### Pola Kode

```html
<table>
  <thead>
    <tr>
      <th>Hari</th>
      <th>Jam</th>
      <th>Mata Kuliah</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Senin</td>
      <td>08:00</td>
      <td>Algoritma</td>
    </tr>
    <tr>
      <td>Selasa</td>
      <td>10:00</td>
      <td>Basis Data</td>
    </tr>
    <!-- Tambah baris lain di sini -->
  </tbody>
</table>
```

### Yang Terjadi di Browser

- Tiap `<tr>` otomatis jadi **satu baris horizontal**
- Tiap `<td>` otomatis **satu sel** dalam baris itu
- Browser otomatis **menyamakan lebar kolom** dengan jumlah `<th>`/`<td>` terbanyak

### Verifikasi

- [ ] Minimal **5 baris data** (`<tr>` di dalam `<tbody>`)
- [ ] Tiap `<tr>` punya **jumlah `<td>` yang sama** dengan jumlah `<th>` di header
- [ ] Tiap `<td>` punya **tag penutup** `</td>`
- [ ] Inspect Element: count `<th>` di header = count `<td>` di tiap baris

---

## Bagian D: `colspan` untuk Merge Kolom Horizontal

### Penjelasan

`colspan="N"` artinya: **"Sel ini ambil N kolom horizontal"**. Dipakai ketika satu sel **mencakup beberapa kolom**.

**Analogi:** Di Excel, kamu klik kanan → "Format Cells" → "Merge Cells" → "Across". Hasilnya satu sel lebar.

**Kasus pakai:**
- Sel total di footer yang mencakup semua kolom: `<td colspan="5">Total: 10</td>`
- Sel header kelompok yang mencakup beberapa kolom: `<th colspan="2">Informasi Pribadi</th>`

### Kapan Pakai

- **Footer total** yang mencakup semua kolom
- **Sub-header** yang mengelompokkan beberapa kolom (misal: "Alamat" mencakup "Jalan, Kota, Kode Pos")

### Kapan Jangan

- **Jangan** pakai `colspan` untuk sekadar styling (misal "saya mau sel ini lebih lebar"). Itu tugas CSS (`width`).
- **Jangan** lupa kurangi jumlah `<td>` di baris itu. Kalau header 5 kolom dan kamu pakai `<td colspan="2">`, maka `<td>` berikutnya cuma boleh 3 (bukan 4).

### Pola Kode

```html
<table>
  <thead>
    <tr>
      <th>Hari</th>
      <th>Jam</th>
      <th>Mata Kuliah</th>
      <th>Ruang</th>
      <th>Dosen</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Senin</td>
      <td>08:00</td>
      <td>Algoritma</td>
      <td>301</td>
      <td>Dr. Andi</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <!-- 1 sel ini mencakup 5 kolom -->
      <td colspan="5">Total: 1 mata kuliah (contoh minimal)</td>
    </tr>
  </tfoot>
</table>
```

### Yang Terjadi di Browser

- Sel `<td colspan="5">` akan **membentang** selebar 5 kolom, dengan teks di tengah (default `<td>` adalah `text-align: left`, tapi `colspan` dengan teks singkat sering di-style center).
- Kolom-kolom di kanan "hilang" di baris ini karena sudah "dimakan" `colspan`.

### Aturan Penting (Sering Bikin Error)

Kalau `colspan="5"` di satu baris, dan baris lain punya 5 `<td>`, itu **OK**. Browser otomatis "menyelaraskan" keduanya.

Tapi kalau baris X pakai `colspan="3"` dan baris Y (di atas/bawahnya) tanpa `colspan`, hitung manual:
- Header: 5 kolom
- Baris X: `<td colspan="3">` + `<td>` + `<td>` = 3 + 1 + 1 = **5** ✓
- Baris Y: `<td>` × 5 = **5** ✓

### Verifikasi

- [ ] Minimal **1** penggunaan `colspan`
- [ ] `colspan` ada di `<th>` atau `<td>`
- [ ] Total "kolom efektif" tiap baris = jumlah `<th>` di header
- [ ] Inspect Element: klik kanan sel dengan `colspan` → "Computed" → lebar sel = jumlah kolom

---

## Bagian E: `rowspan` untuk Merge Baris Vertikal

### Penjelasan

`rowspan="N"` artinya: **"Sel ini ambil N baris vertikal"**. Dipakai ketika satu sel **mencakup beberapa baris**.

**Analogi:** Di Excel, merge cell **vertikal** (merge ke bawah).

**Kasus pakai:**
- Satu mata kuliah **praktikum 2 sesi** di jam yang sama → cell "Praktikum" `rowspan="2"`
- Hari yang sama dengan banyak jadwal → cell "Senin" `rowspan="3"`

### Kapan Pakai

- **Sesi yang sama** di berbagai ruangan (cell "Praktikum" yang sama untuk 2 baris)
- **Hari yang sama** dengan banyak slot (cell "Senin" mencakup beberapa `<tr>`)
- **Kategori yang berulang** (cell "Laki-laki" mencakup beberapa baris nama)

### Kapan Jangan

- **Jangan** pakai `rowspan` untuk styling saja
- **Jangan** lupa kurangi jumlah `<tr>` di kolom itu. Kalau kamu punya 5 baris dan 1 `<td rowspan="2">`, maka 4 `<tr>` berikutnya (di kolom yang sama) **tidak boleh** punya `<td>` di posisi yang sama.

### Pola Kode

```html
<table>
  <thead>
    <tr>
      <th>Hari</th>
      <th>Jam</th>
      <th>Mata Kuliah</th>
      <th>Ruang</th>
    </tr>
  </thead>
  <tbody>
    <!-- Baris 1-2: Praktikum (rowspan=2) -->
    <tr>
      <td rowspan="2">Senin</td>
      <td>08:00</td>
      <td>Praktikum Algoritma</td>
      <td>Lab 1</td>
    </tr>
    <tr>
      <!-- Kolom "Hari" sudah di-cover rowspan di atas -->
      <td>10:00</td>
      <td>Praktikum Basis Data</td>
      <td>Lab 2</td>
    </tr>
  </tbody>
</table>
```

### Yang Terjadi di Browser

- Sel `<td rowspan="2">` akan **membentang** setinggi 2 baris
- Baris berikutnya di kolom yang sama **tidak punya `<td>` di posisi itu** (karena sudah "dimakan" `rowspan`)

### Aturan Penting (Sering Bikin Error)

Kalau `rowspan="2"` di kolom 1, maka:
- Baris 1: `<td rowspan="2">` + `<td>` + `<td>` + `<td>` = 4 `<td>` total
- Baris 2: `<td>` + `<td>` + `<td>` = **3 `<td>` saja** (kolom 1 sudah di-cover)

Kalau kamu ketik 4 `<td>` di baris 2, browser bakal "geser" dan tabel jadi aneh.

### Verifikasi

- [ ] Minimal **1** penggunaan `rowspan`
- [ ] `rowspan` ada di `<th>` atau `<td>`
- [ ] Baris-baris setelah `<td rowspan="N">` punya **N-1 `<td>` lebih sedikit** di kolom itu
- [ ] Inspect Element: sel dengan `rowspan` terlihat **lebih tinggi** dari sel biasa

---

## Bagian F: `<tfoot>` untuk Rekapitulasi

### Penjelasan

`<tfoot>` membungkus baris **ringkasan** di bawah data: total, rata-rata, catatan, dll. Posisinya **di source code**: **setelah** `<tbody>` (meskipun secara visual di-render di bawah tabel).

**Catatan penting:** `<tfoot>` di **source code** harus **setelah** `<tbody>`, tapi browser **render-nya di bawah** tabel. Jangan bingung — itu fitur HTML5 untuk kepentingan **cetak** (kalau tabel di-print, `<tfoot>` akan diulang di tiap halaman sebagai footer).

### Kapan Pakai

- Total mata kuliah: "Total: 10 mata kuliah"
- Total SKS: "Total SKS: 18"
- Catatan kaki tabel: "Jadwal dapat berubah sewaktu-waktu"

### Kapan Jangan

- **Jangan** pakai `<tfoot>` untuk data biasa (taruh di `<tbody>`)
- **Jangan** lupa tutup `</tfoot>` sebelum `</table>`

### Pola Kode

```html
<table>
  <thead>...</thead>
  <tbody>
    <!-- baris-baris data -->
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">Total: 10 mata kuliah, 18 SKS</td>
    </tr>
  </tfoot>
</table>
```

### Verifikasi

- [ ] `<tfoot>` **setelah** `<tbody>` di source code (bukan di antara `<thead>` dan `<tbody>`)
- [ ] `<tfoot>` membungkus `<tr>` yang berisi `<td>` (atau `<th>`)
- [ ] Isi `<tfoot>` adalah rekapitulasi (total, rata-rata, catatan)

---

## Bagian G: Kapan JANGAN Pakai Tabel (Penting!)

### Penjelasan

HTML5 punya aturan keras: **`<table>` HANYA untuk data tabular** (data yang secara alami berbentuk baris × kolom). **Jangan** pakai `<table>` untuk layout.

### Contoh Salah: Pakai Tabel untuk Layout

```html
<!-- ❌ JANGAN: pakai tabel untuk layout 2 kolom -->
<table>
  <tr>
    <td>Sidebar di sini</td>
    <td>Konten utama di sini</td>
  </tr>
</table>
```

**Kenapa salah:**
- Screen reader akan membacakan: "Tabel 1: 1 baris, 2 kolom. Sel 1: Sidebar. Sel 2: Konten utama."
- Pengguna tunanetra akan **bingung** — mereka pikir ini data, bukan layout.
- Tidak responsive — di HP, tabel tidak otomatis stack ke bawah.
- Tidak fleksibel — kalau kamu mau ubah lebar kolom, harus ubah HTML.

### Contoh Benar: Pakai Tabel untuk Data

```html
<!-- ✅ BOLEH: pakai tabel untuk data tabular -->
<table>
  <thead>
    <tr>
      <th>Nama</th>
      <th>Nilai</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Andi</td>
      <td>85</td>
    </tr>
  </tbody>
</table>
```

**Kenapa benar:** Data ini memang baris × kolom. Tabel **menggambarkan** strukturnya.

### Cara Bedakan

Tanya: **"Apakah data ini bisa diekspor ke Excel / CSV dan tetap masuk akal?"**
- **Ya** → pakai `<table>` ✓
- **Tidak** (misal ini layout, sidebar, kartu) → pakai `<div>` + CSS Grid / Flexbox

### Verifikasi

- [ ] Tabel kamu **benar-benar** berisi data tabular (bukan layout)
- [ ] Tidak ada `<table>` untuk hal-hal yang seharusnya layout (sidebar, header 2 kolom, dll)

---

## Tabel Ringkasan: Kapan Pakai Tag Apa

| Kebutuhan | Tag yang Tepat | Catatan |
|---|---|---|
| Wadah seluruh tabel | `<table>` | Hanya untuk data tabular |
| Header baris (label kolom) | `<thead>` > `<tr>` > `<th>` | Tepat satu per tabel |
| Isi data | `<tbody>` > `<tr>` > `<td>` | Wajib |
| Footer / rekapitulasi | `<tfoot>` > `<tr>` > `<td>`/`<th>` | Setelah `<tbody>` di source |
| Merge kolom horizontal | `colspan="N"` | Di `<th>` atau `<td>` |
| Merge baris vertikal | `rowspan="N"` | Di `<th>` atau `<td>` |

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 04, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **W3C Validator PASS** — [validator.w3.org](https://validator.w3.org/)
- [ ] **Jumlah `<td>` tiap baris** konsisten (= jumlah `<th>` di header, atau sudah dihitung dengan `colspan`)
- [ ] **`colspan` & `rowspan` valid** — tidak ada baris yang "lebih" atau "kurang" sel
- [ ] **Struktur 3 lapis** ada: `<thead>`, `<tbody>`, `<tfoot>`
- [ ] **Browser menampilkan** tabel dengan baris dan kolom yang jelas (tambah `border="1"` kalau belum ada CSS)
- [ ] **Inspect Element** (F12): struktur pohon menunjukkan `table > thead + tbody + tfoot > tr > th/td`

---

## Cara Submit

1. Buka `code/03-tabel-jadwal.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. Verifikasi dengan checklist di atas
6. Kalau PASS, lanjut ke `soal/04-form-pendaftaran.md`

---

## Catatan Penting

> **`<table>` BUKAN untuk layout.** Ini aturan HTML5 yang sering dilanggar pemula. Pakai `<div>` + CSS Grid / Flexbox untuk layout. Pakai `<table>` HANYA untuk data tabular.
>
> **Jumlah `<td>` tiap baris HARUS konsisten.** Kalau tidak, browser "menebak" dan tabel jadi berantakan. Pakai `colspan`/`rowspan` untuk merge sel, **bukan** untuk menambah/kurangi jumlah sel seenaknya.
>
> **Tanpa CSS, tabel tidak terlihat seperti tabel.** Browser modern tidak auto-garis. Tambah `border="1"` di `<table>` (cara lama, valid) atau pakai CSS `border` (best practice).
>
> **`<tfoot>` di source code setelah `<tbody>`, tapi render di bawah.** Jangan bingung kalau kamu taruh `<tfoot>` di akhir kode — itu fitur HTML5, bukan error.
>
> **Tag `border="1"` itu HTML lawas, tapi masih valid.** Untuk sekarang boleh dipakai supaya tabel kelihatan. Nanti di LEVEL 2 kamu akan belajar styling tabel pakai CSS yang proper.

<!-- markdownlint-enable MD024 MD028 -->
