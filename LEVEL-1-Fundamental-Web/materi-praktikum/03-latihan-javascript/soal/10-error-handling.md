<!-- markdownlint-disable MD024 MD028 -->

# SOAL 10 — Error Handling

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Memahami kenapa error handling itu penting (kode tidak crash tiba-tiba)
- Menggunakan `try / catch / finally` untuk menangkap error
- Melempar error sendiri dengan `throw`
- Membuat **Custom Error Class** (`ValidationError`, `NotFoundError`) yang
  extends `Error`
- Menggunakan `instanceof` untuk membedakan tipe error
- Menangani error di fungsi `async` (Promise + `await`)
- Menulis kode yang "robus" (tahan banting) — tidak crash saat input jelek

**Difficulty:** Menengah • **Estimasi:** 45-60 menit

---

## Briefing

Bayangkan kamu bikin **sistem registrasi user** di website. User boleh ngisi
form: nama, email, password, usia. Masalahnya:

- User bisa ngisi email ngaco (`"bukan-email"`)
- User bisa ngisi usia `-5` atau `9999`
- User bisa ngisi password `"123"` (terlalu pendek, tidak ada huruf)
- Kadang API untuk ambil data user **down** atau **404**

Kalau kamu tidak handle error, program kamu bakal **crash** (berhenti mendadak)
dan user lihat layar putih atau pesan aneh. Itu **profesional banget kelihatannya
— bukan**.

Tugas kamu: bikin sistem validasi registrasi + fungsi ambil data user dari
API, lengkap dengan error handling yang rapi.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan** — pahami konsep error handling-nya
2. **Ketik dari 0** — buka `code/10-error-handling.js`, cari `TODO(human)`,
   lalu ketik sendiri (JANGAN copy-paste)
3. **Verifikasi** — cek dengan menjalankan file di Node.js

Kamu **tidak akan diberi kode jadi**. Tujuannya agar kamu terbiasa **berpikir
dan mengetik**, bukan menyalin.

Cara menjalankan kode:

```bash
cd code
node 10-error-handling.js
```

> **Tips**: Buka terminal di VS Code dengan `Ctrl + `` (backtick) atau
> `Cmd + `` di Mac. Biar kamu bisa langsung test kode tanpa keluar dari editor.

---

## Bagian A: Memahami Anatomi Error

### Penjelasan

Sebelum kita bisa "menangkap" error, kita harus tahu dulu **apa itu error** di
JavaScript.

**Error** adalah objek khusus yang punya 3 property penting:

- `name` — tipe error (misal: `TypeError`, `ReferenceError`, atau nama custom)
- `message` — pesan dalam bahasa manusia
- `stack` — jejak di mana error itu terjadi (lokasi file + baris)

Contoh error yang otomatis muncul waktu kamu salah kode:

```javascript
console.log(x); // ReferenceError: x is not defined
const y = null;
y.fala();       // TypeError: Cannot read properties of null
```

Saat error terjadi dan tidak ditangkap, program **berhenti** dan node cetak
stack trace merah di terminal.

### Wajib Ada di Kode Kamu

- Pemahaman bahwa `name`, `message`, dan `stack` adalah property error
- Keyakinan bahwa **error adalah hal normal** — bukan tanda kode kamu "jelek"

### Cara Mengetik dari 0

1. Di `code/10-error-handling.js`, scroll ke paling bawah
2. Di bagian `TEST`, coba **uncomment** salah satu baris yang error (misal
   baris yang `throw` di validasi)
3. Jalankan `node 10-error-handling.js`
4. **Perhatikan output merah** di terminal — itu stack trace

### Verifikasi

- [ ] Kamu pernah melihat output error merah di terminal
- [ ] Kamu bisa bedakan `name` (tipe), `message` (pesan), dan `stack` (lokasi)
- [ ] Kamu paham: tanpa `try/catch`, program **berhenti total** saat error

---

