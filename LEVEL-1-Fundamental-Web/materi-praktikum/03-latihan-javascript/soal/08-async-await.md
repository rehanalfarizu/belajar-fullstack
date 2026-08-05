<!-- markdownlint-disable MD024 MD028 -->

# SOAL 08 — Async/Await & Fetch

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membuat Promise dengan `resolve` dan `reject`
- Menjalankan banyak Promise secara paralel dengan `Promise.all()`
- Menulis fungsi `async` dan memakai `await` untuk menunggu Promise
- Mengambil data dari API publik menggunakan `fetch` (JSONPlaceholder)
- Meng-handle error pada kode async dengan `try`, `catch`, dan `finally`
- Mengubah `.then().catch()` (Promise chain) menjadi `async/await`
- Memfilter dan memetakan hasil response JSON

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Kamu akan membuat program yang **mengambil data dari internet** (API publik
JSONPlaceholder) menggunakan JavaScript modern. Bayangkan kamu membuat
**aplikasi yang memuat daftar user dari server** — sama persis seperti aplikasi
web sungguhan (Twitter, Tokopedia, Gojek) memuat data dari server.

Bedanya dengan soal-soal sebelumnya: data **tidak langsung tersedia**.
JavaScript harus **menunggu** server merespons. Di sinilah `async/await` dan
`Promise` berperan.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan** — pahami konsep `Promise`, `async`, `await`, dan `fetch`
2. **Ketik dari 0** — buka `code/08-async-await.js`, cari `TODO(human)`,
   lalu ketik sendiri (JANGAN copy-paste dari contoh mana pun)
3. **Jalankan** — simpan file lalu jalankan dengan `node code/08-async-await.js`
4. **Verifikasi** — cek hasilmu dengan panduan verifikasi

Kamu **tidak akan diberi kode jadi** di soal ini. Tujuannya agar kamu terbiasa
**berpikir dan mengetik**, bukan menyalin. Ini skill paling penting untuk
programmer.

> **Butuh internet?** Ya. Latihan ini memanggil API publik di
> `https://jsonplaceholder.typicode.com/`. Pastikan koneksimu aktif.

---

## Bagian A: Promise dengan `resolve` dan `reject`

### Penjelasan

`Promise` adalah **objek** yang merepresentasikan hasil operasi yang **belum
selesai** (atau baru selesai di masa depan). Ada tiga status Promise:

- **Pending** — sedang berjalan, belum ada hasil
- **Fulfilled** — selesai, hasilnya `resolve(value)`
- **Rejected** — gagal, errornya `reject(error)`

Cara membuat Promise: `new Promise((resolve, reject) => { ... })`. Di dalam
fungsi itu, panggil `resolve(...)` kalau berhasil, atau `reject(...)` kalau
gagal.

Untuk consumes (mengambil) hasilnya, pakai `.then()` (untuk sukses) dan
`.catch()` (untuk error).

### Wajib Ada di Kode Kamu

- Fungsi `cekAngkaGenap(n)` yang return `new Promise(...)`
- Di dalamnya: kalau `n % 2 === 0` → panggil `resolve(...)` dengan pesan sukses
- Kalau tidak → panggil `reject(new Error(...))` dengan pesan error
- Panggil `cekAngkaGenap(4).then(console.log).catch(console.error)` untuk tes

### Cara Mengetik dari 0

1. Buka `code/08-async-await.js` di VS Code
2. Cari blok `// TODO 1: Promise dengan resolve/reject` (sekitar baris 7)
3. **Hapus** komentar `//` di depan tiap baris agar kodenya aktif
4. Ketik ulang fungsinya **tanpa melihat contoh** — ingat: `resolve` untuk
   sukses, `reject` untuk gagal
5. Jalankan: `node code/08-async-await.js`
6. Harusnya muncul: `4 adalah genap`

### Yang Terjadi di Layar

Kalau kamu panggil `cekAngkaGenap(4)`, Promise akan **resolve** dengan string
`"4 adalah genap"`, lalu `.then(console.log)` mencetaknya.

Kalau kamu panggil `cekAngkaGenap(7)`, Promise akan **reject** dengan `Error`,
lalu `.catch(console.error)` akan menampilkan error-nya.

