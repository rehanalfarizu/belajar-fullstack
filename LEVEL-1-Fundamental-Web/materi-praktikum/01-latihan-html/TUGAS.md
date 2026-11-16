# TUGAS — Latihan HTML

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Sepuluh halaman HTML buatanmu sendiri, dari biodata sederhana sampai halaman e-commerce tanpa CSS.
2. Semua halaman lolos validator (tidak ada error dari `html-validate` atau W3C Validator).
3. Kebiasaan mengecek struktur halaman lewat DevTools, bukan cuma "kelihatannya sudah benar".

---

## Daftar Soal

Kerjakan berurutan. Soal belakang memakai konsep dari soal depan.

| No | Soal | File yang kamu edit | Estimasi |
| --- | --- | --- | --- |
| 01 | [Biodata Diri](soal/01-form-diri.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/01-form-diri.html` | 20-30 menit |
| 02 | [Artikel Blog Semantic](soal/02-artikel-blog.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/02-artikel-blog.html` | 45-60 menit |
| 03 | [Tabel Jadwal](soal/03-tabel-jadwal.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/03-tabel-jadwal.html` | 45-60 menit |
| 04 | [Form Pendaftaran](soal/04-form-pendaftaran.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/04-form-pendaftaran.html` | 60-90 menit |
| 05 | [Halaman Portfolio + Multimedia](soal/05-halaman-portfolio.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/05-halaman-portfolio.html` | 60-90 menit |
| 06 | [Layout Artikel 2 Kolom](soal/06-layout-artikel.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/06-layout-artikel.html` | 60-90 menit |
| 07 | [Navigasi & Jenis Link](soal/07-navigasi-dropdown.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/07-navigasi-dropdown.html` | 45-60 menit |
| 08 | [SEO & Accessibility](soal/08-seo-accessibility.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/08-seo-accessibility.html` | 60-90 menit |
| 09 | [Form Lanjutan & Validasi Browser](soal/09-form-lanjutan.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/09-form-lanjutan.html` | 60-90 menit |
| 10 | [Document Flow: Block vs Inline](soal/10-document-flow.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/10-document-flow.html` | 60-90 menit |

Total kira-kira 9-13 jam. Jangan dipaksa selesai sehari.

### Di mana menulis kodenya?

Soal menyuruh kamu mengisi `TODO(human)` langsung di file `code/`. Repo ini juga punya aturan
[latihan-saya](../../../latihan-saya/README.md): bahan di `LEVEL-*` tidak diedit, kode kamu ada di
`latihan-saya/`. Pilih salah satu dan konsisten. Kalau ikut aturan `latihan-saya/`, salin dulu file
starter ke folder mingguanmu (misalnya `latihan-saya/01-fondasi/minggu-01/01-form-diri.html`), lalu
kerjakan salinannya.

---

## Langkah Pengerjaan (untuk setiap soal)

1. **Baca soal sampai habis.** Termasuk bagian "Verifikasi Akhir". Kamu harus tahu target sebelum mulai.
2. **Tutup soalnya.** Di kertas atau jurnal, tulis dari ingatan: tag apa saja yang dibutuhkan dan
   bagaimana urutannya (outline kasar, bukan kode).
3. **Kerjakan.** Buka file starter, isi setiap `TODO(human)`. Ketik sendiri, jangan copy-paste.
4. **Cek sendiri.** Jalankan validator dan buka di browser (lihat bagian "Cara Mengecek" di bawah).
   Centang "Verifikasi Akhir" di soal satu per satu.
5. **Baru bandingkan.** Setelah semua centang lolos, boleh buka file yang sama di `contoh/`.
   Cari perbedaan dan tanya: kenapa contoh memilih tag itu? Apakah pilihanku juga benar?

---

## Petunjuk Kalau Macet

Pakai bertingkat. Naik ke tingkat berikutnya hanya kalau tingkat sebelumnya sudah dicoba 10-15 menit.

### Tingkat 1 — baca ulang dan persempit masalah

- Baca lagi bagian "Penjelasan" di soal untuk tag yang bermasalah. Sebagian besar jawaban sudah ada di sana.
- Kecilkan masalahnya. Buat file kosong berisi hanya satu tag yang membingungkan (misalnya satu `<table>`
  dengan `rowspan`), sampai tampil benar. Setelah itu baru gabungkan.

### Tingkat 2 — inspeksi apa yang browser lihat

- Klik kanan, pilih **Inspect**. Tab **Elements** menunjukkan struktur yang browser pahami.
  Kalau struktur di sana beda dari kodemu, biasanya ada tag yang lupa ditutup.
- Untuk form: pilih input di tab Elements, lalu buka panel **Accessibility**. Cek apakah input punya
  "Name" dari `<label>`. Kalau kosong, `for` dan `id` belum nyambung.
- Untuk tabel: hitung jumlah sel per baris di atas kertas. `colspan`/`rowspan` yang salah hitung
  bikin kolom bergeser.

### Tingkat 3 — dokumentasi resmi

- MDN per elemen: [developer.mozilla.org/id/docs/Web/HTML/Element](https://developer.mozilla.org/id/docs/Web/HTML/Element).
  Baca bagian "Attributes" dan "Examples", jangan cuma paragraf pertama.
- Tabel: [MDN HTML table basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics).
- Form & validasi: [MDN Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).
- Aksesibilitas: [MDN HTML: A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML).

### Tingkat 4 — tulis pertanyaannya dulu

Sebelum bertanya ke orang, tulis di `latihan-saya/JURNAL.md`: apa yang kamu harapkan tampil, apa yang
benar-benar tampil, dan dua hal yang sudah kamu coba. Sering jawabannya ketemu saat menulis ini.

---

## Cara Mengecek Hasil Sendiri

### 1. Validator otomatis (dari root repo)

Sekali saja di awal:

```bash
npm install
```

Lalu cek satu file:

```bash
npx html-validate LEVEL-1-Fundamental-Web/materi-praktikum/01-latihan-html/code/01-form-diri.html
```

Hasil yang diharapkan: tidak ada output error, exit code 0. Kalau ada error, baca nomor baris dan
nama aturannya, lalu perbaiki satu per satu dari yang paling atas.

Alternatif: tempel source code di [validator.w3.org](https://validator.w3.org/#validate_by_input).
Harus muncul "Document checking completed. No errors or warnings to show."

### 2. Browser

- Buka file dengan double-click. Bandingkan dengan daftar "Browser menampilkan" di soal.
- `Ctrl+U` / `Cmd+Option+U` untuk lihat source. Cari `<h1>`: harus cuma ada satu.

### 3. DevTools (F12)

- **Elements**: struktur bersarang sesuai rencanamu (misalnya `main > article > section`).
- **Accessibility** (soal 04, 08, 09): setiap input punya nama yang terbaca.
- **Lighthouse** (soal 08): jalankan kategori Accessibility dan SEO, catat skornya di jurnal.
- Soal 09: coba submit form kosong atau isi data salah. Browser harus menolak dan menunjukkan pesan.

### 4. Uji keyboard

Soal 07 dan 08: taruh mouse di samping. Tekan `Tab` berulang kali. Fokus harus berpindah dengan urutan
masuk akal, dan skip link harus bisa dipakai.

---

## Tentang `contoh/`

Folder `contoh/` berisi solusi referensi. Buka hanya setelah versimu sendiri jalan dan lolos validator.
Jawabanmu boleh berbeda, selama kamu bisa menjelaskan kenapa tag yang kamu pilih tepat.
