# Materi Teori 06 — Pinia dan HTTP

> Versi: **Pinia 4.x** (rilis terbaru di npm). Untuk materi ini,
> `createPinia`, `defineStore` (gaya setup), dan `storeToRefs` sama seperti
> Pinia 2 dan 3. Perubahan Pinia 4 sifatnya teknis (hanya ESM, devtools
> dipasang terpisah). HTTP memakai `fetch` bawaan browser; `axios`
> disinggung sebagai alternatif.

## Tujuan

Setelah baca bab ini, kamu bisa:

- Membedakan state lokal, state bersama (shared), dan server state
- Membuat store Pinia gaya setup: state, getter, action
- Memakai store di komponen tanpa kehilangan reactivity (`storeToRefs`)
- Menjelaskan alur request HTTP di UI: idle, loading, success, error
- Tahu kenapa validasi di frontend tidak menggantikan validasi backend

---

## 1. Kapan Butuh Store?

### Analogi: Papan Pengumuman Kos vs Buku Catatan Pribadi

- **Buku catatan pribadi** = state lokal komponen. Isinya hanya urusanmu:
  apakah dropdown terbuka, isi kolom search yang sedang diketik.
- **Papan pengumuman di ruang tamu kos** = store. Semua penghuni bisa
  baca dan (lewat aturan) mengubah: jadwal piket, siapa yang sudah bayar
  listrik.

Jangan pindahkan semua ke papan pengumuman. Papan yang penuh coretan
justru membingungkan.

| Jenis state | Contoh | Tempat |
| --- | --- | --- |
| Lokal UI | Modal terbuka, tab aktif, draft input | `ref` di komponen |
| Shared client | Tema, bahasa, daftar favorit, keranjang | Pinia store |
| Server state | Daftar buku dari API, profil user | Dimuat lewat HTTP; boleh di-cache, tapi sumber kebenarannya server |

Tanda kamu butuh store: data yang sama dipakai di beberapa komponen yang
**tidak** punya hubungan parent-child dekat, dan kamu mulai mengoper props
lewat 3-4 level (prop drilling).

### Kenapa Penting di Dunia Kerja

Di proyek nyata, pertanyaan "state ini taruh di mana?" muncul setiap hari.
Jawaban yang salah menghasilkan bug klasik: data user sebelumnya masih
terlihat setelah logout, angka di header beda dengan angka di halaman, atau
semua komponen ikut render ulang karena satu store raksasa. Developer yang
bisa menjelaskan alasannya memilih tempat state dianggap sudah "naik level".

---

## 2. Setup Pinia

```js
// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

createApp(App).use(createPinia()).mount('#app');
```

Kalau kamu memilih Pinia saat `npm create vue@latest`, baris ini sudah
dibuat otomatis.

---

## 3. Store Gaya Setup

Gaya setup terasa sama dengan `<script setup>`: `ref` jadi state,
`computed` jadi getter, function jadi action.

```js
// src/stores/favorit.js
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useFavoritStore = defineStore('favorit', () => {
  const isbnList = ref([]);

  const jumlah = computed(() => isbnList.value.length);

  function toggle(isbn) {
    if (typeof isbn !== 'string' || isbn.length === 0) return;
    const ada = isbnList.value.includes(isbn);
    isbnList.value = ada
      ? isbnList.value.filter((x) => x !== isbn)
      : [...isbnList.value, isbn];
  }

  return { isbnList, jumlah, toggle };
});
```

### Analogi: Loket Bank