### Verifikasi

- [ ] Tidak ada syntax error saat `node` dijalankan
- [ ] Output menampilkan `4 adalah genap` (atau pesan sukses yang kamu tulis)
- [ ] Coba ubah argumen ke angka ganjil (misal `cekAngkaGenap(7)`) — harus
      muncul pesan error, bukan crash
- [ ] Kode `cekAngkaGenap` dipanggil dengan `.then().catch()` (Promise chain)

---

## Bagian B: Promise.all() untuk Paralel

### Penjelasan

`Promise.all([p1, p2, p3])` menjalankan **banyak Promise sekaligus** dan
menunggu **semua** selesai. Hasilnya adalah array berisi hasil tiap Promise,
**urut sesuai array input**.

Cocok dipakai saat kamu harus fetch data dari **banyak endpoint atau ID secara
independen** — tidak perlu menunggu satu-satu (sequential) kalau bisa paralel.

### Wajib Ada di Kode Kamu

- Fungsi `delay(ms)` → return Promise yang resolve dengan nilai `ms` setelah
  `ms` milidetik (pakai `setTimeout`)
- Pemanggilan `Promise.all([delay(1000), delay(2000), delay(500)])`
- `.then(results => console.log("Semua selesai!", results))`

### Cara Mengetik dari 0

1. Cari blok `// TODO 2: Promise.all()` (sekitar baris 22)
2. Aktifkan komentarnya
3. Ketik `delay(ms)` — ingat: `setTimeout(() => resolve(ms), ms)`. Parameter
   `ms` di-resolve sebagai **nilai** Promise
4. Ketik pemanggilan `Promise.all([...])` dengan **3** delay berbeda
5. Jalankan file. Total waktu harus **~2 detik** (yang terlama), bukan 3.5 detik
   (penjumlahan) — itu bukti paralel

### Yang Terjadi di Layar

```
Semua selesai! [ 1000, 2000, 500 ]
```

Waktu totalnya 2 detik, bukan 3.5 detik. Ini bukti `Promise.all` menjalankan
ketiganya **secara paralel** (barengan).

### Verifikasi

- [ ] Output: `Semua selesai! [ 1000, 2000, 500 ]` (atau urutan sesuai input)
- [ ] Tidak ada `await` di sini — ini versi `.then()` dulu, baru konversi di Bagian E
- [ ] Kalau kamu hapus `Promise.all` dan pakai `await` satu-satu, waktu total
      akan **lebih lama** (sequential) — coba bandingkan sebagai latihan

---

## Bagian C: Fungsi `async` / `await` + `fetch`

### Penjelasan

`async function namaFungsi() { ... }` adalah cara **modern** menulis fungsi
yang berisi kode asynchronous. Di dalamnya, `await` dipakai untuk **menunggu**
Promise selesai — kodenya kelihatan **synchronous** (lurus), padahal aslinya
async.

`fetch(url)` adalah API bawaan browser/Node untuk **HTTP request** (GET
default). Return-nya Promise<Response>. Response belum berisi data — kamu
harus panggil `.json()` untuk parse body JSON.

### Wajib Ada di Kode Kamu

- Fungsi `async fetchUser(id)` yang menerima parameter `id`
- Di dalamnya: `const response = await fetch(`URL/${id}`)` — pakai
  `https://jsonplaceholder.typicode.com/users/${id}`
- Parse JSON: `const user = await response.json()`
- `return user`

### Cara Mengetik dari 0

