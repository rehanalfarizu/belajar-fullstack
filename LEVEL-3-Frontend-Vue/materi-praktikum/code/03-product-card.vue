<script setup>
defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});
</script>

<template>
  <article>
    <!-- TODO: render name, formatted price, dan stock. -->
    <!-- TODO: named slot "actions" dengan slot prop id. -->
  </article>
</template>
