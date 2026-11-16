# Materi Teori 03 — Component, Props, Emit, Slot

> Versi: **Vue 3.5.x**, `<script setup>`. `defineProps`, `defineEmits`, dan
> `defineModel` adalah *compiler macro*: tidak perlu di-import.

## Tujuan

Setelah baca bab ini, kamu bisa:

- Memecah halaman jadi komponen kecil yang bisa dipakai ulang
- Mengirim data dari parent ke child lewat **props** (dan memvalidasinya)
- Mengirim "niat" dari child ke parent lewat **emit**
- Menyediakan ruang kosong untuk parent lewat **slot** (default, named, scoped)
- Menjelaskan aturan "props turun, event naik"

---

## 1. Kenapa Dipecah Jadi Komponen?

### Analogi: Lego

Kamu tidak mencetak satu balok plastik raksasa berbentuk rumah. Kamu pakai
balok-balok kecil yang bisa disusun jadi rumah, mobil, atau robot. Komponen
Vue itu balok Lego: `KartuBuku`, `TombolPinjam`, `BadgeStatus`.

Keuntungan:

- **Dipakai ulang**: kartu buku di halaman katalog dan halaman favorit sama.
- **Mudah dites**: satu komponen kecil lebih mudah dicek daripada satu file
  1.000 baris.
- **Mudah dibagi kerja**: di tim, satu orang pegang satu komponen.

### Kenapa Penting di Dunia Kerja

Hampir semua perusahaan punya **design system**: kumpulan komponen standar
(Button, Card, Modal) yang dipakai semua tim. Tugas frontend developer
sehari-hari sering berupa "buat komponen X yang bisa dipakai di 5 halaman".
Kalau kamu belum paham props/emit/slot, komponenmu akan kaku dan susah
dipakai ulang.

### Memakai Komponen Lain

```vue
<script setup>
import KartuBuku from './KartuBuku.vue';
</script>

<template>
  <KartuBuku judul="Laskar Pelangi" penulis="Andrea Hirata" />
</template>
```

Dengan `<script setup>`, komponen yang di-import langsung bisa dipakai di
template. Nama komponen ditulis PascalCase.

---

## 2. Props — Data Turun dari Parent

### Analogi: Pesanan Kopi

Kamu (parent) memesan ke barista (child): "kopi susu, gula sedikit, es".
Barista membuat kopi **sesuai pesanan**, tapi **tidak mengubah pesananmu**.
Kalau barista mau ganti jadi tanpa es, dia harus **bertanya** dulu ke kamu.

Props = isi pesanan. Child menerima dan memakai, tapi **read-only**.

```vue
<!-- KartuBuku.vue -->
<script setup>
const props = defineProps({
  judul: { type: String, required: true },
  tahun: { type: Number, default: null },
  tersedia: { type: Boolean, default: true },
});
</script>

<template>
  <article>
    <h3>{{ judul }}</h3>
    <p v-if="tahun">Terbit {{ tahun }}</p>
    <p>{{ tersedia ? 'Bisa dipinjam' : 'Sedang dipinjam' }}</p>
  </article>
</template>
```

Mengirim props dari parent:

```vue
<KartuBuku judul="Bumi Manusia" :tahun="1980" :tersedia="false" />
```

Perhatikan `:tahun="1980"`. Tanpa titik dua, yang terkirim string `"1980"`,
bukan number. Vue akan memberi warning karena tipenya `Number`.

### Validasi Props

Selain `type`, `required`, `default`, kamu bisa pakai `validator`:

```js
defineProps({
  rating: {
    type: Number,
    validator: (nilai) => nilai >= 1 && nilai <= 5,
  },
});
```

Validator hanya memberi **warning di console saat development**. Dia tidak
menghentikan program dan tidak jalan di production build. Anggap sebagai
alarm untuk sesama developer, bukan pagar keamanan.

Default untuk object/array harus berupa **function** supaya tiap instance
dapat salinan sendiri: `default: () => []`.

### Destructure Props (Vue 3.5+)

Sejak Vue 3.5, destructure props di `<script setup>` tetap reaktif:

```js
const { judul, tahun = null } = defineProps({ judul: String, tahun: Number });
```

