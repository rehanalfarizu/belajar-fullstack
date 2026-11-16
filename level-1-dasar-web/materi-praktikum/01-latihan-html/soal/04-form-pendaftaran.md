<!-- markdownlint-disable MD024 MD028 -->

# SOAL 04 — Form Pendaftaran dengan Input Standar

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membuat `<form>` dengan `action` dan `method`
- Memahami kenapa `<label>` **wajib** terkait dengan `<input>` (bukan cuma visual)
- Menggunakan berbagai `<input type>` standar: `text`, `email`, `password`, `number`, `date`, `tel`, `url`, `file`
- Menggunakan `<fieldset>` + `<legend>` untuk **mengelompokkan** field terkait
- Menggunakan `<select>` + `<option>` untuk dropdown
- Menggunakan `<textarea>` untuk teks panjang
- Membedakan `type="radio"` (pilih 1) vs `type="checkbox"` (pilih banyak)
- Menambahkan tombol `<button type="submit">` dan `<button type="reset">`

**Topik:** `<form>`, `<label>`, `<input>`, `<fieldset>`, `<legend>`, `<select>`, `<option>`, `<textarea>`, `<button>`, `radio`, `checkbox`

**Referensi utama:**

- [MDN: `<form>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/form)
- [MDN: `<input>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/input)
- [MDN: `<label>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/label)
- [MDN: `<fieldset>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/fieldset)

**Difficulty:** Pemula • **Estimasi:** 60-90 menit

---

### Overview Singkat Setiap Tag/Atribut (Baca Dulu Sebelum Mulai)

Sebelum masuk ke bagian A–H di bawah, pahami dulu logika singkat tiap elemen. Nanti di bagian A–H kita bahas lebih dalam dengan contoh kode.

**`<form>`** — *Wadah untuk semua input.* Ibarat **formulir kertas** di bank: kumpulan field yang isinya akan dikirim ke server saat tombol submit ditekan. HTML: `<form>` membungkus semua input + tombol submit.

**`action`** (atribut) — *URL tujuan pengiriman data.* Ibarat **"kirim ke mana?"** di formulir. Saat ini kita pakai `#` (artinya "kirim ke halaman ini sendiri") untuk latihan.

**`method`** (atribut) — *Cara pengiriman data.* `GET` (data terlihat di URL) atau `POST` (data di body request). Untuk formulir yang mengubah data (pendaftaran, login, beli), pakai `POST`.

**`<label>`** — *Label untuk input.* Ibarat **caption di samping kolom isian**. Klik label = klik input. `for` di label **harus cocok** dengan `id` di input. Wajib untuk aksesibilitas — tanpa label, screen reader tidak tahu input itu untuk apa.

**`<input>`** — *Satu field isian.* Ibarat **satu kotak isian** di formulir. Wujudnya bisa banyak: text box, password (dot), checkbox, radio, date picker, file picker, dll — ditentukan `type`.

**`type` (atribut `<input>`)** — *Bentuk field.* `text` = teks biasa, `email` = divalidasi format email, `password` = tersembunyi (titik-titik), `number` = angka, `date` = kalender, `radio` = bulat pilih 1, `checkbox` = kotak pilih banyak, `file` = upload.

**`name` (atribut)** — *Nama variabel untuk data.* Wajib untuk **setiap** input yang datanya mau dikirim ke server. Tanpa `name`, data input diabaikan saat submit.

**`placeholder` (atribut)** — *Teks contoh di dalam input (hilang saat diketik).* Ibarat **contoh tulisan** di formulir: "Tulis nama lengkap di sini". BUKAN pengganti label.

**`required` (atribut)** — *Field wajib diisi.* Browser akan menolak submit jika field kosong. Ditandai dengan `*` merah (kalau di-style).

**`<fieldset>`** — *Wadah untuk mengelompokkan field yang berkaitan.* Ibarat **kotak mengelilingi** beberapa field di formulir kertas. Visual default: border + sedikit margin.

