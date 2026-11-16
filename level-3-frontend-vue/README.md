# LEVEL 3 — Frontend dengan Vue.js (Track Alternatif)

> **Track alternatif** untuk frontend framework menggunakan **Vue.js**.
> Track utamanya adalah **React**. Pilih salah satu — keduanya punya logika
> reaktif yang mirip, sintaksis yang berbeda.

---

## Tujuan Level Ini

Setelah menyelesaikan level ini, kamu akan mampu:

- Memahami **logika reactivity** (data berubah → UI update otomatis)
- Membangun **Single Page Application (SPA)** dengan Vue 3 + Vite
- Mengelola state dengan **Composition API** + **Pinia**
- Membuat **komponen reusable** dengan props, emits, slots
- Memanggil **REST API** dengan `axios` / `fetch`
- Memahami **Vue Router** untuk navigasi halaman

---

## Apa Itu Vue.js?

**Vue.js** (dilafalkan "view") adalah **framework JavaScript** untuk membangun
**user interface** (tampilan web) yang **reaktif**. Ibarat **"lem ajaib"** —
kamu tulis struktur HTML + JavaScript reaktif di satu file, dan Vue yang
urus sisanya: render ke browser, update saat data berubah, optimasi performa.

### Analogi Sederhana

Bayangkan halaman web itu **Papan Tulis Digital** di kafe:

1. **State (data) — daftar pesanan di papan.** Vanilla JS pakai variabel
   biasa (`let count = 0`). Vue pakai `ref(0)` untuk primitif atau
   `reactive({...})` untuk object. Bedanya: data Vue **reactive** — kalau
   berubah, UI otomatis ikut.
2. **Update UI — tulis ulang papan saat pesanan baru.** Vanilla JS harus
   manual: `document.getElementById(...).textContent = ...`. Vue cukup
   tulis `{{ count }}` di template — **otomatis sync** saat data berubah.
   Inilah inti reactivity Vue.
3. **Komponen — template pesan yang bisa dipakai berulang.** Vanilla JS
   pakai function yang return HTML string (ribet, rawan bug). Vue pakai
   **Single File Component (`.vue`)** — HTML + JS + CSS dalam 1 file,
   diimport ke komponen lain.
4. **Re-render — hapus & tulis ulang papan vs otomatis.** Vanilla JS harus
   manual update DOM tiap saat data berubah. Vue otomatis me-render ulang,
   **hanya bagian yang berubah** (pakai Virtual DOM di balik layar).
5. **Event handler — tombol "Tambah Pesanan".** Vanilla JS pakai
   `addEventListener('click', ...)`. Vue pakai directive `@click="addCount"`
   di template — jauh lebih ringkas, dan method didefinisikan di script.

Intinya: **Vue bikin kita tidak perlu panggil `document.querySelector` lagi**.
Cukup ubah data, UI ikut berubah.

---

## Kenapa Vue.js Ada? (Logikanya)

**Masalah di JavaScript murni (vanilla):**
1. **DOM manipulation manual** — setiap kali data berubah, harus query DOM & update
2. **Kode berantakan** saat aplikasi tumbuh — event listener di mana-mana
3. **Tidak ada komposisi** — tidak ada cara resmi "bikin komponen tombol"
4. **Re-render boros** — update satu angka harus render ulang seluruh list

**Solusi Vue (dan React, Svelte, dll):**
- **Reactive data** — ubah variabel, UI otomatis update (binding 2 arah)
- **Komponen** — UI dipecah jadi bagian kecil yang bisa dipakai ulang
- **Virtual DOM** — Vue hitung diff & update hanya bagian yang perlu
- **Deklaratif** — kamu deskripsikan "UI seperti ini kalau data segini", Vue yang
 urus sisanya

**Vue berbeda dari React** karena:
- **Template-based** — pakai HTML-like syntax (`{{ }}`, `v-if`, `v-for`)
- **Single File Component** — `.vue` file = HTML + JS + CSS dalam 1 file
- **Learning curve lebih landai** — pemula bisa bikin app dalam 1 hari

---

## Kapan Pakai Vue?

