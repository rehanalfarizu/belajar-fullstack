<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const products = ref([]);
const loading = ref(false);
const error = ref(null);
let controller;

async function loadProducts() {
  // TODO(human): Kalau masih ada request lama yang jalan, batalkan dulu.
  //   Lalu siapkan "remote pembatal" baru untuk request kali ini.
  // TODO(human): Nyalakan status loading dan kosongkan error lama
  //   (supaya pesan error sebelumnya tidak nempel setelah retry).
  // TODO(human): Ambil data dari '/api/products' sambil menitipkan sinyal pembatal.
  //   Ingat: fetch TIDAK melempar error untuk status 404/500. Cek sendiri
  //   apakah response-nya "ok", kalau tidak, anggap itu error.
  // TODO(human): Ubah body jadi JSON lalu simpan ke products.
  //   Hati-hati bentuk datanya: bisa array langsung, bisa dibungkus { data: [...] }.
  // TODO(human): Kalau gagal, bedakan dua kasus:
  //   (1) request sengaja dibatalkan -> diam saja, jangan tampilkan error;
  //   (2) error sungguhan -> simpan pesan yang bisa dibaca user ke error.
  // TODO(human): Apa pun hasilnya, matikan loading di akhir. Tapi pikirkan:
  //   kalau request ini sudah dibatalkan karena ada request baru, siapa yang
  //   seharusnya mematikan loading?
}

onMounted(() => {
  // TODO(human): Panggil fungsi pemuat data saat komponen sudah tampil.
});

onUnmounted(() => {
  // TODO(human): Batalkan request yang masih jalan saat komponen dilepas.
});
</script>

<template>
  <main>
    <h1>Produk API</h1>
    <!-- TODO(human): Tampilkan TEPAT SATU dari empat keadaan ini:
         1. loading  -> teks "Memuat..." (beri role="status" agar dibacakan screen reader)
         2. error    -> pesan error + tombol "Coba lagi" yang memanggil ulang pemuat data
                        (beri role="alert")
         3. kosong   -> pesan "Belum ada produk."
         4. sukses   -> list produk dengan key stabil (bukan index) -->
  </main>
</template>
