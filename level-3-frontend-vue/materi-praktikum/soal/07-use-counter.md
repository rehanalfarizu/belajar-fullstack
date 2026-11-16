<!-- markdownlint-disable MD024 MD028 -->

# SOAL 07 — Composable `useCounter` + Unit Test

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menjelaskan apa itu composable dan kenapa namanya diawali `use`
- Memindahkan logic stateful dari komponen ke fungsi yang bisa dipakai ulang
- Mendesain public API kecil (apa yang di-return, apa yang disembunyikan)
- Memvalidasi parameter fungsi dan memilih cara gagal yang jelas
- Menulis unit test sendiri dengan Vitest

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Di soal 01 kamu bikin counter di dalam satu komponen. Sekarang bayangkan ada
tiga tempat yang butuh counter: jumlah barang di keranjang, jumlah tamu
reservasi, jumlah tiket. Copy-paste tiga kali? Nanti kalau ada bug, kamu harus
benerin di tiga tempat.

Composable itu seperti **resep masakan**. Resepnya ditulis sekali, tapi tiap
dapur yang memakainya punya panci sendiri. Tiap komponen yang memanggil
`useCounter()` dapat count-nya sendiri, tidak saling ganggu.

---

## Cara Kerja Latihan Ini

1. **Baca teori dulu** — [Lifecycle dan Composable](../../materi-teori/04-lifecycle-dan-composable/README.md)
   dan [Reactivity](../../materi-teori/02-reactivity-ref-reactive-computed/README.md)
2. **Buka starter** — `level-3-frontend-vue/materi-praktikum/code/07-use-counter.js`
   ([buka file](../code/07-use-counter.js)), cari semua `TODO(human)`
3. **Siapkan project** — ikuti [TUGAS.md](../TUGAS.md). Saat `npm create vue@latest`,
   **pilih Vitest** di daftar fitur supaya test runner langsung siap. Simpan
   starter di `src/composables/useCounter.js`
4. **Ketik sendiri** — jangan copy-paste
5. **Verifikasi** — pakai checklist tiap bagian

Kamu **tidak akan diberi kode jadi**, termasuk kode test-nya.

---

## Bagian A: Logic Dasar Counter

### Penjelasan

Isinya mirip soal 01, bedanya sekarang ada dua parameter: `initial` (nilai
awal) dan `minimum` (batas bawah). Semua aturan harus memakai parameter itu,
bukan angka 0 yang di-hardcode.

### Wajib Ada di Kode Kamu

- `increment` menaikkan count satu
- `decrement` menurunkan count satu, tapi tidak pernah di bawah `minimum`
- `reset` mengembalikan ke `initial`, **bukan** ke 0
- `isMinimum` adalah computed yang true saat count sama dengan `minimum`

### Cara Mengerjakan

1. Isi TODO satu per satu
2. Untuk `decrement`, pikirkan dua cara: pakai `if`, atau pakai fungsi `Math`
   yang memilih angka lebih besar. Pilih yang menurutmu paling mudah dibaca

### Verifikasi

- [ ] `useCounter(5, 3)` lalu decrement 5x → count berhenti di 3
- [ ] `useCounter(5, 3)` lalu increment 2x lalu reset → count jadi 5

---

## Bagian B: Validasi Parameter

### Penjelasan

Fungsi yang dipakai banyak orang harus jelas saat dipakai salah. Apa yang
seharusnya terjadi kalau orang memanggil `useCounter('lima')` atau
`useCounter(1, 10)` (initial lebih kecil dari minimum)?

Ada dua pilihan: **lempar error** (gagal keras, ketahuan cepat) atau **koreksi
diam-diam** (aplikasi tetap jalan tapi bug tersembunyi). Untuk kesalahan
programmer, biasanya gagal keras lebih baik. Analogi: lebih baik alarm mobil
bunyi saat pintu belum tertutup, daripada pintu kebuka di jalan tol.

### Wajib Ada di Kode Kamu

- Pengecekan bahwa `initial` dan `minimum` adalah angka yang valid
  (ingat `NaN` dan `Infinity` juga bertipe number)
- Pengecekan bahwa `initial` tidak lebih kecil dari `minimum`
- Pesan error yang menjelaskan apa yang salah

### Cara Mengerjakan

1. Cari di MDN fungsi bawaan `Number` yang bisa menolak `NaN` dan `Infinity`
   sekaligus
2. Pilih tipe error yang cocok (ada `TypeError` dan `RangeError`, baca bedanya)
3. Tulis di komentar alasan kamu memilih lempar error atau koreksi

### Verifikasi

- [ ] `useCounter('a')` melempar error dengan pesan jelas
- [ ] `useCounter(1, 10)` melempar error
- [ ] `useCounter()` tanpa argumen tetap jalan (default 0, 0)