1. Cari blok `// TODO 3: Async/Await function` (sekitar baris 33)
2. Aktifkan komentarnya
3. Ketik `async function fetchUser(id) { ... }`
4. Baris pertama: `const response = await fetch(...)` — pakai template literal
   dengan backtick `` ` `` dan `${id}`
5. Baris kedua: parse JSON
6. `return user`
7. Untuk tes, tambahkan di akhir file:
   `fetchUser(1).then(u => console.log(u.name, u.email))`
8. Jalankan. Harusnya muncul nama & email user id-1

### Yang Terjadi di Layar

```
Leanne Graham Sincere@april.biz
```

Data ini **datang dari internet**, bukan dari variabel lokal. Kamu baru saja
melakukan HTTP request pertama-mu.

### Verifikasi

- [ ] Output menampilkan nama dan email user (Leanne Graham untuk id 1)
- [ ] Ada kata kunci `async` di depan `function`
- [ ] Ada `await` di depan `fetch` dan `response.json()`
- [ ] Tidak ada `.then()` di dalam fungsi `fetchUser` (sudah diganti `await`)

---

## Bagian D: Error Handling dengan `try` / `catch` / `finally`

### Penjelasan

Kode async bisa gagal: internet mati, server down, response bukan JSON valid,
field tidak ditemukan, dll. **Tanpa error handling**, error akan meledak
(unhandled promise rejection) dan program berhenti.

Solusinya: **bungkus** kode async di `try { ... } catch (error) { ... }`.
- `try` — kode yang mungkin error
- `catch` — jalan kalau error muncul
- `finally` — **selalu** jalan, mau sukses atau gagal (untuk cleanup)

### Wajib Ada di Kode Kamu

- Fungsi `async fetchAllUsers()` yang fetch **semua** users
- `console.log("Memuat...")` **sebelum** `try` (biar muncul duluan)
- Di dalam `try`:
  - `await fetch("https://jsonplaceholder.typicode.com/users")`
  - `const users = await response.json()`
  - `console.log("Ditemukan ${users.length} users")`
  - `// TODO: filter user yang di "London"` (TODO di dalam file)
  - `// TODO: map jadi { nama, email }` (TODO di dalam file)
- Di `catch (error)`: `console.error("Gagal:", error.message)`
- Di `finally`: `console.log("Selesai memuat")`
- `return users` di akhir `try`

### Cara Mengetik dari 0

1. Cari blok `// TODO 4: Async function dengan try/catch/finally`
2. Aktifkan komentarnya
3. Ketik dari atas ke bawah: signature → log → `try` → fetch → parse → log →
   return
4. Lalu `catch` dengan `console.error`
5. Lalu `finally` dengan `console.log("Selesai memuat")`
6. Untuk tes, tambahkan `fetchAllUsers()` di akhir file (uncomment `TEST`)
7. Jalankan

### Yang Terjadi di Layar

```
Memuat...
Ditemukan 10 users
Selesai memuat
```

Perhatikan urutan: `Memuat...` muncul **dulu** (sebelum await), lalu setelah
fetch selesai baru `Ditemukan 10 users`, lalu `Selesai memuat` (dari
`finally`).

> **Tips urutan `try/catch/finally`:** `finally` SELALU jalan terakhir, mau
> sukses atau gagal. Pakai untuk hal-hal seperti: sembunyikan loading spinner,
> tutup koneksi, log "selesai".

### Verifikasi

- [ ] Ada blok `try { ... } catch (error) { ... } finally { ... }`
- [ ] Output urutan: "Memuat..." → "Ditemukan 10 users" → "Selesai memuat"
- [ ] Coba ubah URL ke yang salah (misal `https://jsonplaceholder.typicode.com/userss`)
      — `catch` harus aktif, muncul `Gagal: <pesan error>`
- [ ] `finally` tetap jalan walau `catch` aktif (bukti dengan tes URL salah)

---

## Bagian E: Async Arrow Function

### Penjelasan

Arrow function (`() => {}`) juga bisa dijadikan async: `async () => {}`. Ini
lebih ringkas dari `async function nama() {}`. Dipakai saat kamu butuh fungsi
anonymous (tanpa nama) yang async — biasanya untuk callback atau disimpan di
variabel.

Bedanya:
- `async function fetchUser() {}` — function declaration
- `const fetchUser = async () => {}` — arrow function, disimpan di variabel

### Wajib Ada di Kode Kamu

- `const fetchUsersAsync = async () => { ... }`
- Di dalamnya: fetch + parse + return (sama seperti `fetchAllUsers`, tapi
  mungkin versi ringkas)

### Cara Mengetik dari 0

1. Cari blok `// TODO 5: Async Arrow Function` (sekitar baris 62)
2. Aktifkan komentarnya
3. Ketik `const fetchUsersAsync = async () => {`
4. Isi body: `const res = await fetch(...)` → `const users = await res.json()` →
   `return users`
