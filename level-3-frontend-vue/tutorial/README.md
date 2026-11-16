# Tutorial — Product Explorer dengan Vue

## Scope

Bangun SPA yang memiliki:

- List dan detail produk.
- Search/filter yang tersimpan di URL query.
- Cart dengan Pinia.
- Loading, error, empty, dan retry state.
- Route lazy loading.
- Component dan E2E tests.

## Langkah Vertikal

1. Scaffold Vue dengan Router, Pinia, Vitest, dan Playwright.
2. Bangun halaman list memakai data statis.
3. Pecah `ProductCard`.
4. Tambahkan cart store.
5. Sinkronkan filter ke query URL.
6. Ganti data statis dengan REST API.
7. Tambahkan abort/stale-request protection.
8. Tambahkan detail route.
9. Uji alur search → detail → add cart.
10. Build dan preview:

```bash
npm run test:unit
npm run test:e2e
npm run build
npm run preview
```

## Definition of Done

- Refresh halaman mempertahankan URL state.
- Tidak ada error console.
- List memakai key stabil.
- Form memiliki label.
- Semua request state tertangani.
- Cart tidak menerima quantity invalid.
- Backend tetap melakukan validation dan authorization.

---

## Panduan Terpandu: Product Explorer dari Nol

Bagian di atas adalah ringkasan. Bagian ini memecah setiap langkah jadi tugas
kecil. Kamu **tidak** akan menemukan kode jadi di sini, hanya kerangka,
`TODO(human)`, dan cara mengecek. Analoginya seperti membangun rumah: fondasi
dulu (data statis), lalu dinding (komponen), lalu listrik dan air (store, API).
Jangan pasang atap sebelum dindingnya berdiri.

Prasyarat: sudah menyelesaikan soal 01-10 di [praktikum](../materi-praktikum/TUGAS.md).
Hampir setiap langkah memakai ulang skill dari satu soal.

Estimasi total: **2-4 hari** kerja santai.

### Langkah 0: Rencanakan sebelum mengetik

Ambil kertas. Gambar tiga kotak: halaman List, halaman Detail, panel Cart.
Untuk tiap kotak, tulis:

- Data apa yang ditampilkan, dan dari mana asalnya (props, store, API, URL)
- Aksi apa yang bisa dilakukan user
- Keadaan apa saja yang mungkin (loading, error, kosong, sukses)

Simpan gambarnya. Kamu akan mencocokkannya lagi di akhir.

### Langkah 1: Scaffold

```bash
npm create vue@latest product-explorer
```

Pilih Router, Pinia, Vitest, ESLint. Playwright opsional.

Struktur target (buat foldernya sendiri):

```text
src/
├── api/products.js          ← semua fetch ke backend di satu tempat
├── components/ProductCard.vue
├── components/CartPanel.vue
├── stores/cart.js
├── router/index.js
└── views/
    ├── ProductListView.vue
    └── ProductDetailView.vue
```

Cek: `npm run dev` jalan, halaman bawaan Vue tampil.

### Langkah 2: Halaman list dengan data statis

Di `ProductListView.vue`, mulai dengan array produk yang diketik langsung di
file (5-8 produk: `id`, `name`, `price`, `stock`, `category`).

```vue
<script setup>
// TODO(human): array produk statis (pakai ref).
// TODO(human): state search dan category.
// TODO(human): computed hasil filter. Skill dari soal 02.
</script>

<template>
  <!-- TODO(human): input search berlabel, select kategori berlabel. -->
  <!-- TODO(human): list dengan key stabil + empty state. -->
</template>
```

Cek:

- [ ] Search tidak peduli huruf besar/kecil
- [ ] Empty state muncul saat tidak ada yang cocok
- [ ] Setiap input punya label

### Langkah 3: Pecah jadi `ProductCard`

Pindahkan tampilan satu produk ke `ProductCard.vue`. Skill dari soal 03.

- `TODO(human)`: props tervalidasi (harga tidak negatif, stok integer).
- `TODO(human)`: named slot `actions` supaya tombol "Tambah ke Cart" ditentukan
  oleh parent, bukan oleh kartu.

Cek:

- [ ] Kartu tidak pernah mengubah props-nya sendiri
- [ ] Warning di console muncul kalau kamu sengaja mengirim harga negatif

### Langkah 4: Cart dengan Pinia

Pakai ulang store dari soal 09 di `stores/cart.js`. Tambahkan `CartPanel.vue`
yang menampilkan isi cart, jumlah item, dan subtotal.

- `TODO(human)`: tombol di slot `actions` memanggil action `add` dari store.
- `TODO(human)`: di `CartPanel`, ubah jumlah dan hapus item.
- `TODO(human)`: ambil state dari store tanpa kehilangan reactivity
  (ingat `storeToRefs`, baca teori 06).

Cek:

