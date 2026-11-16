# Materi Teori 02 — Reactivity: ref, reactive, computed, watch

> Versi: **Vue 3.5.x**. Bab ini adalah "jantung" Vue. Kalau bab ini
> nyantol, bab lain jauh lebih gampang.

## Tujuan

Setelah baca bab ini, kamu bisa:

- Menjelaskan apa yang dimaksud "reaktif" dengan bahasamu sendiri
- Memilih antara `ref` dan `reactive`
- Tahu kapan pakai `.value` dan kapan tidak
- Membuat nilai turunan dengan `computed` dan tahu kenapa jangan disimpan
  sebagai state terpisah
- Memakai `watch` / `watchEffect` hanya untuk efek samping
- Menghindari "lost reactivity" saat destructuring

---

## 1. Apa Itu Reactivity?

Reactivity = Vue **mencatat** siapa yang membaca sebuah data, lalu
**memberi tahu** mereka saat data itu berubah.

### Analogi: Grup WhatsApp Kelas

Ketua kelas (data) punya grup. Siapa pun yang "join" grup (template,
computed, watcher) akan dapat notifikasi saat ketua kelas mengumumkan
perubahan jadwal. Mahasiswa yang tidak join grup tidak tahu apa-apa.

- **Membaca** data reaktif = otomatis join grup.
- **Mengubah** data reaktif = ketua kirim pengumuman, semua anggota update.

Variabel biasa (`let x = 1`) tidak punya grup. Kamu ubah `x`, tidak ada yang
dikabari, layar tidak berubah. Itu sebabnya kita butuh `ref` dan `reactive`.

### Kenapa Penting di Dunia Kerja

Bug paling sering di aplikasi Vue tim junior: "datanya sudah berubah di
console, kok layarnya tidak?" Hampir selalu karena reactivity putus. Kalau
kamu paham mekanismenya, kamu bisa debug dalam menit, bukan jam. Interviewer
juga suka menanyakan "bedanya ref dan reactive" dan "computed vs watch".

---

## 2. `ref` — Kotak Berlabel

```js
import { ref } from 'vue';

const jumlahGelas = ref(0);

console.log(jumlahGelas.value); // 0
jumlahGelas.value = 3;          // layar yang memakai jumlahGelas ikut berubah
```

### Analogi: Loker dengan Kunci

`ref` itu loker. Lokernya sendiri (`jumlahGelas`) tidak pernah diganti.
Yang kamu ganti adalah **isinya** (`.value`). Karena lokernya tetap sama,
Vue bisa terus memantau.

Aturan `.value`:

| Di mana | Tulis |
| --- | --- |
| Di `<script setup>` | `jumlahGelas.value` |
| Di `<template>` | `{{ jumlahGelas }}` (Vue membuka loker otomatis) |

`ref` bisa menampung apa saja: number, string, boolean, array, object.
Untuk object/array, isinya juga otomatis dibuat reaktif secara dalam (deep).

```js
const daftarTugas = ref([]);
daftarTugas.value.push({ id: 1, judul: 'Baca jurnal', selesai: false });
// push ke array di dalam ref juga terdeteksi
```

---

## 3. `reactive` — Object yang Diawasi

```js
import { reactive } from 'vue';

const formPinjam = reactive({
  nim: '',
  judulBuku: '',
  lamaHari: 7,
});

formPinjam.lamaHari = 14; // tanpa .value
```

### Analogi: Rumah dengan CCTV di Setiap Kamar

`reactive` memasang CCTV (Proxy) di setiap "kamar" (properti) object. Begitu
ada yang masuk atau mengubah isi kamar, terekam.

Keterbatasan `reactive`:

- Hanya untuk object/array/Map/Set, **bukan** primitif (`reactive(5)` tidak bisa).
- Kalau kamu **mengganti seluruh object** (`formPinjam = {...}`), CCTV-nya
  hilang. Variabel menunjuk ke rumah baru tanpa kamera.
- Kalau kamu **destructure** (`const { nim } = formPinjam`), `nim` jadi
  string biasa, sudah keluar dari rumah.

### Jadi Pilih yang Mana?