Tapi kalau kamu mengirim `judul` ke `watch`, bungkus jadi getter:
`watch(() => judul, ...)`. Untuk pemula, `props.judul` lebih jelas.

---

## 3. Emit — Niat Naik ke Parent

### Analogi: Tombol Panggil Perawat di Rumah Sakit

Pasien (child) tidak bisa mengambil obat sendiri dari gudang (state milik
parent). Pasien pencet tombol dan bilang "saya butuh obat X". Perawat
(parent) yang memutuskan dan mengambilkan.

Child **meng-emit event** berisi informasi. Parent **mendengarkan** dan
mengubah state miliknya.

```vue
<!-- TombolFavorit.vue -->
<script setup>
const props = defineProps({ isbn: { type: String, required: true } });
const emit = defineEmits(['toggle-favorit']);

function klik() {
  emit('toggle-favorit', props.isbn);
}
</script>

<template>
  <button type="button" @click="klik">Favorit</button>
</template>
```

Parent:

```vue
<TombolFavorit :isbn="buku.isbn" @toggle-favorit="ubahFavorit" />
```

### Validasi Payload Emit

`defineEmits` juga bisa pakai object dengan function validator. Function
itu menerima argumen yang di-emit dan harus `return true` kalau valid.
Kalau `false`, Vue memberi warning di console (development).

```js
const emit = defineEmits({
  'pilih-hari': (hari) => ['Senin', 'Selasa', 'Rabu'].includes(hari),
});
```

Sama seperti validator props, ini alat bantu debugging, bukan keamanan.
Kalau kamu butuh benar-benar mencegah data salah terkirim, cek dulu
**sebelum** memanggil `emit`.

### Aturan Satu Arah

```text
Parent ──props──▶ Child
Parent ◀──event── Child
```

Kenapa tidak boleh child mengubah props langsung? Karena kalau 5 child
mengubah data yang sama diam-diam, kamu tidak bisa melacak siapa pelakunya.
Dengan satu arah, setiap perubahan lewat "pintu" yang jelas di parent.

### `defineModel` (Vue 3.4+)

Untuk komponen input custom, Vue menyediakan jalan pintas:

```vue
<!-- InputNim.vue -->
<script setup>
const nim = defineModel();
</script>

<template>
  <input v-model="nim" inputmode="numeric">
</template>
```

Parent cukup `<InputNim v-model="form.nim" />`. Di balik layar ini tetap
props + emit (`modelValue` + `update:modelValue`), hanya ditulis singkat.
Pahami versi panjangnya dulu sebelum pakai versi pendek.

---

## 4. Slot — Ruang Kosong untuk Parent

### Analogi: Bingkai Foto dengan Kaca

Toko bingkai membuat bingkai (struktur, warna, ukuran). **Fotonya kamu yang
isi.** Bingkai yang sama bisa berisi foto wisuda atau foto kucing.

Komponen dengan slot = bingkai. Parent mengisi kontennya.

### Default Slot

```vue
<!-- KotakInfo.vue -->
<template>
  <aside class="kotak-info">
    <slot>Tidak ada info.</slot>
  </aside>
</template>
```

```vue
<KotakInfo>
  <p>Perpustakaan tutup pukul 16.00 hari Jumat.</p>
</KotakInfo>
```

Teks di dalam `<slot>` adalah **fallback**: muncul kalau parent tidak
mengisi apa-apa.

### Named Slot

Kalau ada beberapa ruang, beri nama:

```vue
<!-- PanelJadwal.vue -->
<template>
  <section>
    <header><slot name="judul" /></header>
    <slot />
    <footer><slot name="aksi" /></footer>
  </section>
</template>
```

```vue
<PanelJadwal>
  <template #judul>Jadwal Senin</template>
  <p>08.00 Kecerdasan Buatan</p>
  <template #aksi>
    <button type="button">Ekspor</button>
  </template>
</PanelJadwal>
```

`#judul` adalah singkatan `v-slot:judul`.

### Scoped Slot — Child Mengirim Data ke Isi Slot

Kadang isi slot butuh data yang hanya dimiliki child. Child bisa "menitipkan"
data lewat atribut di `<slot>`:

