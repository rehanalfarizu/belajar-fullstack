<script setup>
import { computed, ref } from 'vue';

const taxRate = 0.11;
const items = ref([
  { id: 1, name: 'Keyboard', price: 350000, quantity: 1 },
  { id: 2, name: 'Mouse', price: 175000, quantity: 2 },
]);

const totalItems = computed(() => {
  // TODO(human): jumlahkan quantity semua item (bukan jumlah baris array).
  return 0;
});

const subtotal = computed(() => {
  // TODO(human): jumlahkan harga x quantity untuk setiap item.
  return 0;
});

const tax = computed(() => {
  // TODO(human): hitung pajak dari subtotal memakai taxRate.
  // Rupiah tidak punya sen — putuskan cara membulatkannya.
  return 0;
});

const total = computed(() => {
  // TODO(human): total = subtotal + pajak. Pakai computed lain, jangan hitung ulang dari nol.
  return 0;
});

// TODO(human): buat helper untuk memformat angka ke Rupiah.
// Jangan simpan total sebagai ref terpisah — semuanya harus turunan dari items.
</script>

<template>
  <section>
    <h1>Cart</h1>
    <!-- TODO(human): render setiap item (nama dan quantity) dengan :key stabil. -->
    <!-- TODO(human): render jumlah item, subtotal, pajak, dan total (format Rupiah). -->
  </section>
</template>
