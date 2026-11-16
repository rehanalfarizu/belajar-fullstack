# Arsip

Folder ini berisi file dan folder yang dipindahkan dari repo utama karena:
- Redundan (duplikasi fungsi)
- Kosong (belum ada konten)
- Tidak dipakai lagi

File di sini **tidak dihapus** agar riwayat Git tetap terjaga.

---

## Isi Arsip

### materi-tutorial-kosong/

Folder `materi-tutorial/` dari berbagai level. Isinya hanya satu `README.md` per
folder. Untuk Node, React, Level 4, dan Level 5, README itu berupa **daftar isi
tutorial yang direncanakan** (100+ baris), tapi file tutorial yang disebut di
dalamnya tidak pernah dibuat. Laravel dan Vue hanya berisi README pendek.

Dipindahkan karena:
- Fungsinya sama dengan folder `tutorial/` yang sudah ada
- Membingungkan pelajar (dua folder dengan nama mirip)
- Daftar isinya menunjuk ke file yang tidak ada

Kalau suatu saat ingin menulis tutorial-tutorial itu, daftar isi di README arsip
ini bisa dipakai sebagai rencana. Validator (`npm run audit`) sengaja melewati
folder `_arsip/`, jadi tautan rusak di sini tidak dianggap error.

**Folder yang dipindahkan:**
- LEVEL-2-Backend-Node-Express-materi-tutorial
- LEVEL-2-Backend-Laravel-materi-tutorial
- LEVEL-3-Frontend-React-materi-tutorial
- LEVEL-3-Frontend-Vue-materi-tutorial
- LEVEL-4-Fullstack-Integration-materi-tutorial
- LEVEL-5-Expert-Level-materi-tutorial

**Catatan:** LEVEL-0 dan LEVEL-1 materi-tutorial tidak dipindahkan karena ada isinya.

---

## Cara Restore Jika Dibutuhkan

```bash
# Contoh restore satu folder
git mv _arsip/materi-tutorial-kosong/LEVEL-2-Backend-Node-Express-materi-tutorial level-2-backend-nodejs/materi-tutorial
```

---

## level-5-file-kembar/

File kembar di Level 5 yang tidak dipakai lagi oleh soal atau TUGAS.md. Isinya
juga disalin ke `solusi-jangan-dibuka-dulu.md` di folder topiknya.

| Nama lama | Lokasi arsip | Alasan |
| --- | --- | --- |
| `level-5-expert/materi-praktikum/03-latihan-docker/code/02-multi-stage-Dockerfile` | `_arsip/level-5-file-kembar/03-latihan-docker/02-multi-stage-Dockerfile` | Versi jadi (jawaban) dari starter `02-Dockerfile`; membuat bingung mana file kerja |
| `level-5-expert/materi-praktikum/03-latihan-docker/code/03-.dockerignore` | `_arsip/level-5-file-kembar/03-latihan-docker/03-.dockerignore` | Versi jadi (jawaban) dari starter `03-dockerignore` |

Restore: `git mv _arsip/level-5-file-kembar/03-latihan-docker/<file> level-5-expert/materi-praktikum/03-latihan-docker/code/<file>`