```vue
<!-- DaftarMatkul.vue (child) -->
<template>
  <ul>
    <li v-for="m in matkul" :key="m.kode">
      <slot name="baris" :matkul="m" :sks-penuh="m.sks >= 4" />
    </li>
  </ul>
</template>
```

```vue
<!-- parent -->
<DaftarMatkul :matkul="semester7">
  <template #baris="{ matkul, sksPenuh }">
    <strong>{{ matkul.nama }}</strong>
    <span v-if="sksPenuh"> (berat)</span>
  </template>
</DaftarMatkul>
```

Perhatikan: atribut `sks-penuh` (kebab-case) di child diterima sebagai
`sksPenuh` (camelCase) di parent.

Analogi lanjutan: bingkainya punya **stiker tanggal** yang otomatis
ditempel toko. Kamu tinggal memutuskan mau ditaruh di mana di fotomu.

---

## 5. Kapan Props, Kapan Slot?

| Butuh | Pakai |
| --- | --- |
| Data sederhana (judul, angka, status) | Props |
| Child memberi tahu sesuatu terjadi | Emit |
| Struktur sama, isi tampilan berbeda-beda | Slot |
| Isi tampilan butuh data dari child | Scoped slot |
| Data dipakai banyak komponen jauh di bawah | Provide/inject atau store (bab 06) |

---

## Kesalahan Umum

### 1. Mengubah props langsung

```js
// Salah: Vue memberi warning, dan parent tidak tahu
props.tersedia = false;

// Benar: minta parent yang mengubah
emit('ubah-status', props.isbn);
```

Kalau child butuh nilai awal dari props lalu mengubahnya sendiri (misal
draft form), salin dulu ke `ref` lokal: `const draft = ref(props.judul)`.
Sadari bahwa salinan ini tidak ikut berubah kalau props berubah.

### 2. Lupa `:` untuk number/boolean

```vue
<!-- Salah: "3" string, "false" string (truthy!) -->
<KartuBuku judul="X" tahun="3" tersedia="false" />

<!-- Benar -->
<KartuBuku judul="X" :tahun="3" :tersedia="false" />
```

### 3. Default object/array bukan function

```js
// Salah: semua instance berbagi array yang sama
tags: { type: Array, default: [] }

// Benar
tags: { type: Array, default: () => [] }
```

### 4. Mengira validator adalah keamanan

Validator props/emit tidak jalan di production. Validasi sungguhan tetap di
logika kamu dan di backend.

### 5. Nama event tidak konsisten

Emit `'toggleFavorit'` tapi parent mendengar `@toggle-favorit`? Vue
menormalkan keduanya, tapi biasakan satu gaya: di template pakai
kebab-case.

---

## Latihan Berpikir

1. Komponen `KartuMahasiswa` dipakai di halaman daftar kelas dan halaman
   profil. Di halaman kelas butuh tombol "Absen", di profil butuh tombol
   "Edit". Kamu bikin dua props boolean, atau satu slot? Apa trade-off-nya?
2. Child punya input jumlah buku yang mau dipinjam. Data siapa itu: child
   atau parent? Kapan jadi milik parent?
3. Kenapa Vue hanya memberi *warning* (bukan error) saat validator props gagal?

---

## Glosarium

| Istilah | Arti singkat |
| --- | --- |
| Komponen | Potongan UI yang berdiri sendiri dan bisa dipakai ulang |
| Props | Data dari parent ke child, read-only bagi child |
| Emit | Child mengirim event (dengan data) ke parent |
| Payload | Data yang ikut dikirim bersama event |
| Slot | Ruang di child yang diisi markup oleh parent |
| Named slot | Slot yang punya nama, dipakai dengan `#nama` |
| Scoped slot | Slot yang mengirim data dari child ke isi slot |
| Fallback content | Isi default slot kalau parent tidak mengisi |
| Compiler macro | Fungsi khusus yang diproses compiler, tanpa import (`defineProps`) |
| One-way data flow | Data turun lewat props, perubahan naik lewat event |

---

## Soal Terkait

- [Soal 03 — Product Card](../../materi-praktikum/soal/03-product-card.md)
- [Soal 04 — Add to Cart (Emit)](../../materi-praktikum/soal/04-add-to-cart.md)

## Lanjut

Bab berikutnya: [04 — Lifecycle dan Composable](../04-lifecycle-dan-composable/README.md).
