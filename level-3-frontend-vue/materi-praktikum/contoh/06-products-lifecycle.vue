<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const products = ref([]);
const loading = ref(false);
const error = ref(null);
let controller;

async function loadProducts() {
  controller?.abort();
  controller = new AbortController();
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('/api/products', {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await response.json();
    products.value = Array.isArray(body) ? body : body.data;
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') return;
    error.value = cause instanceof Error ? cause.message : 'Gagal memuat data.';
  } finally {
    if (!controller.signal.aborted) loading.value = false;
  }
}

onMounted(loadProducts);
onUnmounted(() => controller?.abort());
</script>

<template>
  <main>
    <h1>Produk API</h1>
    <p v-if="loading" role="status">Memuat…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" @click="loadProducts">Coba lagi</button>
    </div>
    <p v-else-if="products.length === 0">Belum ada produk.</p>
    <ul v-else>
      <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>
  </main>
</template>
