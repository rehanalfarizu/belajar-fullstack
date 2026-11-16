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
  const query = search.value.toLocaleLowerCase('id-ID');

  return products.value.filter((product) => {
    const matchesSearch = product.name
      .toLocaleLowerCase('id-ID')
      .includes(query);
    const matchesActive = !onlyActive.value || product.active;
    return matchesSearch && matchesActive;
  });
});

function resetFilters() {
  search.value = '';
  onlyActive.value = false;
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

    <ul v-if="filteredProducts.length">
      <li v-for="product in filteredProducts" :key="product.id">
        {{ product.name }} — {{ product.active ? 'Aktif' : 'Nonaktif' }}
      </li>
    </ul>
    <p v-else>Tidak ada produk yang cocok.</p>
  </main>
</template>