---

## Bagian C: Public API yang Kecil

### Penjelasan

Yang di-return dari composable adalah "kontrak" ke pemakainya. Return hanya:
`count`, `isMinimum`, `increment`, `decrement`, `reset`. Jangan ikut me-return
`initial` atau variabel internal lain. Makin kecil kontraknya, makin bebas kamu
mengubah isi dalamnya nanti.

### Wajib Ada di Kode Kamu

- Objek yang di-return berisi tepat lima nama di atas
- Composable bisa dipakai dua kali di satu komponen dan keduanya independen

### Cara Mengerjakan

1. Buat komponen kecil yang memanggil `useCounter` **dua kali** (misal dewasa
   dan anak-anak untuk reservasi)
2. Tampilkan keduanya dengan tombol masing-masing

### Verifikasi

- [ ] Menekan tombol counter A tidak mengubah counter B
- [ ] Tombol "-" bisa di-disable memakai `isMinimum`

---

## Bagian D: Tulis Unit Test Sendiri (Vitest)

### Penjelasan

Unit test adalah "satpam otomatis": setiap kali kamu ubah kode, dia cek apakah
perilaku lama masih benar. Composable cocok dites karena ia cuma fungsi. Kamu
bisa memanggilnya langsung di test tanpa merender komponen.

Di Vitest kamu akan pakai `describe`, `it` (atau `test`), dan `expect`. Baca
contoh resminya di [vitest.dev](https://vitest.dev/guide/), lalu tulis test-mu
sendiri.

### Wajib Ada di Kode Kamu

File `src/composables/__tests__/useCounter.spec.js` (atau lokasi yang dibuat
create-vue) dengan **minimal** test untuk kasus ini:

- Nilai awal count sama dengan `initial`
- Increment menaikkan count
- Decrement tidak pernah menembus `minimum`
- `isMinimum` berubah dari true ke false setelah increment
- Reset kembali ke `initial` (bukan 0) setelah beberapa perubahan
- Parameter bukan angka melempar error
- `initial` lebih kecil dari `minimum` melempar error
- Dua pemanggilan `useCounter` tidak saling berbagi state

### Cara Mengerjakan

1. Tulis daftar kasus di atas sebagai judul `it(...)` dulu, isi kosong
2. Isi satu per satu. Ingat: count adalah ref, jadi di JavaScript dibaca
   lewat `.value`
3. Untuk kasus "melempar error", cari di dokumentasi Vitest matcher untuk
   error
4. Jalankan `npm run test:unit`

### Verifikasi

- [ ] Semua test hijau
- [ ] **Uji test-mu**: sengaja rusak `reset` supaya kembali ke 0. Minimal satu
      test harus jadi merah. Kalau tetap hijau, test-mu belum cukup
- [ ] Kembalikan kode, test hijau lagi

---

## Edge Case yang Harus Kamu Coba

- `minimum` negatif, misal `useCounter(0, -5)` (suhu bisa minus)
- `initial` sama dengan `minimum` → `isMinimum` langsung true
- Angka desimal sebagai `initial`. Mau diizinkan atau tidak? Putuskan dan tulis
  alasannya
- `NaN` sebagai `minimum`

---

## Petunjuk Bertingkat

### Petunjuk 1

Composable cuma fungsi JavaScript biasa yang kebetulan memakai `ref` dan
`computed` di dalamnya. Tidak ada sihir khusus.

### Petunjuk 2

Validasi taruh di paling atas fungsi, sebelum `ref` dibuat. Kalau input salah,
tidak ada gunanya membuat state.

### Petunjuk 3

Untuk test "dua instance independen": panggil composable dua kali, ubah salah
satunya, lalu periksa yang lain masih di nilai awalnya.

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] Semua TODO di starter terisi
- [ ] Minimal 8 test, semuanya hijau
- [ ] Test terbukti bisa gagal saat kode sengaja dirusak
- [ ] Komponen demo memakai composable dua kali tanpa saling ganggu

---

## Refleksi

1. Apa bedanya composable dengan fungsi helper biasa (misal `formatRupiah`)?
2. Kenapa lebih baik test perilaku (count berubah) daripada detail internal?
3. Kapan kamu **tidak** perlu bikin composable?

---

## Cara Submit / Lanjut

1. Commit kode + file test
2. Lanjut ke [soal 08 — Vue Router](08-router.md)

---

## Sudah Jalan? Baru Boleh Bandingkan dengan Contoh

Baca dulu [aturan folder contoh](../contoh/README.md). Contoh hanya berisi
composable, tanpa test. Test-mu adalah karyamu sendiri.

<!-- markdownlint-enable MD024 MD028 -->
