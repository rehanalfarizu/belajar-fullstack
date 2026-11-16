<script setup>
import { computed, ref } from 'vue';

const count = ref(0);

const status = computed(() => {
  if (count.value === 0) return 'Kosong';
  if (count.value < 5) return 'Sedikit';
  return 'Banyak';
});

function increment() {
  count.value += 1;
}

function decrement() {
  count.value = Math.max(0, count.value - 1);
}

function reset() {
  count.value = 0;
}
</script>

<template>
  <section aria-labelledby="counter-title">
    <h1 id="counter-title">Counter</h1>
    <output aria-live="polite">{{ count }} — {{ status }}</output>
    <div>
      <button type="button" :disabled="count === 0" @click="decrement">-</button>
      <button type="button" @click="increment">+</button>
      <button type="button" @click="reset">Reset</button>
    </div>
  </section>
</template>
