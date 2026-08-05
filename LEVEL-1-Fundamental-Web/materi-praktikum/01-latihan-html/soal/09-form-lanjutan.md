<!-- markdownlint-disable MD024 MD028 -->

# SOAL 09 — Form Lanjutan: HTML5 Input Types & Validasi Browser

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menggunakan **HTML5 input types** baru: `color`, `range`, `date`, `time`, `datetime-local`, `month`, `week`, `search`, `number`
- Memahami **validasi otomatis browser** tanpa JavaScript (HTML5 native validation)
- Menggunakan **validation attributes**: `required`, `minlength`, `maxlength`, `min`, `max`, `step`, `pattern`
- Memahami `pattern` (regex) untuk validasi custom
- Menggunakan `<datalist>` untuk **autocomplete suggestions**
- Menampilkan nilai `<output>` dari `<input type="range">`
- Memahami kapan validasi HTML5 **CUKUP** dan kapan **TIDAK CUKUP** (perlu server)

**Topik:** HTML5 input types, validation attributes, `pattern`, `<datalist>`, `<output>`, `novalidate`

**Referensi utama:**

- [MDN: HTML5 Input types](https://developer.mozilla.org/id/docs/Learn/Forms/HTML5_input_types)
- [MDN: Constraint validation](https://developer.mozilla.org/id/docs/Web/HTML/Constraint_validation)
- [MDN: `<datalist>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/datalist)
- [MDN: `<output>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/output)

**Difficulty:** Lanjut • **Estimasi:** 60-90 menit

---

### Overview Singkat Setiap Tag/Atribut (Baca Dulu Sebelum Mulai)

**HTML5 Validation** — *Validasi otomatis oleh browser (tanpa JavaScript).* Browser cek: apakah email valid? apakah tanggal di range yang benar? apakah pattern cocok? Jika tidak, browser munculkan error dan **blokir submit**.

**Kenapa validasi HTML5 penting:**
- UX: user langsung tahu error, tidak harus reload
- Hemat effort: tidak perlu JavaScript untuk validasi dasar
- Built-in: tidak perlu install library

**`<input type="color">`** — *Color picker.* User pilih warna dari color picker. Value = hex color (`#rrggbb`).

**`<input type="range">`** — *Slider.* User geser slider untuk pilih nilai dalam range. Value = angka. Pakai `<output>` untuk **tampilkan nilai live**.

**`<input type="date">`** — *Date picker.* Klik muncul kalender. Value = `YYYY-MM-DD`. Plus `min` / `max` untuk batas.

**`<input type="time">`** — *Time picker.* Value = `HH:MM` (24-jam).

**`<input type="datetime-local">`** — *Tanggal + waktu (tanpa timezone).* Value = `YYYY-MM-DDTHH:MM`.

**`<input type="month">`** — *Bulan + tahun.* Value = `YYYY-MM`. Misal: `2026-05`.

**`<input type="week">`** — *Minggu ke- dalam tahun.* Value = `YYYY-Www`. Misal: `2026-W20` = minggu ke-20 tahun 2026.

**`<input type="search">`** — *Search box.* Mirip `text` tapi dengan tombol clear (X) di kanan (tidak semua browser).

**`<input type="number">`** — *Angka.* Plus `min`, `max`, `step`. Browser tampilkan spinner ↑↓. Step = increment tiap klik spinner.

**`required`** — *Field wajib diisi.* Browser blokir submit jika kosong. **Boolean attribute**: cukup tulis `required` (tanpa value).

**`minlength` / `maxlength`** — *Panjang minimum/maksimum karakter (untuk `text`, `password`, `textarea`).* Browser error jika kurang/lebih.

**`min` / `max`** — *Nilai minimum/maksimum (untuk `number`, `date`, `time`, `range`).* Browser error jika di luar range.

**`step`** — *Increment.* Untuk `number`: `step="2"` = hanya bilangan genap. Untuk `range`: `step="0.5"` = increment 0.5.

**`pattern`** — *Regex untuk validasi custom.* Misal: `pattern="08[0-9]{8,11}"` = nomor HP Indonesia. Browser error jika tidak match.

**`<datalist>`** — *Daftar suggestion untuk autocomplete.* Pakai `list="id-datalist"` di input. User bisa ketik manual ATAU pilih dari list.

**`<output>`** — *Tampilkan hasil kalkulasi / nilai dinamis.* Sering dipakai dengan `<input type="range">` untuk tampilkan nilai slider secara live. Butuh JavaScript untuk update value.

**`novalidate` (form)** — *Matikan validasi browser.* Untuk testing — tanpa ini validasi otomatis aktif dan submit dengan field kosong akan ditolak.

---

## Briefing

Bayangkan kamu membuat **formulir pendaftaran event** yang panjang dan kaya. Peserta harus mengisi: data pribadi (nama, email, HP), preferensi (warna favorit, rating event), jadwal yang tersedia, dan info tambahan (kode pos, foto, komentar).

Formulir ini harus **bisa divalidasi tanpa JavaScript** — browser cukup pintar untuk cek email format, range tanggal, dan pattern telepon. Tugas kita: **tulis HTML yang valid** dan biarkan browser yang validasi.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Baca Kapan Pakai & Kapan Jangan** — supaya tidak salah pilih
3. **Lihat Yang Terjadi di Browser** — bayangkan output
4. **Ketik dari 0** di `code/09-form-lanjutan.html`, cari `TODO(human)`, isi sendiri
5. **Verifikasi** dengan checklist per bagian

---

## Bagian A: Boilerplate + `<form>` dengan `novalidate` (untuk Testing)

### Penjelasan

Untuk **testing**, kita pakai `novalidate` di `<form>` agar browser **tidak** memvalidasi otomatis dulu. Setelah yakin HTML benar, kita **hapus** `novalidate` untuk mengaktifkan validasi.

### Pola Kode

```html
<form action="#" method="POST" novalidate>
  <!-- semua input + tombol submit/reset -->
</form>
```

### Verifikasi

- [ ] `<form>` punya `action="#"` + `method="POST"`
- [ ] `novalidate` (sementara) untuk testing
- [ ] Akan **dihapus** di akhir untuk aktifkan validasi

---

## Bagian B: `<fieldset>` + `<legend>` untuk Mengelompokkan (Review)

### Penjelasan

Form panjang butuh pengelompokkan. Pakai `<fieldset>` + `<legend>` (sudah dibahas di soal 04). 3 fieldset ideal: **Data Pribadi**, **Preferensi**, **Informasi Tambahan**.

### Verifikasi

- [ ] Minimal 3 `<fieldset>` dengan `<legend>`

---

## Bagian C: Input Types Dasar (Review)

### Penjelasan + Pola Kode

| Type | Kode | Fungsi |
|---|---|---|
| `text` | `<input type="text" name="nama" minlength="3" required>` | Teks biasa (nama) |
| `email` | `<input type="email" name="email" required>` | Email (validasi otomatis ada @) |
| `password` | `<input type="password" name="password" minlength="8" required>` | Password disembunyikan |
| `tel` | `<input type="tel" name="telepon" pattern="08[0-9]{8,11}" required>` | Telepon (pakai pattern untuk validasi) |
| `url` | `<input type="url" name="website" placeholder="https://...">` | URL (validasi otomatis http://) |

**Tentang `pattern="08[0-9]{8,11}"`:**
- `08` — harus diawali "08"
- `[0-9]{8,11}` — lalu 8 sampai 11 digit angka
- Total panjang: 10-13 karakter
- Contoh valid: `081234567890`, `08123456789`
- Contoh invalid: `1234567890` (tidak diawali 08), `0812345` (terlalu pendek)

### Verifikasi

- [ ] Semua input types dasar ada (text, email, password, tel, url)
- [ ] `required` di field wajib
- [ ] `minlength` di password
- [ ] `pattern` di tel

---

## Bagian D: Input Types HTML5 Baru

### Penjelasan

HTML5 menambah banyak input type baru yang punya UI khusus. Tiap type punya **kegunaan spesifik** — tidak bisa asal pilih.

### `<input type="color">`

Pilih warna dari color picker. Value = hex color (misal `#ff0000`).

```html
<label for="warna">Warna Favorit:</label>
<input type="color" id="warna" name="warna" value="#3b82f6">
```

**Kapan Pakai:** Theme picker, form preferensi warna, design tool.

### `<input type="range">` + `<output>`

Slider. Tampilkan nilai live dengan `<output>` (butuh JavaScript minimal).

```html
<label for="rating">Rating (1-10): <output id="rating-val">5</output></label>
<input type="range" id="rating" name="rating" min="1" max="10" value="5" step="1"
       oninput="rating-val.value = this.value">
```

**Yang terjadi di browser:**
- Slider muncul, default value 5
- Geser → value berubah
- JavaScript `oninput` update `<output>` agar nilai tampil
- Submit → value dikirim sebagai angka

**Kapan Pakai:** Rating, volume, brightness, slider preferensi.

### `<input type="datetime-local">`

Pilih tanggal + waktu (tanpa timezone). Value = `YYYY-MM-DDTHH:MM`.

```html
<label for="appointment">Tanggal & Waktu Appointment:</label>
<input type="datetime-local" id="appointment" name="appointment">
```

**Kapan Pakai:** Booking appointment, schedule meeting.

### `<input type="month">`

Pilih bulan + tahun. Value = `YYYY-MM`. Misal `2026-05`.

```html
<label for="bulan_lahir">Bulan & Tahun Lahir:</label>
<input type="month" id="bulan_lahir" name="bulan_lahir" min="1940-01" max="2010-12">
```

**Kapan Pakai:** Birth month, expiration month (kartu), report period.

### `<input type="week">`

Pilih minggu ke- dalam tahun. Value = `YYYY-Www`. Misal `2026-W20`.

```html
<label for="minggu">Minggu Ke:</label>
<input type="week" id="minggu" name="minggu">
```

**Kapan Pakai:** Weekly report, schedule mingguan, planner.

### `<input type="time">`

Pilih waktu (24-jam). Value = `HH:MM`. Misal `09:00`, `14:30`.

```html
<label for="waktu">Waktu Preferensi:</label>
<input type="time" id="waktu" name="waktu" min="08:00" max="17:00">
```

**Kapan Pakai:** Jam kerja, jam buka toko, alarm.

### `<input type="number">` dengan `min`, `max`, `step`

Angka dengan spinner ↑↓. Step = increment.

```html
<label for="usia">Usia (1-100):</label>
<input type="number" id="usia" name="usia" min="1" max="100" step="1" required>
```

**Kapan Pakai:** Usia, jumlah barang, kuantitas, skor.

### `<input type="search">`

Search box. Mirip `text` tapi dengan tombol clear (X) di kanan (tidak semua browser).

```html
<label for="pencarian">Pencarian:</label>
<input type="search" id="pencarian" name="pencarian" list="saran-browser">
```

**Kapan Pakai:** Search bar, filter form.

### Verifikasi

- [ ] `type="color"` ada
- [ ] `type="range"` + `<output>` ada
- [ ] `type="datetime-local"` ada
- [ ] `type="month"` ada
- [ ] `type="week"` ada
- [ ] `type="time"` ada
- [ ] `type="number"` ada (di fieldset Informasi Tambahan, tidak duplicate dengan Bagian C)
- [ ] `type="search"` ada

---

## Bagian E: Validation Attributes

### Penjelasan

Validation attributes = **aturan validasi** yang kita tulis di HTML. Browser **otomatis** cek dan blokir submit jika tidak valid.

### Tabel Validation Attributes

| Atribut | Untuk Type | Cek |
|---|---|---|
| `required` | semua | Tidak boleh kosong |
| `minlength` | text, password, textarea | Panjang minimum karakter |
| `maxlength` | text, password, textarea | Panjang maksimum karakter |
| `min` | number, date, time, range | Nilai minimum |
| `max` | number, date, time, range | Nilai maksimum |
| `step` | number, range | Increment nilai |
| `pattern` | text, tel, email, url | Regex harus cocok |

### Kapan Pakai

- **Selalu** untuk data yang **penting & terstruktur** (email, tel, date, number)
- Untuk data yang **punya format spesifik** (kode pos, plat nomor, NIK)

### Kapan Jangan

- Jangan validasi yang **terlalu ketat** di client-side (misal: password harus mengandung 3 simbol + 2 angka + huruf besar) — itu UX buruk
- Validasi **kompleks tetap di server** (misal: "username sudah terpakai")

### Pola Kode

```html
<!-- required -->
<input type="text" name="nama" required>

<!-- minlength (untuk text) -->
<input type="password" name="password" minlength="8">

<!-- min/max (untuk number) -->
<input type="number" name="usia" min="1" max="100" step="1">

<!-- min/max (untuk date) -->
<input type="date" name="tanggal_event" min="2026-01-01" max="2026-12-31">

<!-- pattern (regex) -->
<input type="tel" name="telepon" pattern="08[0-9]{8,11}" title="Nomor HP Indonesia">

<!-- min/max (untuk time) -->
<input type="time" name="jam_kerja" min="08:00" max="17:00">
```

### Yang Terjadi di Browser

- Submit form dengan field kosong + `required` → browser munculkan **balloon message**: "Please fill out this field"
- Submit dengan `minlength="8"` + password 5 karakter → error: "Please lengthen this text to 8 characters or more"
- Submit dengan `type="email"` + "bukan-email" → error: "Please include an '@' in the email address"
- Submit dengan `pattern` tidak cocok → error: "Please match the requested format"

### Verifikasi

- [ ] `required` di field wajib
- [ ] `minlength` di password (minimal 8)
- [ ] `min` / `max` di number (1-100)
- [ ] `step` di number (1 untuk bilangan bulat)
- [ ] `pattern` di tel (regex HP Indonesia)
- [ ] `min` / `max` di date / time (kalau applicable)
- [ ] `title` di field dengan `pattern` (untuk hint)

---

## Bagian F: `<datalist>` untuk Autocomplete

### Penjelasan

`<datalist>` = **daftar suggestion** untuk input. User bisa **ketik manual** ATAU **pilih dari dropdown** suggestion. Beda dari `<select>` (select = wajib pilih, datalist = boleh ketik manual).

**Analogi:** Bayangkan **search box Google** — kamu bisa ketik manual, dan Google kasih suggestion. `<datalist>` = "search suggestion" untuk form.

### Kapan Pakai

- Browser / bahasa pemrograman / kota (kategori umum yang banyak)
- Tag / skill (untuk form user input)
- Daftar yang **cuma suggestion**, bukan **wajib**

### Kapan Jangan

- Untuk **pilihan tetap** yang **wajib dipilih** (pakai `<select>`)
- Untuk **puluhan** opsi (pakai autocomplete API dari library)

### Pola Kode

```html
<label for="browser">Browser Favorit:</label>
<input type="text" id="browser" name="browser" list="browser-list">
<datalist id="browser-list">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
  <option value="Opera">
</datalist>
```

### Yang Terjadi di Browser

- Klik input → dropdown suggestion muncul
- Ketik → suggestion filter sesuai ketikan
- Pilih suggestion → value masuk ke input
- Submit → value yang diketik (atau dipilih) dikirim

### Verifikasi

- [ ] Minimal 1 `<datalist>` dengan beberapa `<option>`
- [ ] Input punya `list="id-datalist"`
- [ ] `id` di datalist cocok dengan `list` di input
- [ ] Tiap `<option>` punya `value`

---

## Bagian G: `<output>` untuk Tampilkan Nilai Dinamis

### Penjelasan

`<output>` = **tampilkan hasil** dari input atau kalkulasi. Sering dipakai dengan `<input type="range">` untuk **tampilkan nilai slider secara live**.

### Kapan Pakai

- Tampilkan nilai range slider
- Tampilkan hasil kalkulasi sederhana (perkalian, penjumlahan, dll)
- Tampilkan karakter count dari textarea

### Kapan Jangan

- Untuk data yang **statis** (pakai `<p>` atau `<span>`)
- Untuk kalkulasi **kompleks** (pakai JavaScript yang update ke DOM)

### Pola Kode (dengan JavaScript minimal)

```html
<label for="rating">Rating (1-10): <output id="rating-val">5</output></label>
<input type="range" id="rating" name="rating" min="1" max="10" value="5"
       oninput="document.getElementById('rating-val').value = this.value">
```

**Atau pakai event handler yang lebih clean:**
```html
<input type="range" id="rating" name="rating" min="1" max="10" value="5"
       oninput="rating_val.value = this.value">
<output id="rating_val">5</output>
```

**Penjelasan:** `oninput` adalah event handler yang jalan **setiap kali** value input berubah. Di sini, kita set `<output>` value = input value. `id` di output dan reference di `oninput` harus cocok.

### Yang Terjadi di Browser

- Geser slider → nilai di `<output>` update **real-time**
- Submit → value slider yang dikirim (value di `<output>` hanya display)

### Verifikasi

- [ ] `<output>` dipakai untuk range slider
- [ ] JavaScript `oninput` menghubungkan input dengan output
- [ ] `id` di output cocok dengan reference di `oninput`
- [ ] Test: geser slider → nilai di output berubah

---

## Bagian H: Atribut `accept` untuk File Input

### Penjelasan

`accept` = **filter tipe file** yang boleh di-upload. Misal `accept="image/*"` hanya izinkan gambar, `accept=".pdf,.doc"` hanya izinkan PDF/DOC.

### Pola Kode

```html
<label for="upload">Upload File:</label>
<input type="file" id="upload" name="upload" accept="image/*,.pdf">
```

**Format `accept`:**
- `image/*` — semua gambar
- `image/jpeg,image/png` — JPEG & PNG saja
- `.pdf,.doc,.docx` — extension tertentu
- `video/*` — semua video
- `audio/*` — semua audio

### Kapan Pakai

- **Selalu** untuk upload file (jangan biarkan user pilih file apapun)
- UX: filter mempercepat user pilih file yang benar

### Kapan Jangan

- Jangan `accept` **terlalu ketat** (misal: hanya `.jpg` padahal user punya `.jpeg`)
- Validasi **tetap di server** (user bisa bypass `accept` dengan rename file)

### Verifikasi

- [ ] `<input type="file">` punya `accept`
- [ ] `accept` sesuai dengan tipe file yang diharapkan (image/*, .pdf, dll)

---

## Bagian I: Tombol Submit & Reset

### Penjelasan

`<button>` (sudah dibahas di soal 04). `type="submit"` untuk kirim form, `type="reset"` untuk kosongkan.

### Pola Kode

```html
<button type="submit">Kirim</button>
<button type="reset">Reset</button>
```

### Kapan Pakai

- **Selalu** untuk tombol submit & reset di form

### Kapan Jangan

- `<button>` tanpa `type` di dalam `<form>` = **default type = "submit"** (tidak selalu jelas, jadi selalu tulis `type=`)

### Verifikasi

- [ ] `<button type="submit">` ada
- [ ] `<button type="reset">` ada
- [ ] Tiap `<button>` punya `type` yang eksplisit

---

## Bagian J: Test Validasi (Hapus `novalidate`!)

### Penjelasan

Setelah yakin HTML benar, **hapus `novalidate`** untuk aktifkan validasi browser. Test dengan sengaja input data salah.

### Cara Test

1. Hapus `novalidate` di `<form>`
2. Buka di browser
3. Coba submit dengan **semua field kosong** → browser munculkan error untuk field `required`
4. Coba submit dengan **email tanpa @** → error
5. Coba submit dengan **telepon tanpa 08** → error
6. Coba submit dengan **usia 150** → error (di luar 1-100)
7. Coba submit dengan **password 3 karakter** → error (kurang dari minlength 8)
8. Inspect Element → lihat pseudo-class `:valid` (border hijau) dan `:invalid` (border merah)

### Verifikasi

- [ ] `novalidate` **dihapus**
- [ ] Submit kosong → error
- [ ] Submit dengan format salah → error
- [ ] Inspect Element: lihat `:valid` / `:invalid` pseudo-classes
- [ ] Submit dengan data benar → form submit (URL jadi `?field=value&...` kalau method=GET)

---

## Tabel Ringkasan

| Kebutuhan | Tag/Atribut | Catatan |
|---|---|---|
| Wajib diisi | `required` | Boolean attribute |
| Panjang min teks | `minlength` | Untuk text, password, textarea |
| Panjang max teks | `maxlength` | Untuk text, password, textarea |
| Batas nilai | `min`, `max` | Untuk number, date, time, range |
| Increment | `step` | Untuk number, range |
| Format custom | `pattern` (regex) | Untuk text, tel, password |
| Hint pattern | `title` | Ditampilkan saat hover error |
| Autocomplete | `<datalist>` + `list` | Suggestion, boleh ketik manual |
| Live value | `<output>` | Tampilkan nilai range |
| Color picker | `type="color"` | Value hex |
| Slider | `type="range"` | Plus min, max, step |
| Date picker | `type="date"` | Plus min, max |
| Time picker | `type="time"` | Plus min, max |
| Date + time | `type="datetime-local"` | Tanpa timezone |
| Month picker | `type="month"` | YYYY-MM |
| Week picker | `type="week"` | YYYY-Www |
| Search box | `type="search"` | Tombol clear (terbatas) |
| Filter file | `accept` | Untuk type="file" |
| Matikan validasi | `novalidate` di form | Untuk testing |
| Lihat valid state | `:valid`, `:invalid` CSS | Untuk styling |

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] **W3C Validator PASS** — [validator.w3.org](https://validator.w3.org/)
- [ ] **`novalidate` sudah dihapus** (untuk aktifkan validasi)
- [ ] **Submit kosong** → error untuk semua `required`
- [ ] **Email tanpa @** → error
- [ ] **Telepon tanpa 08** → error
- [ ] **Usia 150 (di luar 1-100)** → error
- [ ] **Password 3 karakter (kurang dari minlength 8)** → error
- [ ] **Inspect Element** → lihat `:valid` / `:invalid` (border hijau/merah)
- [ ] **Geser range slider** → nilai di `<output>` update real-time
- [ ] **Klik input dengan datalist** → suggestion muncul
- [ ] **Semua `<input>` punya `<label for>`**

---

## Cara Submit

1. Buka `code/09-form-lanjutan.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. **Sementara** pakai `novalidate` untuk testing
4. Save, buka di browser
5. Cek visual: range slider ada, color picker ada, date picker ada
6. **Hapus `novalidate`**
7. **Test validasi**: submit kosong / format salah → error browser
8. Inspect Element → lihat `:valid` / `:invalid`
9. Verifikasi dengan checklist di atas
10. Kalau PASS, lanjut ke `soal/10-document-flow.md`

---

## Catatan Penting

> **Validasi HTML5 adalah UX enhancement, BUKAN keamanan.** Server WAJIB validasi ulang. User bisa bypass validasi client dengan: (1) disable JavaScript, (2) edit HTML via DevTools, (3) kirim request langsung ke server (Postman, curl). Anggap validasi client = "penjaga gerbang pertama" saja.
>
> **`pattern` itu sulit.** Regex butuh latihan. Mulai dari yang sederhana: `pattern="[0-9]{5}"` (kode pos 5 digit), `pattern="[A-Z]{1,2} [0-9]{1,4}"` (plat nomor sederhana). Test dengan [regex101.com](https://regex101.com/).
>
> **`title` di field dengan `pattern`** = hint yang muncul saat hover error. Misal: `pattern="08[0-9]{8,11}" title="Nomor HP Indonesia dimulai dengan 08"`. User langsung tahu format yang diharapkan.
>
> **`<output>` butuh JavaScript untuk update.** HTML5 belum otomatis update `<output>` saat range slider berubah. Kita pakai event handler `oninput` (sederhana) atau JavaScript terpisah (cleaner).
>
> **`font-size: 16px` di input** mencegah iOS auto-zoom saat input fokus. Itu CSS, tapi penting untuk UX mobile. Kita akan pelajari styling di LEVEL 2.
>
> **`novalidate` HANYA untuk testing.** Jangan lupa hapus di production. Form tanpa validasi = user bisa submit data kacau, server harus handle manual.

<!-- markdownlint-enable MD024 MD028 -->
