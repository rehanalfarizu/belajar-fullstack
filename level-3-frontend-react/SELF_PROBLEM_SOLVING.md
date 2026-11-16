# Self Problem Solving — Level 3 React

Setiap kasus harus memiliki reproduction component/test, profiler/network evidence,
dan penjelasan data flow. Jangan menambah memoization sebelum menemukan bottleneck.

## 1. Infinite effect

Component terus fetch/render. Identifikasi dependency yang berubah, pisahkan event
dari effect, dan perbaiki tanpa menonaktifkan lint rule.

## 2. Stale closure

Timer menampilkan count lama dan event handler memakai props lama. Buat minimal
reproduction, jelaskan closure, lalu pilih functional update/ref/effect event
berdasarkan kebutuhan.

## 3. Request race

Navigasi produk cepat menampilkan response halaman lama. Gunakan AbortController
atau library server-state dengan cancellation/request identity. Test response
terbalik dan unmount.

## 4. Key dan state identity

Daftar editable memakai index key; setelah sort, input berpindah item. Perbaiki
identity dan tulis test reorder/delete/insert.

## 5. Render performance

Mengetik search membuat seluruh dashboard mahal render. Gunakan Profiler untuk
menemukan penyebab: state terlalu tinggi, computation, prop identity, atau list.
Bandingkan commit duration sebelum/sesudah.

## 6. Bundle/network

Route awal memuat editor/chart yang belum dipakai dan terjadi API waterfall.
Lakukan route/feature code split serta parallelization yang aman. Ukur bundle,
request count, LCP, dan interaction behavior.

## 7. Unsafe HTML/URL

Article preview memakai `dangerouslySetInnerHTML` dan link berasal dari API.
Definisikan rich-text contract, sanitizer allowlist, URL validator, CSP
compatibility, dan negative tests.

## 8. Auth illusion

ProtectedRoute menyembunyikan admin page tetapi API tetap dapat dipanggil user
biasa. Jelaskan mengapa UI bukan security boundary, perbaiki server authorization,
dan buat end-to-end negative test.

## 9. Session/data leak

Setelah logout dan login user lain, cache/store masih menampilkan data user lama.
Tentukan cache scope, reset/invalidation, abort in-flight request, dan test shared
device flow.

## 10. Capstone

Bangun dashboard React typed dengan accessible form/router, server-state cache,
cookie session, authorization server, loading/error/empty/success, cancellation,
component/integration/E2E tests, profiler report, bundle budget, dan threat review.

## Exit criteria

- Semua effect memiliki alasan dan cleanup.
- Optimasi mempunyai profiler/field evidence.
- Unsafe output dan auth memiliki negative tests.
- Keyboard/focus/direct navigation tetap bekerja.
- Capstone tidak menyimpan token di browser-readable storage.
