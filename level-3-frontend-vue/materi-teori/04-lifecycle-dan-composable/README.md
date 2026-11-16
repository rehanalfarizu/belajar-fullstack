# Materi Teori 04 — Lifecycle dan Composable

> Versi: **Vue 3.5.x**. Fitur baru 3.5 yang disinggung di sini:
> `useTemplateRef` dan `onWatcherCleanup`.

## Tujuan

Setelah baca bab ini, kamu bisa:

- Menjelaskan "hidup" sebuah komponen: dibuat, dipasang, diperbarui, dilepas
- Memilih hook yang tepat: `onMounted`, `onUpdated`, `onUnmounted`
  (dan pasangan `onBefore...`)
- Membersihkan efek samping (timer, listener, request) supaya tidak bocor
- Mengemas logika yang bisa dipakai ulang jadi **composable** `useX()`
- Menulis composable yang punya API kecil dan bisa dites

---

## 1. Lifecycle: Hidup Sebuah Komponen

### Analogi: Penyewa Kos

Komponen itu seperti anak kos:

1. **Setup** = tanda tangan kontrak, siapkan barang (jalankan `<script setup>`)
2. **Mounted** = sudah masuk kamar, barang ditata (elemen sudah ada di DOM)
3. **Updated** = ganti posisi lemari (data berubah, DOM diperbarui)
4. **Unmounted** = pindah keluar (komponen dilepas dari DOM)

Anak kos yang baik **mematikan lampu, mencabut charger, dan mengembalikan
kunci** sebelum pindah. Komponen yang baik juga **membersihkan** timer,
event listener, dan request sebelum dilepas.

```text
<script setup> jalan
      │
      ▼
onBeforeMount ──▶ onMounted        (DOM siap)
      │
      ▼  data berubah
onBeforeUpdate ──▶ onUpdated
      │
      ▼  komponen dilepas (v-if false, pindah route)
onBeforeUnmount ──▶ onUnmounted    (waktunya bersih-bersih)
```

### Kenapa Penting di Dunia Kerja

Bug yang muncul karena lifecycle sering **tidak kelihatan** saat demo, tapi
muncul setelah aplikasi dipakai berjam-jam: tab browser makin berat, request
dobel, notifikasi muncul dua kali, error "cannot read property of null"
setelah pindah halaman. Ini jenis bug yang membuat tim QA dan user marah.
Developer yang terbiasa menulis cleanup dihargai karena aplikasinya stabil.

---

## 2. `onMounted` — Setelah Masuk Kamar

Di `<script setup>`, kode di luar hook jalan **sebelum** elemen ada di DOM.
Kalau kamu butuh menyentuh elemen (fokus input, ukur lebar, pasang library
chart), tunggu `onMounted`.

```vue
<script setup>
import { onMounted, useTemplateRef } from 'vue';

const inputCari = useTemplateRef('cari');

onMounted(() => {
  inputCari.value?.focus();
});
</script>

<template>
  <input ref="cari" type="search" aria-label="Cari buku">
</template>
```

`useTemplateRef` (Vue 3.5+) mengambil elemen yang punya `ref="cari"`. Di
versi lebih lama orang menulis `const cari = ref(null)` dengan nama yang
sama; kamu akan sering menemui gaya itu di tutorial.

Fetch data awal juga sering ditaruh di `onMounted`. Sebenarnya fetch bisa
langsung dipanggil di `setup`, tapi `onMounted` membuat niatnya jelas dan
aman untuk SSR (server tidak menjalankan `onMounted`).

---

## 3. `onUnmounted` — Bersih-bersih Sebelum Pindah

```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const jam = ref(new Date());
let idInterval;

onMounted(() => {
  idInterval = setInterval(() => {
    jam.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(idInterval);
});
</script>
```

### Analogi: Keran Air

Kalau kamu buka keran (setInterval, addEventListener, WebSocket) lalu
pergi tanpa menutupnya, air terus mengalir walau tidak ada yang pakai.
Lama-lama banjir (memory leak, CPU tinggi).

Daftar hal yang **wajib** punya pasangan cleanup:

| Dibuka dengan | Ditutup dengan |
| --- | --- |
| `setInterval` / `setTimeout` | `clearInterval` / `clearTimeout` |
| `window.addEventListener` | `window.removeEventListener` (function yang sama) |
| `new WebSocket()` | `socket.close()` |
| `fetch` dengan `AbortController` | `controller.abort()` |
| Library pihak ketiga (chart, map) | Method `destroy()` dari library itu |

