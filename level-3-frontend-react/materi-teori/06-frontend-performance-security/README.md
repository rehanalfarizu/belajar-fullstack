# React Performance dan Security

React membantu menyusun UI; ia tidak otomatis membuat aplikasi cepat atau aman.
Ukur user journey dan pahami boundary browser–server sebelum menambah memoization.

## 1. Correctness sebelum optimasi

State minimal:

- simpan sumber kebenaran, hitung derived value saat render;
- jangan menyalin props ke state tanpa kebutuhan;
- gunakan stable identity/key dari data;
- effect hanya untuk sinkronisasi dengan sistem eksternal;
- cleanup subscription, timer, dan request;
- cegah response lama menimpa state request baru.

Render berulang bukan otomatis bug. Optimasi hanya bila profiler menunjukkan biaya
yang berarti pada interaksi pengguna.

## 2. Workflow profiling

1. Pilih interaksi: buka dashboard, mengetik search, tambah item.
2. Catat device/network dan baseline.
3. Gunakan React Profiler serta browser Performance/Network.
4. Cari component mahal, long task, request waterfall, atau bundle besar.
5. Ubah satu hal dan ukur kembali.
6. Pastikan test, accessibility, dan behavior tetap benar.

## 3. Alat optimasi

- Pindahkan state sedekat mungkin dengan consumer.
- Pecah component berdasarkan ownership, bukan sekadar ukuran file.
- Virtualize list yang benar-benar besar.
- Debounce input hanya bila UX/traffic memerlukannya; cancel request lama.
- Code split berdasarkan route/fitur berat.
- Optimalkan gambar/font dan hindari third-party script berlebihan.
- Cache server state dengan aturan stale/invalidation, bukan Context global manual.
- `useMemo`/`useCallback` bukan default; gunakan bila identity/computation terbukti
  menjadi bottleneck.
- React Compiler dapat mengurangi kebutuhan memoization manual pada setup yang
  mendukungnya, tetapi tidak memperbaiki data flow atau algoritma buruk.

## 4. Request race

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/search?q=${encodeURIComponent(query)}`, {
    signal: controller.signal,
    credentials: "include",
  })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(setResults)
    .catch(error => {
      if (error.name !== "AbortError") setError(error);
    });

  return () => controller.abort();
}, [query]);
```

Library server-state dapat membantu deduplication/cache/retry, tetapi contract
loading/error/cancellation tetap harus dipahami.

## 5. XSS dan unsafe output

JSX me-escape string secara default. Risiko muncul ketika:

- memakai `dangerouslySetInnerHTML`;
- menerima URL tanpa validasi;
- menyisipkan third-party script/widget;
- membuat DOM di luar React;
- memakai dependency yang memiliki sink berbahaya.

Rich text perlu sanitizer allowlist yang terawat. Sanitasi di boundary yang jelas,
simpan format yang disepakati, dan uji payload berbahaya. CSP adalah defense in
depth, bukan izin untuk mengabaikan sanitization.

## 6. Authentication dan authorization

- Jangan menyimpan token autentikasi browser di `localStorage`.
- Cookie `HttpOnly` tetap memerlukan CSRF defense sesuai SameSite/topology.
- Protected route hanya UX; server wajib authorize setiap resource/action.
- Jangan percaya role, owner ID, harga, atau feature flag dari client.
- Jangan memasukkan secret ke `VITE_*`; build-time frontend variable dapat dibaca
  pengguna.

## 7. Dependency dan build output

Review package sebelum install, commit lockfile, audit/update rutin, dan minimalkan
dependency. Periksa source map serta environment agar secret/internal endpoint
tidak bocor. Security header dan CSP umumnya dikirim server/CDN, tetapi frontend
harus kompatibel tanpa inline/eval yang tidak perlu.

## Definition of done

- [ ] Profiler baseline dan hasil sesudah perubahan tersimpan.
- [ ] Tidak ada effect loop, stale closure, request race, atau missing cleanup.
- [ ] Loading/error/empty/success dan direct navigation diuji.
- [ ] Keyboard/focus tetap valid setelah code splitting/modal.
- [ ] Unsafe HTML/URL memiliki validator/sanitizer dan negative tests.
- [ ] Server-side authorization test tersedia.
- [ ] Bundle/network budget dan Core Web Vitals dipantau.