## Bagian B: Custom Error Classes

### Penjelasan

JavaScript punya banyak tipe error bawaan: `Error`, `TypeError`, `RangeError`,
`ReferenceError`. Tapi untuk aplikasi besar, kita butuh **error kita sendiri**
agar gampang dibedakan.

Caranya: buat **class** yang **extends** (turunan dari) `Error`. Ini OOP dasar:

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);            // panggil constructor parent
    this.name = "ValidationError"; // set nama error
  }
}
```

- `extends Error` artinya class ini mewarisi semua property/method dari `Error`
- `super(message)` memanggil constructor `Error` untuk set `message`
- `this.name = "ValidationError"` ngeganti `name` dari default `"Error"`
  jadi `"ValidationError"` — biar gampang dikenali

Dengan ini, di tempat lain kita bisa cek `if (err instanceof ValidationError)`
untuk tahu "oh ini error validasi, bukan error lain".

### Wajib Ada di Kode Kamu

- Class `ValidationError` extends `Error` dengan `name = "ValidationError"`
- Class `NotFoundError` extends `Error` dengan `name = "NotFoundError"` dan
  menerima parameter `resource` lalu format message: ``${resource} tidak ditemukan``
- `super(message)` dipanggil di constructor

### Cara Mengetik dari 0

1. Buka `code/10-error-handling.js`
2. Cari `TODO 1: Custom Error Classes`
3. **Hapus** `//` di depan tiap baris (uncomment)
4. **Ketik ulang** class `ValidationError` (jangan copy-paste dari komentar)
5. Lakukan hal yang sama untuk `NotFoundError`
6. Save file (`Cmd+S` / `Ctrl+S`)

### Verifikasi

- [ ] Tidak ada tanda `//` (komentar) di depan definisi class
- [ ] `class ValidationError extends Error {` ada
- [ ] `class NotFoundError extends Error {` ada
- [ ] Di tiap constructor, ada `super(message)` dan `this.name = "..."`
- [ ] `node 10-error-handling.js` tidak error di class ini (mereka baru
      "didefinisikan", belum dipakai — itu OK)

---

## Bagian C: Fungsi Validasi Tunggal

### Penjelasan

Sekarang kita bikin fungsi-fungsi yang **validasi input** dan **throw error**
kalau input tidak valid.

Prinsipnya: **fungsi yang menemukan masalah → throw error**. **Fungsi yang
menangkap masalah → try/catch**.

Contoh pattern:

```javascript
function validasiUsia(usia) {
  if (typeof usia !== "number" || isNaN(usia)) {
    throw new ValidationError("Usia harus angka");
  }
  if (usia < 0 || usia > 150) {
    throw new ValidationError(`Usia tidak valid: ${usia}`);
  }
  return true;
}
```

- Cek tipe dulu (jangan langsung cek nilai)
- Kalau invalid, **lempar** `ValidationError` dengan pesan spesifik
- Kalau valid, return `true` sebagai tanda "OK"

### Wajib Ada di Kode Kamu

- `validasiUsia(usia)` — cek tipe `number`, range `0-150`
- `validasiEmail(email)` — pakai regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- `validasiPassword(password)` — minimal 8 karakter, ada angka, ada huruf
- Semua throw `ValidationError` dengan pesan jelas

### Cara Mengetik dari 0

1. Cari `TODO 2: Validation Functions`
2. Uncomment `validasiUsia`, ketik ulang
3. Lanjut `validasiEmail` — pelajari regex-nya: `"huruf/angka + @ + huruf/angka + . + huruf/angka"`
4. Lanjut `validasiPassword` — tiga cek berurutan: panjang → ada angka → ada huruf
5. Save

> **Tips regex**: `[^\s@]+` artinya "satu atau lebih karakter yang BUKAN spasi dan BUKAN `@`". Simpelnya: regex ini validasi format email standar.

### Pola Kode

