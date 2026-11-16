# TUGAS — Latihan Kode Rapi: Refactor Program Kasir

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. File `kasir-rapi.js` yang output-nya **identik** dengan program spaghetti, sampai spasi terakhir.
2. Nama variabel yang menjelaskan diri sendiri, konstanta bernama untuk semua angka ajaib, dan fungsi-fungsi kecil yang masing-masing punya satu tugas.
3. Riwayat commit kecil-kecil, satu per langkah refactor.
4. (Bonus) Minimal 4 test dengan `node:test`, termasuk test nilai batas.

---

## Daftar Soal

| No | Soal | File awal (dibaca, tidak diedit) | Tulis hasilmu di | Estimasi |
| --- | --- | --- | --- | --- |
| 01 | [Refactor Program Kasir](soal/01-refactor-kasir.md) (Minggu 7) | `level-0-dasar-engineering/materi-praktikum/02-latihan-kode-rapi/code/01-kasir-spaghetti.js` | `latihan-saya/02-javascript/minggu-07/kasir-rapi.js` (test bonus: `kasir-rapi.test.js` di folder yang sama) | 2 sesi |

Teori yang dipakai: [Kode yang Rapi dan Folder yang Teratur](../../materi-teori/06-kode-rapi-dan-struktur-folder.md) bagian 1-3.

---

## Langkah Pengerjaan

1. **Simpan output asli dulu.** Ini "kunci jawaban" yang kamu buat sendiri:

   ```bash
   node level-0-dasar-engineering/materi-praktikum/02-latihan-kode-rapi/code/01-kasir-spaghetti.js > sebelum.txt
   ```

2. **Salin file spaghetti** ke `latihan-saya/02-javascript/minggu-07/kasir-rapi.js`. Commit salinan yang
   belum diubah, supaya ada titik awal.
3. **Baca tanpa mengubah.** Di jurnal, tulis 6 aturan bisnis yang kamu temukan dengan bahasamu sendiri.
   Jangan lanjut sebelum keenamnya ketemu.
4. **Ikuti 7 langkah di soal satu per satu.** Setelah **setiap** langkah: jalankan `diff`, dan kalau
   kosong, commit. Kalau tidak kosong, perbaiki dulu.
5. **Jawab 3 pertanyaan jurnal** di soal.
6. **Bonus test**, lalu baru bandingkan dengan `contoh/`.

---

## Petunjuk Kalau Macet

### Tingkat 1 — `diff` tidak kosong

- Lihat baris pertama yang berbeda di output `diff`. Tanda `<` dari `sebelum.txt`, tanda `>` dari hasilmu.
- Kembali ke commit terakhir yang `diff`-nya masih kosong (`git diff` untuk melihat apa yang kamu ubah
  sejak itu). Masalahnya pasti ada di perubahan sejak commit itu. Ini alasan commit kecil-kecil.
- Ganti `==` jadi `===` membuat hasil berubah? Cetak `typeof` kedua sisi perbandingan itu. Mungkin ada string yang dibandingkan dengan angka.

### Tingkat 2 — tidak tahu nama yang cocok

- Cari di mana variabel itu dipakai dan apa yang dilakukan padanya. Nama yang bagus menjawab "ini isinya
  apa", bukan "ini tipe datanya apa".
- Belum yakin? Pakai nama panjang dulu. Memendekkan nama nanti lebih gampang daripada menebak arti `kd`.

### Tingkat 3 — tidak tahu cara memecah fungsi

- Cari blok kode yang bisa diberi judul komentar ("hitung ongkir"). Blok itu kandidat fungsi.
- Tanya: data apa yang dibutuhkan blok ini (jadi parameter) dan apa hasilnya (jadi `return`)? Kalau
  blok itu mengubah variabel di luar dirinya, itu tanda pemisahannya belum bersih.
- Urutan perhitungan penting. Sebelum memindahkan blok, tulis dulu urutan aslinya di jurnal.

### Tingkat 4 — dokumentasi resmi

- [Node.js test runner](https://nodejs.org/api/test.html) dan [assert](https://nodejs.org/api/assert.html).
- [MDN Guard clause / early return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return).
- [Prettier CLI](https://prettier.io/docs/en/cli.html).

---

## Cara Mengecek Hasil Sendiri

Dari root repo:

```bash
node level-0-dasar-engineering/materi-praktikum/02-latihan-kode-rapi/code/01-kasir-spaghetti.js > sebelum.txt
node latihan-saya/02-javascript/minggu-07/kasir-rapi.js > sesudah.txt
diff sebelum.txt sesudah.txt && echo "IDENTIK"
```

Yang harus terjadi: tidak ada baris perbedaan, dan muncul `IDENTIK`.

Cek sisa kebiasaan lama (hasil yang diharapkan: tidak ada baris yang muncul):

```bash
grep -nE "\bvar\b|[^=!]==[^=]" latihan-saya/02-javascript/minggu-07/kasir-rapi.js
```

Cek format:

```bash
npx prettier --check latihan-saya/02-javascript/minggu-07/kasir-rapi.js
```

Jalankan test bonus:

```bash
node --test latihan-saya/02-javascript/minggu-07/
```

Hasil yang diharapkan: `fail 0`, dan ada test untuk belanja tepat 100.000 dan tepat 75.000.

Terakhir, uji diri: tunjuk satu fungsi secara acak, jelaskan tugasnya dalam satu kalimat tanpa kata "dan".
Kalau butuh "dan", fungsi itu mungkin masih mengerjakan dua hal.

---

## Tentang `contoh/`

`contoh/01-kasir-rapi.js` dan `contoh/01-kasir-rapi.test.js` adalah salah satu hasil refactor. Buka hanya
setelah versimu lolos `diff`. Nama dan pembagian fungsimu boleh berbeda; yang penting output identik dan
setiap fungsi mudah dijelaskan.
