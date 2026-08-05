<!-- markdownlint-disable MD024 MD028 -->

# SOAL 01 — Kalkulator Sederhana

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menggunakan `prompt` dan `console.log` untuk interaksi dasar dengan user di CLI/browser
- Memahami variabel (`let`/`const`) dan tipe data primitif (number, string)
- Menggunakan operator aritmatika (`+`, `-`, `*`, `/`, `%`) untuk melakukan kalkulasi
- Mengkonversi string ke number dengan `parseFloat` dan memvalidasi dengan `isNaN`
- Menggunakan `if/else if/else` (atau `switch`) untuk membuat percabangan logika
- Menangani edge cases: pembagian dengan 0, operator tidak valid, input NaN

**Topik:** variabel, operator aritmatika, `parseFloat`, `isNaN`, `if/else`, `switch`, input/output

**Referensi utama:**

- [MDN: if...else](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN: parseFloat](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
- [MDN: isNaN](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Global_Objects/isNaN)
- [MDN: switch](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Statements/switch)

**Difficulty:** Mudah • **Estimasi:** 20-30 menit

---

## Briefing

Buat program kalkulator yang meminta user memasukkan 2 angka dan 1 operator, lalu menampilkan hasilnya. Program harus menangani kasus-kasus khusus seperti pembagian dengan 0 dan operator tidak valid.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan & syarat** — pahami logika kalkulator dan edge cases yang harus ditangani
2. **Ketik dari 0** — buat file `01-kalkulator-sederhana.js`, ketik sendiri (JANGAN copy-paste)
3. **Verifikasi** — jalankan dengan `node 01-kalkulator-sederhana.js` dan cek semua output

Kamu **tidak akan diberi kode jadi**. Tujuannya agar kamu terbiasa **berpikir dan mengetik**, bukan menyalin. Ini skill paling penting untuk programmer.

---

## Deskripsi

Kalkulator CLI sederhana yang berjalan di browser atau Node.js.

---

## Syarat (Checklist)

### Input

- [ ] Ambil angka pertama dari user (`parseFloat`)
- [ ] Ambil operator dari user (`+`, `-`, `*`, `/`, `%`)
- [ ] Ambil angka kedua dari user (`parseFloat`)

### Proses (Percabangan)

- [ ] Gunakan `if/else if/else` atau `switch` untuk menentukan operasi
- [ ] Handle 5 operator: `+` (tambah), `-` (kurang), `*` (kali), `/` (bagi), `%` (modulus/sisa bagi)

### Handle Edge Cases

- [ ] Pembagian dengan 0 → tampilkan pesan error yang jelas
- [ ] Operator tidak valid → tampilkan pesan error
- [ ] Input bukan angka (NaN) → handle dengan `isNaN()`
- [ ] Format output yang rapi: `5 + 3 = 8`

### Output

- [ ] Tampilkan hasil dalam format: `angka1 operator angka2 = hasil`
- [ ] Tampilkan pesan error yang informatif jika ada masalah
- [ ] Minimum 2 angka desimal untuk hasil bagi

---

## Contoh Output

```
// Input: 10, +, 3
// Output: 10 + 3 = 13

// Input: 10, /, 3
// Output: 10 / 3 = 3.3333

// Input: 10, /, 0
// Output: Error: Pembagian dengan 0 tidak diperbolehkan!

// Input: 10, x, 3
// Output: Error: Operator 'x' tidak valid. Gunakan +, -, *, /, atau %
```

---

## Ringkasan: Cheat Sheet

**Input & Konversi:**

| Kebutuhan                     | Fungsi/Sintaks              |
| ----------------------------- | --------------------------- |
| Baca input dari user (browser) | `prompt("Masukkan angka")` |
| Konversi string ke float      | `parseFloat("3.14")` → 3.14 |
| Konversi string ke int        | `parseInt("42")` → 42       |
| Cek apakah NaN                | `isNaN("abc")` → `true`     |

**Operator Aritmatika:**

| Operator | Fungsi             | Contoh      |
| -------- | ------------------ | ----------- |
| `+`      | Tambah             | `5 + 3 = 8` |
| `-`      | Kurang             | `5 - 3 = 2` |
| `*`      | Kali               | `5 * 3 = 15`|
| `/`      | Bagi               | `10 / 3 = 3.33` |
| `%`      | Modulus (sisa bagi)| `10 % 3 = 1` |

**Percabangan (pilih salah satu):**

| Pola `if/else`                          | Pola `switch`                                    |
| --------------------------------------- | ------------------------------------------------ |
| `if (op === "+") { ... }`               | `switch (op) { case "+": ... break; }`           |
| `else if (op === "-") { ... }`          | Cocok untuk banyak kondisi dengan nilai tetap   |

**Validasi Wajib:**

- Cek `isNaN(angka1) || isNaN(angka2)` SEBELUM proses
- Cek `angka2 === 0` SEBELUM pembagian
- Cek operator dengan `default` (switch) atau `else` (if/else)

**Format Output:**

- Hasil: `${a} ${op} ${b} = ${hasil}`
- Error: `Error: <penjelasan>`
- Pembagi desimal: `hasil.toFixed(2)` → 2 angka di belakang koma

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 02, cek semua ini:

- [ ] Program bisa dijalankan tanpa error syntax
- [ ] **5 operator jalan benar**: `+`, `-`, `*`, `/`, `%` — masing-masing kasih output yang benar
- [ ] **Pembagian dengan 0** → muncul pesan error, BUKAN `Infinity` atau `NaN`
- [ ] **Operator tidak valid** (misal `x`, `?`, `abc`) → muncul pesan error yang informatif
- [ ] **Input bukan angka** (misal `abc`, `12abc`) → terdeteksi dengan `isNaN()`, bukan crash
- [ ] **Format output konsisten**: `angka1 operator angka2 = hasil`
- [ ] **Pembagian desimal** menampilkan minimal 2 angka di belakang koma
- [ ] **Modulus (%)** jalan: `10 % 3` → `1`
- [ ] **Tidak ada pembagian dengan 0 yang lolos** (cek logika kondisionalnya)
- [ ] **Output rapi**: tidak ada spasi aneh, tanda kutip nyangkut, atau format berantakan

---

## Cara Submit

1. Simpan sebagai `01-kalkulator-sederhana.js`
2. Jalankan dengan `node 01-kalkulator-sederhana.js` (Node.js) atau buka di browser
3. Coba semua operator: `+`, `-`, `*`, `/`, `%`
4. Coba bagi dengan 0
5. Coba masukkan operator tidak valid
6. Coba masukkan huruf sebagai angka

---

## Catatan untuk Pemula

- `parseFloat("3.14")` → `3.14` (desimal)
- `parseInt("42")` → `42` (integer)
- `10 % 3` → `1` (sisa bagi 10 dibagi 3)
- `isNaN("abc")` → `true` (bukan angka)
- `isNaN(NaN)` → `true`
- `===` (strict equality) SELALU lebih baik dari `==`

> **Jebakan umum #1: `parseFloat` vs operator `+`.** Kalau kamu pakai `+input`, JavaScript akan berusaha konversi — tapi `"3.14abc" + 5` jadi `"3.14abc5"` (string concatenation). Selalu pakai `parseFloat` + `isNaN` untuk validasi yang aman.
>
> **Jebakan umum #2: lupa cek pembagian 0.** `10 / 0` di JavaScript menghasilkan `Infinity`, bukan error. Kamu HARUS cek manual `if (b === 0)` sebelum pembagian.
>
> **Jebakan umum #3: `==` vs `===`.** `==` melakukan konversi tipe otomatis — ini sumber bug. Selalu pakai `===` (strict equality) untuk perbandingan yang aman.
>
> **Tips urutan kerja**: (1) handle input dulu, (2) validasi, (3) proses, (4) format output. Pola ini berlaku di hampir semua program yang menerima input dari user.

<!-- markdownlint-enable MD024 MD028 -->