**`<legend>`** — *Judul untuk fieldset.* Ibarat **judul section** di dalam formulir: "Data Pribadi", "Informasi Tambahan". Wajib di dalam `<fieldset>` dan jadi `<legend>` pertama.

**`<select>` + `<option>`** — *Dropdown.* Ibarat **kotak pilih** di formulir kertas: klik → daftar opsi muncul → pilih satu. `<select>` = wadah, `<option>` = tiap pilihan.

**`<textarea>`** — *Input teks multi-baris.* Ibarat **kotak komentar** yang bisa ditulis panjang. Berbeda dari `<input type="text">` (cuma 1 baris).

**`type="radio"`** — *Pilih SATU dari beberapa opsi.* Lingkaran, saling eksklusif dalam satu grup (otomatis dikelompokkan berdasarkan `name` yang sama).

**`type="checkbox"`** — *Pilih BANYAK opsi.* Kotak, independen (masing-masing punya `name` sendiri atau `name="hobi[]"` untuk array).

**`<button>`** — *Tombol.* `type="submit"` untuk kirim form, `type="reset"` untuk kosongkan, `type="button"` untuk aksi custom (JS).

---

## Briefing

Bayangkan kamu membuat **halaman pendaftaran online** untuk sebuah workshop coding. Peserta harus mengisi data diri (nama, email, password), data tambahan (jurusan, alamat, foto), dan preferensi (hobi, jenis kelamin). Formulir ini harus **rapi** (dikelompokkan per kategori), **wajib** divalidasi untuk field penting, dan **siap mengirim** data ke server (kita belum belajar server, tapi struktur form-nya harus benar).

Yang akan kamu bangun bukan cuma "kotak-kotak input", tapi formulir yang **punya makna** (label terkait dengan benar, field dikelompokkan, data siap dikirim), **ramah untuk tunanetra** (semua input punya label), dan **bisa divalidasi** oleh browser tanpa JavaScript.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Baca Kapan Pakai & Kapan Jangan** — supaya tidak salah pilih
3. **Lihat Yang Terjadi di Browser** — bayangkan output
4. **Ketik dari 0** di `code/04-form-pendaftaran.html`, cari `TODO(human)`, isi sendiri
5. **Verifikasi** dengan checklist per bagian

---

## Bagian A: Boilerplate + Judul Halaman

### Penjelasan

Standar sama seperti soal 01–03. Bedanya: di soal ini kita akan mulai dengan **banyak form**, bukan `<article>` atau `<table>`. Boilerplate tetap sama.

### Pola Kode

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulir Pendaftaran Workshop Coding</title>
  <meta name="description" content="Daftarkan dirimu untuk workshop coding gratis.">
</head>
<body>
  <h1>Formulir Pendaftaran</h1>
  <p>Silakan isi data dirimu di bawah ini.</p>
  <!-- form di sini -->
</body>
</html>
```

### Verifikasi

- [ ] Baris pertama `<!DOCTYPE html>`
- [ ] `<html lang="id">`
- [ ] `<title>` deskriptif
- [ ] Tepat satu `<h1>`

---

## Bagian B: `<form>` sebagai Wadah Formulir

### Penjelasan

`<form>` membungkus **seluruh** isian formulir. Saat tombol submit ditekan, browser **mengumpulkan semua data** di dalam `<form>` dan mengirim ke `action` dengan cara `method`.

**Analogi:** Bayangkan **map kuning** di kantor — semua dokumen formulir di dalamnya dikirim bersamaan saat ada perintah "kirim".

### Atribut Penting

| Atribut | Fungsi | Contoh |
|---|---|---|
| `action` | URL tujuan submit | `action="#"` (kirim ke halaman ini) atau `action="/api/daftar"` |
| `method` | Cara kirim | `method="POST"` (disarankan untuk form yang menambah data) atau `method="GET"` (data tampil di URL) |
| `novalidate` | Matikan validasi browser | `novalidate` (untuk testing, tanpa ini validasi otomatis aktif) |

### Kapan Pakai

- **Selalu** untuk kumpulan input yang akan dikirim ke server

### Kapan Jangan

- **Jangan** lupa `action` dan `method` — tanpa `action`, form tidak submit kemana-mana
- **Jangan** lebih dari satu `<form>` yang nested — boleh lebih dari satu `<form>` di halaman, tapi jangan `<form>` di dalam `<form>`

### Pola Kode

```html
<form action="#" method="POST">
  <!-- semua input di sini -->
