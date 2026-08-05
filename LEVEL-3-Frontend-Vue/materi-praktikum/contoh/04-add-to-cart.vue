<script setup>
import { ref } from 'vue';

const props = defineProps({
  productId: { type: Number, required: true },
});

const emit = defineEmits({
  add: ({ productId, quantity }) =>
    Number.isInteger(productId) &&
    productId > 0 &&
    Number.isInteger(quantity) &&
    quantity > 0,
});

const quantity = ref(1);

function submit() {
  if (!Number.isInteger(quantity.value) || quantity.value < 1) return;
  emit('add', { productId: props.productId, quantity: quantity.value });
}
</script>

<template>
  <form @submit.prevent="submit">
    <label>
      Jumlah
      <input v-model.number="quantity" type="number" min="1" step="1">
    </label>
    <button type="submit">Tambah</button>
  </form>
</template>