Pakai Vue kalau:

- **Baru pertama kali belajar frontend framework** — Vue paling ramah pemula
- **Suka template HTML** — tidak mau belajar JSX (HTML-in-JS ala React)
- **Butuh adopsi bertahap** (progressive adoption) — bisa pakai Vue hanya untuk 1 bagian kecil
  halaman (CDN tag), atau full SPA
- **Tim gabungan PHP + Vue** — banyak agensi Indonesia memakai kombinasi ini
- **Mau dokumentasi bagus dalam Bahasa Inggris** — dokumentasi Vue sangat terstruktur

## Kapan JANGAN Pakai Vue?

- **Belum paham JavaScript modern** (ES6+, arrow function, destructuring) → selesaikan
  LEVEL 1 dulu
- **Butuh native mobile (iOS/Android)** → pertimbangkan React Native atau Flutter
- **Sudah di tim React** dan tidak boleh gonta-ganti → tetap React
- **Butuh SSR + SSG kompleks** (blog 100rb artikel) → pertimbangkan Nuxt atau Next.js

---

## Bedanya dengan React (Track Utama)

1. **Tahun lahir.** React lahir 2013 di Facebook. Vue.js lahir 2014
   diciptakan **Evan You** (ex-Google). Keduanya sudah terbukti di industri.
2. **Template syntax.** React pakai **JSX** — HTML ditulis di dalam
   JavaScript (`return <div>Hello</div>`). Vue pakai **HTML-based** —
   tetap pakai HTML biasa ditambah directive (`{{ }}`, `v-if`, `v-for`).
   Buat yang sudah bisa HTML, Vue terasa lebih natural.
3. **File extension.** React file `.jsx` (JavaScript + XML) atau `.tsx`
   (TypeScript + JSX). Vue file `.vue` — **Single File Component (SFC)**
   yang menggabungkan `<template>`, `<script>`, `<style>` dalam 1 file.
4. **Reactivity.** React pakai pola **imutabel + `setState` / hook** — kamu
   harus panggil setter untuk trigger re-render. Vue pakai **Proxy-based
   reactive** — langsung ubah data (`this.count++`), UI otomatis ikut.
5. **State management.** React punya banyak pilihan library: Redux,
   Zustand, Recoil, Jotai (kamu pilih sendiri, masing-masing curva belajar).
   Vue punya **Pinia** — resmi, ringan, sintaks intuitif. Lebih sedikit
   pilihan = lebih sedikit keraguan.
6. **Routing.** React butuh **React Router** (library terpisah, bukan
   bawaan React). Vue punya **Vue Router** yang resmi & terintegrasi baik
   dengan Vue devtools.
7. **CLI (Command Line Interface).** React pakai Create React App (sudah
   deprecated) atau Vite. Vue juga pakai Vite, dengan CLI resmi
   `create-vue` yang lebih terstruktur.
8. **Learning curve.** React **curam di awal** — harus paham hooks, JSX,
   state management, virtual DOM. Vue **landai** — kamu bisa mulai dari
   HTML biasa + `{{ }}` interpolasi, lalu naik ke fitur advanced secara
   bertahap.
9. **Dokumentasi.** React **bagus** tapi ekosistemnya tersebar (banyak
   library, banyak cara). Vue **terbaik di industri** menurut banyak
   survey developer — konsisten, terstruktur, contoh lengkap.
10. **Komunitas Indonesia.** React **besar**, banyak tutorial & bootcamp.
    Vue juga **besar** dengan lowongan agency & startup yang stabil.
11. **Performance.** Keduanya **sangat baik** dengan Virtual DOM.
    Perbedaan tipis, tidak signifikan untuk kebanyakan aplikasi.
12. **Hiring market.** React **sedikit lebih tinggi** gajinya di pasar
    global. Vue **stabil** dengan banyak lowongan agency & startup Indo.
13. **Framework meta (SSR/SSG).** React punya **Next.js** (paling populer).
    Vue punya **Nuxt.js** (sebanding, ekosistem lebih kecil). Keduanya
    dipakai untuk SEO-friendly website.

