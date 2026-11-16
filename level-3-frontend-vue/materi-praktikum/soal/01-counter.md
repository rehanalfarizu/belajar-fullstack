<!-- markdownlint-disable MD024 MD028 -->

# SOAL 01 — Counter

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membuat state reaktif dengan `ref()`
- Membedakan kapan pakai `.value` (di script) dan kapan tidak (di template)
- Memasang event handler dengan `@click`
- Membuat nilai turunan dengan `computed()`
- Menjaga aturan bisnis sederhana (angka tidak boleh negatif)

**Difficulty:** Pemula • **Estimasi:** 30-45 menit

---

## Briefing

Bayangkan kamu jaga pintu masuk acara seminar. Di tanganmu ada **alat hitung
klik** (tally counter). Tiap ada orang masuk, kamu klik "+". Ada yang keluar,
klik "-". Selesai acara, tekan reset.

Alat itu tidak mungkin menunjukkan "-3 orang", kan? Ruangan kosong ya kosong.
Panitia juga minta label cepat: ruangan **Kosong**, **Sedikit**, atau
**Banyak**, supaya mereka tidak perlu baca angkanya.

Itulah yang kamu bangun: counter kecil, tapi isinya inti Vue — **state
berubah, tampilan ikut berubah sendiri**.

---

## Cara Kerja Latihan Ini

Starter yang kamu kerjakan:
`level-3-frontend-vue/materi-praktikum/code/01-counter.vue`
([buka starter](../code/01-counter.vue)).

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan** — pahami konsepnya dulu
2. **Ketik sendiri** — cari `TODO(human)` di starter, isi pakai kata-katamu
   sendiri dalam bentuk kode (JANGAN copy-paste dari mana pun)
3. **Verifikasi** — jalankan, klik-klik, cocokkan dengan checklist

Cara menjalankan starter (buat project Vite, salin file ke `src/`) ada di
[TUGAS.md](../TUGAS.md). Teori pendukung: [Vue dan Template
Syntax](../../materi-teori/01-vue-dan-template-syntax/README.md) dan
[Reactivity](../../materi-teori/02-reactivity-ref-reactive-computed/README.md).

Kamu **tidak akan diberi kode jadi**. Tujuannya biar kamu terbiasa berpikir
"data apa yang berubah, dan apa akibatnya", bukan menyalin.

---

## Bagian A: State dengan `ref()`

### Penjelasan

`ref(0)` membuat "kotak" berisi angka 0. Kotak ini spesial: Vue mengawasinya.
Begitu isinya berubah, semua bagian template yang memakai kotak itu ikut
digambar ulang.

Aturan penting:

- Di `<script setup>`, isi kotak dibaca dan diubah lewat `.value`
- Di `<template>`, cukup tulis namanya — Vue membuka kotaknya otomatis

Starter sudah membuat `count`. Tugasmu memastikan kamu paham kenapa bentuknya
begitu.

### Wajib Ada di Kode Kamu

- `count` tetap dibuat dengan `ref`, nilai awal 0
- Semua perubahan `count` di script memakai `.value`

### Cara Mengerjakan

1. Buka starter, baca baris `const count = ref(0);`
2. Coba eksperimen: di template ubah sementara `{{ count }}` jadi
   `{{ count.value }}`. Apa yang tampil? Kembalikan lagi.
3. Tulis di catatanmu: kenapa di template tidak perlu `.value`?

### Verifikasi

- [ ] Halaman menampilkan angka 0 saat pertama dibuka
- [ ] Kamu bisa menjelaskan beda `count` dan `count.value` dengan kalimatmu sendiri

---

## Bagian B: Tombol Tambah dan Reset

### Penjelasan

`@click="increment"` artinya: "kalau tombol ini diklik, panggil fungsi
`increment`". Fungsi itu cukup **mengubah state**. Kamu tidak perlu menyentuh
DOM sama sekali — tidak ada `document.querySelector`, tidak ada
`textContent`. Ubah datanya, Vue yang urus tampilannya.

### Wajib Ada di Kode Kamu

- Fungsi `increment` menambah `count` sebanyak 1
- Fungsi `reset` mengembalikan `count` ke nilai awal
- Tidak ada manipulasi DOM manual

### Cara Mengerjakan

1. Cari `TODO(human)` di `increment`
2. Pikirkan: "nilai baru = nilai lama ditambah satu". Tulis itu dalam kode
3. Lakukan hal serupa untuk `reset`
4. Save, lihat browser (Vite akan reload otomatis)

### Verifikasi

- [ ] Klik "+" tiga kali → angka jadi 3
- [ ] Klik "Reset" → angka kembali 0
- [ ] Console DevTools (F12) bersih, tidak ada error merah

---

## Bagian C: Tombol Kurang yang Tidak Bisa Negatif

### Penjelasan

Ini aturan bisnis pertamamu. User bisa klik "-" sebanyak apa pun, tapi data
tidak boleh masuk ke kondisi mustahil. Ada dua lapis penjagaan yang bisa kamu
pakai:

- **Lapis data** — fungsi `decrement` sendiri menolak turun di bawah 0
- **Lapis tampilan** — tombol "-" dinonaktifkan saat sudah 0, supaya user
  paham kenapa tidak terjadi apa-apa

Lapis data itu wajib. Lapis tampilan itu bonus UX yang bagus. Kenapa lapis data
wajib? Karena tombol bukan satu-satunya jalan mengubah state (nanti ada
keyboard, composable, store, dll).

### Wajib Ada di Kode Kamu

