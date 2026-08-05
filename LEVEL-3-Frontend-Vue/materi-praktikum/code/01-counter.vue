<script setup>
import { computed, ref } from 'vue';

const count = ref(0);

const status = computed(() => {
  // TODO: Kosong, Sedikit, atau Banyak.
  return 'TODO';
});

function increment() {
  // TODO
}

function decrement() {
  // TODO: count tidak boleh negatif.
}

function reset() {
  // TODO
}
</script>

<template>
  <section aria-labelledby="counter-title">
    <h1 id="counter-title">Counter</h1>
    <output aria-live="polite">{{ count }} — {{ status }}</output>
    <div>
      <button type="button" @click="decrement">-</button>
      <button type="button" @click="increment">+</button>
      <button type="button" @click="reset">Reset</button>
    </div>
  </section>
</template>