- [ ] Menambah produk yang sama dua kali menambah quantity, bukan baris baru
- [ ] Quantity 0 atau negatif ditolak
- [ ] Vue DevTools tab Pinia menampilkan isi cart yang sama dengan layar

### Langkah 5: Simpan filter di URL

Sekarang search dan kategori hanya ada di memori. Refresh, hilang. Pindahkan ke
query URL, misalnya `/?search=key&category=aksesoris`.

- `TODO(human)`: baca nilai awal dari `useRoute().query`.
- `TODO(human)`: saat filter berubah, perbarui URL dengan `router.replace`
  (pikirkan: kenapa `replace`, bukan `push`, untuk ketikan search?).
- `TODO(human)`: tangani query yang aneh, misalnya `category=tidakada`.

Cek:

- [ ] Refresh halaman mempertahankan filter
- [ ] Copy URL ke tab baru menampilkan hasil yang sama
- [ ] Tombol Back browser tidak "tersangkut" di setiap huruf yang diketik

### Langkah 6: Ganti data statis dengan REST API

Siapkan backend seperti bagian "Menyiapkan API" di
[TUGAS.md](../materi-praktikum/TUGAS.md) (opsi B paling cocok). Tambahkan
endpoint detail `GET /api/products/:id`.

Di `src/api/products.js`:

```js
// TODO(human): export async function untuk ambil list produk
//   (parameter: page, search, category, signal).
//   Susun query dengan URLSearchParams. Lempar error kalau response tidak ok.
// TODO(human): export async function untuk ambil satu produk by id.
//   Bedakan 404 (produk tidak ada) dari error lain.
```

Kenapa dipisah ke file sendiri? Supaya komponen tidak tahu detail URL. Kalau
backend pindah, kamu cukup mengubah satu file.

Cek:

- [ ] Tab Network menampilkan request dengan query yang benar
- [ ] Loading, error + retry, kosong, dan sukses semuanya bisa kamu munculkan

### Langkah 7: Lindungi dari stale request

Skill dari soal 06 dan 10.

- `TODO(human)`: batalkan request lama saat filter berubah.
- `TODO(human)`: batalkan request saat pindah halaman (komponen dilepas).
- `TODO(human)`: abort tidak boleh tampil sebagai pesan error ke user.
- Bonus: debounce input search.

Cek dengan backend yang diberi delay acak:

- [ ] Ketik cepat "k", "ke", "key": hasil akhir selalu milik "key"
- [ ] Pindah halaman saat loading tidak memunculkan warning di console

### Langkah 8: Halaman detail

- `TODO(human)`: route `/products/:id` dengan lazy loading (`() => import(...)`).
- `TODO(human)`: aktifkan `props: true` supaya view menerima `id` sebagai prop.
- `TODO(human)`: `id` dari URL adalah string. Validasi dan ubah ke number.
  Kalau tidak valid, tampilkan pesan "Produk tidak ditemukan".
- `TODO(human)`: kalau user pindah dari `/products/1` ke `/products/2`,
  komponen yang sama dipakai ulang. Pastikan datanya ikut berganti
  (petunjuk: `onMounted` saja tidak cukup).

Cek:

- [ ] Buka `/products/abc` dan `/products/99999`: pesan jelas, bukan layar putih
- [ ] Tab Network: file JS halaman detail baru diunduh saat pertama kali dibuka

### Langkah 9: Uji alur utama

Unit test (Vitest):

- `TODO(human)`: test store cart (tambah, merge, tolak quantity invalid, subtotal).
- `TODO(human)`: test function di `api/products.js` dengan `fetch` palsu
  (cari "vi.fn" atau "vi.stubGlobal" di dokumentasi Vitest).

E2E (kalau memilih Playwright):

- `TODO(human)`: skenario search → buka detail → tambah ke cart → cart bertambah.

```bash
npm run test:unit
npm run test:e2e
```

### Langkah 10: Build dan review

```bash
npm run build
npm run preview
```

- `TODO(human)`: lihat ukuran file di `dist/assets/`. Ada chunk terpisah untuk
  halaman detail?
- `TODO(human)`: cari `v-html` di seluruh `src/`. Kalau ada, bisakah diganti?
  (Soal 11.)
- `TODO(human)`: cari `VITE_` di kode. Pastikan tidak ada secret.

Terakhir, ambil gambar dari Langkah 0. Apakah semua kotak, data, aksi, dan
keadaan sudah terwujud? Tulis 5 kalimat refleksi: bagian mana paling sulit,
dan apa yang akan kamu lakukan berbeda kalau mengulang.

### Kalau Macet

Gunakan urutan petunjuk bertingkat di [TUGAS.md](../materi-praktikum/TUGAS.md).
Tiap langkah di atas menyebut soal yang skill-nya dipakai. Buka lagi soal itu,
bukan file contoh.
