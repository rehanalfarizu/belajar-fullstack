# Materi Teori 05 — Vue Router

> Versi: **Vue Router 5.x** (rilis terbaru di npm). Untuk semua API di bab
> ini (`createRouter`, `createWebHistory`, `RouterLink`, `RouterView`,
> `useRoute`, `useRouter`, navigation guard, lazy loading), **Router 4 dan 5
> sama untuk materi ini**. Perbedaan v5 terutama untuk file-based routing,
> yang tidak dibahas di sini. Kalau tutorial yang kamu baca masih Router 4,
> tidak masalah.

## Tujuan

Setelah baca bab ini, kamu bisa:

- Menjelaskan apa itu SPA dan kenapa butuh router
- Mendefinisikan route, termasuk route dinamis (`/buku/:isbn`)
- Berpindah halaman dengan `<RouterLink>` dan `router.push`
- Membaca param dan query dengan `useRoute`
- Memakai lazy loading untuk halaman berat
- Menulis navigation guard dengan gaya `return`, dan paham kenapa guard
  **bukan** keamanan

---

## 1. SPA dan Kenapa Butuh Router

SPA (Single Page Application) = browser hanya memuat **satu** halaman HTML.
Perpindahan "halaman" terjadi dengan mengganti komponen, bukan memuat ulang
dari server.

### Analogi: Panggung Teater

Gedung teaternya satu (satu `index.html`). Yang berganti hanya **dekorasi
panggung** antar babak. Penonton tidak perlu keluar gedung dan masuk lagi.
Router adalah **kru panggung**: lihat nomor babak (URL), pasang dekorasi
(komponen) yang sesuai.

Tanpa router, kamu bisa saja pakai `v-if` untuk ganti tampilan, tapi:

- Tombol Back browser tidak jalan
- URL tidak berubah, jadi tidak bisa di-bookmark atau di-share
- Refresh selalu kembali ke tampilan awal

### Kenapa Penting di Dunia Kerja

Hampir semua dashboard, panel admin, dan aplikasi internal perusahaan
adalah SPA. Kamu akan sering dapat tiket seperti "filter di halaman laporan
harus tersimpan di URL supaya bisa dikirim ke atasan" atau "halaman admin
terlalu berat, pecah bundle-nya". Keduanya urusan router.

---

## 2. Setup Dasar

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import BerandaView from '../views/BerandaView.vue';

