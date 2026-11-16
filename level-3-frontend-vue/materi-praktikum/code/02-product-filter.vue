<script setup>
import { computed, ref } from 'vue';

const search = ref('');
const onlyActive = ref(false);
const products = ref([
  { id: 1, name: 'Keyboard', active: true },
  { id: 2, name: 'Mouse', active: false },
  { id: 3, name: 'Monitor', active: true },
]);

const filteredProducts = computed(() => {
  // TODO(human): kembalikan array BARU berisi produk yang lolos dua syarat:
  // 1. nama produk mengandung teks pencarian (huruf besar/kecil dianggap sama);
  // 2. kalau onlyActive dicentang, hanya produk yang active.
  // Jangan mengubah products.value di sini — computed hanya membaca.
  return products.value;
});

function resetFilters() {
  // TODO(human): kembalikan search dan onlyActive ke nilai awalnya.
}
</script>

<template>
  <main>
    <h1>Produk</h1>
    <label>
      Cari
      <input v-model.trim="search" type="search">
    </label>
    <label>
      <input v-model="onlyActive" type="checkbox">
      Hanya produk aktif
    </label>
    <button type="button" @click="resetFilters">Reset</button>

    <!-- TODO(human): render filteredProducts sebagai list.
         - Setiap item wajib punya :key yang stabil (BUKAN index).
         - Tampilkan nama dan status aktif/nonaktif.
         - Kalau hasil filter kosong, tampilkan pesan "empty state" sebagai gantinya. -->
  </main>
</template>