```javascript
function validasiSesuatu(input) {
  if (kondisiTidakValid) {
    throw new ValidationError("Pesan jelas untuk user");
  }
  return true; // tanda sukses
}
```

### Verifikasi

- [ ] Ketiga fungsi terdefinisi dan tidak di-comment
- [ ] `validasiUsia(25)` → return `true` (tidak throw)
- [ ] `validasiUsia(200)` → throw `ValidationError`
- [ ] `validasiEmail("a@b.com")` → return `true`
- [ ] `validasiEmail("bukan-email")` → throw
- [ ] `validasiPassword("pass1234")` → return `true`
- [ ] `validasiPassword("short")` → throw

> **Cara test cepat**: di paling bawah file, uncomment baris test satu per satu. Jalankan `node 10-error-handling.js` dan lihat apakah program berhenti di baris yang throw.

---

## Bagian D: try / catch / finally

### Penjelasan

Setelah tahu cara `throw`, sekarang kita **tangkap**:

```javascript
try {
  // kode yang "berisiko" error di sini
  const hasil = validasiUsia(200);
  console.log(hasil);
} catch (error) {
  // jalan kalau ada error di try
  console.error(`Gagal: ${error.message}`);
} finally {
  // SELALU jalan, error atau tidak
  console.log("Validasi selesai.");
}
```

Tiga blok:

- **`try`** — tempat kode yang mungkin error
- **`catch(error)`** — jalan **hanya kalau** ada error; `error` adalah objek
  error-nya
- **`finally`** — jalan **selalu** (error atau sukses); cocok untuk cleanup
  (misal: tutup file, stop loading spinner, tulis log)

### Wajib Ada di Kode Kamu

- Pemahaman alur `try → catch → finally`
- Keyakinan bahwa `finally` **pasti berjalan**, bahkan saat terjadi error

### Cara Mengetik dari 0

1. Di `TEST` section, **jangan uncomment** baris `validasiUsia(200);` dulu
2. Tulis kode uji cobamu sendiri di bawah, contoh:

```javascript
try {
  validasiUsia(200);
  console.log("Sukses");
} catch (err) {
  console.error(`Gagal: ${err.name} - ${err.message}`);
} finally {
  console.log("Validasi selesai.");
}
```

3. Run file, lihat output: harusnya `Gagal: ValidationError - Usia tidak valid: 200`
   lalu `Validasi selesai.`
4. Ganti `200` jadi `25` — `finally` tetap jalan, `catch` tidak

### Yang Terjadi

- Saat input valid: `try` selesai → `finally` jalan → `catch` dilewati
- Saat input invalid: `try` berhenti di baris throw → `catch` jalan →
  `finally` tetap jalan

### Verifikasi

- [ ] `try/catch/finally` dicoba di test
- [ ] Output menampilkan nama error + pesan saat input invalid
- [ ] `finally` jalan di **kedua kasus** (valid maupun invalid)

---

## Bagian E: Fungsi `validasiRegistrasi`

### Penjelasan

Di dunia nyata, user ngisi **satu form** dengan banyak field. Validasi tidak
boleh "berhenti di error pertama" — user harus tahu **semua errornya** sekaligus.

Misal: user ngisi email ngaco **dan** password kependekan. Kalau kamu cek
satu-satu dengan `throw` di fungsi terpisah, user cuma tahu errror pertama
saja. Setelah benerin email, dia submit lagi, baru tahu password juga salah.
**Buruk UX**.

Solusinya: kumpulkan semua error, **throw sekali** dengan pesan yang
mencantumkan semua masalah.

```javascript
function validasiRegistrasi(data) {
  const errors = [];
  try { validasiUsia(data.usia); } catch (e) { errors.push(e.message); }
  try { validasiEmail(data.email); } catch (e) { errors.push(e.message); }
  try { validasiPassword(data.password); } catch (e) { errors.push(e.message); }
  if (errors.length > 0) {
    throw new ValidationError(errors.join("; "));
  }
  return true;
}
```

