<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const products = ref([]);
const loading = ref(false);
const error = ref(null);
let controller;

async function loadProducts() {
  controller?.abort();
  const current = new AbortController();
  controller = current;
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('/api/products', {
      signal: current.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await response.json();
    if (current.signal.aborted) return;
    products.value = Array.isArray(body) ? body : body.data;
  } catch (cause) {
    if (current.signal.aborted) return;
    error.value = cause instanceof Error ? cause.message : 'Gagal memuat data.';
  } finally {
    if (!current.signal.aborted) loading.value = false;
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
