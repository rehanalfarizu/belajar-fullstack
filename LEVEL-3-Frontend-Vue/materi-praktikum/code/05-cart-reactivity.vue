<script setup>
import { computed, ref } from 'vue';

const taxRate = 0.11;
const items = ref([
  { id: 1, name: 'Keyboard', price: 350000, quantity: 1 },
  { id: 2, name: 'Mouse', price: 175000, quantity: 2 },
]);

const totalItems = computed(() => {
  // TODO
  return 0;
});

const subtotal = computed(() => {
  // TODO
  return 0;
});

const tax = computed(() => {
  // TODO
  return 0;
});

const total = computed(() => {
  // TODO
  return 0;
});
</script>

<template>
  <section>
    <h1>Cart</h1>
    <!-- TODO: render items dan semua computed total. -->
  </section>
</template>
