<!-- markdownlint-disable MD024 MD028 -->

# SOAL 11 — Render Komentar dengan Aman (Tanpa `v-html`)

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menjelaskan beda interpolasi `{{ }}` dan `v-html` dari sisi keamanan
- Membuktikan sendiri bahwa `v-html` dengan input user bisa menjalankan script
- Memvalidasi URL dari user dengan **allowlist protokol** sebelum dipasang ke `:href`
- Mempertahankan format sederhana (baris baru) tanpa merender HTML mentah
- Menjelaskan kapan `v-html` masih boleh dipakai, dan syaratnya

**Difficulty:** Menengah • **Estimasi:** 45-60 menit

---

## Briefing

Bayangkan kamu pengelola **papan pengumuman kampus**. Siapa saja boleh
menempel kertas. Selama yang ditempel cuma tulisan, aman. Masalahnya, ada
orang iseng menempel kertas yang ternyata **stiker jebakan**: begitu disentuh,
tintanya nempel ke tangan orang lain.

`v-html` itu seperti bilang "tempel apa saja apa adanya". `{{ }}` itu seperti
menyalin isi kertas ke kertas baru pakai tulisan tanganmu sendiri: isinya sama,
tapi jebakannya hilang.

Di file starter, komentar user sudah dirender pakai `v-html` dan link website
user dipasang langsung ke `:href`. Dua-duanya celah **XSS (Cross-Site
Scripting)**. Tugasmu: buktikan celahnya, lalu tutup.

> **Peringatan:** starter ini sengaja rentan. Jalankan hanya di laptopmu
> (`npm run dev`). Jangan deploy, dan jangan coba payload ke website orang lain.

---

## Cara Kerja Latihan Ini

1. **Baca dulu** teori XSS di
   [modul keamanan web 06 — XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md)
   dan bagian `v-html` di
   [teori 01 — Vue dan Template Syntax](../../materi-teori/01-vue-dan-template-syntax/README.md).
2. **Buka starter:** `level-3-frontend-vue/materi-praktikum/code/11-komentar-aman.vue`
   ([link](../code/11-komentar-aman.vue)).
3. **Jalankan** di project Vite. Caranya ada di [TUGAS.md](../TUGAS.md).
4. Cari semua `TODO(human)`, kerjakan **bagian demi bagian**.
5. **Verifikasi** pakai checklist tiap bagian.

Kamu **tidak akan diberi kode jadi**. Yang dilatih di sini adalah cara
berpikir "data dari user itu belum tentu baik".

---

## Bagian A: Buktikan Dulu Celahnya

### Penjelasan

Programmer yang baik tidak cuma percaya teori "ini rentan". Dia **mereproduksi**
masalahnya dulu, supaya nanti bisa membuktikan perbaikannya berhasil. Ini sama
seperti dokter: diagnosis dulu, baru kasih obat.

`v-html` memasukkan string sebagai HTML sungguhan ke DOM (mirip
`element.innerHTML = ...`). Browser akan memproses tag di dalamnya, termasuk
atribut event seperti `onerror`.

### Wajib Ada di Catatanmu

- Screenshot atau catatan: popup `alert` apa saja yang muncul
- Penjelasan 2-3 kalimat: kenapa komentar nomor 3 bisa menjalankan JavaScript
- Penjelasan: kenapa link "Penyerang 2" berbahaya padahal kelihatannya cuma teks

### Cara Mengerjakan

1. Jalankan starter **tanpa mengubah apa pun**.
2. Perhatikan popup yang muncul saat halaman dibuka.
3. Klik nama "Penyerang 2". Apa yang terjadi?
4. Buka DevTools → Elements. Lihat bagaimana komentar nomor 2 (`<b>`) dan
   nomor 3 (`<img>`) tampil di DOM.
5. Isi form dengan komentar buatanmu sendiri yang berisi tag HTML. Amati.
6. Tulis catatanmu di file terpisah, misalnya `catatan-xss.md` di project-mu.

### Verifikasi

- [ ] Kamu melihat sendiri alert dari komentar (stored XSS)
- [ ] Kamu melihat sendiri alert dari link `javascript:`
- [ ] Kamu bisa menjelaskan kenapa `<b>` ditampilkan tebal, bukan sebagai teks `<b>`
- [ ] Catatanmu menyebut **dari mana** data berbahaya itu datang (user, bukan programmer)

---

## Bagian B: Ganti `v-html` dengan Interpolasi

### Penjelasan

