# Self Problem Solving — Level 3 Vue

Gunakan Vue Devtools, browser Network/Performance, dan component tests. Setiap
perbaikan harus menjelaskan dependency reaktif serta lifecycle.

## 1. Lost reactivity

Destructuring `reactive` membuat UI tidak update. Reproduce, jelaskan Proxy dan
pilih direct access, `toRefs`, atau `ref` sesuai model state.

## 2. Computed versus watch

Total keranjang disimpan dalam state dan disinkronkan oleh beberapa watcher hingga
stale. Ubah menjadi derived state, lalu gunakan watcher hanya untuk side effect.

## 3. Watcher/request race

Search watcher membuat request lama menimpa hasil baru dan tetap berjalan setelah
component dilepas. Tambahkan cancellation/invalidation dan uji response terbalik.

## 4. Key/identity

Form list memakai index key; sort/delete memindahkan state input. Pakai stable key
dan test insert, reorder, filter, serta transition.

## 5. Reactive overhead

Dataset besar dibuat deep reactive dan UI lambat. Profile dahulu, lalu evaluasi
pagination/virtualization, `shallowRef`, `markRaw`, atau perubahan data shape.

## 6. Bundle dan route

Chart/admin editor ikut bundle landing page. Implementasikan route/dynamic import
dan ukur chunk, LCP, serta navigation fallback/error.

## 7. `v-html` dan URL

Rich-text/API link menggunakan `v-html` serta dynamic `href`. Buat sanitizer/
validator dan negative tests untuk markup, protocol, encoding, dan oversized data.

## 8. Router guard bukan authorization

User memodifikasi Pinia role/URL dan memanggil API admin. Perbaiki authorization
server, lalu test guest/user/admin dan ownership.

## 9. Cache/store leak

Data user lama tetap ada setelah logout. Reset store, cancel request, scope cache,
dan uji pergantian akun pada satu browser.

## 10. Capstone

Bangun Product Explorer typed dengan Composition API, Router, Pinia/server-state,
accessible form, cookie session, negative authorization tests, profiler/bundle
report, Core Web Vitals budget, serta security review.

## Exit criteria

- Tidak ada watcher untuk derived state sederhana.
- Semua side effect mempunyai cleanup/error/cancellation.
- Profile membuktikan optimasi.
- `v-html`, URL, route guard, dan cache isolation diaudit.
