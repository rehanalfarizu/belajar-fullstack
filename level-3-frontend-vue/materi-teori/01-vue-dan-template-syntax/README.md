# Materi Teori 01 — Vue dan Template Syntax

> Versi yang dipakai: **Vue 3.5.x** dengan Composition API dan `<script setup>`.
> Kalau kamu baca tutorial lama yang pakai `data()` dan `methods`, itu
> Options API. Masih jalan, tapi track ini fokus ke gaya modern.

## Tujuan

Setelah baca bab ini, kamu bisa:

- Menjelaskan apa itu Vue dan kenapa orang pakai framework, bukan JavaScript murni
- Membaca dan menulis Single File Component (`.vue`)
- Memakai interpolasi `{{ }}` dan directive dasar: `v-bind`, `v-on`, `v-if`,
  `v-show`, `v-for`, `v-model`
- Memilih `key` yang benar di `v-for`
- Tahu kenapa `v-html` berbahaya untuk data dari user

---

## 1. Vue Itu Apa, Sih?

Vue adalah framework JavaScript untuk bikin tampilan web yang **reaktif**.
Reaktif artinya: data berubah, tampilan ikut berubah sendiri.

### Analogi: Papan Skor Pertandingan

Bayangkan papan skor digital di lapangan futsal. Wasit cukup bilang "gol
untuk tim A", dan angka di papan langsung berubah. Wasit tidak perlu naik
tangga dan mengganti angka satu per satu.

- **JavaScript murni** = wasit naik tangga, cari angka yang benar, ganti
  manual (`document.querySelector(...).textContent = ...`).
- **Vue** = wasit cukup ubah data skor. Papan (template) yang mengurus sisanya.

Inilah yang disebut **deklaratif**: kamu menjelaskan *tampilan harus
seperti apa untuk data tertentu*, bukan *langkah-langkah mengubah DOM*.

### Kenapa Penting di Dunia Kerja

