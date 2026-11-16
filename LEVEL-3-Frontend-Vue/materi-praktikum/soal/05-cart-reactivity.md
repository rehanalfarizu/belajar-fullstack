<!-- markdownlint-disable MD024 MD028 -->

# SOAL 05 — Cart Reactivity

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membedakan **state sumber** dan **state turunan**
- Membuat beberapa `computed` yang saling bergantung (berantai)
- Menghitung agregat dari array (jumlah item, subtotal)
- Menangani pembulatan uang dengan sadar
- Membuktikan sendiri bahwa UI ikut berubah saat data sumber berubah

**Difficulty:** Menengah • **Estimasi:** 45-60 menit

---

## Briefing

Kamu pernah lihat struk belanja minimarket? Isinya: daftar barang, jumlah
item, subtotal, PPN, total. Kasir **tidak** mengetik total secara manual.
Mesin kasir menghitungnya dari daftar barang. Kalau satu barang dibatalkan,
semua angka di bawahnya otomatis berubah.

Bayangkan kalau total diketik manual: kasir lupa update, struk bilang Rp
500.000 padahal barangnya cuma Rp 200.000. Itu namanya **dua sumber
kebenaran** yang tidak sinkron.

Di soal ini, `items` adalah satu-satunya sumber kebenaran. Semua angka lain
adalah rumus.

---

## Cara Kerja Latihan Ini

Starter yang kamu kerjakan:
`LEVEL-3-Frontend-Vue/materi-praktikum/code/05-cart-reactivity.vue`
([buka starter](../code/05-cart-reactivity.vue)).

Alurnya:

1. **Baca penjelasan** tiap bagian
2. **Ketik sendiri** di `TODO(human)`
3. **Verifikasi** — termasuk mengubah data lewat Vue DevTools

Cara menjalankan: [TUGAS.md](../TUGAS.md). Teori: [Reactivity: ref, reactive,
computed](../../materi-teori/02-reactivity-ref-reactive-computed/README.md).

---

## Bagian A: Sumber vs Turunan

### Penjelasan

Sebelum menulis kode, petakan dulu. Tanya untuk setiap angka: "bisa dihitung
dari data lain, tidak?"

| Data | Sumber atau turunan? |
| ---- | -------------------- |
| `items` | Sumber (diisi user / server) |
| `taxRate` | Konstanta |
| `totalItems` | ? |
| `subtotal` | ? |
| `tax` | ? |
| `total` | ? |

Kalau jawabannya "bisa dihitung", dia **wajib** `computed`. Bukan `ref`. Bukan
variabel biasa. Variabel biasa tidak reaktif — dihitung sekali saat komponen
dibuat, lalu basi.

### Wajib Ada di Kode Kamu

- Hanya `items` yang berupa `ref`
- Keempat angka total memakai `computed`

### Cara Mengerjakan

1. Salin tabel di atas ke catatanmu, isi kolom "?"
2. Untuk tiap baris turunan, tulis rumusnya dalam bahasa manusia
3. Baru setelah itu buka starter

### Verifikasi

- [ ] Tabelmu terisi dan kamu bisa menjelaskan tiap baris

---

## Bagian B: `totalItems` dan `subtotal`

### Penjelasan

Keduanya adalah **agregat**: mengubah banyak nilai jadi satu.

- `totalItems` = jumlah semua **quantity**. Hati-hati: bukan jumlah baris.
  Keranjang berisi 1 keyboard + 2 mouse = 3 item, walaupun cuma 2 baris.
- `subtotal` = jumlah dari (harga × quantity) setiap baris.

JavaScript punya beberapa cara mengagregasi array: loop `for...of` dengan
variabel penampung, atau method array yang "melipat" array jadi satu nilai.
Mulai dari yang kamu paling paham. Loop biasa itu sah.

### Wajib Ada di Kode Kamu

- `totalItems` menjumlahkan quantity
- `subtotal` menjumlahkan harga × quantity
- Keranjang kosong menghasilkan 0, bukan error

### Cara Mengerjakan

1. Hitung manual dulu dengan data starter: totalItems = ?, subtotal = ?
2. Tulis kodenya
3. Bandingkan hasil di layar dengan hitungan manualmu

### Verifikasi

- [ ] totalItems tampil 3
- [ ] subtotal tampil Rp 700.000

---

## Bagian C: `tax` dan `total` (Computed Berantai)

### Penjelasan

`tax` bergantung pada `subtotal`. `total` bergantung pada `subtotal` dan
`tax`. Computed boleh membaca computed lain — Vue melacak rantainya. Ubah
`items`, maka `subtotal` dihitung ulang, lalu `tax`, lalu `total`.

Jangan menghitung ulang subtotal dari nol di dalam `total`. Itu duplikasi
rumus: kalau suatu hari rumus subtotal berubah (misal ada diskon), kamu harus
ingat mengubah dua tempat.