- `decrement` tidak pernah membuat `count` < 0
- (Disarankan) tombol "-" `disabled` saat `count` 0, memakai binding atribut

### Cara Mengerjakan

1. Tulis dulu di kertas: "kalau count sudah 0, maka …; kalau belum, maka …"
2. Terjemahkan kalimat itu ke dalam `decrement`
3. Untuk tombol: ingat bahwa atribut HTML bisa diikat ke ekspresi dengan `:`
   (singkatan `v-bind`). Atribut apa yang membuat tombol tidak bisa diklik?

### Verifikasi

- [ ] Dari 0, klik "-" lima kali → angka tetap 0
- [ ] Dari 2, klik "-" tiga kali → angka berhenti di 0
- [ ] (Kalau kamu pasang disabled) tombol "-" terlihat abu-abu saat 0

---

## Bagian D: Status dengan `computed()`

### Penjelasan

Status "Kosong / Sedikit / Banyak" itu **bukan data baru**. Dia cuma hasil
membaca `count`. Kalau kamu simpan status di `ref` terpisah, kamu harus ingat
meng-update dua tempat setiap kali — dan suatu hari pasti lupa.

`computed()` menyelesaikan itu: kamu tulis **rumusnya sekali**, Vue menghitung
ulang otomatis setiap kali `count` berubah. Analogi: rumus di sel Excel. Kamu
tidak mengetik ulang hasil penjumlahan, kamu menulis `=SUM(...)`.

Aturannya:

| `count` | Status |
| ------- | ------ |
| 0 | Kosong |
| 1 sampai 4 | Sedikit |
| 5 atau lebih | Banyak |

### Wajib Ada di Kode Kamu

- `status` dibuat dengan `computed`
- Fungsi di dalam `computed` **hanya membaca** `count` dan me-return string
- Tidak ada `ref` tambahan untuk status

### Cara Mengerjakan

1. Lihat tabel aturan. Urutkan pengecekan dari kasus paling spesifik
2. Di dalam computed, baca nilai count (ingat `.value`, ini di script)
3. Return string yang sesuai

### Verifikasi

- [ ] count 0 → "Kosong"
- [ ] count 1 dan 4 → "Sedikit"
- [ ] count 5 dan 10 → "Banyak"
- [ ] Setelah reset, status langsung kembali "Kosong" tanpa kode tambahan

---

## Edge Case yang Harus Kamu Coba

- [ ] Klik "-" berkali-kali dengan cepat saat 0
- [ ] Tepat di batas: 4 → 5 (Sedikit → Banyak) dan 5 → 4 (balik lagi)
- [ ] Navigasi pakai keyboard saja (Tab lalu Enter/Spasi) — semua tombol bisa dipakai?
- [ ] Nyalakan screen reader atau cek Elements: `<output aria-live="polite">`
      ada di DOM? (Itu yang membuat pembaca layar mengumumkan perubahan angka.)

---

## Petunjuk Bertingkat

Buka satu per satu, hanya kalau macet lebih dari 15 menit.

**Petunjuk 1:** Kalau angka tidak berubah saat diklik, cek apakah kamu
mengubah `count` atau `count.value`. Di script, `count` itu kotaknya, bukan
isinya.

**Petunjuk 2:** Untuk `decrement`, ada dua gaya: pakai `if` sebelum mengurangi,
atau pakai fungsi bawaan `Math` yang memilih nilai terbesar dari dua angka.
Keduanya benar — pilih yang paling bisa kamu jelaskan.

**Petunjuk 3:** Untuk `status`, kalau kamu cek "Banyak" duluan baru
"Sedikit", pastikan batasnya tidak tumpang tindih. Coba telusuri dengan count
= 0, 4, dan 5 di kepala sebelum menjalankan.

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] Semua `TODO(human)` sudah terisi
- [ ] count tidak pernah negatif dalam kondisi apa pun
- [ ] Status benar di semua batas (0, 1, 4, 5)
- [ ] Tidak ada `document.querySelector` / manipulasi DOM manual
- [ ] Console bersih
- [ ] Vue DevTools: kamu bisa melihat `count` berubah di panel komponen

---

## Refleksi

Tulis jawabanmu di catatan (2-3 kalimat per pertanyaan):

1. Kenapa `status` lebih baik jadi `computed` daripada `ref` yang di-update manual?
2. Kalau suatu hari ada tombol "+10", di mana kamu taruh aturan "tidak boleh
   negatif" supaya tidak perlu ditulis ulang?
3. Apa bedanya jaga-jaga di fungsi (`decrement`) dengan jaga-jaga di tombol (`disabled`)?

---

## Cara Submit

1. Pastikan semua checklist di atas tercentang
2. Simpan file, catat jawaban refleksi
3. Sudah jalan? Baru boleh bandingkan dengan `../contoh/01-counter.vue`.
   Baca dulu [aturan folder contoh](../contoh/README.md). Kalau caramu beda
   tapi benar, itu bagus — tulis kenapa kamu memilih caramu
4. Lanjut ke [Soal 02 — Product Filter](02-product-filter.md)

---

## Catatan untuk Pemula

> **Lupa `.value` adalah bug Vue nomor satu.** Kalau ada yang aneh, cek itu dulu.
> **Vite punya hot reload.** Save file, browser update sendiri. Kalau tidak, lihat terminal — biasanya ada error kompilasi.
> **Satu konsep per bagian.** Jangan loncat ke Bagian D sebelum B jalan.

<!-- markdownlint-enable MD024 MD028 -->
