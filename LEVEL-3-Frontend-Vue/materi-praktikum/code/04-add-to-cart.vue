<script setup>
import { ref } from 'vue';

const props = defineProps({
  productId: { type: Number, required: true },
});

const emit = defineEmits({
  add: (payload) => {
    // TODO(human): validator event "add".
    // Kembalikan true hanya kalau payload punya productId DAN quantity
    // yang keduanya integer positif. Selain itu kembalikan false
    // (Vue akan memberi warning di console saat development).
    return Boolean(payload);
  },
});

const quantity = ref(1);

function submit() {
  // TODO(human): cegah submit kalau quantity bukan integer positif.
  // TODO(human): kirim event "add" ke parent dengan payload berbentuk
  // object berisi productId (dari props) dan quantity (dari state lokal).
}
</script>

<template>
  <form @submit.prevent="submit">
    <label>
      Jumlah
      <!-- TODO(human): pertimbangkan atribut agar browser hanya menerima bilangan bulat. -->
      <input v-model.number="quantity" type="number" min="1">
    </label>
    <button type="submit">Tambah</button>
  </form>
</template>
