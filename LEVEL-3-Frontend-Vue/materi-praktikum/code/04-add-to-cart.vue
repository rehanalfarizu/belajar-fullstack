<script setup>
import { ref } from 'vue';

const props = defineProps({
  productId: { type: Number, required: true },
});

const emit = defineEmits({
  add: (payload) => {
    // TODO: validasi productId dan quantity integer positif.
    return Boolean(payload);
  },
});

const quantity = ref(1);

function submit() {
  // TODO: emit event add.
}
</script>

<template>
  <form @submit.prevent="submit">
    <label>
      Jumlah
      <input v-model.number="quantity" type="number" min="1">
    </label>
    <button type="submit">Tambah</button>
  </form>
</template>
