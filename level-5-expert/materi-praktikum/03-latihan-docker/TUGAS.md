# TUGAS — Docker (Dockerfile, Multi-stage, Networking, Compose)

Docker membungkus aplikasi dan semua kebutuhannya jadi satu paket yang jalan
sama di laptopmu, di laptop temanmu, dan di server. Di sini kamu belajar menulis
paket itu dengan **kecil, cepat dibangun, dan aman**.

## Hasil Akhir yang Diharapkan

1. Image Node.js untuk backend yang berjalan sebagai **user non-root**.
2. Image frontend multi-stage (build dengan Node, sajikan dengan Nginx) yang
   ukurannya jauh lebih kecil dari image build.
3. `.dockerignore` yang menjaga `node_modules`, `.git`, dan `.env` tidak ikut
   terkirim ke image.
4. `docker-compose.yml` yang menjalankan frontend, backend, dan PostgreSQL
   sekaligus dengan satu perintah, lengkap dengan healthcheck dan volume.

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-dockerfile-basics.md` | `level-5-expert/materi-praktikum/03-latihan-docker/code/01-Dockerfile` (kerangka TODO) dan `level-5-expert/materi-praktikum/03-latihan-docker/code/03-dockerignore` (TODO) | 90 menit |
| 02 | `soal/02-multi-stage-build.md` | `level-5-expert/materi-praktikum/03-latihan-docker/code/02-Dockerfile` (TODO) dan `level-5-expert/materi-praktikum/03-latihan-docker/code/nginx.conf` (referensi) | 80 menit |
| 03 | `soal/03-volume-networking.md` | Tidak ada starter. Dikerjakan dengan perintah `docker`. Referensi akhir: tulis `code/04-docker-compose.yml` versimu sendiri | 95 menit |
| 04 | `soal/04-docker-compose.md` | `level-5-expert/materi-praktikum/03-latihan-docker/code/04-docker-compose.yml` (kerangka TODO) | 90 menit |

### Catatan jujur: file starter dan file kembar

- `01-Dockerfile`, `02-Dockerfile`, dan `03-dockerignore` sekarang berupa
  **kerangka `TODO(human)`**. Isi sendiri.
- `04-docker-compose.yml` dan `nginx.conf` juga kerangka `TODO(human)`.
- Kunci jawaban Dockerfile, multi-stage, `.dockerignore`, Compose, dan Nginx ada di
  [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Buka hanya
  setelah mencoba sendiri.
- Dulu ada file kembar `02-multi-stage-Dockerfile` dan `03-.dockerignore`
  (versi jadi dari `02-Dockerfile` dan `03-dockerignore`). Keduanya dipindah
  ke `_arsip/level-5-file-kembar/03-latihan-docker/` dan isinya ada di file
  solusi di atas.

---

## Cara Menjalankan

Butuh Docker terpasang dan jalan:
[Install Docker](../../software/01-docker-install.md).

```bash
docker --version
docker compose version      # harus v2 (tanpa tanda hubung)
docker run --rm hello-world
```

Kamu butuh aplikasi untuk dibungkus. Buat dua proyek kecil:

- `backend/`: Express dengan `GET /health`, mendengarkan di port dari
  `process.env.PORT`.
- `frontend/`: Vite React (`npm create vite@latest frontend -- --template react`).

Aturan penamaan Docker:

- Dockerfile harus bernama `Dockerfile` (atau tunjuk dengan `-f`). Saat
  menyalin starter `02-Dockerfile` ke proyekmu, ganti namanya jadi `Dockerfile`.
- `03-dockerignore` harus bernama `.dockerignore` (pakai titik di depan) dan
  berada di folder yang sama dengan konteks build.

Perintah dasar yang akan kamu pakai:

```bash
docker build -t backend:dev ./backend
docker run --rm -p 5000:5000 backend:dev
docker images
docker ps
docker logs <container>
docker compose up --build
docker compose down
```

---

## Langkah Pengerjaan

1. **Soal 01** — jalankan aplikasimu di laptop dulu tanpa Docker. Lalu tulis
   Dockerfile dengan urutan instruksi yang kamu putuskan sendiri. Bangun dua
   kali. Ubah satu baris kode, bangun lagi. Layer mana yang memakai cache?
   Ubah urutan instruksi dan bandingkan.
2. **Soal 01 lanjutan** — buat versi yang jalan sebagai non-root, lalu cek dengan
   `docker run --rm backend:dev id`.
3. **`.dockerignore`** — bangun image sebelum dan sesudah `.dockerignore`. Bandingkan
   ukuran konteks build di output (`Sending build context...`).
4. **Soal 02** — tulis stage build dan stage produksi. Bandingkan ukuran image
   akhir dengan image yang hanya satu stage.
5. **Soal 03** — buat network sendiri, jalankan PostgreSQL dan backend di
   dalamnya, panggil database dari backend dengan **nama container**, bukan IP.
6. **Soal 04** — gabungkan semuanya di satu file Compose. Tambah healthcheck dan
   atur supaya backend menunggu database benar-benar siap.

Teori: [Docker dan Containerization](../../materi-teori/03-docker-containerization/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Baca pesan error

- `Cannot connect to the Docker daemon` → Docker Desktop belum jalan.
- `COPY failed: file not found` → file ada di luar konteks build, atau kena
  `.dockerignore`.
- `port is already allocated` → port di host sudah dipakai. Ganti sisi kiri
  `-p kiri:kanan`.
- Container langsung berhenti → `docker logs <container>`. Baca baris terakhir.
- Dari backend, `localhost:5432` tidak menemukan database → di dalam container,
  `localhost` artinya container itu sendiri. Apa nama yang dipakai Docker DNS?

### Level 2 — Lihat buktinya

- `docker history <image>` → ukuran tiap layer.
- `docker run --rm -it <image> sh` → masuk dan lihat isi file, user, dan
  environment di dalam.
- `docker inspect <container>` → network, mount, env.
- `docker compose ps` dan `docker compose logs -f <service>`.
- `docker network inspect <network>` → siapa saja yang terhubung.

### Level 3 — Perkecil masalah

- Compose gagal? Jalankan satu service saja: `docker compose up postgres`.
  Setelah sehat, tambah backend.
- Image terlalu besar? Cari tahu lewat `docker history` layer mana yang paling
  gemuk, dan tanya: apakah isinya dibutuhkan saat runtime?
- Data hilang saat container dihapus? Pikirkan: data database tinggal di mana?

### Dokumentasi

- docs.docker.com → "Dockerfile reference", "Best practices for writing
  Dockerfiles", "Multi-stage builds", "Compose file reference".
- hub.docker.com → halaman image `node`, `nginx`, `postgres` (bagian "How to use
  this image" dan variabel environment).

---

## Cara Mengecek Hasil Sendiri

```bash
docker run --rm backend:dev id          # bukan uid=0(root)
docker images                           # bandingkan ukuran sebelum/sesudah
docker compose up -d --build
docker compose ps                       # semua service healthy/running
curl -i http://localhost:5000/health
docker compose down                     # data harus tetap ada karena volume
docker compose up -d                    # data database masih ada
```

- [ ] Container backend berjalan sebagai bukan root.
- [ ] Ukuran image frontend akhir jauh lebih kecil daripada image dengan Node
      penuh.
- [ ] Mengubah satu baris kode tidak memicu `npm install` ulang (layer cache
      bekerja).
- [ ] `docker run --rm <image> ls -a` tidak menampilkan `.env`, `.git`, atau
      `node_modules` dari laptopmu.
- [ ] Refresh di `/dashboard` pada frontend Nginx tidak 404 (cek `nginx.conf`
      milikmu).
- [ ] Setelah `docker compose down` lalu `up`, data PostgreSQL masih ada.
- [ ] Port database **tidak** terbuka ke host kecuali memang dibutuhkan saat
      development.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md), lalu lanjut ke
[04-latihan-websocket](../04-latihan-websocket/TUGAS.md).
