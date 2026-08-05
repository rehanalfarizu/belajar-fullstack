<script setup>
const props = defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    validator: (value) => value >= 0,
  },
  stock: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value) && value >= 0,
  },
});

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});
</script>

<template>
  <article>
    <h2>{{ props.name }}</h2>
    <p>{{ rupiah.format(props.price) }}</p>
    <p>{{ props.stock > 0 ? `Stok ${props.stock}` : 'Habis' }}</p>
    <slot name="actions" :product-id="props.id" :disabled="props.stock === 0" />
  </article>
</template>