const routes = [
  { path: '/', name: 'beranda', component: BerandaView },
  { path: '/tentang', name: 'tentang', component: () => import('../views/TentangView.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
```

```js
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';

createApp(App).use(router).mount('#app');
```

```vue
<!-- App.vue -->
<template>
  <nav>
    <RouterLink to="/">Beranda</RouterLink>
    <RouterLink :to="{ name: 'tentang' }">Tentang</RouterLink>
  </nav>
  <RouterView />
</template>
```

- `<RouterView />` = **tempat** komponen halaman dipasang.
- `<RouterLink>` = pengganti `<a>` yang tidak me-reload halaman. Dia juga
  otomatis memberi class aktif untuk link yang sedang dibuka.
- `name` pada route membuat link tidak rusak kalau path diganti nanti.

### `createWebHistory` vs `createWebHashHistory`

| | URL | Butuh setting server? |
| --- | --- | --- |
| `createWebHistory()` | `/buku/123` | Ya, server harus mengarahkan semua path ke `index.html` |
| `createWebHashHistory()` | `/#/buku/123` | Tidak |

Dev server Vite sudah mengurus fallback ini. Saat deploy, kalau refresh di
`/buku/123` menghasilkan 404, berarti server belum dikonfigurasi.

---

## 3. Route Dinamis: Params

### Analogi: Nomor Kamar Hotel

Semua kamar hotel punya desain yang sama, yang beda hanya nomornya. Kamu
tidak membuat 300 template kamar, cukup satu template "kamar" dengan
**nomor** sebagai variabel.

```js
{ path: '/buku/:isbn', name: 'detail-buku', component: DetailBukuView }
```

Di dalam komponen:

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
// route.params.isbn → "9786020331607"
</script>
```

Hati-hati: kalau user berpindah dari `/buku/111` ke `/buku/222`, Vue Router
**memakai ulang** komponen yang sama (tidak di-unmount). `onMounted` tidak
jalan lagi. Kalau kamu fetch data berdasarkan param, kamu perlu
`watch(() => route.params.isbn, ...)`.

### Opsi `props: true`

Supaya komponen tidak bergantung langsung ke router (dan lebih mudah
dites), param bisa dikirim sebagai props:

```js
{ path: '/buku/:isbn', component: DetailBukuView, props: true }
```

Komponen tinggal `defineProps({ isbn: String })`.

Ingat: param dari URL **selalu string**. Kalau kamu butuh angka, ubah dan
validasi sendiri.

---

## 4. Query String: State yang Bisa Dibagikan

`/katalog?kategori=fiksi&halaman=2`. Bagian setelah `?` adalah **query**.

```js
const route = useRoute();
route.query.kategori; // "fiksi"
```

Mengubah query dari kode:

```js
import { useRouter } from 'vue-router';

const router = useRouter();
router.push({ query: { ...route.query, halaman: 3 } });
```

Analogi: query itu seperti **catatan di belakang struk** ("meja 5, tanpa
gula"). Struk yang sama bisa diberikan ke orang lain dan mereka paham
pesanannya. URL dengan query bisa dikirim ke teman dan dia melihat filter
yang sama.

Kapan `router.push` vs `router.replace`:

- `push` = tambah entri baru di history (tombol Back kembali ke sini)
- `replace` = ganti entri sekarang (cocok untuk mengetik di kolom search,
  supaya Back tidak harus ditekan 15 kali)

---

## 5. Lazy Loading

```js
component: () => import('../views/LaporanView.vue')
```

### Analogi: Gudang Restoran

Restoran tidak menaruh semua bahan di meja dapur sejak pagi. Bahan yang
jarang dipakai disimpan di gudang dan diambil **saat ada pesanan**.

Dengan `() => import(...)`, Vite memecah halaman itu jadi file JavaScript
terpisah (chunk) yang hanya diunduh saat route dibuka. Halaman pertama jadi
lebih cepat. Cocok untuk halaman berat atau jarang dibuka (admin, laporan,
editor).

---

## 6. Navigation Guard

Guard adalah function yang jalan **sebelum** perpindahan halaman. Gaya
modern: **return** nilai, tidak perlu memanggil `next()`.

| Return | Artinya |
| --- | --- |
| `true` atau `undefined` | Lanjutkan navigasi |
| `false` | Batalkan, tetap di halaman sekarang |
| Lokasi route (`'/x'` atau `{ name: 'x' }`) | Alihkan ke tempat lain |

### Analogi: Resepsionis Gedung

Resepsionis mengecek: "Sudah isi buku tamu?" Kalau belum, kamu diarahkan
ke meja buku tamu dulu. Resepsionis **membantu alur**, tapi dia bukan
brankas. Orang yang nekat bisa lewat pintu samping.

Contoh konsep dengan `meta` (bukan login, sengaja beda domain):

```js
const routes = [
  { path: '/onboarding', name: 'onboarding', component: OnboardingView },
  {
    path: '/jadwal-saya',
    component: () => import('../views/JadwalSayaView.vue'),
    meta: { butuhOnboarding: true },
  },
];

router.beforeEach((to) => {
  if (!to.meta.butuhOnboarding) return true;

  const sudahOnboarding = /* dari mana kamu tahu? store? localStorage? */ false;
  if (!sudahOnboarding) return { name: 'onboarding' };

  return true;
});
```

Hal yang sengaja **tidak** dijawab di snippet ini, karena itu bagian
latihan Soal 08:

- Dari mana status "sudah boleh masuk" dibaca
- Bagaimana menyimpan tujuan awal supaya user bisa dikembalikan ke sana
- Apa yang terjadi kalau guard mengalihkan ke route yang juga dijaga
  (hati-hati redirect tanpa akhir)

### Guard Bukan Authorization

Ini poin paling penting di bab ini:

> Semua kode frontend bisa dibaca dan diubah user lewat DevTools.

User bisa mengubah state store, menghapus guard, atau langsung memanggil
API dengan `curl`. Jadi:

- **Guard** = UX. Mengarahkan user yang jujur ke tempat yang benar.
- **Authorization** = di **server**. Setiap endpoint API memeriksa session,
  role, dan kepemilikan data.

Kalau API `/api/nilai/semua` bisa diakses tanpa cek di server, guard
secantik apa pun tidak ada gunanya. Pelajari lebih dalam di
[modul keamanan: otorisasi dan akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md).

---

## 7. Route 404

```js
{ path: '/:pathMatch(.*)*', name: 'tidak-ditemukan', component: TidakDitemukanView }
```

Taruh di akhir daftar routes. Pola ini menangkap semua path yang tidak
cocok dengan route lain.

---

## Kesalahan Umum

### 1. Pakai `<a href>` untuk link internal

```vue
<!-- Salah: reload seluruh halaman, state hilang -->
<a href="/tentang">Tentang</a>

<!-- Benar -->
<RouterLink to="/tentang">Tentang</RouterLink>
```

### 2. Fetch hanya di `onMounted` padahal param berubah

Pindah dari `/buku/1` ke `/buku/2` tidak memicu `onMounted` lagi. Pantau
param-nya.

### 3. Memperlakukan param sebagai number

```js
// Salah: "10" === 10 → false
if (route.params.id === 10) ...
```

### 4. Masih memakai `next()` dengan cara campur aduk

Memanggil `next()` dua kali atau lupa memanggilnya membuat navigasi macet.
Gaya `return` lebih sederhana dan direkomendasikan dokumentasi.

### 5. Menganggap guard sudah cukup sebagai keamanan

Sudah dibahas di bagian 6. Selalu pasangkan dengan cek di backend.

---

## Latihan Berpikir

1. Halaman katalog punya filter kategori dan nomor halaman. Kalau disimpan
   di `ref` biasa, apa yang hilang saat user refresh? Kalau disimpan di
   query, apa yang harus kamu validasi?
2. Guard mengalihkan user ke `/onboarding`, dan `/onboarding` sendiri
   punya `meta.butuhOnboarding: true`. Apa yang terjadi? Bagaimana kamu
   mendeteksinya?
3. Bayangkan kamu jadi penyerang. Sebutkan dua cara melewati router guard
   tanpa menyentuh kode server.

---

## Glosarium

| Istilah | Arti singkat |
| --- | --- |
| SPA | Single Page Application, satu HTML, ganti tampilan tanpa reload |
| Route | Pasangan path dan komponen |
| Param | Bagian dinamis di path (`:isbn`) |
| Query | Bagian setelah `?` di URL |
| `RouterView` | Tempat komponen halaman dirender |
| `RouterLink` | Link internal tanpa reload |
| Lazy loading | Memuat kode halaman hanya saat dibutuhkan |
| Chunk | Potongan file JavaScript hasil pemecahan bundle |
| Navigation guard | Function yang jalan sebelum pindah route |
| `meta` | Data tambahan bebas yang ditempel ke route |
| Authorization | Pemeriksaan hak akses, wajib di server |

---

## Soal Terkait

- [Soal 08 — Router](../../materi-praktikum/soal/08-router.md)
- [Soal 10 — Products API](../../materi-praktikum/soal/10-products-api.md)

## Lanjut

Bab berikutnya: [06 — Pinia dan HTTP](../06-pinia-dan-http/README.md).
