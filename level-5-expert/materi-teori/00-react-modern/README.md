# Materi Teori 00 — React Modern

Materi dasar React tetap penting, tetapi codebase modern perlu memahami fitur
React 19 dan batas antara library, router, serta full-stack framework.

## Ref sebagai Prop

Pada React 19, function component dapat menerima `ref` sebagai prop:

```jsx
function TextInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

`forwardRef` masih perlu dipahami untuk React 18 dan library/codebase lama,
tetapi bukan titik awal komponen baru React 19. Jangan mengekspos DOM node tanpa
alasan; utamakan API deklaratif berbasis props.

## Actions

Action adalah async transition untuk mutation. React dapat mengelola pending
state, error boundary, optimistic update, dan integrasi form.

```jsx
function RenameForm({ rename }) {
  const [error, submitAction, pending] = useActionState(
    async (_previous, formData) => {
      try {
        await rename(formData.get("name"));
        return null;
      } catch {
        return "Nama gagal diperbarui.";
      }
    },
    null,
  );

  return (
    <form action={submitAction}>
      <label>
        Nama
        <input name="name" required />
      </label>
      <button disabled={pending}>Simpan</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
```

Action bukan pengganti authorization, validation backend, idempotency, atau
transaction.

## Optimistic UI

`useOptimistic` menampilkan hasil yang diharapkan sebelum server selesai.
Kegagalan harus memiliki rollback dan feedback yang jelas. Jangan optimistik
untuk aksi berisiko tinggi tanpa desain failure state.

## Server dan Client State

Pisahkan:

- Local UI state: dropdown terbuka, input sementara.
- URL state: filter, search, pagination yang perlu dibagikan/bookmark.
- Server state: data remote, cache, loading, retry, revalidation.
- Shared client state: data lintas feature yang benar-benar client-owned.

Memindahkan semua state ke Context/Redux justru menambah coupling.

## React Compiler

React Compiler dapat mengoptimalkan memoization berdasarkan analisis build-time.
Tetap tulis component dan hook yang pure. Compiler bukan alasan untuk
mengabaikan profiling, dependency effect, atau desain state yang buruk.

## Framework vs Build Tool

Vite cocok untuk mempelajari React dan SPA client-side. Aplikasi production yang
membutuhkan SSR, streaming, server components, route data loading, atau mutation
terintegrasi biasanya lebih tepat memakai framework yang mendukung kebutuhan
tersebut.

Pertanyaan desain:

1. Di mana data di-fetch?
2. Apa yang dirender server dan client?
3. Bagaimana cache dan invalidation bekerja?
4. Di mana authentication dan authorization ditegakkan?
5. Apa failure dan rollback path?

## Praktikum

1. Migrasikan satu komponen `forwardRef` menjadi ref prop.
2. Buat form mutation dengan pending, validation error, dan retry.
3. Tambahkan optimistic update lalu simulasikan server failure.
4. Profil component sebelum menambahkan memoization manual.