Pola: **try kecil di tiap field → kumpulkan pesan → throw satu error besar**.

### Wajib Ada di Kode Kamu

- Fungsi `validasiRegistrasi(data)` menerima object `{ nama, email, password, usia }`
- Panggil tiap validasi individual dengan `try/catch` kecil
- Kumpulkan pesan error ke array
- Kalau ada error, throw `ValidationError` dengan pesan gabungan
- Kalau semua valid, return `true`

### Cara Mengetik dari 0

1. Cari `TODO 3: validasiRegistrasi`
2. Uncomment, lalu ketik ulang
3. Mulai dengan `const errors = [];`
4. Tambah blok `try/catch` untuk `validasiUsia`, `validasiEmail`,
   `validasiPassword`
5. Di akhir, cek `if (errors.length > 0)` lalu throw
6. Save

### Verifikasi

- [ ] `validasiRegistrasi({ nama: "Budi", email: "a@b.com", password: "pass1234", usia: 25 })` → return `true`
- [ ] Kalau ada satu field invalid, throw `ValidationError` dengan pesan
      spesifik field itu
- [ ] Kalau ada beberapa field invalid, throw dengan pesan yang menyebutkan
      **semua masalah** (dipisah `;`)

---

## Bagian F: Async Error Handling — `fetchUser`

### Penjelasan

Fungsi yang pakai `await` (async) bisa juga error. Contoh paling umum:
**fetch data dari API**. Kadang:

- Internet mati
- API mengembalikan 404 (data tidak ada)
- API mengembalikan 500 (server error)

