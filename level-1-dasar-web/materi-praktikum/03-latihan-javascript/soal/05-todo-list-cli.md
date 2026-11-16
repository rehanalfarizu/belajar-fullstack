<!-- markdownlint-disable MD024 MD028 -->

# SOAL 05 — Todo List CLI

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menggunakan `readline` module di Node.js untuk menerima input interaktif dari terminal
- Memahami array of objects sebagai struktur data (setiap todo punya `id`, `task`, `done`)
- Melakukan operasi **CRUD** (Create, Read, Update, Delete) pada array
- Menggunakan method array penting: `push`, `find`, `findIndex`, `filter`, `splice`, `map`
- Membuat function yang **return value** (string konfirmasi, array hasil filter, number) bukan sekadar `console.log`
- Mendesain **loop interaktif** dengan `switch` yang berjalan terus sampai user memilih keluar
- Menangani **edge cases**: array kosong, ID tidak ditemukan, input tidak valid

**Topik:** array of objects, CRUD, `find`/`findIndex`/`filter`/`splice`, `readline` Node.js, `switch` di dalam callback, function dengan `return`

**Referensi utama:**

- [MDN: readline](https://nodejs.org/api/readline.html)
- [MDN: Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [MDN: Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [MDN: Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [MDN: switch](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Statements/switch)

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Bayangkan kamu mau bikin aplikasi **Todo List** versi terminal — semacam catatan
kecil yang bisa nambah tugas, hapus tugas, dan tandai tugas yang udah selesai.
Semua data disimpan di sebuah **array** di memori, dan user berinteraksi lewat
ketikan di terminal, bukan klik tombol.

Ini adalah latihan **pertamamu** yang menggabungkan banyak hal sekaligus:
struktur data (array of objects), function dengan `return`, method array
modern (`find`, `filter`, `splice`), dan **input interaktif** pakai module
`readline` Node.js. Setelah selesai, kamu bakal punya aplikasi CLI yang bisa
dipakai beneran — pondasi bagus sebelum lanjut ke web app sungguhan.

Yang bikin menarik: setiap function yang kamu tulis **mengembalikan nilai**
(`return`), bukan sekadar cetak ke layar. Ini adalah pola penting di
pemrograman: pisahkan **logika** (apa yang terjadi) dari **presentasi**
(cetak atau tidak, di mana cetaknya). Dengan begini, function yang sama bisa
dipakai ulang di tempat lain.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan & syarat** — pahami logika CRUD dan kenapa pakai method array tertentu
2. **Ketik sendiri** — buka salinan starter `05-todo-list-cli.js` (lihat catatan di bawah), ketik bagian per bagian (JANGAN copy-paste utuh)
3. **Verifikasi** — jalankan dengan `node 05-todo-list-cli.js` dari folder salinanmu dan cek semua menu

> **Di mana mengerjakannya:** starter sudah ada di `level-1-dasar-web/materi-praktikum/03-latihan-javascript/code/05-todo-list-cli.js`. Sesuai aturan [latihan-saya](../../../../latihan-saya/README.md), salin file itu ke `latihan-saya/02-javascript/minggu-XX/` dengan nama yang sama (`05-todo-list-cli.js`), lalu kerjakan di salinan itu. Semua perintah `node` di soal ini dijalankan terhadap salinanmu.

Kamu **tidak akan diberi kode jadi utuh**. Akan ada **petunjuk** dan
**contoh output**, tapi kode utama harus kamu tulis sendiri. Tujuannya agar
kamu terbiasa **mendesain alur program**, bukan menyalin. Ini skill inti
sebelum kamu bisa bikin aplikasi sendiri dari nol.

---

## Bagian A: Konsep `readline` & Setup Awal

### Penjelasan

`readline` adalah **module bawaan Node.js** yang bikin terminal bisa "ngobrol"
dengan program kita: program nanya, user ketik jawaban, program baca
jawabannya. Tanpa `readline`, program CLI cuma bisa cetak ke layar — nggak
bisa minta input.

Cara setup-nya:

Setup `rl` (dari `require('readline')` sampai `createInterface` dengan `input` dan `output`) adalah tugasmu di bagian ini. Setelah `rl` jadi, pola tanya-jawabnya begini:

```javascript
rl.question('Pertanyaan: ', (jawaban) => {
  console.log('Kamu jawab: ' + jawaban);
  rl.close(); // tutup readline setelah selesai
});
```

Pola `rl.question(prompt, callback)` itu **asynchronous** — callback baru jalan
**setelah** user mengetik dan menekan Enter. Karena itu, seluruh logika
interaktif kita harus ada di dalam callback, atau dipanggil dari situ.

Variabel `todos` adalah **state** program kita — satu array yang disimpan di
scope module (di luar function manapun) agar semua function bisa akses dan
modifikasi array yang sama.

### Wajib Ada di Kode Kamu

- Import module `readline` bawaan Node.js di paling atas
- Buat interface `rl` yang membaca dari `process.stdin` dan menulis ke `process.stdout`
- Deklarasi `const todos = [...]` berisi 3 object awal dengan properti `id`, `task`, `done`
- `id` bertipe number, `task` string, `done` boolean `false`

Tiga todo awalnya bebas, asal ada yang `done: true` dan ada yang `done: false` supaya tampilan `[x]` dan `[ ]` bisa kamu uji.

### Cara Mengetik dari 0

1. Buka salinan starter `05-todo-list-cli.js` (bukan bikin file baru; lihat catatan di atas)
2. Baris pertama: import module `readline`
3. Bikin `rl` dengan `readline.createInterface`
4. Di bawahnya, deklarasi `const todos` dengan 3 object awal
5. Save (Cmd+S / Ctrl+S) — belum ada output apa-apa, ini normal

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Todo List CLI — Bagian A: Konsep `readline` & Setup Awal".
>
> Pertanyaan pemandu: module apa yang harus di-import, opsi apa yang dibutuhkan `createInterface`, dan kenapa `todos` dideklarasikan di luar semua function?
### Verifikasi

- [ ] File bisa dijalankan dengan `node 05-todo-list-cli.js` tanpa error
- [ ] Tidak ada `undefined` untuk `todos` (cek dengan `console.log(todos)` sementara)
- [ ] `todos` berisi 3 object dengan `id` 1, 2, 3
- [ ] Properti `done` ada di setiap object

---

## Bagian B: Fungsi `tampilkanTodos()`

### Penjelasan

Fungsi ini **membaca** data dan mencetaknya ke layar. Tugasnya: loop setiap
todo di array, lalu tampilkan dengan format yang rapi — nomor urut, status
checkbox (`[ ]` atau `[x]`), dan judul tugas.

Kalau array kosong, jangan loop — langsung tampilkan pesan "Tidak ada tugas".
Ini contoh **edge case** yang harus ditangani, bukan exception yang bikin
program crash.

Format output yang diharapkan:

```
=== 3 Todo ===
1. [ ] Belajar JavaScript
2. [x] Buat project portfolio
3. [ ] Latihan coding
```

Logikanya:

- Cek `todos.length === 0` → kalau iya, cetak pesan dan return
- Kalau tidak, cetak header
- Loop dengan `for` (atau `forEach`), cetak setiap todo dengan template literal

### Wajib Ada di Kode Kamu

- Deklarasi `function tampilkanTodos() { ... }`
- Pengecekan `if (todos.length === 0) { ... return; }` di awal
- Loop untuk cetak setiap todo dalam format `nomor. [status] task`
- Status `[ ]` kalau `done === false`, `[x]` kalau `done === true`
- Tampilkan **statistik** di akhir: total todo, jumlah selesai, jumlah belum

### Cara Mengetik dari 0

1. Di bawah deklarasi `todos`, ketik `function tampilkanTodos() {`
2. Cek `if (todos.length === 0)` dulu — cetak `"Tidak ada tugas"` lalu `return`
3. Cetak header dengan jumlah todo (template literal)
4. Loop dengan `for` dari indeks 0 sampai sebelum `todos.length`
5. Di dalam loop, tentukan teks status (`[x]` atau `[ ]`) dari `done`. Operator apa yang cocok untuk memilih satu dari dua nilai?
6. Cetak nomor urut (indeks + 1), status, dan judul tugas dalam satu baris
7. Tutup `}` loop
8. Setelah loop, cetak statistik (total, selesai, belum)
9. Tutup `}` function
10. Panggil `tampilkanTodos()` sementara di bawah function untuk tes

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Todo List CLI — Bagian B: Fungsi `tampilkanTodos()`".
>
> Pertanyaan pemandu: kenapa nomor urut yang dicetak bukan `id`, dan di titik mana dalam function array kosong harus ditangani?

### Verifikasi

- [ ] `tampilkanTodos()` bisa dipanggil tanpa error
- [ ] Array kosong → muncul `"Tidak ada tugas"`, BUKAN error
- [ ] 3 todo awal → muncul header `=== 3 Todo ===`
- [ ] Format sesuai: `1. [ ] Belajar JavaScript`
- [ ] Todo dengan `done: true` muncul sebagai `[x]`
- [ ] Statistik di bawah menampilkan total/selesai/belum dengan benar

---

## Bagian C: Fungsi `tambahTodos(task)`

### Penjelasan

Fungsi ini bagian **Create** dari CRUD. Tugasnya: menerima `task` (string),
membuat object todo baru, lalu **push** ke array `todos`.

Tapi ada beberapa hal yang harus dijaga:

1. **Validasi input**: `task` tidak boleh kosong (string kosong atau cuma spasi)
2. **Generate ID otomatis**: ID baru = ID terbesar yang ada + 1
3. **Return string konfirmasi** (bukan `console.log` di dalam function) — ini pola penting

Kenapa generate ID pakai `Math.max(...todos.map(...)) + 1`? Karena kalau ada
todo yang dihapus, array jadi bolong — `todos.length` nggak bisa dipakai
langsung. Cari ID terbesar, baru tambah 1.

### Wajib Ada di Kode Kamu

- Deklarasi `function tambahTodos(task) { ... }`
- Validasi: `if (!task || task.trim() === '') return "Error: Task tidak boleh kosong"`
- Hitung ID baru: `const newId = ...`
- Push object baru `{ id: newId, task: task.trim(), done: false }` ke `todos`
- `return` string konfirmasi: misalnya `` `Tugas '${task}' ditambahkan (ID: ${newId})` ``

### Cara Mengetik dari 0

1. Di bawah `tampilkanTodos`, ketik `function tambahTodos(task) {`
2. Cek validasi: task kosong atau hanya spasi harus ditolak (dua kondisi, satu `if`)
3. Di dalam `if`, `return` string pesan error (jangan `console.log` di dalam function)
4. Hitung ID baru: ID terbesar yang ada + 1, dan jaga kasus `todos` kosong
5. Tambahkan object todo baru ke `todos` dengan `done: false`
6. Return string konfirmasi
7. Tutup `}` function
8. Tes: cetak hasil `tambahTodos("Coba coba")`, lalu panggil `tampilkanTodos()`

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Todo List CLI — Bagian C: Fungsi `tambahTodos(task)`".
>
> Pertanyaan pemandu: kalau todo dengan ID 2 pernah dihapus, kenapa `todos.length + 1` bisa menghasilkan ID yang bentrok?

### Verifikasi

- [ ] `tambahTodos("Belajar Node")` push todo baru dan return string konfirmasi
- [ ] `tambahTodos("")` return error "Task tidak boleh kosong" dan array **tidak** berubah
- [ ] `tambahTodos("   ")` (cuma spasi) juga ditolak karena `task.trim() === ''`
- [ ] ID baru selalu 1 lebih besar dari ID terbesar yang ada
- [ ] Todo baru punya `done: false`

---

## Bagian D: Fungsi `hapusTodos(id)`

### Penjelasan

Fungsi ini bagian **Delete** dari CRUD. Tugasnya: cari todo dengan `id` yang
cocok, lalu hapus dari array. Kalau ID tidak ditemukan, return pesan error.

Ada dua method array yang bisa dipakai:

- `findIndex(t => t.id === id)` → return **index** (angka posisi di array, atau -1)
- `find(t => t.id === id)` → return **object** todo-nya (atau `undefined`)

Untuk hapus, kita butuh **index** supaya bisa pakai `splice`. Jadi pakai
`findIndex`. Setelah dapat index, `splice(index, 1)` untuk hapus 1 item di
posisi itu.

### Wajib Ada di Kode Kamu

- Deklarasi `function hapusTodos(id) { ... }`
- `const index = todos.findIndex(t => t.id === id);`
- Cek `if (index === -1) return "Error: ID ${id} tidak ditemukan";`
- Simpan todo yang akan dihapus: `const [deleted] = todos.splice(index, 1);`
- Return string konfirmasi yang menyebut task yang dihapus

### Cara Mengetik dari 0

1. Di bawah `tambahTodos`, ketik `function hapusTodos(id) {`
2. Cari posisi todo dengan ID tersebut di array. Method apa yang mengembalikan indeks, bukan elemennya?
3. Kalau tidak ketemu (hasilnya `-1`), `return` pesan error
4. Hapus satu elemen di posisi itu dengan `splice`. `splice` mengembalikan array, jadi ambil elemen pertamanya dengan destructuring
5. `return` pesan konfirmasi yang menyebut judul tugas yang dihapus
6. Tutup `}` function
7. Tes: cetak hasil `hapusTodos(2)`, lalu panggil `tampilkanTodos()`

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Todo List CLI — Bagian D: Fungsi `hapusTodos(id)`".
>
> Pertanyaan pemandu: apa nilai balik `findIndex` kalau tidak ada yang cocok, dan kenapa harus dicek sebelum `splice`?

### Verifikasi

- [ ] `hapusTodos(2)` hapus todo ID 2 dan return konfirmasi
- [ ] `hapusTodos(999)` return error "ID 999 tidak ditemukan", array tidak berubah
- [ ] Setelah hapus, `tampilkanTodos()` tidak menampilkan todo yang dihapus
- [ ] ID yang dihapus bisa digenerate ulang oleh `tambahTodos` (karena pakai `Math.max`)

---

## Bagian E: Fungsi `selesaiTodos(id)`

### Penjelasan

Fungsi ini bagian **Update** dari CRUD — khususnya update satu field (`done`)
dari `false` ke `true`. Tugasnya: cari todo dengan ID yang cocok, lalu set
`done = true`.

Di sini kita pakai `find` (bukan `findIndex`) karena kita butuh object
todo-nya langsung untuk diubah. `find` return `undefined` kalau tidak
ditemukan.

> **Penting**: karena `find` return **reference** ke object di array (bukan
> copy), mengubah `todo.done = true` **langsung mengubah array**. Ini
> sifat object di JavaScript — reference, bukan value.

### Wajib Ada di Kode Kamu

- Deklarasi `function selesaiTodos(id) { ... }`
- `const todo = todos.find(t => t.id === id);`
- Cek `if (!todo) return "Error: ID ${id} tidak ditemukan";`
- Set `todo.done = true;`
- Return string konfirmasi: `` `Tugas '${todo.task}' ditandai selesai` ``

### Cara Mengetik dari 0

1. Di bawah `hapusTodos`, ketik `function selesaiTodos(id) {`
2. Cari object todo dengan ID tersebut (kali ini kamu butuh elemennya, bukan indeksnya)
3. Kalau tidak ketemu, `return` pesan error
4. Ubah `done` pada object itu jadi `true`. Kenapa tidak perlu menyentuh array `todos` lagi?
5. `return` pesan konfirmasi yang menyebut judul tugas
6. Tutup `}` function
7. Tes: cetak hasil `selesaiTodos(1)`, lalu panggil `tampilkanTodos()`

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Todo List CLI — Bagian E: Fungsi `selesaiTodos(id)`".
>
> Pertanyaan pemandu: apa bedanya hasil `find` dan `findIndex`, dan kenapa mengubah properti object hasil `find` ikut mengubah isi `todos`?

### Verifikasi

- [ ] `selesaiTodos(1)` set `done: true` pada todo ID 1
- [ ] `selesaiTodos(999)` return error, array tidak berubah
- [ ] Setelah selesai, `tampilkanTodos()` menampilkan todo itu sebagai `[x]`
- [ ] ID yang sudah selesai tetap di array (tidak dihapus)

---

## Bagian F: Fungsi `belumSelesai()` & `jumlahSelesai()`

### Penjelasan

Dua function kecil ini pakai method `filter` — salah satu method array
paling berguna. `filter` membuat **array baru** yang isinya cuma elemen-elemen
yang lolos tes (return `true` di callback).

`belumSelesai()` filter todos yang `done === false`. Hasilnya array, bisa
kosong atau berisi banyak. Kita tampilkan dengan `tampilkanTodos()` kalau
tidak kosong.

`jumlahSelesai()` filter yang `done === true`, lalu ambil `.length` untuk
dapat **jumlah** (number, bukan array). Ini untuk statistik.

### Wajib Ada di Kode Kamu

**Untuk `belumSelesai()`:**

- Deklarasi `function belumSelesai() { ... }`
- `const filtered = todos.filter(t => !t.done);`
- Cek `if (filtered.length === 0) return "Tidak ada tugas yang belum selesai";`
- Cetak header lalu loop dan cetak setiap todo
- `return` (atau cukup return jumlah)

**Untuk `jumlahSelesai()`:**

- Deklarasi `function jumlahSelesai() { ... }`
- `return todos.filter(t => t.done).length;`

### Cara Mengetik dari 0

1. Di bawah `selesaiTodos`, ketik `function belumSelesai() {`
2. Saring `todos` yang belum selesai ke variabel `filtered`
3. Kalau `filtered` kosong, cetak pesan "Tidak ada tugas yang belum selesai" lalu `return`
4. Cetak header yang memuat jumlah todo belum selesai
5. Loop `for` dan cetak setiap todo (boleh copy dari `tampilkanTodos` dan modifikasi)
6. Tutup `}` function
7. Di bawahnya, buat function `jumlahSelesai()`
8. `return` jumlah todo yang `done`-nya `true` (saring dulu, lalu ambil panjangnya)
9. Tutup `}` function
10. Tes: cetak hasil `jumlahSelesai()`, lalu panggil `belumSelesai()`

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Todo List CLI — Bagian F: Fungsi `belumSelesai()` & `jumlahSelesai()`".
>
> Pertanyaan pemandu: `filter` mengembalikan array, jadi apa yang harus kamu lakukan supaya `jumlahSelesai()` mengembalikan angka?
### Verifikasi

- [ ] `belumSelesai()` menampilkan todo yang `done === false`
- [ ] Kalau semua selesai, muncul "Tidak ada tugas yang belum selesai"
- [ ] `jumlahSelesai()` return number (bukan array)
- [ ] `jumlahSelesai()` cocok dengan jumlah `[x]` di `tampilkanTodos()`

---

## Bagian G: Menu Interaktif (while loop dengan `readline`)

### Penjelasan

Ini bagian yang **menyatukan semuanya**. Kita bikin menu yang muncul
terus-menerus, user pilih angka 1-7, dan setiap pilihan memicu function
yang sesuai.

Triknya: `readline.question` itu **asynchronous** — callback baru jalan
setelah user Enter. Untuk bikin menu **looping**, kita panggil
`tampilkanMenu()` lagi di akhir setiap case (kecuali `Keluar`).

Contoh alur menu:

```
======== MENU TODO ========
1. Lihat Semua Todo
2. Tambah Todo
3. Hapus Todo
4. Tandai Selesai
5. Todo Belum Selesai
6. Statistik
7. Keluar
============================
Pilih menu (1-7):
```

Function `tampilkanMenu()` di-trigger dengan `tampilkanMenu();` di bawah
setup `rl`. Setiap case di `switch` memanggil function yang relevan, lalu
di akhir (kecuali `Keluar`) panggil `tampilkanMenu()` lagi.

### Wajib Ada di Kode Kamu

- Function `tampilkanMenu()` yang berisi `rl.question` + `switch`
- Cetak menu (7 baris pilihan + header + footer)
- Handle 7 case: `'1'` sampai `'7'`
- Case `1` → panggil `tampilkanTodos()`, lalu `tampilkanMenu()`
- Case `2` → minta input task dengan `rl.question` bersarang, lalu panggil `tambahTodos`, cetak hasilnya, lalu `tampilkanMenu()`
- Case `3` → minta input ID, `parseInt`, panggil `hapusTodos`, cetak, lalu `tampilkanMenu()`
- Case `4` → minta input ID, `parseInt`, panggil `selesaiTodos`, cetak, lalu `tampilkanMenu()`
- Case `5` → panggil `belumSelesai()`, lalu `tampilkanMenu()`
- Case `6` → cetak statistik (total, selesai, belum), lalu `tampilkanMenu()`
- Case `7` → `rl.close()`
- `default` → cetak "Pilihan tidak valid", lalu `tampilkanMenu()`
- Panggil `tampilkanMenu()` di paling bawah file

### Cara Mengetik dari 0

1. Di bawah `jumlahSelesai`, ketik `function tampilkanMenu() {`
2. Cetak header menu (7 baris + garis)
3. `rl.question('Pilih menu (1-7): ', (pilihan) => {`
4. `switch (pilihan) {`
5. Untuk case `'1'`: panggil function tampil, lalu panggil `tampilkanMenu()` lagi supaya menu muncul kembali
6. Untuk case `'2'` (lebih kompleks, ada pertanyaan bersarang): minta input task dengan `rl.question` lagi, cetak hasil `tambahTodos`, lalu panggil `tampilkanMenu()` di dalam callback. Kenapa `tampilkanMenu()` tidak boleh ditaruh setelah `rl.question` di luar callback?
7. Ulangi pola untuk case `3` dan `4` (minta ID, `parseInt`, panggil function)
8. Case `'5'`: panggil `belumSelesai()`, lalu menu lagi
9. Case `'6'`: cetak statistik dengan `console.log`, lalu menu lagi
10. Case `'7'`: tutup `rl`. Menu tidak dipanggil lagi, jadi program selesai
11. `default`: cetak pesan pilihan tidak valid, lalu menu lagi
12. Tutup `});` (untuk question) dan `}` (untuk function)
13. **Penting**: panggil `tampilkanMenu();` di paling bawah file agar program mulai

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Todo List CLI — Bagian G: Menu Interaktif".
>
> Pertanyaan pemandu: `rl.question` itu asynchronous, jadi di titik mana tiap case harus memanggil `tampilkanMenu()` supaya menu muncul setelah jawaban diproses, bukan sebelumnya?

### Verifikasi

- [ ] Program jalan: `node 05-todo-list-cli.js` muncul menu
- [ ] Pilih `1` → tampilkan todos, lalu menu muncul lagi
- [ ] Pilih `2` → bisa input task, todo bertambah
- [ ] Pilih `3` → bisa input ID, todo terhapus
- [ ] Pilih `4` → bisa input ID, todo ditandai `[x]`
- [ ] Pilih `5` → hanya tampilkan yang belum selesai
- [ ] Pilih `6` → statistik benar
- [ ] Pilih `7` → program keluar
- [ ] Pilih `9` atau huruf → muncul "Pilihan tidak valid", menu muncul lagi

---

## Ringkasan

**Struktur Data `todos`:**

| Properti | Tipe    | Contoh                       |
| -------- | ------- | ---------------------------- |
| `id`     | number  | `1`, `2`, `3`                |
| `task`   | string  | `"Belajar JavaScript"`       |
| `done`   | boolean | `true` (selesai) / `false` (belum) |

**Method Array yang Dipakai:**

| Method               | Kapan Pakai                       | Contoh                                          |
| -------------------- | --------------------------------- | ----------------------------------------------- |
| `push(obj)`          | Tambah ke akhir array             | `todos.push({ id: 4, task: 'X', done: false })` |
| `find(cek)`          | Cari **1 object** berdasarkan syarat | `todos.find(t => t.id === 1)`                 |
| `findIndex(cek)`     | Cari **posisi** object            | `todos.findIndex(t => t.id === 1)`              |
| `filter(cek)`        | Ambil **beberapa** yang lolos     | `todos.filter(t => !t.done)`                    |
| `splice(i, 1)`       | Hapus 1 item di posisi `i`        | `todos.splice(0, 1)`                            |
| `map(transform)`     | Transform setiap item             | `todos.map(t => t.id)`                          |

**Pola `rl.question` Interaktif:**

```javascript
rl.question('Prompt: ', (jawaban) => {
  // pakai 'jawaban' di sini
  tampilkanMenu(); // panggil lagi untuk looping
});
```

**Konsep Return vs Console.log:**

| Pola                             | Kapan Pakai                                       |
| -------------------------------- | ------------------------------------------------- |
| `return` nilai di dalam function | Kalau nilai akan dipakai di tempat lain           |
| `console.log` di dalam function  | Kalau function hanya untuk efek visual            |
| **Best practice**: pisahkan      | Function = logika, caller yang memutuskan untuk mencetak atau tidak |

**Generate ID Otomatis:**

- Kosong → `1`
- Tidak kosong → `Math.max(...todos.map(t => t.id)) + 1`

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal berikutnya, cek semua ini:

- [ ] Program jalan tanpa error: `node 05-todo-list-cli.js`
- [ ] **Menu muncul** di awal dan setelah setiap aksi (kecuali Keluar)
- [ ] **Pilihan 1** menampilkan semua todo dengan format `1. [ ] Task` atau `1. [x] Task`
- [ ] **Pilihan 2** bisa menambah todo baru; input kosong ditolak dengan error
- [ ] **Todo baru** muncul di pilihan 1 dengan ID yang benar
- [ ] **Pilihan 3** bisa hapus todo berdasarkan ID; ID tidak ditemukan → error
- [ ] **Pilihan 4** bisa tandai selesai; todo berubah dari `[ ]` ke `[x]`
- [ ] **Pilihan 5** hanya menampilkan todo yang belum selesai
- [ ] **Pilihan 6** menampilkan statistik (total, selesai, belum) dengan angka benar
- [ ] **Pilihan 7** keluar dari program
- [ ] **Input tidak valid** (huruf, angka 8-9) → muncul pesan "Pilihan tidak valid"
- [ ] **Tidak ada error merah** di terminal
- [ ] **Function `return` nilai** — bukan `console.log` di dalam function
- [ ] **State konsisten** — todos yang ditambah/hapus/selesai persist sampai program ditutup

---

## Cara Submit

1. Pastikan kodemu tersimpan di salinan starter `latihan-saya/02-javascript/minggu-XX/05-todo-list-cli.js`
2. Jalankan dengan `node 05-todo-list-cli.js`
3. Coba **semua menu** dari 1 sampai 7
4. Pastikan pilihan 2 (tambah) menerima input yang benar
5. Pastikan pilihan 3 (hapus) menolak ID yang tidak ada
6. Pastikan pilihan 4 (selesai) benar-benar mengubah `done` jadi `true`
7. Coba masukkan pilihan tidak valid (huruf, 8, 9) untuk cek error handling
8. Kalau PASS, lanjut ke soal berikutnya

---

## Catatan untuk Pemula

> **`find` vs `findIndex` bingung?** Singkatnya: `find` return **object**
> yang cocok, `findIndex` return **posisi/indeks**-nya. Kalau mau ubah
> property object → pakai `find`. Kalau mau hapus dengan `splice` → pakai
> `findIndex` (karena `splice` butuh angka posisi).

> **`splice` itu method yang merusak array asli.** Setelah `splice`, array
> `todos` langsung berubah — item yang di-splice hilang dari array. Ini
> berbeda dengan `filter` yang membuat **array baru** tanpa mengubah
> yang asli.

> **Kenapa `task.trim()`?** User kadang sengaja atau nggak sengaja ngetik
> spasi di awal/akhir input, misalnya `"   Belajar JS   "`. `trim()`
> membuang spasi di kedua ujung, jadi yang tersimpan cuma `"Belajar JS"`.
> Juga dipakai untuk validasi: `"   ".trim() === ""` → kosong.

> **`readline.question` itu asynchronous.** Callback baru jalan **setelah**
> user Enter. Semua logika yang butuh jawaban user **harus** ada di dalam
> callback. Itulah kenapa di menu, kita panggil `tampilkanMenu()` lagi di
> akhir setiap case — supaya menu tetap muncul.

> **Bedanya `return` di function biasa vs di dalam callback.** `return` di
> function biasa (misal `tambahTodos`) keluar dari function itu. `return`
> di dalam callback `rl.question` cuma keluar dari callback — bukan dari
> `tampilkanMenu`. Itulah kenapa di case `'2'` kita pakai `return;` setelah
> nested `rl.question`: supaya `break` di `switch` tidak langsung jalan
> sebelum nested callback selesai.

> **Jangan `console.log` di dalam function yang `return`.** Kalau function
> kamu `return` string, biarkan caller yang memutuskan mau mencetak atau tidak.
> Ini bikin function **reusable** — bisa dipakai untuk test, untuk
> simpan ke file, untuk dikirim ke API, dst.

> **State vs Output.** `todos` adalah **state** (data asli program).
> `console.log` adalah **output** (cetak ke layar). Fungsi `tampilkanTodos`
> membaca state dan mencetaknya. Fungsi `tambahTodos` mengubah state tapi
> cuma return string konfirmasi. Pemisahan ini penting: kalau kamu
> naro `console.log` di dalam function CRUD, function itu jadi susah
> di-test dan di-reuse.

<!-- markdownlint-enable MD024 MD028 -->
