<script setup>
// Props = data titipan dari parent. Read-only: jangan diubah di sini.
defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  // TODO(human): tambahkan validator agar price tidak boleh negatif.
  price: { type: Number, required: true },
  // TODO(human): tambahkan validator agar stock harus bilangan bulat >= 0.
  stock: { type: Number, required: true },
});

// TODO(human): siapkan cara memformat angka menjadi Rupiah (cari Intl.NumberFormat).
// Kalau kamu butuh akses props di script, simpan hasil defineProps ke variabel.
</script>

<template>
  <article>
    <!-- TODO(human): render name sebagai judul kartu. -->
    <!-- TODO(human): render price dalam format Rupiah (contoh tampilan: Rp 350.000). -->
    <!-- TODO(human): render stock; kalau 0 tampilkan teks "Habis". -->
    <!-- TODO(human): sediakan named slot "actions" untuk tombol dari parent.
         Kirim id produk (dan info apakah stok habis) sebagai slot props,
         supaya parent bisa membuat tombol yang tahu produk mana yang diklik. -->
  </article>
</template>
