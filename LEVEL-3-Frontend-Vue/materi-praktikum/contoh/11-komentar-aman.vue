<script setup>
import { ref } from 'vue';

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

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

// Allowlist protokol. new URL() menormalkan dulu (huruf besar, spasi,
// tab di tengah "java\tscript:"), jadi lebih tahan trik dibanding
// startsWith/regex buatan sendiri.
function safeUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ALLOWED_PROTOCOLS.has(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

// Kapan v-html boleh?
// 1. HTML-nya berasal dari sumber yang kita kontrol penuh (misal hasil
//    build markdown dokumentasi kita sendiri), bukan dari user.
// 2. Kalau terpaksa dari user (misal editor rich text), HTML wajib
//    disanitasi dengan library allowlist yang terawat (contoh: DOMPurify)
//    SEBELUM dirender, idealnya juga di server saat disimpan, dan
//    dilengkapi Content-Security-Policy sebagai lapisan kedua.
// 3. Untuk teks biasa (komentar, nama, bio) tidak ada alasan memakai
//    v-html: interpolasi {{ }} sudah meng-escape otomatis.
</script>

<template>
  <main>
    <h1>Komentar</h1>

    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <a
          v-if="safeUrl(comment.website)"
          :href="safeUrl(comment.website)"
          rel="noopener noreferrer nofollow ugc"
          target="_blank"
        >{{ comment.author }}</a>
        <strong v-else>{{ comment.author }}</strong>

        <p class="comment-body">{{ comment.body }}</p>
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
        <input v-model="newWebsite" type="url" maxlength="200">
      </label>
      <label>
        Komentar
        <textarea v-model="newBody" required maxlength="500"></textarea>
      </label>
      <button type="submit">Kirim</button>
    </form>
  </main>
</template>

<style scoped>
.comment-body {
  white-space: pre-line;
}
</style>
