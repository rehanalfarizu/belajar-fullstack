// ============================================================
// SOAL 03 (frontend) — Fetch dan Axios untuk memanggil REST API
// ============================================================
// File ini dipakai bersama code/02-rest-api-crud.js (backend yang kamu isi
// dulu). Salin isi file ini ke proyek Vite-mu sebagai src/api/postsFetch.js
// dan src/api/postsAxios.js, lalu isi TODO(human).
// Install axios: npm install axios
// ============================================================

const BASE_URL = 'http://localhost:3001/api';

// ------------------------------------------------------------
// BAGIAN FETCH
// ------------------------------------------------------------

// TODO(human): getPosts(page = 1) — GET /posts?page=..&limit=10
// Petunjuk : fetch TIDAK melempar error untuk status 404/500. Cek properti
//            `ok` pada response sendiri, lalu lempar Error dengan pesan yang
//            berguna (idealnya pesan dari body error server).
// Selesai kalau: server mati atau 500 -> fungsi melempar error; sukses -> JSON.
async function getPosts(page = 1) {}

// TODO(human): getPost(id) — GET /posts/:id
// Selesai kalau: id tak ada -> error dengan pesan "Post tidak ditemukan".
async function getPost(id) {}

// TODO(human): createPost(data) — POST /posts dengan body JSON
// Petunjuk : Body harus berupa string JSON, dan server perlu tahu tipenya lewat
//            header. Apa yang terjadi kalau salah satunya terlupa? Coba.
// Selesai kalau: server menerima field yang kamu kirim (cek dengan console.log
//            di server).
async function createPost(data) {}

// TODO(human): deletePost(id) — DELETE /posts/:id
// Selesai kalau: mengembalikan pesan sukses, dan GET id yang sama jadi 404.
async function deletePost(id) {}

// ------------------------------------------------------------
// BAGIAN AXIOS
// ------------------------------------------------------------

// TODO(human): buat axios instance (baseURL, timeout 5000 ms, header JSON).
// Petunjuk : Cari `axios.create` di dokumentasi. Berapa baris yang kamu hemat
//            dibanding versi fetch?

// TODO(human): getPostsAxios(page = 1), getPostAxios(id), createPostAxios(data)
// Petunjuk : Perhatikan bedanya dengan fetch: apakah kamu perlu JSON.stringify?
//            Apakah 404 melempar error sendiri? Di mana pesan error server
//            berada pada objek error axios?
// Selesai kalau: perilaku sama dengan versi fetch untuk sukses dan gagal.

// TODO(human): (bonus) interceptor untuk mencatat tiap request dan durasinya.
// Selesai kalau: console menampilkan METHOD, URL, status, dan durasi (ms).

module.exports = { BASE_URL, getPosts, getPost, createPost, deletePost };