5. Tutup dengan `};`
6. Untuk tes: `fetchUsersAsync().then(arr => console.log(arr.length))`
7. Jalankan. Harusnya `10`

### Verifikasi

- [ ] Ada `const fetchUsersAsync = async () => { ... }` (arrow function, ada
      `async` di antara `=` dan `()`)
- [ ] Diakhiri `};` (titik koma setelah kurung kurawal tutup, karena ini ekspresi)
- [ ] Output `10` saat dipanggil dengan `.then(arr => console.log(arr.length))`
- [ ] Tidak salah ketik `async ()` (yang benar `async () =>`)

---

## Bagian F (Bonus): `processUserData(users)`

### Penjelasan

Ini bagian bonus untuk yang mau tantangan lebih. Kamu akan **mendapatkan**
array of users (dari `fetchAllUsers()`), lalu memprosesnya: filter yang
aktif, ambil field tertentu, urutkan, dan throw error kalau kosong.

Skill yang diasah:
- `Array.filter()` — ambil yang `isActive === true`
- `Array.map()` — ubah jadi `{ nama, email, company }`
- `Array.sort()` — urutkan berdasarkan nama
- `throw new Error(...)` — bikin Promise reject

### Wajib Ada di Kode Kamu

- Fungsi `async processUserData(users)`
- Filter `isActive === true`
- Map ke object: `{ nama: user.name, email: user.email, company: user.company.name }`
- Sort ascending by `nama`
- `if (filtered.length === 0) throw new Error("Tidak ada user aktif")`
- Return hasil

### Cara Mengetik dari 0

1. Cari blok `// BONUS: async processUserData(users)` di paling bawah file
2. Buat fungsi `async function processUserData(users) { ... }` **di bawahnya**
3. Pikirkan alurnya: filter → map → sort → validasi → return
4. Untuk tes: `processUserData([{name:'X', isActive:true, ...}])` dengan data
   dummy kecil, atau panggil dengan hasil `fetchAllUsers()`

### Pola Kode (opsional, jangan copy-paste)

```javascript
const aktif = users.filter(u => u.isActive === true);
const ringkas = aktif.map(u => ({ /* field-field yang kamu mau */ }));
ringkas.sort((a, b) => /* comparator */);
if (ringkas.length === 0) throw new Error("...");
return ringkas;
```

### Verifikasi

- [ ] Hasil hanya berisi user dengan `isActive === true`
- [ ] Tiap item hanya punya 3 field: `nama`, `email`, `company`
- [ ] Urutan nama alfabetis (A-Z, ascending)
- [ ] Kalau `users` kosong atau tidak ada yang aktif, throw error dan
      `fetchAllUsers().catch(err => console.error(err.message))` bisa menangkapnya

---

## Ringkasan Konsep (Baca Sebelum Lanjut)

- **Promise** = objek yang merepresentasikan hasil operasi **asynchronous** yang
  belum selesai
- **`resolve(value)`** = tandai Promise **berhasil** dengan `value`
- **`reject(error)`** = tandai Promise **gagal** dengan `error`
- **`.then(fn)`** = jalankan `fn` saat Promise sukses
- **`.catch(fn)`** = jalankan `fn` saat Promise gagal
- **`async function`** = fungsi yang **pasti** return Promise
- **`await`** = tunggu Promise selesai, ambil nilainya (hanya bisa di dalam
  fungsi `async`)
- **`fetch(url)`** = HTTP request GET, return `Promise<Response>`
- **`response.json()`** = parse body response jadi JSON (return Promise)
- **`try { ... } catch (e) { ... } finally { ... }`** = error handling untuk
  kode yang mungkin gagal
- **`Promise.all([p1, p2, p3])`** = jalan paralel, tunggu semua selesai,
  return array hasil

### Kapan Pakai Apa

- **Pakai Promise chain** (`.then().catch()`) saat: kode simpel, satu-dua
  langkah, atau saat sudah terbiasa style lama
- **Pakai `async/await`** saat: kode panjang, banyak langkah, atau mau
  kelihatan synchronous biar mudah dibaca