---

## 4. Membatalkan Request: `AbortController`

Kasus nyata: user membuka halaman jadwal, request sedang jalan, lalu user
langsung pindah halaman. Tanpa pembatalan, response tetap datang dan mencoba
mengisi state komponen yang sudah tidak ada.

Bentuk dasarnya:

```js
const controller = new AbortController();

fetch('/api/jadwal', { signal: controller.signal });

// nanti, saat tidak dibutuhkan lagi:
controller.abort();
```

Saat di-abort, `fetch` melempar error dengan `name === 'AbortError'`. Error
ini **bukan kegagalan** dari sisi user (dia sendiri yang pergi), jadi
biasanya tidak perlu ditampilkan sebagai pesan error. Bagaimana menyusun
`try/catch/finally` yang membedakan abort dari error sungguhan, kapan
`loading` dimatikan, dan bagaimana tombol "coba lagi" bekerja, itu bagian
yang kamu rancang sendiri di Soal 06.

### Cleanup di Dalam Watcher (Vue 3.5+)

Kalau request dipicu oleh `watch`, Vue 3.5 menyediakan `onWatcherCleanup`
yang dipanggil sebelum watcher jalan lagi atau saat dihentikan:

```js
import { onWatcherCleanup, watch } from 'vue';

watch(semester, (nilai) => {
  const controller = new AbortController();
  fetch(`/api/jadwal?semester=${nilai}`, { signal: controller.signal });
  onWatcherCleanup(() => controller.abort());
});
```

Ini sengaja tanpa penanganan state. Fokusnya: **setiap efek punya pasangan
pembersih**.

---

## 5. Composable — Logika yang Bisa Dibawa ke Mana-mana

Composable adalah **function biasa** yang namanya diawali `use`, memakai
fitur reaktif Vue (`ref`, `computed`, `watch`, lifecycle), dan
mengembalikan sesuatu yang berguna.

### Analogi: Resep Bumbu Dasar

Rumah makan Padang punya **bumbu dasar** yang dipakai untuk rendang, gulai,
dan kalio. Mereka tidak meracik ulang dari nol untuk tiap masakan. Bumbu
dasar itu composable: diracik sekali, dipakai di banyak "masakan"
(komponen).

Contoh: melacak apakah browser sedang online.

```js
// useStatusOnline.js
import { onMounted, onUnmounted, ref } from 'vue';

export function useStatusOnline() {
  const online = ref(navigator.onLine);

  function perbarui() {
    online.value = navigator.onLine;
  }

  onMounted(() => {
    window.addEventListener('online', perbarui);
    window.addEventListener('offline', perbarui);
  });

  onUnmounted(() => {
    window.removeEventListener('online', perbarui);
    window.removeEventListener('offline', perbarui);
  });

  return { online };
}
```

Dipakai di komponen:

```vue
<script setup>
import { useStatusOnline } from './useStatusOnline.js';

const { online } = useStatusOnline();
</script>

<template>
  <p v-if="!online" role="status">Kamu sedang offline.</p>
</template>
```

Perhatikan: destructure `{ online }` di sini **aman**, karena `online`
adalah `ref`. Yang bermasalah adalah destructure object `reactive` (bab 02).
Itulah alasan kebanyakan composable mengembalikan object berisi `ref`.

### Ciri Composable yang Baik

- **Satu tujuan**. `useStatusOnline` hanya urus online/offline, bukan juga
  tema gelap dan bahasa.
- **API kecil**. Kembalikan hanya yang perlu dipakai pemanggil. Variabel
  internal tidak perlu ikut di-return.
- **Membersihkan diri sendiri**. Kalau composable membuka sesuatu, dia juga
  yang menutup.
- **Validasi input di awal**. Kalau parameter tidak masuk akal, lebih baik
  gagal cepat dengan pesan jelas daripada diam-diam salah.
- **Bisa dites** tanpa harus merender halaman penuh (untuk yang tidak
  bergantung pada lifecycle komponen).

### Aturan Pemanggilan

Panggil composable **di level atas `<script setup>`**, secara sinkron.
Jangan di dalam `setTimeout`, `if` yang berubah-ubah, atau setelah `await`.
Alasannya: hook seperti `onMounted` di dalam composable perlu tahu
"komponen mana yang sedang di-setup", dan informasi itu hanya ada saat
setup berjalan sinkron.