</form>
```

### Yang Terjadi di Browser

- `<form>` **tidak punya visual** tanpa CSS — cuma kontainer transparan
- Saat tekan Enter di input, otomatis submit (kalau cuma ada 1 input text, atau 1 tombol submit)
- Tombol `<button type="submit">` di dalam `<form>` akan trigger submit saat diklik

### Verifikasi

- [ ] `<form>` membungkus semua input
- [ ] `action="#"` (placeholder, untuk latihan)
- [ ] `method="POST"` (untuk data yang mengubah state)
- [ ] Ada `</form>` di akhir

---

## Bagian C: `<fieldset>` + `<legend>` untuk Mengelompokkan Field

### Penjelasan

`<fieldset>` membungkus **kelompok field yang berkaitan** (misal: "Data Pribadi", "Informasi Tambahan"). `<legend>` adalah **judul** untuk fieldset itu.

**Analogi:** Formulir kertas sering punya **kotak-kotak** yang mengelilingi field terkait, dengan **judul** di atasnya. Itulah `<fieldset>` + `<legend>`.

### Kapan Pakai

- Form panjang dengan banyak field — kelompokkan per kategori
- Field yang punya "tema" sama (data diri, alamat, preferensi, dll)

### Kapan Jangan

- Untuk grouping **hanya** untuk styling — itu tugas `<div>` + CSS
- Jangan lupa `<legend>` di dalam `<fieldset>` — akan aneh tanpa judul

### Pola Kode

```html
<form action="#" method="POST">
  <fieldset>
    <legend>Data Pribadi</legend>
    <!-- field nama, email, dll -->
  </fieldset>

  <fieldset>
    <legend>Informasi Tambahan</legend>
    <!-- field alamat, foto, dll -->
  </fieldset>
</form>
```

### Yang Terjadi di Browser

- `<fieldset>` otomatis dapat **border** + **padding** (default browser)
- `<legend>` tampil di **atas border** fieldset (mirip label form)
- Screen reader membacakan: "Group: Data Pribadi" saat user masuk ke fieldset itu

### Verifikasi

- [ ] Minimal **2 `<fieldset>`** untuk grouping
- [ ] Tiap `<fieldset>` punya **tepat satu `<legend>`** (dan `<legend>` jadi child pertama)
- [ ] Field-field terkait dikelompokkan dalam `<fieldset>` yang sama

---

## Bagian D: `<label>` + `<input>` — Pasangan Wajib

### Penjelasan (Bagian PALING PENTING di Soal Ini)

`<label>` dan `<input>` adalah **pasangan yang tidak bisa dipisahkan**. Klik `<label>` = klik `<input>`. `for` di label **HARUS cocok** dengan `id` di input.

**Kenapa tidak bisa pisah?**
1. **Aksesibilitas**: screen reader membacakan label saat user masuk ke input. Tanpa label, user tunanetra tidak tahu harus isi apa.
2. **UX**: klik label = input fokus. Area klik lebih besar, terutama untuk checkbox/radio kecil.
3. **Validasi**: `placeholder` BUKAN label. Placeholder hilang saat user ngetik, dan screen reader tidak membacakannya.

**Analogi:** Bayangkan **kolom isian** di formulir kertas dengan **caption di sampingnya**: "Nama:", "Email:", "Password:". Caption = `<label>`, kolom = `<input>`.

### Atribut Wajib untuk Setiap Input

| Atribut | Fungsi | Wajib? |
|---|---|---|
| `id` | ID unik untuk label & JS | **Wajib** (kalau pakai label `for`) |
| `name` | Nama variabel untuk data submit | **Wajib** (kalau data mau dikirim) |
| `type` | Bentuk input | Default: `text` |
| `placeholder` | Contoh teks | Opsional |
| `required` | Wajib diisi | Opsional |
| `value` | Nilai default | Opsional |

### Kapan Pakai

- **Selalu** untuk setiap `<input>`, `<select>`, `<textarea>`

### Kapan Jangan

- **Jangan** lupa `for` di label cocok dengan `id` di input
- **Jangan** pakai `placeholder` saja tanpa `<label>` — itu bukan label
- **Jangan** duplikat `id` di halaman (setiap `id` harus unik)

### Pola Kode

```html
<!-- BENAR: label terkait dengan input via for/id -->
<label for="nama">Nama Lengkap:</label>
<input type="text" id="nama" name="nama" required placeholder="Contoh: Budi Santoso">

