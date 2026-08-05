<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const products = ref([]);
const loading = ref(false);
const error = ref(null);
let controller;

async function loadProducts() {
  // TODO: abort request sebelumnya.
  // TODO: set loading/error.
  // TODO: fetch, periksa response.ok, parse JSON.
  // TODO: bedakan AbortError dari error lain.
  // TODO: reset loading di finally.
}

onMounted(() => {
  // TODO: loadProducts().
});

onUnmounted(() => {
  // TODO: abort request aktif.
});
</script>

<template>
  <main>
    <h1>Produk API</h1>
    <!-- TODO: loading, error + retry, empty, dan success state. -->
  </main>
</template>
