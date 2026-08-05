import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

function validateQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError('Quantity harus integer positif.');
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  function add(product, quantity = 1) {
    validateQuantity(quantity);
    const existing = items.value.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.value.push({ ...product, quantity });
    }
  }

  function updateQuantity(productId, quantity) {
    validateQuantity(quantity);
    const item = items.value.find((candidate) => candidate.id === productId);
    if (!item) throw new Error('Item tidak ditemukan.');
    item.quantity = quantity;
  }

  function remove(productId) {
    items.value = items.value.filter((item) => item.id !== productId);
  }

  function clear() {
    items.value = [];
  }

  return { items, totalItems, subtotal, add, updateQuantity, remove, clear };
});