<!-- SALAH: input tanpa label -->
<input type="text" placeholder="Nama">

<!-- SALAH: for/id tidak cocok -->
<label for="email">Email:</label>
<input type="email" id="e-mail" name="email">
```

### Yang Terjadi di Browser

- Klik teks "Nama Lengkap:" → input nama fokus + cursor muncul
- Tab dari input sebelumnya → input nama fokus
- Screen reader: "Nama Lengkap, required, edit text" saat user masuk ke input
- Submit dengan field `required` kosong → browser munculkan error "Please fill out this field"

### Verifikasi

- [ ] Tiap `<input>` punya `<label for="...">` yang terkait
- [ ] Tiap `for` di label **persis sama** dengan `id` di input (case-sensitive!)
- [ ] Tiap `<input>` punya `id` **unik** (tidak duplikat)
- [ ] Tiap `<input>` punya `name` (untuk data submit)
- [ ] Tiap `id` di input hanya muncul 1 kali di seluruh halaman

---

## Bagian E: Input Types Standar

### Penjelasan

`type` menentukan **bentuk** dan **validasi otomatis** dari input. Setiap type punya kegunaan spesifik.

| `type` | Fungsi | Validasi Otomatis |
|---|---|---|
| `text` | Teks bebas (default) | Tidak ada |
| `email` | Alamat email | Harus ada `@` dan domain |
| `password` | Password (disembunyikan jadi •) | Tidak ada (tapi `minlength` bisa dipakai) |
| `number` | Angka (bisa min/max) | Harus angka |
| `date` | Tanggal (muncul date picker) | Harus format tanggal |
| `tel` | Nomor telepon | Tidak ada (pakai `pattern` untuk validasi) |
| `url` | URL website | Harus ada `http://` atau `https://` |
| `file` | Upload file | (tidak ada, tapi bisa `accept` filter) |
| `hidden` | Field tersembunyi | (tidak terlihat, tapi data tetap dikirim) |

### Kapan Pakai Tipe Apa

- **Nama** → `text`
- **Email** → `email` (bukan `text` — supaya ada validasi format)
- **Password** → `password` (supaya disembunyikan)
- **Umur** → `number` dengan `min`/`max`
- **Tanggal lahir** → `date`
- **Nomor HP** → `tel` + `pattern` (HTML5 tidak validasi otomatis tel)
- **Website/portfolio** → `url`
- **Upload foto** → `file` + `accept="image/*"`

### Pola Kode

```html
<label for="nama">Nama Lengkap:</label>
<input type="text" id="nama" name="nama" required minlength="3">

<label for="email">Email:</label>
<input type="email" id="email" name="email" required placeholder="nama@email.com">

<label for="password">Password:</label>
<input type="password" id="password" name="password" minlength="8">

<label for="umur">Umur:</label>
<input type="number" id="umur" name="umur" min="17" max="65">

<label for="tgl_lahir">Tanggal Lahir:</label>
<input type="date" id="tgl_lahir" name="tgl_lahir">

<label for="telepon">Nomor Telepon:</label>
<input type="tel" id="telepon" name="telepon" placeholder="08xxxxxxxxxx">

<label for="website">Website/Portfolio:</label>
<input type="url" id="website" name="website" placeholder="https://...">

<label for="foto">Upload Foto:</label>
<input type="file" id="foto" name="foto" accept="image/*">

<label for="form_id">Form ID (tersembunyi):</label>
<input type="hidden" id="form_id" name="form_id" value="workshop-2026">
```