Interpolasi `{{ }}` di Vue selalu memperlakukan isi sebagai **teks**. Karakter
seperti `<` dan `>` di-escape, jadi browser menampilkannya sebagai simbol,
bukan sebagai tag. Ini perilaku default Vue, kamu tidak perlu library apa pun.

Efek samping: baris baru (`\n`) di komentar Rina tidak lagi jadi baris baru,
karena HTML memang menggabungkan whitespace. Ada properti CSS yang mengatur
bagaimana whitespace dan baris baru ditampilkan. Cari sendiri namanya di MDN
(kata kuncinya: "CSS white-space").

### Wajib Ada di Kode Kamu

- Tidak ada lagi `v-html` di template
- Isi komentar dirender sebagai teks
- Baris baru di komentar tetap tampil sebagai baris baru, lewat CSS (bukan `<br>`
  hasil replace string, bukan `v-html`)

### Cara Mengerjakan

1. Cari `TODO(human)` di atas `<p v-html=...>`.
2. Ganti cara render-nya.
3. Tambahkan blok `<style scoped>` kalau belum ada, lalu cari nilai CSS yang tepat.
4. Reload halaman.

### Verifikasi

- [ ] Saat halaman dibuka, **tidak ada** alert dari komentar
- [ ] Komentar nomor 3 tampil sebagai teks `<img src="x" ...>` apa adanya
- [ ] Komentar Budi menampilkan `<b>` sebagai teks, bukan huruf tebal (ini benar, bukan bug)
- [ ] Komentar Rina tetap dua baris
- [ ] DevTools → Elements: isi `<p>` berupa text node, bukan elemen `<img>`

---

## Bagian C: Validasi URL Website

### Penjelasan

Ini yang sering dilupakan: **Vue tidak menyaring nilai `:href`**. Kalau user
mengisi `javascript:alert(1)`, browser akan menjalankannya saat link diklik.
Interpolasi tidak menolong di sini karena masalahnya bukan HTML, tapi
**protokol URL**.

