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
  // TODO: search case-insensitive dan filter active.
  return products.value;
});

function resetFilters() {
  // TODO
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

    <!-- TODO: list dengan key stabil dan empty state. -->
  </main>
</template>
