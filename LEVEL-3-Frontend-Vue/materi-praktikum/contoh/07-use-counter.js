import { computed, ref } from 'vue';

export function useCounter(initial = 0, minimum = 0) {
  if (!Number.isFinite(initial) || !Number.isFinite(minimum)) {
    throw new TypeError('initial dan minimum harus number.');
  }
  if (initial < minimum) {
    throw new RangeError('initial tidak boleh lebih kecil dari minimum.');
  }

  const count = ref(initial);
  const isMinimum = computed(() => count.value === minimum);

  function increment() {
    count.value += 1;
  }

  function decrement() {
    count.value = Math.max(minimum, count.value - 1);
  }

  function reset() {
    count.value = initial;
  }

  return { count, isMinimum, increment, decrement, reset };
}
