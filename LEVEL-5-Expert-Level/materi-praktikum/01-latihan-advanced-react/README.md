# 01 — Latihan Advanced React

## Topik Ini Tentang Apa?

Di Level 3 kamu sudah bisa membuat komponen, state, context, dan router. Di sini
kamu belajar pola yang dipakai saat membangun **komponen yang dipakai banyak
orang**, misalnya library UI atau design system di kantor:

1. **Portal** — merender modal/tooltip di luar posisi DOM komponennya, supaya
   tidak terpotong `overflow: hidden` atau tertimpa `z-index`.
2. **Suspense + lazy** — memecah aplikasi jadi beberapa file JavaScript yang
   dimuat saat dibutuhkan saja.
3. **Error Boundary** — mencegah satu komponen yang error membuat seluruh
   halaman putih.
4. **Ref sebagai prop (React 19) + `useImperativeHandle`** — memberi parent
   akses terbatas ke anak (misalnya hanya `focus()`), plus cara membaca pola lama
   `forwardRef`.
5. **Compound components** — API komponen yang fleksibel seperti
   `<Tabs><TabList><Tab/></TabList><TabPanel/></Tabs>`.

## Analogi Sehari-hari

- **Portal**: kamu duduk di meja paling belakang kelas, tapi pengumumanmu
  ditempel di papan depan supaya semua orang lihat. Kamu tetap "anggota" meja
  belakang (state dan event tetap mengalir lewat React), tapi tampilannya muncul
  di tempat lain.
- **Suspense + lazy**: restoran tidak memasak semua menu saat buka. Menu dimasak
  saat dipesan. Sambil menunggu, kamu dikasih kerupuk (fallback).
- **Error Boundary**: sekring listrik per ruangan. Kalau satu ruangan korslet,
  hanya lampu ruangan itu yang mati, bukan satu rumah.
- **`useImperativeHandle`**: remote TV. Kamu bisa ganti channel dan volume, tapi
  tidak bisa membuka mesin TV-nya.
- **Compound components**: set furnitur. Meja, kursi, dan lemari dijual terpisah
  tapi dirancang untuk saling cocok, dan kamu bebas mengatur posisinya.

## Kenapa Penting untuk Kerja Web Developer?

- Library populer (Radix, Headless UI, MUI, React Router) memakai pola-pola ini.
  Kalau paham polanya, membaca dokumentasi dan source code mereka jadi jauh lebih
  mudah.
- Modal yang benar (fokus terkunci, Escape menutup) adalah syarat aksesibilitas.
  Sering muncul di code review.
- Error Boundary dan code splitting langsung terasa oleh user: aplikasi tidak
  layar putih, dan halaman pertama lebih cepat.
- React 19 mengubah cara `ref` diteruskan. Di kantor kamu akan bertemu dua gaya
  sekaligus (lama dan baru).

## Istilah Baru

| Istilah | Arti singkat |
| --- | --- |
| Portal | Cara merender anak ke node DOM lain (`createPortal`). |
| Focus trap | Fokus keyboard (Tab) tidak bisa keluar dari modal selama modal terbuka. |
| Code splitting | Memecah bundle JavaScript jadi beberapa file kecil. |
| `React.lazy` | Membuat komponen yang file-nya baru dimuat saat pertama dirender. |
| `Suspense` | Pembungkus yang menampilkan fallback selama komponen lazy belum siap. |
| Chunk | Satu file JavaScript hasil pemecahan bundle. |
| Preload / prefetch | Memuat chunk lebih awal (misalnya saat hover link) supaya terasa instan. |
| Error Boundary | Komponen class yang menangkap error render di anak-anaknya. |
| Fallback UI | Tampilan pengganti saat loading atau error. |
| Ref | "Pegangan" ke elemen DOM atau nilai yang tidak memicu render. |
| `useImperativeHandle` | Menentukan method apa saja yang bisa dipanggil parent lewat ref. |
| `forwardRef` | Cara lama (sebelum React 19) meneruskan ref ke komponen anak. |
| Compound components | Beberapa komponen yang berbagi state lewat context dan dipakai bersama. |

## Isi Folder

```text
01-latihan-advanced-react/
├── README.md        ← kamu di sini
├── TUGAS.md
├── CHECKLIST.md
├── soal/            ← 5 soal
└── code/            ← 5 file, sudah berisi implementasi (anggap sebagai contoh)
```

## Mulai dari Mana?

Ini folder `01-` pertama di Level 5. Kerjakan **sebelum**
[01-latihan-performa](../01-latihan-performa/README.md), karena latihan performa
memakai `React.lazy` dan `Suspense` dari sini.

Buka [TUGAS.md](TUGAS.md). Teori pendukung:
[React modern](../../materi-teori/00-react-modern/README.md).