### Yang Terjadi di Browser

- `type="email"` → keyboard HP muncul papan ketik dengan `@` lebih mudah
- `type="date"` → klik muncul date picker (kalender)
- `type="number"` → keyboard HP muncul numpad; spinner ↑↓ muncul
- `type="file"` → klik muncul file dialog
- `type="hidden"` → **tidak terlihat**, tapi datanya dikirim saat submit

### Verifikasi

- [ ] Minimal 8 tipe input yang berbeda digunakan (text, email, password, number, date, tel, url, file)
- [ ] Tiap input punya label & id & name
- [ ] `required` dipakai untuk field wajib (nama, email, password)
- [ ] `min`/`max` dipakai untuk `number` & `date`
- [ ] `accept` dipakai untuk `file`

---

## Bagian F: `<select>` + `<option>` untuk Dropdown

### Penjelasan

`<select>` = **dropdown box** — klik, daftar opsi muncul, pilih satu. `<option>` = **tiap pilihan** di dropdown.

**Analogi:** Bayangkan **combo box** di formulir kertas: "Jurusan: [Pilih Jurusan ▼]". Klik ▼ → daftar muncul → pilih.

### Kapan Pakai

- Pilihan dari **daftar tetap** (jurusan, kota, negara, mata kuliah, metode pembayaran)
- Pilihan yang **cuma boleh 1** (radio juga bisa, tapi dropdown lebih ringkas kalau opsi banyak)

### Kapan Jangan

- Untuk **pilihan yang cuma 2-3** — radio button lebih visual
- Untuk **pilihan yang boleh lebih dari 1** — pakai checkbox, bukan select (kecuali multiple select, tapi itu UX buruk)

### Pola Kode

```html
<label for="jurusan">Jurusan:</label>
<select id="jurusan" name="jurusan" required>
  <option value="">-- Pilih Jurusan --</option>
  <option value="informatika">Informatika</option>
  <option value="si">Sistem Informasi</option>
  <option value="dkv">Desain Komunikasi Visual</option>
  <option value="te">Teknik Elektro</option>
</select>
```

### Yang Terjadi di Browser

- Klik select → dropdown list muncul
- Opsi pertama (biasanya `-- Pilih Jurusan --`) adalah **default hint** — `value=""` supaya saat submit, server tahu user belum pilih (kalau `value=""` dihilangkan, opsi pertama otomatis dipilih)
- Pilih opsi → tampil di select, `value` yang dikirim

### Verifikasi

- [ ] Minimal 1 `<select>` dengan beberapa `<option>`
- [ ] Opsi pertama punya `value=""` (placeholder untuk "belum pilih")
- [ ] Tiap `<option>` punya `value` (untuk data submit)
- [ ] Select punya `<label for>`

---

## Bagian G: `<textarea>` untuk Teks Panjang

### Penjelasan

`<textarea>` = **input multi-baris**. Beda dari `<input type="text">` yang cuma 1 baris. Pakai `rows` dan `cols` untuk ukuran (best practice: pakai CSS, tapi `rows` tetap berguna untuk minimum height).

### Kapan Pakai

- Alamat lengkap (jalan, kota, provinsi, kode pos)
- Pesan / komentar / alasan
- Bio / deskripsi panjang

### Kapan Jangan

- Untuk 1-2 kata (cukup `text`)
- Untuk password (pakai `password`)

### Pola Kode

```html
<label for="alamat">Alamat Lengkap:</label>
<textarea id="alamat" name="alamat" rows="4" placeholder="Jalan, Kota, Provinsi, Kode Pos"></textarea>
```

