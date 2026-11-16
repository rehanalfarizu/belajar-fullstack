<script setup>
import { onUnmounted, ref, watch } from 'vue';

const products = ref([]);
const page = ref(1);
const search = ref('');
const loading = ref(false);
const error = ref(null);
let controller;

async function loadProducts() {
  controller?.abort();
  controller = new AbortController();
  loading.value = true;
  error.value = null;

  const query = new URLSearchParams({
    page: String(page.value),
    search: search.value,
  });

  try {
    const response = await fetch(`/api/products?${query}`, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await response.json();
    products.value = body.data ?? [];
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') return;
    error.value = cause instanceof Error ? cause.message : 'Gagal memuat produk.';
  } finally {
    if (!controller.signal.aborted) loading.value = false;
  }
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

    <p v-if="loading" role="status">Memuat…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" @click="loadProducts">Coba lagi</button>
    </div>
    <p v-else-if="products.length === 0">Tidak ada produk.</p>
    <ul v-else>
      <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>

    <nav aria-label="Pagination">
      <button type="button" :disabled="page === 1" @click="page -= 1">
        Sebelumnya
      </button>
      <span>Halaman {{ page }}</span>
      <button type="button" @click="page += 1">Berikutnya</button>
    </nav>
  </main>
</template>