Aplikasi kantor biasanya punya puluhan layar dengan data yang terus berubah:
notifikasi, tabel, form, filter. Kalau semuanya diupdate manual pakai
`querySelector`, bug-nya cepat menumpuk ("kok angka di header beda sama di
tabel?"). Framework seperti Vue membuat satu sumber data mengatur semua
tampilan. Itu yang dicari perusahaan: kode yang bisa dirawat tim, bukan cuma
jalan di laptop kamu.

---

## 2. Single File Component (SFC)

File `.vue` berisi tiga bagian dalam satu tempat:

```vue
<script setup>
// Logika: data dan function
const namaKafe = 'Kopi Senja';
</script>

<template>
  <!-- Tampilan: HTML plus fitur Vue -->
  <h1>Selamat datang di {{ namaKafe }}</h1>
</template>

<style scoped>
/* Gaya: CSS khusus komponen ini */
h1 { color: brown; }
</style>
```

### Analogi: Kotak Bekal

Satu kotak bekal berisi nasi, lauk, dan sayur dalam sekat masing-masing.
Kamu tidak perlu bawa tiga tas berbeda. SFC juga begitu: logika, tampilan,
dan gaya dalam satu file, tapi tetap dipisah sekat.

Poin penting:

- `<script setup>` = semua variabel dan function di dalamnya **otomatis bisa
  dipakai di template**. Tidak perlu `return`.
- `<style scoped>` = CSS hanya berlaku untuk komponen ini, tidak bocor ke
  komponen lain.
- Urutan bagian bebas, tapi kebanyakan tim menaruh `<script setup>` di atas.

### Dari Mana Komponen Ini Dirender?

Di project Vite, ada `src/main.js`:

```js
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

Artinya: "ambil komponen `App`, tempelkan ke elemen `<div id="app">` di
`index.html`". Semua komponen lain nanti ada di dalam `App`.

---

## 3. Interpolasi `{{ }}`

Kurung kurawal ganda menampilkan nilai JavaScript sebagai **teks**.

```vue
<script setup>
const menu = 'Es Kopi Susu';
const harga = 18000;
</script>

<template>
  <p>{{ menu }} — Rp{{ harga }}</p>
  <p>Beli 2: Rp{{ harga * 2 }}</p>
  <p>{{ menu.toUpperCase() }}</p>
</template>
```

### Analogi: Bingkai Foto

`{{ }}` itu seperti bingkai. Apa pun yang kamu taruh di dalamnya akan
dipajang **apa adanya sebagai teks**. Kalau isinya `<b>halo</b>`, yang
tampil ya tulisan `<b>halo</b>`, bukan huruf tebal.

Ini fitur keamanan, bukan kekurangan. Vue melakukan **escaping** otomatis,
jadi kalau ada user iseng menulis `<script>` di komentar, browser tidak
menjalankannya.

Aturan di dalam `{{ }}`:

- Boleh **ekspresi** (sesuatu yang menghasilkan nilai): `a + b`, `ok ? 'Ya' : 'Tidak'`,
  `nama.trim()`.
- Tidak boleh **statement**: `if`, `for`, `let x = 1`.
- Kalau ekspresinya mulai panjang, pindahkan ke `computed` (bab 02).

---

## 4. `v-bind` (`:`) — Mengikat Atribut

Interpolasi hanya untuk isi teks. Untuk atribut HTML, pakai `v-bind` atau
singkatannya `:`.

```vue
<script setup>
const fotoMenu = '/img/kopi.jpg';
const habis = true;
</script>

<template>
  <img :src="fotoMenu" alt="Foto es kopi">
  <button :disabled="habis">Pesan</button>
  <p :class="{ coret: habis }">Es Kopi</p>
</template>
```

### Analogi: Label Harga Elektronik di Supermarket

Label harga di rak supermarket modern terhubung ke sistem. Harga di sistem
berubah, label ikut berubah. `:src`, `:disabled`, `:class` itu label yang
terhubung ke data.

Perhatikan bedanya:

- `src="fotoMenu"` = string literal "fotoMenu" (salah kalau maksudnya variabel).
- `:src="fotoMenu"` = isi dari variabel `fotoMenu`.

---

## 5. `v-on` (`@`) — Mendengarkan Event

```vue
<script setup>
function sapa() {
  alert('Halo, mau pesan apa?');
}
</script>

<template>
  <button type="button" @click="sapa">Panggil Barista</button>
  <form @submit.prevent="kirimPesanan">...</form>
</template>
```

### Analogi: Bel Meja Restoran

Kamu pencet bel di meja, pelayan datang. `@click="sapa"` artinya "kalau
tombol ini dipencet, jalankan function `sapa`".

Modifier yang sering dipakai:

- `.prevent` = memanggil `event.preventDefault()` (form tidak reload halaman)
- `.stop` = menghentikan event naik ke elemen induk
- `@keyup.enter` = hanya bereaksi saat tombol Enter

Catatan: tulis `@click="sapa"` (referensi function). Kalau perlu argumen,
`@click="hapus(tugas.id)"` juga boleh, Vue membungkusnya otomatis.

---

## 6. `v-if`, `v-else-if`, `v-else`, dan `v-show`

```vue
<template>
  <p v-if="nilai >= 85">A</p>
  <p v-else-if="nilai >= 70">B</p>
  <p v-else>Perlu remedial</p>

  <div v-show="panelTerbuka">Isi panel bantuan</div>
</template>
```

### Analogi: Lampu vs Gorden

- `v-if` = **mencabut lampu dari fitting**. Kalau kondisi false, elemennya
  benar-benar hilang dari DOM. Mahal kalau sering dipasang-cabut.
- `v-show` = **menutup gorden**. Elemennya tetap ada, hanya disembunyikan
  dengan `display: none`. Murah untuk buka-tutup berkali-kali.

Kapan pakai yang mana:

| Situasi | Pilih |
| --- | --- |
| Kondisi jarang berubah (misal: user admin atau bukan) | `v-if` |
| Toggle sering (dropdown, tab, accordion) | `v-show` |
| Butuh `v-else` | `v-if` (v-show tidak punya pasangan else) |

`v-else` harus **tepat** setelah elemen `v-if` atau `v-else-if`. Kalau ada
elemen lain di antaranya, Vue memberi peringatan.

---

## 7. `v-for` dan `key`

```vue
<script setup>
const jadwal = [
  { kode: 'IF701', matkul: 'Kecerdasan Buatan', hari: 'Senin' },
  { kode: 'IF702', matkul: 'Rekayasa Perangkat Lunak', hari: 'Rabu' },
];
</script>

<template>
  <ul>
    <li v-for="kelas in jadwal" :key="kelas.kode">
      {{ kelas.hari }}: {{ kelas.matkul }}
    </li>
  </ul>
</template>
```

### Analogi: Nomor Kursi di Bioskop

Bayangkan penonton bioskop diidentifikasi pakai **urutan duduk**: "orang
ketiga dari kiri". Kalau ada yang pindah, semua jadi salah orang. Kalau
pakai **nomor tiket** (ID unik), siapa pun yang pindah tetap bisa dilacak.

`key` adalah nomor tiket. Vue memakai `key` untuk tahu elemen mana yang
sama, mana yang baru, mana yang dihapus.

- **Pakai**: ID dari database, kode unik (NIM, kode matkul, ISBN).
- **Hindari**: index array (`:key="i"`) kalau list bisa diurutkan ulang,
  difilter, atau dihapus di tengah. State input bisa "loncat" ke baris lain.
- **Jangan**: `Math.random()`. Tiap render dapat key baru, semua elemen
  dibuat ulang.

Satu lagi: jangan taruh `v-if` dan `v-for` di **elemen yang sama**. Di Vue 3,
`v-if` dievaluasi lebih dulu dan tidak bisa membaca variabel loop. Kalau
mau menyaring, siapkan list yang sudah tersaring (pakai `computed`, bab 02).

---

## 8. `v-model` — Sinkron Dua Arah dengan Input

```vue
<script setup>
import { ref } from 'vue';

const catatan = ref('');
</script>

<template>
  <label>
    Catatan pesanan
    <input v-model="catatan" type="text">
  </label>
  <p>Kamu menulis: {{ catatan }}</p>
</template>
```

### Analogi: Buku Tulis Bersama

Kamu dan temanmu menulis di buku yang sama. Kamu tulis, dia langsung bisa
baca. Dia hapus, kamu juga lihat terhapus. `v-model` menghubungkan input
dan data seperti buku bersama itu.

Di balik layar, `v-model` adalah gabungan `:value` + `@input`. Modifier:

- `.trim` = buang spasi di awal dan akhir
- `.number` = ubah ke number (hati-hati: input kosong tetap string kosong)
- `.lazy` = sinkron saat `change` (keluar dari input), bukan tiap ketikan

Kenapa ada `ref('')` di situ? Itu bahan bab 02. Untuk sekarang: data yang
bisa berubah dan perlu memperbarui layar harus dibungkus `ref`.

---

## 9. `v-html` — Pintu Belakang yang Harus Dikunci

`v-html` memasukkan string sebagai **HTML mentah**, bukan teks.

```vue
<template>
  <!-- Hanya aman kalau isinya 100% dari kamu sendiri / sudah disanitasi -->
  <div v-html="kontenDariCMSInternal"></div>
</template>
```

### Analogi: Menerima Paket Tanpa Dicek

`{{ }}` itu satpam yang membuka dan mengecek setiap paket. `v-html` itu
membiarkan kurir langsung masuk ke rumah dan menaruh barang di mana saja.
Kalau kurirnya jahat (user iseng), dia bisa menaruh `<img src=x onerror="...">`
yang menjalankan script. Ini namanya **XSS (Cross-Site Scripting)**.

Aturan praktis:

- Data dari user (komentar, nama, bio) → **selalu** `{{ }}`.
- Kalau memang perlu HTML (misal artikel dari editor teks kaya), sanitasi
  dulu dengan library allowlist seperti DOMPurify, dan idealnya juga di server.

Latihan khusus soal ini ada di
[Soal 11 — Render Aman tanpa v-html](../../materi-praktikum/soal/11-render-aman-tanpa-v-html.md).

---

## Kesalahan Umum

### 1. Lupa titik dua di atribut dinamis

```vue
<!-- Salah: yang dikirim string "jumlahTugas" -->
<span title="jumlahTugas">...</span>

<!-- Benar: yang dikirim isi variabelnya -->
<span :title="jumlahTugas">...</span>
```

### 2. Pakai index sebagai key di list yang bisa diurutkan

```vue
<!-- Salah -->
<li v-for="(buku, i) in daftarBuku" :key="i">...</li>

<!-- Benar -->
<li v-for="buku in daftarBuku" :key="buku.isbn">...</li>
```

### 3. Menaruh `v-if` dan `v-for` di elemen yang sama

```vue
<!-- Salah: v-if jalan duluan, `tugas` belum ada -->
<li v-for="tugas in semuaTugas" v-if="!tugas.selesai" :key="tugas.id">

<!-- Benar: saring dulu di script (computed), lalu loop hasilnya -->
<li v-for="tugas in tugasBelumSelesai" :key="tugas.id">
```

### 4. Menulis statement di interpolasi

```vue
<!-- Salah -->
{{ if (lulus) 'Lulus' }}

<!-- Benar -->
{{ lulus ? 'Lulus' : 'Belum' }}
```

### 5. Menampilkan input user dengan `v-html`

Sudah dibahas di bagian 9. Default-mu harus `{{ }}`.

---

## Latihan Berpikir

Jawab di catatanmu sendiri, tanpa buka dokumentasi dulu:

1. Kamu punya daftar 500 komentar yang bisa disortir "terbaru" dan
   "terpopuler". Apa yang terjadi di layar kalau `key` pakai index, dan
   bagaimana kamu bisa membuktikannya di browser?
2. Sebuah modal "Bantuan" dibuka-tutup puluhan kali per sesi. Modal
   "Pengaturan Admin" hanya muncul untuk admin. Mana yang pakai `v-if`, mana
   yang `v-show`? Jelaskan alasannya dengan kata-katamu.
3. Kenapa Vue memilih escaping sebagai perilaku default `{{ }}`, padahal itu
   kadang "merepotkan"?

---

## Glosarium

| Istilah | Arti singkat |
| --- | --- |
| SFC | Single File Component, file `.vue` berisi script, template, style |
| Template | Bagian HTML di SFC yang dibaca Vue |
| Interpolasi | `{{ }}`, menampilkan nilai sebagai teks |
| Directive | Atribut khusus Vue yang diawali `v-` |
| Deklaratif | Menjelaskan hasil akhir, bukan langkah-langkahnya |
| Escaping | Mengubah karakter HTML jadi teks biasa supaya tidak dieksekusi |
| `key` | Identitas unik elemen di `v-for` |
| XSS | Serangan menyisipkan script lewat input yang dirender sebagai HTML |
| Modifier | Akhiran directive seperti `.prevent`, `.trim` |

---

## Soal Terkait

- [Soal 01 — Counter](../../materi-praktikum/soal/01-counter.md)
- [Soal 02 — Product Filter](../../materi-praktikum/soal/02-product-filter.md)
- [Soal 11 — Render Aman tanpa v-html](../../materi-praktikum/soal/11-render-aman-tanpa-v-html.md)

## Lanjut

Bab berikutnya: [02 — Reactivity: ref, reactive, computed](../02-reactivity-ref-reactive-computed/README.md).
