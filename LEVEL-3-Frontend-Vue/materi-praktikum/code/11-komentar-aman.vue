<script setup>
// ============================================================
// PERINGATAN: FILE INI SENGAJA RENTAN XSS.
// Komentar user dirender pakai v-html, dan link website user
// dipasang langsung ke :href tanpa dicek. Jalankan hanya di
// laptopmu sendiri (npm run dev), jangan deploy versi ini.
// Tugasmu: bikin versi aman. Baca soal/11-render-aman-tanpa-v-html.md
// ============================================================
import { ref } from 'vue';

// Data ini pura-puranya datang dari API / database.
// Dua komentar terakhir dikirim oleh "penyerang".
const comments = ref([
  {
    id: 1,
    author: 'Rina',
    website: 'https://rina.example.com',
    body: 'Materinya enak diikuti.\nTerima kasih!',
  },
  {
    id: 2,
    author: 'Budi',
    website: 'https://budi.example.com',
    body: 'Aku pakai <b>Vue 3.5</b>, aman kok.',
  },
  {
    id: 3,
    author: 'Penyerang',
    website: 'https://iseng.example.com',
    body: '<img src="x" onerror="alert(\'XSS dari komentar!\')">',
  },
  {
    id: 4,
    author: 'Penyerang 2',
    website: 'javascript:alert(\'XSS dari link website!\')',
    body: 'Klik nama aku dong.',
  },
]);

const newAuthor = ref('');
const newWebsite = ref('');
const newBody = ref('');
let nextId = 5;

function addComment() {
  if (!newAuthor.value.trim() || !newBody.value.trim()) return;

  comments.value.push({
    id: nextId++,
    author: newAuthor.value.trim(),
    website: newWebsite.value.trim(),
    body: newBody.value,
  });

  newAuthor.value = '';
  newWebsite.value = '';
  newBody.value = '';
}

// TODO(human): Bikin function yang menerima string URL dari user dan
// mengembalikan URL itu HANYA kalau protokolnya http: atau https:.
// Selain itu (javascript:, data:, vbscript:, string ngawur) kembalikan
// sesuatu yang aman, misalnya null, supaya template bisa memutuskan
// "tampilkan nama tanpa link". Petunjuk: konstruktor URL bawaan browser
// bisa mem-parse string dan melempar error kalau formatnya tidak valid.
// Jangan cek pakai startsWith('http') saja; pikirkan kenapa itu kurang.

// TODO(human): Tulis komentar 3-5 kalimat di sini, pakai kata-katamu
// sendiri: KAPAN v-html boleh dipakai, dan syarat apa yang wajib
// dipenuhi kalau sumber HTML-nya dari user.
</script>

<template>
  <main>
    <h1>Komentar</h1>

    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <!-- TODO(human): :href di bawah menerima apa saja, termasuk
             "javascript:...". Pakai function validasi URL buatanmu.
             Kalau URL tidak aman, tampilkan nama penulis sebagai teks biasa
             (tanpa <a>). Tambahkan juga rel yang tepat untuk link ke situs luar. -->
        <a :href="comment.website">{{ comment.author }}</a>

        <!-- TODO(human): Ini sumber XSS utamanya. Ganti v-html dengan cara
             render yang otomatis meng-escape HTML. Setelah diganti, baris
             baru (\n) di komentar Rina tidak lagi tampil sebagai baris baru.
             Cari cara mempertahankannya TANPA kembali ke v-html (petunjuk: CSS). -->
        <p v-html="comment.body"></p>
      </li>
    </ul>

    <form @submit.prevent="addComment">
      <h2>Tulis komentar</h2>
      <label>
        Nama
        <input v-model="newAuthor" required maxlength="50">
      </label>
      <label>
        Website (opsional)
        <input v-model="newWebsite" type="text" maxlength="200">
      </label>
      <label>
        Komentar
        <textarea v-model="newBody" required maxlength="500"></textarea>
      </label>
      <button type="submit">Kirim</button>
    </form>
  </main>
</template>
