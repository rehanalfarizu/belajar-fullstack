# Materi Teori — Vue 3

Track ini memakai Composition API dan `<script setup>`. Peta mental utamanya:

```text
state → template render
event → handler → state berubah → render diperbarui
props turun dari parent → child emit event ke parent
```

## 01. Setup Vue dan Vite

Scaffold resmi:

```bash
npm create vue@latest
cd nama-project
npm install
npm run dev
```

Pilih fitur ketika memang dibutuhkan. Untuk track ini: Vue Router, Pinia,
Vitest, Playwright, ESLint, dan Prettier berguna, tetapi pelajari core Vue
terlebih dahulu.

Entry point:

```js
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

Single File Component memiliki `<script setup>`, `<template>`, dan `<style>`.

## 02. Template dan Directive

```vue
<script setup>
const title = 'Daftar Produk';
const products = [{ id: 1, name: 'Keyboard', active: true }];
</script>

<template>
  <h1>{{ title }}</h1>
  <ul>
    <li v-for="product in products" :key="product.id">
      <span v-if="product.active">{{ product.name }}</span>
    </li>
  </ul>
</template>
```

Directive penting:

- `v-bind` atau `:` mengikat attribute/property.
- `v-on` atau `@` memasang event listener.
- `v-if` membuat/menghapus node.
- `v-show` mengubah visibility dengan CSS.
- `v-for` merender list dan membutuhkan key stabil.
- `v-model` menyinkronkan value dan input event.

Jangan memakai index array sebagai key bila urutan dapat berubah.

## 03. Component, Props, dan Slots

Props adalah input read-only milik child:

```vue
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  durationSec: { type: Number, default: 0 },
});
</script>
```

Child tidak boleh memutasi props. Minta parent mengubah state melalui event.
Slots memberi ruang agar parent menyisipkan markup. Gunakan slot saat struktur
visual reusable tetapi konten bervariasi.

## 04. Event dan `defineEmits`

```vue
<script setup>
const emit = defineEmits({
  add: (productId) => Number.isInteger(productId) && productId > 0,
});

function addProduct() {
  emit('add', 42);
}
</script>
```

Data turun melalui props, intent naik melalui events. Untuk state lintas banyak
level, pertimbangkan provide/inject atau store; jangan melakukan prop drilling
tanpa batas.

## 05. Reactivity

```js
const count = ref(0);
const form = reactive({ name: '', price: 0 });
const total = computed(() => form.price * count.value);
```

- `ref` cocok untuk nilai apa pun dan diakses dengan `.value` di script.
- `reactive` membungkus object dengan Proxy.
- `computed` untuk nilai turunan, bukan side effect.
- `watch` untuk efek saat source tertentu berubah.
- `watchEffect` melacak dependency yang tersentuh otomatis.

Hindari menyimpan state turunan yang dapat dihitung. Dua sumber kebenaran mudah
menjadi tidak sinkron.

## 06. Lifecycle dan Side Effect

`onMounted` berjalan setelah component terpasang. `onUnmounted` untuk cleanup.

```js
const controller = new AbortController();

onMounted(() => loadProducts(controller.signal));
onUnmounted(() => controller.abort());
```

Timer, event listener, subscription, WebSocket, dan request yang dapat dibatalkan
harus dibersihkan. Cleanup mencegah memory leak dan update pada component mati.

## 07. Composable

Composable adalah function `useX()` yang mengemas stateful logic:

```js
export function useCounter(initial = 0) {
  const count = ref(initial);
  const increment = () => { count.value += 1; };
  return { count, increment };
}
```

Composable bukan tempat membuang semua logic. Ia sebaiknya memiliki satu tujuan,
API kecil, cleanup yang benar, dan dapat dites.

## 08. Vue Router

Route adalah state URL. Parameter, query, dan history harus dianggap sebagai
bagian dari state aplikasi.

```js
const routes = [
  { path: '/', component: HomeView },
  {
    path: '/products/:id',
    component: () => import('./views/ProductView.vue'),
    props: true,
  },
];
```

Navigation guard dapat membantu UX, tetapi authorization tetap harus ditegakkan
backend. Menolak route di frontend bukan kontrol keamanan.

## 09. Pinia

Pisahkan jenis state:

- Local UI state: tetap di component.
- Shared client state: Pinia bila beberapa feature membutuhkannya.
- Server state: data remote yang memiliki loading/error/cache/revalidation;
  jangan otomatis dipindahkan ke store global.

```js
export const usePlaylistStore = defineStore('playlist', () => {
  const songs = ref([]);
  const likedCount = computed(() => songs.value.filter((s) => s.liked).length);

  return { songs, likedCount };
});
```

Action mengemas perubahan state. Getter/computed tidak memiliki side effect.

## 10. HTTP, Form, dan Error State

Setiap request UI minimal memikirkan:

```text
idle → loading → success
               ↘ error → retry
```

```js
const status = ref('idle'); // 'idle' | 'loading' | 'success' | 'error'

async function loadSchedule() {
  status.value = 'loading';
  try {
    const res = await fetch('/api/schedule');
    if (res.ok) {
      classes.value = await res.json();
      status.value = 'success';
    } else {
      status.value = 'error';
    }
  } catch {
    status.value = 'error'; // jaringan putus, server mati, dsb.
  }
}
```

Validasi browser membantu UX; backend tetap wajib memvalidasi. Tampilkan error
yang dapat ditindaklanjuti user dan log detail teknis di tempat yang sesuai.

## Testing

- Unit: function/composable murni.
- Component: output dan interaksi dari sudut pandang user.
- Integration: router/store/API boundary.
- E2E: alur kritis di browser nyata.

Hindari menguji internal ref atau nama function. Uji perilaku: apa yang dilihat
dan dapat dilakukan user.

Lanjut ke [praktikum](../materi-praktikum/README.md).

## Materi Per Topik

Ringkasan di atas sengaja padat. Kalau mau penjelasan lengkap dengan
analogi, kesalahan umum, latihan berpikir, dan glosarium, baca per topik:

1. [01 — Vue dan Template Syntax](01-vue-dan-template-syntax/README.md)
2. [02 — Reactivity: ref, reactive, computed, watch](02-reactivity-ref-reactive-computed/README.md)
3. [03 — Component, Props, Emit, Slot](03-component-props-emit-slot/README.md)
4. [04 — Lifecycle dan Composable](04-lifecycle-dan-composable/README.md)
5. [05 — Vue Router](05-vue-router/README.md)
6. [06 — Pinia dan HTTP](06-pinia-dan-http/README.md)

Setelah keenamnya, lanjut ke [Vue Performance dan Security](02-performance-security.md).