- **State** = saldo di sistem bank.
- **Getter** = laporan yang dihitung dari saldo (misal: "saldo cukup untuk
  transfer?"). Tidak mengubah apa-apa.
- **Action** = teller. Semua perubahan saldo lewat teller, yang memeriksa
  apakah permintaannya masuk akal.

Kenapa perubahan lewat action, bukan langsung `store.isbnList.push(...)`
dari komponen mana saja? Sama seperti emit di bab 03: satu pintu masuk
membuat bug mudah dilacak dan aturan validasi tidak tercecer.

Aturan penting:

- Semua yang mau dipakai di luar harus **di-return**. State yang tidak
  di-return tidak terlihat di DevTools dan bisa bermasalah.
- Nama store (`'favorit'`) harus unik di seluruh aplikasi.
- Store setup **tidak** punya `$reset()` otomatis. Kalau butuh "kosongkan
  semua" (misal saat logout), tulis action sendiri.

---

## 4. Memakai Store di Komponen

```vue
<script setup>
import { storeToRefs } from 'pinia';
import { useFavoritStore } from '../stores/favorit';

const favorit = useFavoritStore();
const { jumlah } = storeToRefs(favorit); // state & getter: pakai storeToRefs
const { toggle } = favorit;              // action: boleh destructure langsung
</script>

<template>
  <p>Favorit: {{ jumlah }}</p>
  <button type="button" @click="toggle('9786020331607')">Simpan</button>
</template>
```

Kenapa `storeToRefs`? Store adalah object `reactive`. Ingat bab 02:
destructure langsung dari `reactive` memutus reactivity. `storeToRefs`
mengubah state dan getter jadi `ref` yang tetap tersambung. Action adalah
function biasa, jadi aman di-destructure.

Alternatif paling aman: tidak destructure sama sekali, tulis
`favorit.jumlah` di template.

---

## 5. HTTP di UI: Empat Keadaan

Setiap request dari UI minimal punya empat keadaan. Kalau kamu hanya
memikirkan "success", user akan melihat layar kosong yang membingungkan.

```text
idle ──▶ loading ──▶ success (ada data / kosong)
                └──▶ error ──▶ (retry) ──▶ loading
```

### Analogi: Pesan Ojek Online

1. **Idle**: aplikasi terbuka, belum pesan.
2. **Loading**: "Mencari driver..." dengan animasi. User tahu sistem
   sedang bekerja.
3. **Success**: "Driver ditemukan". Atau **kosong**: "Tidak ada driver di
   sekitarmu", yang juga hasil sah, bukan error.
4. **Error**: "Koneksi gagal" + tombol **Coba lagi**.

Bayangkan kalau aplikasi ojek hanya menampilkan layar putih selama 10 detik.
Kamu pasti tutup aplikasinya.

### Bentuk Dasar `fetch`

```js
const response = await fetch('/api/jadwal?semester=7');

if (!response.ok) {
  // 404, 500, dll TIDAK membuat fetch melempar error.
  // Kamu sendiri yang harus memutuskan ini dianggap gagal.
}

const body = await response.json();
```

Dua hal yang sering mengejutkan pemula:

- `fetch` **hanya melempar error** untuk masalah jaringan (offline, DNS,
  CORS, abort). Status 404 atau 500 tetap dianggap "berhasil" oleh `fetch`.
  Selalu cek `response.ok`.
- `response.json()` juga bisa gagal kalau server membalas HTML (misal halaman
  error). Itu masuk jalur error juga.

Merangkai `loading`, `error`, `try/catch/finally`, retry, dan pembatalan
request lama menjadi satu alur yang rapi adalah inti Soal 06 dan Soal 10.
Bab 04 sudah membahas `AbortController`.

### Membangun Query String dengan Aman

```js
const params = new URLSearchParams({ semester: '7', cari: 'basis data' });
fetch(`/api/jadwal?${params}`);
// → /api/jadwal?semester=7&cari=basis+data
```

`URLSearchParams` meng-encode karakter khusus (spasi, `&`, `?`). Menempel
string manual (`'?cari=' + input`) membuat input berisi `&` merusak URL.

### Race Condition pada Search

User mengetik "ba", lalu "basis". Dua request terkirim. Kalau response "ba"
datang **lebih lambat**, hasil lama menimpa hasil baru. Solusinya:
batalkan request lama sebelum mengirim yang baru, atau abaikan response yang
sudah tidak relevan. Ini sebabnya `AbortController` muncul lagi di sini.

### Bagaimana dengan `axios`?

`axios` adalah library populer dengan fitur tambahan: otomatis parse JSON,
melempar error untuk status 4xx/5xx, interceptor untuk token. Konsepnya
sama. Belajar `fetch` dulu supaya kamu paham apa yang dilakukan `axios` di
balik layar.

---

## 6. Batas Kepercayaan: Frontend vs Backend

### Analogi: Formulir di Loket vs Pemeriksaan di Dalam

Petugas loket mengecek formulirmu lengkap atau tidak (validasi frontend),
supaya kamu tidak antre lama lalu ditolak. Tapi pemeriksaan **sah** tetap
dilakukan di dalam kantor (backend). Formulir bisa dipalsukan; pemeriksaan
di dalam tidak bisa dilewati.

- Validasi di action store atau form = **membantu UX**.
- Validasi dan authorization di server = **keamanan**.
- Jangan menyimpan secret (API key privat) di kode frontend atau di
  variabel `VITE_*`. Semua yang dibundle Vite bisa dibaca siapa saja.
- Saat logout, kosongkan store yang berisi data pribadi supaya user
  berikutnya di perangkat yang sama tidak melihatnya.

---

## Kesalahan Umum

### 1. Destructure state store tanpa `storeToRefs`

```js
// Salah: jumlah jadi angka mati
const { jumlah } = useFavoritStore();

// Benar
const { jumlah } = storeToRefs(useFavoritStore());
```

### 2. Lupa return di store setup

State yang tidak di-return tidak bisa dipakai komponen dan tidak muncul di
DevTools.

### 3. Menyimpan nilai turunan sebagai state di store

Sama seperti bab 02: kalau bisa dihitung, jadikan `computed` (getter).

### 4. Tidak cek `response.ok`

```js
// Salah: halaman error 500 dianggap data
const data = await (await fetch(url)).json();
```

### 5. Tidak ada state loading/error/kosong

Layar putih tanpa penjelasan adalah bug UX, walau console bersih.

### 6. Semua data dimasukkan ke store global

Draft form satu halaman tidak perlu masuk store. Store yang terlalu gemuk
sulit dirawat dan rawan bocor antar akun.

---

## Latihan Berpikir

1. Daftar buku yang sedang tampil di halaman katalog: lebih cocok di
   `ref` komponen atau di store Pinia? Apa yang berubah kalau halaman detail
   juga butuh data yang sama?
2. Server membalas `200 OK` dengan body `{ "data": [] }`. Itu success,
   empty, atau error? Bagaimana tampilannya seharusnya?
3. Teman setim menaruh `VITE_PAYMENT_SECRET` di `.env` frontend "karena
   cuma dipakai di satu fungsi". Jelaskan risikonya dan alternatifnya.

---

## Glosarium

| Istilah | Arti singkat |
| --- | --- |
| Store | Tempat state bersama yang bisa dipakai banyak komponen |
| Pinia | Library state management resmi Vue |
| Getter | Nilai turunan di store (computed) |
| Action | Function di store yang mengubah state |
| `storeToRefs` | Mengubah state/getter store jadi ref saat destructure |
| Prop drilling | Mengoper props lewat banyak level hanya untuk diteruskan |
| Server state | Data yang sumber kebenarannya di server |
| `response.ok` | `true` kalau status HTTP 200-299 |
| Race condition | Hasil bergantung pada urutan selesai yang tidak bisa ditebak |
| `URLSearchParams` | API untuk membangun query string yang ter-encode |

---

## Soal Terkait

- [Soal 09 — Cart Store (Pinia)](../../materi-praktikum/soal/09-cart-store.md)
- [Soal 10 — Products API](../../materi-praktikum/soal/10-products-api.md)
- [Soal 06 — Products Lifecycle](../../materi-praktikum/soal/06-products-lifecycle.md)

## Lanjut

Kamu sudah menyelesaikan semua bab dasar. Lanjutkan ke
[Vue Performance dan Security](../02-performance-security.md), lalu kerjakan
[praktikum](../../materi-praktikum/README.md).