Dokumentasi resmi Vue sekarang menyarankan **`ref` sebagai pilihan utama**
karena aturannya konsisten (selalu `.value` di script) dan aman diganti
seluruhnya. `reactive` tetap berguna untuk object form yang propertinya
banyak dan tidak pernah diganti utuh. Yang penting: konsisten dalam satu tim.

---

## 4. `computed` — Nilai Turunan

`computed` menghitung nilai **dari** data lain, dan menyimpan hasilnya
(cache) sampai sumbernya berubah.

```js
import { computed, ref } from 'vue';

const nilaiUts = ref(78);
const nilaiUas = ref(84);

const rataRata = computed(() => (nilaiUts.value + nilaiUas.value) / 2);
```

### Analogi: Kalkulator IPK di Portal Kampus

Portal kampus tidak menyimpan IPK sebagai angka yang diketik admin. IPK
**dihitung** dari nilai semua mata kuliah. Nilai berubah, IPK otomatis
ikut. Tidak ada orang yang harus ingat "eh, IPK-nya belum diupdate".

Kalau IPK disimpan terpisah, suatu hari pasti lupa diupdate dan terjadi
**dua sumber kebenaran** yang saling bertentangan. Inilah alasan utama
`computed` ada.

Sifat `computed`:

- **Murni**: hanya menghitung dan `return`. Jangan fetch, jangan ubah state
  lain, jangan `console.log` sebagai logika.
- **Tercache**: dipanggil 10 kali di template, dihitung sekali selama
  sumbernya tidak berubah.
- **Read-only secara default**: `rataRata.value = 90` akan memberi warning.

`computed` vs function biasa di template: function dipanggil ulang setiap
render; `computed` tidak. Untuk hitungan ringan bedanya tidak terasa, untuk
list besar terasa.

---

## 5. `watch` dan `watchEffect` — Efek Samping

Kadang kamu perlu **melakukan sesuatu** (bukan menghitung nilai) saat data
berubah: simpan ke `localStorage`, panggil API, kirim analytics.

```js
import { ref, watch } from 'vue';

const temaGelap = ref(false);

watch(temaGelap, (baru) => {
  document.documentElement.dataset.theme = baru ? 'dark' : 'light';
});
```

### Analogi: Alarm Pintu Toko

Alarm berbunyi "ting!" setiap pintu dibuka. Alarm tidak menghasilkan
nilai; dia **bereaksi** dengan aksi. `watch` adalah alarm untuk data.

Perbedaan dua jenis watcher:

| | `watch(sumber, cb)` | `watchEffect(cb)` |
| --- | --- | --- |
| Sumber | Kamu sebutkan eksplisit | Otomatis dari apa yang dibaca di `cb` |
| Dapat nilai lama | Ya (`(baru, lama)`) | Tidak |
| Jalan pertama kali | Tidak, kecuali `{ immediate: true }` | Ya, langsung |

Opsi yang sering dipakai di `watch`:

- `{ immediate: true }` = jalankan sekali di awal
- `{ deep: true }` = pantau perubahan di dalam object (mahal, pakai seperlunya)
- Sumber bisa array: `watch([a, b], ...)` atau getter: `watch(() => form.nim, ...)`

Aturan emas:

> Kalau hasilnya **nilai** untuk ditampilkan → `computed`.
> Kalau hasilnya **aksi** ke luar (API, storage, DOM, timer) → `watch`.

---

## 6. Lost Reactivity dan `toRefs`

```js
import { reactive, toRefs } from 'vue';

const mhs = reactive({ nama: 'Sari', semester: 7 });

const { semester } = mhs;          // semester = 7 (angka biasa, putus)
const { nama } = toRefs(mhs);      // nama = ref yang tersambung ke mhs.nama
```

### Analogi: Fotokopi vs Link Google Docs

Destructure biasa = **fotokopi** dokumen. Dokumen asli diedit, fotokopimu
tetap versi lama. `toRefs` = **share link**. Dokumen asli diedit, link-mu
ikut menunjukkan versi terbaru.

