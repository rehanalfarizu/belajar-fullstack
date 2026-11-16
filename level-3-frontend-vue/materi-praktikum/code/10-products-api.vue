<script setup>
import { onUnmounted, ref, watch } from 'vue';

const products = ref([]);
const page = ref(1);
const search = ref('');
const loading = ref(false);
const error = ref(null);
let controller;

async function loadProducts() {
  // TODO(human): Batalkan request lama sebelum mulai request baru
  //   (ingat soal 06, polanya sama).
  // TODO(human): Susun query string dari page dan search pakai URLSearchParams,
  //   JANGAN merangkai string manual (kenapa? coba cari "Kaos & Celana").
  // TODO(human): Ambil '/api/products?<query>', tangani loading, error, dan
  //   sukses. Simpan daftar produk dari response (perhatikan bentuk datanya).
}

// TODO(human): Bonus — kalau search berubah, page seharusnya kembali ke 1.
//   Di mana tempat paling masuk akal untuk aturan itu?
// TODO(human): Bonus — tunda request saat user masih mengetik (debounce),
//   supaya tidak ada satu request per huruf.

watch([page, search], loadProducts, { immediate: true });
onUnmounted(() => controller?.abort());
</script>

<template>
  <main>
    <h1>Product Explorer</h1>
    <label>
      Cari produk
      <input v-model.trim="search" type="search">
    </label>
    <!-- TODO(human): Tampilkan satu dari keadaan: loading, error + tombol coba lagi,
         kosong, atau list produk (key stabil). -->
    <!-- TODO(human): Navigasi halaman: tombol Sebelumnya (mati di halaman 1),
         teks "Halaman N", dan tombol Berikutnya. Bungkus dengan <nav> yang punya
         aria-label. -->
  </main>
</template>
