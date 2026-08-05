<script setup>
import { onUnmounted, ref, watch } from 'vue';

const products = ref([]);
const page = ref(1);
const search = ref('');
const loading = ref(false);
const error = ref(null);
let controller;

async function loadProducts() {
  // TODO: abort request lama.
  // TODO: buat URLSearchParams dari page dan search.
  // TODO: fetch dan tangani loading/error/success.
}

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
    <!-- TODO: loading, error/retry, empty, list, dan pagination. -->
  </main>
</template>