### Composable vs Function Utilitas Biasa

| | Function utilitas | Composable |
| --- | --- | --- |
| Contoh | `formatTanggal(date)` | `useStatusOnline()` |
| Punya state reaktif? | Tidak | Ya |
| Pakai lifecycle? | Tidak | Bisa |
| Nama | Bebas | Diawali `use` |

Kalau function-mu tidak butuh `ref`/`watch`/lifecycle, jangan dipaksa jadi
composable. Function biasa lebih mudah dites.

---

## 6. Menguji Composable (Gambaran)

Untuk composable yang hanya pakai `ref`/`computed` (tanpa lifecycle), kamu
bisa memanggilnya langsung di test Vitest:

```js
import { describe, expect, it } from 'vitest';
import { useNilaiHuruf } from './useNilaiHuruf.js';

describe('useNilaiHuruf', () => {
  it('memberi A untuk nilai 90', () => {
    const { angka, huruf } = useNilaiHuruf(90);
    expect(huruf.value).toBe('A');
    angka.value = 60;
    expect(huruf.value).toBe('C');
  });
});
```

`useNilaiHuruf` di atas hanya ilustrasi; isinya kamu bayangkan sendiri.
Yang penting polanya: **panggil, cek nilai awal, ubah, cek lagi**. Composable
yang memakai `onMounted` perlu dirender di dalam komponen uji
(misalnya dengan `@vue/test-utils`).

---

## Kesalahan Umum

### 1. Menyentuh DOM di luar `onMounted`

```js
// Salah: elemen belum ada
document.querySelector('#grafik').getContext('2d');

// Benar: tunggu mounted, dan lebih baik pakai template ref
onMounted(() => { /* akses elemen di sini */ });
```

### 2. Lupa cleanup

```js
// Salah: listener tetap hidup setelah komponen hilang
onMounted(() => window.addEventListener('resize', hitungUlang));

// Benar: pasangkan dengan onUnmounted + removeEventListener
```

### 3. `removeEventListener` dengan function berbeda

```js
// Salah: arrow function baru, tidak sama dengan yang dipasang
window.removeEventListener('resize', () => hitungUlang());
```

Simpan referensi function-nya, pakai yang sama untuk pasang dan lepas.

### 4. Memanggil composable setelah `await`

```js
// Salah
const data = await muatAwal();
const { online } = useStatusOnline(); // hook di dalamnya bisa tidak terdaftar
```

### 5. Composable mengembalikan object `reactive` lalu di-destructure

Pemanggil kehilangan reactivity. Kembalikan object berisi `ref`, atau
gunakan `toRefs` sebelum return.

---

## Latihan Berpikir

1. Komponen chat membuka WebSocket. User pindah ke halaman profil lalu
   kembali ke chat 10 kali. Tanpa cleanup, berapa koneksi yang mungkin
   terbuka? Bagaimana kamu membuktikannya lewat DevTools tab Network?
2. Kamu punya logika "simpan draft form ke localStorage setiap ada
   perubahan". Ini lebih cocok jadi composable atau function utilitas?
   Apa yang akan di-return?
3. Kenapa `AbortError` biasanya tidak ditampilkan ke user, tapi error
   `HTTP 500` harus ditampilkan?

---

## Glosarium

| Istilah | Arti singkat |
| --- | --- |
| Lifecycle | Tahapan hidup komponen: setup, mount, update, unmount |
| Hook | Function yang dipanggil Vue di tahap tertentu (`onMounted`) |
| Mount | Komponen dipasang ke DOM |
| Unmount | Komponen dilepas dari DOM |
| Cleanup | Menutup efek samping: timer, listener, request |
| Memory leak | Memori terpakai terus karena sesuatu tidak dilepas |
| `AbortController` | API browser untuk membatalkan `fetch` |
| Template ref | Referensi ke elemen DOM dari template |
| Composable | Function `useX()` yang mengemas logika reaktif |

---

## Soal Terkait

- [Soal 06 — Products Lifecycle](../../materi-praktikum/soal/06-products-lifecycle.md)
- [Soal 07 — useCounter (Composable)](../../materi-praktikum/soal/07-use-counter.md)

## Lanjut

Bab berikutnya: [05 — Vue Router](../05-vue-router/README.md).
