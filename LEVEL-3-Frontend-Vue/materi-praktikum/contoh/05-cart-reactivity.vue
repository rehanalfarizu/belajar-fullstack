<script setup>
import { computed, ref } from 'vue';

const taxRate = 0.11;
const items = ref([
  { id: 1, name: 'Keyboard', price: 350000, quantity: 1 },
  { id: 2, name: 'Mouse', price: 175000, quantity: 2 },
]);

const totalItems = computed(() =>
  items.value.reduce((sum, item) => sum + item.quantity, 0)
);
const subtotal = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const tax = computed(() => Math.round(subtotal.value * taxRate));
const total = computed(() => subtotal.value + tax.value);

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
</script>

<template>
  <section>
    <h1>Cart</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} × {{ item.quantity }}
      </li>
    </ul>
    <dl>
      <dt>Jumlah item</dt><dd>{{ totalItems }}</dd>
      <dt>Subtotal</dt><dd>{{ formatRupiah(subtotal) }}</dd>
      <dt>Pajak</dt><dd>{{ formatRupiah(tax) }}</dd>
      <dt>Total</dt><dd>{{ formatRupiah(total) }}</dd>
    </dl>
  </section>
</template>
