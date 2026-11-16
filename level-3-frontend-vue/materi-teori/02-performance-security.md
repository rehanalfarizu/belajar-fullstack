# Vue Performance dan Security

Targetnya sama dengan track React: UI yang benar, terukur, accessible, dan tidak
menjadikan browser sebagai boundary keamanan.

## 1. Reactivity yang benar

- `ref` untuk nilai yang diganti/dibaca melalui `.value` di script.
- `reactive` cocok untuk object state; jangan kehilangan reactivity karena
  destructuring tanpa `toRefs`.
- `computed` untuk derived value yang murni dan tercache.
- `watch`/`watchEffect` untuk side effect, bukan menggantikan computed.
- Bersihkan timer, subscription, observer, dan request pada unmount/invalidation.
- Gunakan key stabil pada `v-for`; index key dapat mencampur state item.

## 2. Workflow performa

Gunakan Vue Devtools/Performance serta browser Network/Performance:

1. pilih interaksi;
2. simpan baseline;
3. cari update component, long task, request waterfall, atau bundle besar;
4. ubah satu faktor;
5. ukur ulang serta jalankan regression test.

### Alat yang tersedia

- lazy-load route/komponen berat dengan dynamic import;
- virtualize list besar;
- gunakan `shallowRef`/`markRaw` untuk struktur besar yang memang tidak perlu
  reactive secara dalam;
- stabilkan props dan hindari membuat object baru tanpa kebutuhan;
- gunakan `v-once`/`v-memo` hanya setelah profiling;
- cancel/debounce request search dan definisikan cache invalidation;
- optimalkan image, font, CSS, dan third-party script.

## 3. Cleanup request

```vue
<script setup>
import { onBeforeUnmount, ref, watch } from "vue";

const query = ref("");
const results = ref([]);
let controller;

watch(query, async value => {
  controller?.abort();
  controller = new AbortController();

  const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`, {
    signal: controller.signal,
    credentials: "include",
  });
  if (response.ok) results.value = await response.json();
});

onBeforeUnmount(() => controller?.abort());
</script>
```

Production code juga perlu error/loading state dan membedakan abort dari network
failure.

## 4. Output dan directive berisiko

Interpolasi `{{ value }}` melakukan escaping. `v-html` memasukkan raw HTML dan
tidak boleh menerima input tidak dipercaya tanpa sanitizer allowlist. Audit juga:

- dynamic `:href`/`:src`;
- custom directive yang menyentuh `innerHTML`;
- third-party component/widget;
- template yang dikompilasi dari string pengguna.

Jangan memakai template non-trusted; template Vue adalah kode.

## 5. Authentication

- Pinia/router guard mengatur UX, bukan authorization.
- Server memeriksa session, role, ownership, dan tenant untuk setiap aksi.
- Gunakan cookie `HttpOnly` untuk sesi browser; mitigasi CSRF tetap diperlukan.
- Jangan taruh secret pada `VITE_*`.
- Reset store sensitif pada logout dan cegah data user lama terlihat oleh user
  berikutnya pada perangkat bersama.

## 6. Dependency dan delivery

Commit lockfile, review/audit package, batasi plugin, periksa output/source map,
dan terapkan security header/CSP melalui server/CDN. Hindari inline script/eval
agar strict CSP dapat digunakan.

## Checklist bukti

- [ ] Vue Devtools profile sebelum/sesudah.
- [ ] Tidak ada lost reactivity, watcher leak, atau response race.
- [ ] Stable keys dan derived state memakai computed.
- [ ] `v-html`/dynamic URL diaudit dan diuji negatif.
- [ ] Router guard selalu dipasangkan server authorization.
- [ ] Bundle/network/CWV budget dipantau.