- **Pakai `Promise.all()`** saat: ada banyak operasi independen yang bisa
  jalan bareng (misal fetch 10 ID sekaligus)
- **Pakai `try/catch`** saat: kode async yang **bisa gagal** (fetch, parse JSON,
  database query, dll) — selalu tambahkan di produksi
- **Pakai `finally`** saat: ada hal yang **pasti** harus jalan (cleanup,
  sembunyikan loading, log "done")

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 09, cek semua ini:

- [ ] File `code/08-async-await.js` bisa dijalankan dengan
      `node code/08-async-await.js` tanpa syntax error
- [ ] **Bagian A** — `cekAngkaGenap(4)` menampilkan pesan sukses, `cekAngkaGenap(7)`
      menampilkan pesan error (tidak crash)
- [ ] **Bagian B** — `Promise.all([delay(1000), delay(2000), delay(500)])`
      selesai dalam ~2 detik (bukan 3.5 detik)
- [ ] **Bagian C** — `fetchUser(1)` return object dengan field `name` dan `email`
      (Leanne Graham, Sincere@april.biz)
- [ ] **Bagian D** — `fetchAllUsers()` menampilkan "Memuat..." → "Ditemukan 10
      users" → "Selesai memuat" **berurutan**
- [ ] **Bagian D** — kalau URL diubah jadi salah, `catch` aktif dan `finally`
      tetap jalan
- [ ] **Bagian E** — `fetchUsersAsync()` arrow function bisa dipanggil dan
      return array
- [ ] **Bagian F (Bonus)** — `processUserData` filter, map, sort, dan throw
      error dengan benar
- [ ] **Kode di-comment dengan rapi** — tidak ada `// TODO(human)` atau baris
      yang masih setengah menjadi komentar
- [ ] **Tidak ada `console.log` debugging** yang lupa dihapus

---

## Cara Submit

1. Buka `code/08-async-await.js` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri (jangan copy-paste dari
   mana pun)
3. **Hapus** baris `// TEST` komentar di bagian TEST untuk mengaktifkan
   pemanggilan fungsi
4. Save (Cmd+S / Ctrl+S)
5. Jalankan: `node code/08-async-await.js` dari terminal
6. Verifikasi output dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/09-...md` (soal berikutnya)

---

## Catatan untuk Pemula

> **Kenapa `await` harus di dalam `async`?** Karena `await` mengubah
> interpreter untuk **menjeda** fungsi sampai Promise selesai. JavaScript
> hanya memperbolehkan "jeda" ini di fungsi yang ditandai `async`. Kalau kamu
> pakai `await` di luar, akan syntax error.

> **`fetch()` tidak throw error untuk HTTP 404 atau 500.** Response tetap
> datang (dengan `response.ok = false`). Kamu **harus cek manual**:
> `if (!response.ok) throw new Error("HTTP " + response.status)`. Yang di-reject
> hanya **network error** (offline, DNS fail, dll).

> **`async` function SELALU return Promise** — meskipun kamu menulis
> `return "hello"`, yang dikembalikan tetap `Promise<string>`. Untuk ambil
> nilainya: `await myAsyncFn()` atau `.then(val => ...)`.

> **`Promise.all()` gagal total kalau SATU saja reject.** Kalau kamu mau
> jalan paralel tapi tetap lanjut walau ada yang gagal, pakai
> `Promise.allSettled()` — return array of `{status, value}` atau `{status, reason}`.

> **JSONPlaceholder adalah API gratis untuk latihan.** Data-nya **palsu**
> (tidak benar-benar tersimpan di server), tapi response-nya valid JSON —
> sempurna untuk belajar fetch tanpa perlu setup backend.

> **Kalau output "Gagal: fetch failed"** — cek koneksi internet. Kalau koneksi
> OK, cek juga apakah URL-nya benar (typo satu karakter saja bisa bikin gagal).

> **Bedakan "tidak resolve" vs "resolve dengan data kosong".** `await fetch(...).json()`
> bisa return `[]` (array kosong) — itu bukan error, cuma data kosong. Pakai
> `if (data.length === 0)` untuk cek eksplisit, jangan andalkan `try/catch` saja.

<!-- markdownlint-enable MD024 MD028 -->