Cara aman adalah **allowlist**: tentukan protokol yang boleh (misal `http:` dan
`https:`), tolak sisanya. Kebalikannya, **blocklist** ("tolak kalau diawali
`javascript:`"), gampang dibobol: huruf besar-kecil, spasi di depan, tab di
tengah kata, dan protokol lain seperti `data:`.

Browser punya konstruktor `URL` yang bisa mem-parse string dan memberi tahu
protokolnya. Kalau string-nya bukan URL valid, dia melempar error. Pelajari di
MDN: "URL constructor" dan properti `protocol`.

### Wajib Ada di Kode Kamu

- Satu function yang menerima string URL dan mengembalikan URL aman atau
  nilai "tidak aman" (misal `null`)
- Penanganan string yang bukan URL sama sekali (jangan sampai halaman crash)
- Template: kalau URL aman, tampilkan link; kalau tidak, tampilkan nama
  sebagai teks biasa
- Link ke situs luar punya atribut `rel` yang sesuai (cari arti `noopener`,
  `noreferrer`, dan `ugc`)

### Cara Mengerjakan

1. Tulis function di bagian `TODO(human)` pertama di `<script setup>`.
2. Sebelum dipakai di template, **tes function-nya dulu** di console browser
   atau di file test. Coba input di tabel Edge Case di bawah.
3. Pakai function itu di template sesuai TODO.

### Verifikasi

- [ ] Klik nama "Penyerang 2" tidak menjalankan apa pun (nama tampil sebagai teks)
- [ ] Nama Rina dan Budi tetap berupa link yang bisa diklik
- [ ] Mengisi website `JavaScript:alert(1)` (huruf besar) lewat form juga ditolak
- [ ] Mengisi website `halo` (bukan URL) tidak bikin error di console
- [ ] Link luar punya atribut `rel`

---

## Bagian D: Kapan `v-html` Boleh?

### Penjelasan

`v-html` bukan fitur terlarang. Dia ada karena kadang kamu memang perlu
merender HTML, misalnya artikel blog hasil markdown, atau isi editor rich text.
Pertanyaannya selalu: **siapa yang menulis HTML itu, dan sudah dibersihkan
belum?**

Cari tahu sendiri (dokumentasi Vue bagian "Security", dan library
**DOMPurify**):

- Apa bedanya HTML dari file milik kita sendiri vs HTML dari input user?
- Apa itu "sanitizer allowlist"?
- Kenapa sanitasi sebaiknya juga dilakukan di server?
- Apa peran Content-Security-Policy (CSP) sebagai lapisan kedua?

### Wajib Ada di Kode Kamu

- Komentar 3-5 kalimat di `TODO(human)` kedua, ditulis dengan kata-katamu
  sendiri, menjawab: kapan `v-html` boleh, dan syarat wajibnya kalau sumbernya user

### Cara Mengerjakan

1. Baca bagian Security di dokumentasi resmi Vue.
2. Tutup tab dokumentasinya.
3. Tulis jawabanmu dari ingatan. Kalau belum bisa, baca lagi, tutup lagi.

### Verifikasi

- [ ] Komentarmu menyebut minimal dua kondisi
- [ ] Komentarmu bisa dipahami teman yang belum belajar XSS
- [ ] Kamu tidak menyalin kalimat dari dokumentasi

---

## Edge Case yang Harus Kamu Coba

Isi lewat form, satu per satu:

| Isi kolom | Isi | Yang diharapkan |
| --- | --- | --- |
| Komentar | `<script>alert(1)</script>` | Tampil sebagai teks |
| Komentar | `<a href="#">klik</a>` | Tampil sebagai teks, bukan link |
| Komentar | Teks 3 baris (tekan Enter) | Tetap 3 baris |
| Website | `https://contoh.com` | Jadi link |
| Website | `  javascript:alert(1)` (spasi di depan) | Bukan link |
| Website | `JAVASCRIPT:alert(1)` | Bukan link |
| Website | `data:text/html,<script>alert(1)</script>` | Bukan link |
| Website | `contoh.com` (tanpa protokol) | Kamu yang putuskan, tulis alasannya |
| Website | (kosong) | Nama tampil sebagai teks, tanpa error |

---

## Petunjuk Bertingkat

Buka satu per satu, hanya kalau sudah mentok minimal 15 menit.

<details>
<summary>Petunjuk 1</summary>

Untuk Bagian B, kamu sudah memakai cara render yang aman di semua soal
sebelumnya. Lihat bagaimana kamu menampilkan nama produk di soal 02.

</details>

<details>
<summary>Petunjuk 2</summary>

Untuk Bagian C, alur function-nya: kalau kosong, langsung tolak. Kalau tidak,
coba parse. Kalau parse gagal, tolak. Kalau berhasil, cek protokolnya ada di
daftar yang boleh atau tidak. Butuh `try/catch`.

</details>

<details>
<summary>Petunjuk 3</summary>

Di template, kamu butuh dua elemen berbeda untuk dua keadaan (ada link vs
tidak ada link). Directive yang memilih salah satu dari dua elemen sudah kamu
pakai di soal 06 untuk loading/error.

</details>

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] `grep -n "v-html" 11-komentar-aman.vue` hanya menemukan komentar, bukan atribut
- [ ] Buka halaman: nol alert
- [ ] Klik semua nama penulis: nol alert
- [ ] Semua baris tabel Edge Case sudah dicoba
- [ ] Console browser bersih dari error
- [ ] Komentar "kapan v-html boleh" sudah ditulis dengan kata-katamu sendiri

---

## Refleksi

1. Kalau backend sudah memfilter `<script>` saat menyimpan komentar, apakah
   frontend boleh pakai `v-html`? Kenapa?
2. Kenapa allowlist protokol lebih aman daripada blocklist `javascript:`?
3. Di project Vue lain yang pernah kamu lihat, ada `v-html` atau `:href`
   dinamis? Dari mana datanya?

---

## Cara Submit / Lanjut

1. Pastikan semua checkbox di atas tercentang.
2. Isi [CHECKLIST.md](../CHECKLIST.md) bagian keamanan.
3. Sudah jalan? Baru boleh bandingkan dengan solusi referensi
   (baca dulu [aturan folder contoh](../contoh/README.md)).
4. Lanjutkan ke [Self Problem Solving](../../SELF_PROBLEM_SOLVING.md) nomor 7
   (`v-html` dan URL) untuk versi yang lebih berat.

---

## Catatan untuk Pemula

> **XSS bukan cuma `<script>`.** Atribut event (`onerror`, `onload`), link
> `javascript:`, dan `data:` URL juga bisa menjalankan kode.
>
> **Escape itu bawaan Vue.** Selama kamu pakai `{{ }}` dan binding atribut
> biasa untuk teks, kamu sudah dilindungi. Celah biasanya muncul saat kamu
> "keluar jalur": `v-html`, `:href`/`:src` dinamis, atau `innerHTML` manual.
>
> **Frontend aman bukan berarti sistem aman.** Server tetap harus memvalidasi
> dan menyimpan data dengan benar. Frontend adalah lapisan terakhir, bukan satu-satunya.

<!-- markdownlint-enable MD024 MD028 -->