### Yang Terjadi di Browser

- Textarea otomatis **bisa di-resize** (drag pojok kanan bawah)
- User bisa Enter untuk baris baru
- `rows` = tinggi minimum dalam baris (default 2)

### Verifikasi

- [ ] Minimal 1 `<textarea>` dengan `<label for>`
- [ ] `rows` diisi (misal 4) untuk tinggi yang reasonable
- [ ] Tidak lupa tutup `</textarea>`

---

## Bagian H: `radio` vs `checkbox` — Pilih 1 vs Pilih Banyak

### Penjelasan

| Tipe | Bisa Pilih Berapa | Tampilan | Kapan Pakai |
|---|---|---|---|
| `radio` | **1 saja** dalam satu grup | Lingkaran ○ | Jenis kelamin, tingkat pendidikan, metode pembayaran |
| `checkbox` | **Banyak** (independen) | Kotak ☐ | Hobi, skill, fitur yang diinginkan |

**Aturan penting untuk radio:**
- Semua radio dalam satu grup harus punya `name` yang **sama**
- Tiap radio harus punya `id` yang **berbeda** (untuk label)
- `value` menentukan nilai yang dikirim saat dipilih

**Aturan penting untuk checkbox:**
- Tiap checkbox bisa punya `name` sendiri (`hobi_coding`, `hobi_gaming`)
- Atau pakai array notation: `name="hobi[]"` untuk kirim banyak nilai sebagai array

### Kapan Pakai `radio`

- Mutually exclusive (saling eksklusif): "Laki-laki / Perempuan", "Ya / Tidak"
- Cuma boleh 1 jawaban dari beberapa opsi

### Kapan Pakai `checkbox`

- Independen: "Saya setuju S&K", "Subscribe newsletter"
- Boleh pilih banyak dari beberapa opsi: "Hobi: Coding, Gaming, Membaca"

### Kapan Jangan

- **Jangan** pakai `radio` jika user boleh pilih lebih dari 1
- **Jangan** pakai `checkbox` jika user hanya boleh pilih 1
- **Jangan** lupa `name` di radio (grup) atau di tiap checkbox (independen)

### Pola Kode

```html
<!-- RADIO: pilih 1 dari 3 -->
<p>Jenis Kelamin:</p>
<input type="radio" id="jk_l" name="jenis_kelamin" value="L" required>
<label for="jk_l">Laki-laki</label>
<input type="radio" id="jk_p" name="jenis_kelamin" value="P">
<label for="jk_p">Perempuan</label>

<!-- CHECKBOX: pilih banyak dari 4 -->
<p>Hobi:</p>
<input type="checkbox" id="hobi_coding" name="hobi[]" value="coding">
<label for="hobi_coding">Coding</label>
<input type="checkbox" id="hobi_gaming" name="hobi[]" value="gaming">
<label for="hobi_gaming">Gaming</label>
<input type="checkbox" id="hobi_membaca" name="hobi[]" value="membaca">
<label for="hobi_membaca">Membaca</label>
<input type="checkbox" id="hobi_olahraga" name="hobi[]" value="olahraga">
<label for="hobi_olahraga">Olahraga</label>
```

### Yang Terjadi di Browser

- **Radio**: klik salah satu → lingkaran terisi, **radio lain di grup yang sama otomatis kosong** (browser enforce mutual exclusion)
- **Checkbox**: klik → kotak tercentang, klik lagi → kosong. Tiap checkbox **independen**
- Submit form → radio kirim 1 nilai (`jenis_kelamin=L`), checkbox kirim banyak nilai sebagai array (`hobi[]=["coding", "gaming"]`)

### Verifikasi

- [ ] Minimal 1 grup `radio` (2-3 opsi, `name` sama, `id` beda)
- [ ] Minimal 1 grup `checkbox` (3+ opsi independen)
- [ ] Tiap radio/checkbox punya `<label for>`
- [ ] Tiap radio/checkbox punya `value` (data yang dikirim)