**Soal pembulatan:** 11% dari angka tertentu bisa menghasilkan desimal.
Rupiah tidak punya sen. Putuskan cara membulatkan (ke atas, ke bawah, atau ke
terdekat) dan **tulis alasanmu** di komentar. Di dunia nyata, aturan ini
datang dari tim finance, bukan selera developer.

### Wajib Ada di Kode Kamu

- `tax` dihitung dari `subtotal` dan `taxRate`, hasil bilangan bulat
- `total` dihitung dari dua computed lain
- Komentar singkat menjelaskan pilihan pembulatan

### Cara Mengerjakan

1. Hitung manual: 11% dari 700.000 = ?
2. Tulis `tax`, lalu `total`
3. Cari fungsi pembulatan di objek `Math` yang sesuai keputusanmu

### Verifikasi

- [ ] Pajak tampil Rp 77.000
- [ ] Total tampil Rp 777.000

---

## Bagian D: Render Struk

### Penjelasan

Template menampilkan daftar barang dan ringkasan angka. Untuk pasangan label
dan nilai (Subtotal: Rp ...), HTML punya elemen *description list* (`<dl>`,
`<dt>`, `<dd>`) yang semantik — screen reader membacanya sebagai pasangan.

Format Rupiah: kamu sudah pernah membuat formatter di soal 03. Buat helper
kecil di script supaya template tetap bersih.

### Wajib Ada di Kode Kamu

- List item dengan `v-for` dan `:key` id
- Nama dan quantity tiap item
- Jumlah item, subtotal, pajak, total — tiga terakhir dalam format Rupiah

### Cara Mengerjakan

1. Render daftar item dulu, pastikan tampil
2. Tambahkan ringkasan angka
3. Pasang formatter

### Verifikasi

- [ ] Daftar dua barang tampil
- [ ] Empat angka ringkasan tampil dengan format benar

---

## Bagian E: Buktikan Reaktivitasnya

### Penjelasan

Kode yang benar harus bereaksi saat data sumber berubah. Kamu belum punya
tombol edit, jadi pakai Vue DevTools: ia bisa mengubah state komponen secara
langsung.

### Wajib Ada di Kode Kamu

- Tidak ada kode tambahan — ini bagian uji

### Cara Mengerjakan

1. Buka Vue DevTools, pilih komponen, cari `items`
2. Ubah quantity Mouse dari 2 ke 5
3. Perhatikan keempat angka di layar
4. (Opsional) tambahkan tombol "+" per item untuk menambah quantity, lalu uji lagi

### Verifikasi

- [ ] Mengubah quantity di DevTools langsung memperbarui semua angka
- [ ] Hitung manual hasil barunya — cocok?

---

## Edge Case yang Harus Kamu Coba

- [ ] Kosongkan `items` (array kosong) → semua angka 0, tidak error
- [ ] Harga yang membuat pajak berdesimal (misal 175.555) → pajak tetap bulat
- [ ] Quantity 0 di salah satu item → totalItems dan subtotal tetap masuk akal

---

## Petunjuk Bertingkat

**Petunjuk 1:** Kalau angka tidak update saat `items` diubah, cek apakah kamu
menghitung di dalam `computed` atau di variabel biasa di luar computed.

**Petunjuk 2:** Saat mengagregasi, selalu mulai dari nilai awal 0. Untuk
subtotal, hal yang dijumlahkan per baris adalah hasil kali, bukan harga saja.

**Petunjuk 3:** Di dalam computed `total`, baca `.value` dari dua computed
lain. Computed juga ref — di script butuh `.value`.

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] Semua `TODO(human)` terisi
- [ ] Hanya `items` yang state; sisanya computed
- [ ] Angka sesuai hitungan manual (3 item, Rp 700.000, Rp 77.000, Rp 777.000)
- [ ] Ada komentar alasan pembulatan
- [ ] Mengubah data di DevTools memperbarui UI
- [ ] Console bersih

---

## Refleksi

1. Apa bahayanya menyimpan `total` di `ref` lalu meng-update-nya dengan `watch`?
2. Kenapa `computed` di-cache, dan kapan cache itu dihitung ulang?
3. Kalau nanti ada diskon per item, bagian mana saja yang perlu diubah?

---

## Cara Submit

1. Centang semua checklist
2. Tulis refleksi
3. Sudah jalan? Baru boleh bandingkan dengan `../contoh/05-cart-reactivity.vue`.
   Baca dulu [aturan folder contoh](../contoh/README.md)
4. Lanjut ke [Soal 06 — Products Lifecycle](06-products-lifecycle.md)

---

## Catatan untuk Pemula

> **Satu sumber kebenaran.** Kalau kamu bisa menghitungnya, jangan menyimpannya.
> **Uang dan floating point.** `0.1 + 0.2` di JavaScript bukan `0.3`. Untuk Rupiah tanpa sen, bekerja dengan bilangan bulat dan bulatkan di satu tempat yang jelas.

<!-- markdownlint-enable MD024 MD028 -->