### Ringkasan 1 Kalimat

> **React** = "belajar JavaScript-in-HTML, ekosistem besar, lowongan premium."
>
> **Vue** = "belajar HTML-in-JavaScript, dokumentasi juara, ramah pemula."

---

## Peta Belajar Level Ini

Materi lengkap tersedia di [materi teori](materi-teori/README.md),
[praktikum](materi-praktikum/README.md), dan
[tutorial Product Explorer](tutorial/README.md).

Sesudah modul inti, pelajari
[Vue Performance & Security](materi-teori/02-performance-security.md) dan
selesaikan [Self Problem Solving](SELF_PROBLEM_SOLVING.md).

Level ini terdiri dari **10 modul** yang disusun berurutan. Setiap modul
membangun di atas modul sebelumnya, jadi kerjakan dari 01 → 10.

**Modul 01 — Setup Vue 3 + Vite.** Instalasi project dengan `npm create
vue@latest`, mengenal struktur folder (`src/`, `components/`, `views/`,
`router/`, `stores/`), dan menjalankan dev server (`npm run dev`) di
`http://localhost:5173`. Vite = bundler super cepat yang menggantikan Vue
CLI lama.

**Modul 02 — Template & Directive.** Interpolasi `{{ }}` untuk tampilkan
data, `v-if`/`v-else` untuk conditional rendering, `v-for` untuk list
rendering, dan `v-bind` untuk binding atribut dinamis. Ini "perintah dasar"
yang akan dipakai di setiap komponen.

**Modul 03 — Component & Props.** Single File Component (`.vue`) = HTML + JS
+ CSS dalam 1 file. Belajar import/export komponen, dan `props` (cara parent
kirim data ke child). Fondasi untuk membagi UI jadi bagian-bagian kecil
reusable.

**Modul 04 — Event & Emit (`@click`, `defineEmits`).** Cara child kirim
event ke parent (`emit('event-name', data)`) — komunikasi dua arah antara
komponen. Analogi: child tekan bel, parent dengar bunyi bel, parent tahu
harus buka pintu.

**Modul 05 — Reactivity (`ref`, `reactive`, `computed`).** Inti dari Vue.
`ref()` untuk data primitif (number, string, boolean), `reactive()` untuk
object. `computed()` untuk nilai turunan otomatis (misal: total harga dari
array cart). `watch()` untuk efek samping saat data berubah.

**Modul 06 — Lifecycle Hooks.** `onMounted`, `onUpdated`, `onUnmounted` —
momen-momen dalam hidup komponen. Penting untuk fetch API (di `onMounted`),
clean up timer (di `onUnmounted`), dan integrasi library eksternal.

**Modul 07 — Composition API vs Options API.** `<script setup>` adalah
gaya modern penulisan komponen — lebih ringkas, type-friendly, dan logikanya
terkelompok per fitur. Modul ini juga membahas kapan masih pakai Options
API (legacy code, tutorial lama).

**Modul 08 — Vue Router.** Multi-page SPA. Route definition, dynamic
parameter (`/user/:id`), navigation guard (`beforeEach` — untuk cek login
sebelum masuk halaman tertentu), lazy loading komponen.

**Modul 09 — Pinia (State Management).** "Lemari bersama" untuk data yang
dipakai banyak komponen. Store = `defineStore('name', () => {...})`,
getter untuk derived state, action untuk fungsi yang mengubah state.
Pengganti Vuex yang lebih modern dan ringan.

**Modul 10 — HTTP Request ke REST API.** `axios` atau `fetch` untuk panggil
backend (Node/Express atau Laravel). `async/await` untuk handle asynchronous,
error handling dengan `try/catch`, loading state, dan display data dari API
ke UI Vue.

---

## Prasyarat

Sebelum mulai level ini, pastikan kamu sudah:

- [ ] Selesai **LEVEL 1** (HTML, CSS, JavaScript modern: ES6+)
- [ ] Paham `let`/`const`, arrow function, destructuring, spread operator
- [ ] Paham konsep **async/await** dan Promise
- [ ] Node.js & npm terinstall (untuk Vite + package manager)
- [ ] Code editor dengan **Volar extension** (Vue Language Server)

