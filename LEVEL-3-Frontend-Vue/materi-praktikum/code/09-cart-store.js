import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  const totalItems = computed(() => {
    // TODO
    return 0;
  });

  const subtotal = computed(() => {
    // TODO
    return 0;
  });

  function add(product, quantity = 1) {
    // TODO: validasi dan merge item dengan ID sama.
  }

  function updateQuantity(productId, quantity) {
    // TODO
  }

  function remove(productId) {
    // TODO
  }

  function clear() {
    // TODO
  }

  return { items, totalItems, subtotal, add, updateQuantity, remove, clear };
});
