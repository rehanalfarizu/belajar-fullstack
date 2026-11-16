# Soal 01: Refactor Program Kasir

**Kapan:** Minggu 7, setelah semua latihan JavaScript selesai.
**Bahan:** [kode spaghetti](../code/01-kasir-spaghetti.js), teori
[Kode yang Rapi](../../../materi-teori/06-kode-rapi-dan-struktur-folder.md) bagian 1–3.
**Waktu:** 2 sesi.
**Tulis di:** `latihan-saya/02-javascript/minggu-07/kasir-rapi.js`

Refactor artinya mengubah struktur kode **tanpa mengubah perilakunya**. Program
kasir di `code/` sudah benar hasilnya, tapi berantakan. Tugasmu merapikannya.

## Aturan utama

Output harus **identik**, sampai spasi terakhir. Cek dengan:

```bash
node path/ke/01-kasir-spaghetti.js > sebelum.txt
node kasir-rapi.js > sesudah.txt
diff sebelum.txt sesudah.txt     # tidak boleh ada output apa pun
```

Kalau `diff` mengeluarkan baris, berarti ada perilaku yang berubah. Cari dan
perbaiki sebelum lanjut.

## Langkah

Kerjakan bertahap. Setelah setiap langkah, jalankan `diff` dan commit.

1. **Baca dulu tanpa mengubah.** Tulis di jurnal: apa saja aturan bisnisnya?
   (Ada 6: diskon member, promo, pajak, ongkir, bonus, dan satu urutan
   penghitungan yang penting.)
2. **Ganti nama.** `k`, `s`, `d`, `p`, `o`, `mi`, `m`, `kd` dan nama properti
   `n`, `h`, `q`, `kat` jadi nama yang menjelaskan. Ganti `var` jadi
   `const`/`let`, dan `==` jadi `===`.
3. **Buang angka ajaib.** `0.1`, `0.05`, `100000`, `"HEMAT10"`, `50000`,
   `10000`, `0.11`, `75000`, `8000`, `5` jadi konstanta bernama.
4. **Pecah fungsi.** Minimal: hitung subtotal, diskon member, potongan promo,
   ongkir, jumlah minuman. Satu fungsi satu tugas.
5. **Pisahkan hitungan dari tampilan.** Buat satu fungsi yang mengembalikan
   object struk (tanpa `console.log`), dan satu fungsi lain yang mencetaknya.
6. **Ratakan if bersarang** dengan guard clause atau operator ternary.
7. **Format dengan Prettier.**

## Pertanyaan di jurnal

- Di langkah mana `diff` sempat gagal, dan kenapa?
- Kenapa urutan "diskon member dulu, baru cek promo" penting? Apa yang berubah
  kalau dibalik?
- Fungsi mana yang sekarang bisa kamu tes tanpa menjalankan seluruh program?

## Bonus

Tulis 4 test dengan `node:test` untuk fungsi-fungsi hitungmu. Wajib ada test
untuk nilai batas, misalnya belanja tepat 100.000 dan tepat 75.000. Jalankan
dengan `node --test`.

Bandingkan dengan [contoh](../contoh/01-kasir-rapi.js) setelah selesai. Nama dan
pembagian fungsimu boleh berbeda; yang penting output identik dan setiap fungsi
mudah dijelaskan.