Pattern async error handling **hampir sama** dengan sync — tetap pakai
`try/catch`. Bedanya, `await` "membuka" Promise jadi nilai biasa, dan kalau
Promise itu **reject**, `await` melempar error.

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    if (!response.ok) {
      throw new NotFoundError(`User id ${id}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof NotFoundError) {
      console.error(`404: ${error.message}`);
    } else {
      console.error(`Error umum: ${error.message}`);
    }
    throw error; // re-throw biar caller juga tahu
  }
}
```

Konsep kunci:

- `instanceof` — cek apakah error adalah instance dari class tertentu
- **re-throw** (`throw error`) — teruskan error ke caller setelah kamu log

### Wajib Ada di Kode Kamu

- Fungsi `async fetchUser(id)`
- `try` block berisi `await fetch(...)` + cek `response.status === 404`
- Throw `NotFoundError` kalau 404
- `catch` block dengan `instanceof NotFoundError` untuk log spesifik
- `throw error` di akhir catch (re-throw)

### Cara Mengetik dari 0

1. Cari `TODO 4: Async Error Handling`
2. Uncomment, ketik ulang
3. Perhatikan: `fetch` return `Promise` — `await` untuk ambil hasilnya
4. Cek `response.status === 404` sebelum parsing JSON
5. Di catch, **dua cabang**: khusus `NotFoundError` vs error lain
6. Akhiri dengan `throw error;` agar caller tahu ada masalah

### Verifikasi

- [ ] `fetchUser(1).then(console.log).catch(console.error)` tidak error saat run
- [ ] Untuk `id` yang tidak ada (misal `fetchUser(99999)`), log menampilkan
      `404: User id 99999 tidak ditemukan`
- [ ] Untuk error jaringan (matikan wifi saat test), log menampilkan
      `Error umum: ...`

> **Cara test offline**: Putus wifi sebentar, jalankan test `fetchUser(1)`. Akan dapat error jaringan.

---

## Bagian G: try / catch / finally di Async — `processWithLogging`

### Penjelasan

Pola `finally` juga jalan di fungsi `async`. Ini berguna banget untuk hal-hal
yang **harus dilakukan** apapun yang terjadi — misal: tulis log, stop loading
spinner, tutup koneksi database.

```javascript
async function processWithLogging(fn) {
  console.log("Memulai proses...");
  try {
    const result = await fn();
    console.log("Berhasil!");
    return result;
  } catch (error) {
    console.error(`Gagal: ${error.message}`);
  } finally {
    console.log("Proses selesai."); // SELALU jalan
  }
}
```

Pola ini sering dipakai untuk:
- **Logging** (catat awal/akhir proses)
- **Cleanup** (tutup resource)
- **UI feedback** (sembunyikan loading spinner apapun hasilnya)

### Wajib Ada di Kode Kamu

- `async function processWithLogging(fn)` yang menerima fungsi async lain
- `console.log("Memulai proses...")` **sebelum** `try` (atau di awal try)
- Di `try`: `await fn()` lalu log sukses + return
- Di `catch`: log error
- Di `finally`: log `"Proses selesai."`

### Cara Mengetik dari 0

1. Cari `TODO 5: try/catch/finally pattern`
2. Uncomment, ketik ulang
3. Perhatikan: `fn` adalah parameter fungsi — bisa diisi fungsi async apapun
4. `try` untuk eksekusi, `catch` untuk error, `finally` untuk "tutup log"
5. Save

### Verifikasi

- [ ] Panggil `processWithLogging(() => Promise.resolve("OK"))` → log:
      `Memulai proses...`, `Berhasil!`, `Proses selesai.`
- [ ] Panggil `processWithLogging(() => Promise.reject(new Error("Fail")))` → log:
      `Memulai proses...`, `Gagal: Fail`, `Proses selesai.` (finally tetap
      jalan!)

---

## Bagian H: Menyusun Tes Menyeluruh

### Penjelasan

Setelah semua fungsi jadi, kita butuh **tes menyeluruh** untuk memastikan
semua jalan benar. Tes yang baik mencakup:

- **Valid case** — input benar, harus return `true` atau data
- **Invalid case** — input salah, harus throw dengan tipe error yang tepat
- **Async case** — API sukses dan API gagal

### Wajib Ada di Kode Kamu

- Tes untuk `validasiUsia(25)` (valid) dan `validasiUsia(200)` (invalid)
- Tes untuk `validasiEmail("a@b.com")` (valid) dan `validasiEmail("bukan-email")` (invalid)
- Tes untuk `validasiPassword("pass1234")` (valid) dan `validasiPassword("short")` (invalid)
- Tes untuk `validasiRegistrasi` dengan semua field valid
- Tes untuk `validasiRegistrasi` dengan satu field invalid
- Tes untuk `fetchUser(1)` (kalau mau test async, hapus comment-nya)
- Tes untuk `processWithLogging` (dengan sukses dan gagal)

### Cara Mengetik dari 0

1. Scroll ke bagian `TEST` di akhir file
2. **Uncomment** semua baris tes satu per satu
3. Untuk baris yang `throw` (invalid case), **bungkus** dengan `try/catch`
   kalau kamu mau program lanjut ke tes berikutnya
4. Jalankan `node 10-error-handling.js`
5. Pastikan tidak ada error tak terduga (selain yang memang di-throw dan
   ditangkap)

> **Tips**: Kalau baris yang `throw` tidak dibungkus try/catch, program **berhenti di situ**. Itu bagus untuk belajar — kamu lihat persis di mana errornya. Untuk test semua sekaligus, bungkus dengan try/catch.

### Verifikasi

- [ ] Semua baris test ter-uncomment (atau yang memang sengaja di-comment)
- [ ] Program jalan sampai akhir (kalau baris throw di-bungkus try/catch)
- [ ] Output sesuai ekspektasi untuk tiap kasus

---

## Ringkasan

Yang sudah kamu pelajari di soal ini:

- `Error` adalah objek dengan `name`, `message`, `stack`
- `throw new Error("...")` melempar error; program berhenti di situ
- `try { } catch (e) { }` menangkap error; program lanjut ke baris setelah
  `catch`
- `finally { }` selalu jalan, error atau tidak — cocok untuk cleanup
- Custom Error Class: `class XxxError extends Error { ... }` dengan
  `super(message)` dan `this.name = "XxxError"`
- `instanceof` untuk cek tipe error
- Fungsi `async` pakai `try/catch` yang sama, dengan `await` di dalam `try`
- `throw error` di catch untuk re-throw ke caller
- Pola: kumpulkan semua error validasi di array, throw sekali dengan pesan
  gabungan
- `finally` di async function berguna untuk logging & cleanup

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 11, cek semua ini:

- [ ] **Class `ValidationError` dan `NotFoundError`** ada dan extends `Error`
- [ ] **Tiga fungsi validasi** (`validasiUsia`, `validasiEmail`,
      `validasiPassword`) ada dan throw `ValidationError` saat invalid
- [ ] **`validasiRegistrasi`** ada dan menggabungkan semua error
- [ ] **`fetchUser` (async)** ada dengan `try/catch` dan cek `instanceof`
- [ ] **`processWithLogging` (async)** ada dengan `try/catch/finally`
- [ ] **Semua test di bagian `TEST`** ter-uncomment dan program jalan
- [ ] **Tidak ada `//` (komentar) yang lupa dihapus** di fungsi utama
- [ ] `node 10-error-handling.js` jalan tanpa error tak terduga
- [ ] Kamu bisa menjelaskan kapan pakai `throw` vs `try/catch`

---

## Cara Submit

1. Buka `code/10-error-handling.js` di VS Code
2. Isi semua bagian `TODO(human)` dengan kodemu sendiri (uncomment + ketik
   ulang)
3. Save (`Cmd+S` / `Ctrl+S`)
4. Jalankan di terminal: `node 10-error-handling.js`
5. Verifikasi semua checklist di atas
6. Kalau PASS, lanjut ke `soal/11-...` (soal berikutnya)

---

## Catatan untuk Pemula

> **Error handling itu BUKAN untuk menyembunyikan error.** Tujuannya: **merespons error dengan tepat** — log, tampilkan pesan ramah, atau retry. Jangan `catch` lalu diam-diam `console.log("")` — itu sama saja bohong ke user.

> **`throw` itu "naikkan masalah ke atasan"**. Kalau fungsi kamu tidak tahu harus ngapain dengan error, **throw lagi** (re-throw) dan biarkan caller yang memutuskan. Yang penting: error **tidak hilang begitu saja**.

> **`finally` itu tempat cleanup**. Analoginya: masuk kamar mandi (`try`) → selesai atau batal (`catch` optional) → **pasti** matikan lampu dan kunci pintu (`finally`). Walau pun prosesnya gagal di tengah, pintu tetap dikunci.

> **Custom Error Class itu label**. `ValidationError` dan `NotFoundError` cuma "label" berbeda untuk error yang berbeda. Tanpa label, semua error cuma "Error" generik dan kamu harus bedakan dari pesan — ribet. Dengan label, pakai `instanceof` jadi gampang.

> **Pola kumpulkan-error-lebih-dulu** itu best practice untuk form. User lebih senang lihat "Email DAN password salah" daripada disuruh benerin satu-satu dengan 5 kali submit.

> **Kalau error terjadi dan kamu bingung**: baca `stack` trace di terminal. Itu "peta" menuju baris penyebab error. Biasanya nama file + nomor baris ada di sana.

> **Async error bukan hal mistis**. `await` cuma "buka" Promise jadi nilai biasa. Kalau Promise-nya reject, `await` akan throw error biasa — jadi `try/catch` di async function **persis sama** dengan sync.

> **Latihan tambahan**: coba tambahkan retry logic di `fetchUser` — kalau error jaringan, coba lagi sampai 3 kali dengan jeda 1 detik. Ini pattern umum di production.

<!-- markdownlint-enable MD024 MD028 -->