Hal yang sama terjadi kalau kamu mengirim `mhs.semester` (angka) ke
function lain dan berharap function itu tetap tahu perubahan berikutnya. Yang
terkirim cuma angkanya.

---

## 7. Update DOM Tidak Langsung: `nextTick`

Saat kamu ubah data, Vue tidak langsung mengubah DOM. Vue mengumpulkan
semua perubahan dalam satu "tick", lalu render sekali.

```js
import { nextTick, ref } from 'vue';

const pesan = ref('');

async function tampilkanPesan() {
  pesan.value = 'Tersimpan!';
  await nextTick();
  // di sini DOM sudah memuat teks "Tersimpan!"
}
```

Analogi: kurir paket tidak berangkat tiap ada satu paket masuk; dia
menunggu sebentar lalu mengantar sekaligus. Kamu jarang butuh `nextTick`,
biasanya saat harus mengukur atau fokus ke elemen yang baru muncul.

---

## Kesalahan Umum

### 1. Lupa `.value` di script

```js
// Salah: menambah ke object ref, bukan angkanya
jumlahGelas++;

// Benar
jumlahGelas.value++;
```

### 2. Menyimpan nilai turunan sebagai state

```js
// Salah: dua sumber kebenaran, harus ingat update totalSks di mana-mana
const matkul = ref([...]);
const totalSks = ref(0);

// Benar: satu sumber, sisanya dihitung
const totalSks = computed(() => matkul.value.reduce((n, m) => n + m.sks, 0));
```

(Bentuk `reduce` ini sengaja untuk SKS. Di soal cart kamu harus menyusun
sendiri logikanya.)

### 3. Side effect di dalam `computed`

```js
// Salah
const ringkasan = computed(() => {
  localStorage.setItem('tugas', JSON.stringify(tugas.value)); // aksi!
  return tugas.value.length;
});

// Benar: hitung di computed, simpan di watch
```

### 4. Mengganti object `reactive` seluruhnya

```js
let form = reactive({ nim: '' });
form = { nim: '123' }; // reactivity hilang
```

Ubah per properti, atau pakai `ref` kalau memang sering diganti utuh.

### 5. `watch` untuk sesuatu yang seharusnya `computed`

Kalau isi watcher-mu cuma `x.value = hitung(a.value, b.value)`, itu tanda
kuat seharusnya `computed`.

---

## Latihan Berpikir

1. Kamu punya `ref` berisi daftar nilai 40 mahasiswa. Ada tampilan rata-rata,
   nilai tertinggi, dan jumlah yang lulus. Mana yang jadi state, mana yang
   computed? Kenapa?
2. Temanmu menulis `const { judul } = reactive(buku)` lalu bingung kenapa
   judul di layar tidak berubah. Jelaskan ke dia pakai analogi buatanmu
   sendiri (bukan analogi di bab ini).
3. Kapan `watch` dengan `{ immediate: true }` lebih tepat daripada memanggil
   function sekali di awal secara manual?

---

## Glosarium

| Istilah | Arti singkat |
| --- | --- |
| Reactive / reaktif | Perubahan data otomatis memicu update tampilan |
| `ref` | Wadah reaktif, isinya di `.value` |
| `reactive` | Object yang dibungkus Proxy supaya reaktif |
| Proxy | Fitur JavaScript untuk "mencegat" baca/tulis properti |
| `computed` | Nilai turunan yang tercache dan murni |
| `watch` | Menjalankan aksi saat sumber tertentu berubah |
| `watchEffect` | Watcher yang melacak dependency otomatis |
| Side effect | Aksi ke luar: API, storage, DOM, timer |
| Derived state | Nilai yang bisa dihitung dari state lain |
| Lost reactivity | Data terputus dari sistem reaktif (misal karena destructure) |

---

## Soal Terkait

- [Soal 01 — Counter](../../materi-praktikum/soal/01-counter.md)
- [Soal 02 — Product Filter](../../materi-praktikum/soal/02-product-filter.md)
- [Soal 05 — Cart Reactivity](../../materi-praktikum/soal/05-cart-reactivity.md)

## Lanjut

Bab berikutnya: [03 — Component, Props, Emit, Slot](../03-component-props-emit-slot/README.md).
