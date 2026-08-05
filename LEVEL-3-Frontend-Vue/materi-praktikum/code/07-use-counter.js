import { computed, ref } from 'vue';

export function useCounter(initial = 0, minimum = 0) {
  const count = ref(initial);

  const isMinimum = computed(() => {
    // TODO
    return false;
  });

  function increment() {
    // TODO
  }

  function decrement() {
    // TODO: jangan melewati minimum.
  }

  function reset() {
    // TODO: kembali ke initial.
  }

  return { count, isMinimum, increment, decrement, reset };
}