---

## Instalasi

```bash
# 1. Gunakan Node.js LTS yang masih didukung (Node.js 24 direkomendasikan)
node --version

# 2. Buat project Vue baru dengan Vite
npm create vue@latest nama-project
# Pilih: TypeScript? (opsional) | Router? | Pinia? | Vitest? | E2E?

# 3. Masuk ke folder & install
cd nama-project
npm install

# 4. Jalankan dev server
npm run dev
# Server jalan di http://localhost:5173
```

---

## Perbandingan dengan Track Utama

1. **Baru pertama kali belajar frontend framework.** → Pilih **Vue**.
   Sintaks HTML-based + dokumentasi terbaik = curva belajar paling landai.
2. **Suka JSX, JavaScript everywhere, ekosistem besar.** → Pilih **React**.
   Kalau kamu sudah nyaman dengan JavaScript & ingin maksimalisasi
   satu bahasa, JSX sangat powerful.
3. **Mau dokumentasi terbaik, komunitas ramah pemula.** → Pilih **Vue**.
   Dokumentasi Vue konsisten direkomendasikan sebagai yang terbaik —
   cocok untuk belajar mandiri.
4. **Mau Next.js (SSR/SSG) atau React Native di masa depan.** → Pilih
   **React**. Next.js adalah framework meta paling populer untuk React,
   React Native untuk mobile. Ekosistem sangat matang.
5. **Kerja di agency / perusahaan Indonesia yang pakai Vue.** → Pilih
   **Vue**. Banyak agency & perusahaan Indo pakai Vue (Nuxt + Laravel,
   Vue + Inertia). Permintaan tinggi.
6. **Ingin kontribusi ke proyek open source besar.** → Pilih **React**
   (populer). React dipakai di banyak proyek open source besar (Facebook,
   Instagram, WhatsApp Web, Notion), peluang kontribusi lebih banyak.

Kamu **tidak harus pilih dua-duanya**. Satu track dulu sampai mahir, baru
intip track lain untuk perbandingan.

---

## Catatan untuk Pemula

- **`<script setup>`** adalah cara modern menulis komponen Vue — lebih ringkas
  dari Options API. Selalu pakai ini di project baru.
- **`ref()` vs `reactive()`** — `ref` untuk data primitif (string, number, boolean),
  `reactive` untuk object. Di Composition API modern, `ref` lebih sering dipakai
  karena lebih fleksibel.
- **`.value`** — di JavaScript, `ref` harus diakses pakai `.value` (`count.value`).
  Di template, `{{ count }}` (tanpa `.value`) — Vue otomatis unwrap.
- **`<template>` hanya boleh punya 1 root element** — bungkus dengan `<div>` kalau
  perlu lebih dari satu sibling. (Vue 3 sudah lebih longgar, tetapi satu root
  tetap memudahkan pembacaan komponen.)
- **`v-if` vs `v-show`** — `v-if` hapus dari DOM (untuk kondisi jarang berubah),
  `v-show` cuma sembunyi (untuk toggle sering). Hapus = `v-if`, toggle = `v-show`.
- **Reactivity** — saat kamu ubah data reactive, Vue **tidak langsung update DOM**;
  dia jadwalkan update di **next tick** (microtask). Pakai `nextTick()` kalau
  perlu tunggu update selesai.

---

## Sumber Belajar

- **Dokumentasi resmi**: [vuejs.org/guide](https://vuejs.org/guide/introduction.html)
  (versi Indonesia tersedia di dropdown)
- **Vue Mastery**: [vuemastery.com](https://vuemastery.com) — video tutorial premium
- **Vue School**: [vueschool.io](https://vueschool.io) — banyak free course
- **Nuxt.js**: [nuxt.com](https://nuxt.com) — framework meta untuk SSR/SSG
- **Komunitas Indo**: Telegram "Vue.js Indonesia", Discord VueLand

---

**Target: 10 modul selesai → bisa bikin SPA + REST API + Pinia + Router!**
