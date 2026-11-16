<script setup>
import { computed, ref } from 'vue';

// count adalah state utama. Di script, baca/ubah lewat .value.
const count = ref(0);

const status = computed(() => {
  // TODO(human): kembalikan teks status berdasarkan nilai count:
  // 0 → 'Kosong', 1 sampai 4 → 'Sedikit', 5 ke atas → 'Banyak'.
  // Ingat: computed hanya MENGHITUNG, jangan mengubah state di sini.
  return 'TODO';
});

function increment() {
  // TODO(human): tambah count sebanyak 1.
}

function decrement() {
  // TODO(human): kurangi count sebanyak 1, TAPI count tidak boleh jadi negatif.
  // Pikirkan: apa yang harus terjadi kalau tombol "-" ditekan saat count = 0?
}

function reset() {
  // TODO(human): kembalikan count ke nilai awal.
}
</script>

<template>
  <section aria-labelledby="counter-title">
    <h1 id="counter-title">Counter</h1>
    <output aria-live="polite">{{ count }} — {{ status }}</output>
    <div>
      <!-- TODO(human): pertimbangkan menonaktifkan tombol "-" saat count sudah 0
           (cari atribut HTML yang bisa di-bind secara dinamis). -->
      <button type="button" @click="decrement">-</button>
      <button type="button" @click="increment">+</button>
      <button type="button" @click="reset">Reset</button>
    </div>
  </section>
</template>