---

## Tabel Ringkasan: Kapan Pakai Tag/Atribut Apa

| Kebutuhan | Tag/Atribut | Catatan |
|---|---|---|
| Wadah formulir | `<form action method>` | action + method wajib |
| Kelompok field | `<fieldset>` + `<legend>` | Legend = judul kelompok |
| Label untuk input | `<label for="id">` | for HARUS cocok dengan id input |
| Input teks 1 baris | `<input type="text">` | Untuk nama, judul, dll |
| Input email | `<input type="email">` | Validasi otomatis format email |
| Input password | `<input type="password">` | Karakter disembunyikan |
| Input angka | `<input type="number" min max>` | Spinner ↑↓ |
| Input tanggal | `<input type="date">` | Date picker |
| Input telpon | `<input type="tel">` + `pattern` | Tidak ada validasi otomatis |
| Input URL | `<input type="url">` | Harus http:// atau https:// |
| Upload file | `<input type="file" accept>` | Filter tipe file |
| Dropdown | `<select>` + `<option>` | Pilihan dari daftar tetap |
| Teks panjang | `<textarea rows>` | Multi-baris |
| Pilih 1 dari banyak | `<input type="radio" name="sama">` | Mutual exclusion |
| Pilih banyak | `<input type="checkbox">` | Independen |
| Tombol submit | `<button type="submit">` | Kirim form |
| Tombol reset | `<button type="reset">` | Kosongkan form |
| Field wajib | `required` | Browser validasi otomatis |
| Panjang min | `minlength` | Untuk text, password |
| Batas nilai | `min`, `max` | Untuk number, date |
| Contoh teks | `placeholder` | BUKAN pengganti label |
| Filter file | `accept` | Untuk file input |
| Data submit | `name` | Wajib untuk semua input |

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 05, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **W3C Validator PASS** — [validator.w3.org](https://validator.w3.org/)
- [ ] **Semua `<input>` punya `<label for>`** — Inspect Element, count harus sama
- [ ] **Semua `for` cocok dengan `id`** — cek satu per satu
- [ ] **Semua `id` unik** di seluruh halaman
- [ ] **Semua input yang datanya mau dikirim punya `name`**
- [ ] Submit form kosong → browser munculkan error untuk field `required`
- [ ] Isi email salah (tanpa @) → submit ditolak
- [ ] Klik label "Laki-laki" → radio "Laki-laki" tercentang
- [ ] Pilih 2+ checkbox hobi → tidak konflik (berbeda dengan radio)
- [ ] Inspect Element: struktur `form > fieldset > [label + input]`

---

## Cara Submit

1. Buka `code/04-form-pendaftaran.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. Coba submit kosong → lihat error browser
6. Coba submit dengan data → lihat di URL (kalau method=GET) atau inspect network (POST)
7. Verifikasi dengan checklist di atas
8. Kalau PASS, lanjut ke `soal/05-halaman-portfolio.md`

---

## Catatan Penting

> **`<label for>` dan `<input id>` HARUS COCOK.** Ini sumber error #1 pemula. Cek satu per satu: `for="nama"` di label harus ada `<input id="nama">` di tempat lain. Huruf besar/kecil harus sama.
>
> **`placeholder` BUKAN pengganti label.** Placeholder hilang saat user ngetik, dan screen reader **tidak membacakannya** sebagai label. Selalu pakai `<label>`.
>
> **Radio button dengan `name` SAMA** otomatis jadi satu grup. Tidak perlu JavaScript untuk enforce "pilih 1".
>
> **Submit form belum mengirim data ke server** dengan `action="#"`. Kita akan belajar server (Node.js) di level selanjutnya. Untuk sekarang, fokus pada **struktur & validasi browser**.
>
> **Tanpa CSS, form akan terlihat berantakan** — semua input full-width, label di atas input. Itu normal dan bagian dari belajar. Styling form pakai CSS akan kita pelajari di LEVEL 2.

<!-- markdownlint-enable MD024 MD028 -->
