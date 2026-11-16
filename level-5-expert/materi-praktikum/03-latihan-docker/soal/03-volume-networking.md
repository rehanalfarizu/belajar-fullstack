# SOAL 03 — Volume, Networking, dan Environment Variables

> Memahami Docker networking, volume mounting, dan environment variable management.

---

## Deskripsi Soal

Kamu perlu mengkonfigurasi environment Docker untuk development workflow yang melibatkan:
- Frontend React app (port 3000)
- Backend Express API (port 5000)
- PostgreSQL database (port 5432)

Tugas kamu adalah memahami dan mengkonfigurasi networking antar container, volume untuk persistence, dan environment variables untuk konfigurasi yang aman.

---

## Teori Singkat

### Docker Networking

```
┌─────────────────────────────────────────────────────────────┐
│ Docker Network                          │
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │   frontend │──────│ nginx     │──────┐            │
│  │  (bridge)    │      │   (bridge)   │      │            │
│  │172.17.0.2 │      │  172.17.0.3  │      │            │
│  └──────────────┘      └──────────────┘      │            │
│         │                     │               │            │
│         │ ┌──────▼──────┐        │            │
│         │              │   backend   │◀───────┘            │
│         │              │  (bridge)   │                      │
│         │              │ 172.17.0.4 │                      │
│         │              └──────┬──────┘                      │
│         │                     │                             │
│         │ ┌──────▼──────┐                     │
│         └─────────────▶│  postgres │                     │
│                        │  (bridge)   │                     │
│                        │  172.17.0.5 │                     │
│                        └─────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

**Network Types:**
- `bridge` — default, untuk single host
- `host` — langsung ke host network (no isolation)
- `overlay` — untuk Docker Swarm
- `none` — no networking

### Docker DNS

Container dalam Docker network bisa reach satu sama lain dengan **container name sebagai hostname**:

```bash
# Dari container frontend, kamu bisa akses:
curl http://backend:5000/api/health
# Tidak perlu IP address!
```

### Volume Types

| Type | Use Case | Persistence | Performance |
|------|----------|-------------|-------------|
| Anonymous | Temporary data | Lost when container removed | Best |
| Named | Persistent data | Survives container restart | Good |
| Bind Mount | Development (hot reload) | Host filesystem | Best |
| tmpfs | Secrets, sensitive data | Lost on restart | Best |

---

## Checklist Pengerjaan

### Bagian A — Docker Networking (20 menit)

**1. Create Custom Network**

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — A1. Create Custom Network".
>
> Pertanyaan pemandu: perintah apa yang membuat network bridge dengan nama pilihanmu, dan perintah apa untuk melihat daftar serta detailnya?

**2. Connect Containers to Network**

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — A2. Connect Containers to Network".
>
> Pertanyaan pemandu: flag apa yang menempatkan container ke network tertentu, dan hostname apa yang dipakai backend untuk mencapai database di network yang sama?

**3. Internal vs External Access**

Demonstrasikan:
- Backend bisa akses postgres dengan hostname `postgres`
- Frontend di host machine akses backend dengan `localhost:5000`
- Database TIDAK bisa diakses dari host machine secara langsung (security)

### Bagian B — Volume Management (20 menit)

**1. Named Volume untuk Database**

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — B1. Named Volume untuk Database".
>
> Pertanyaan pemandu: bagaimana membuktikan data tetap ada setelah container di-restart, dan flag apa yang menghubungkan volume ke path data PostgreSQL?

**2. Bind Mount untuk Development**

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — B2. Bind Mount untuk Development".
>
> Pertanyaan pemandu: apa beda sintaks `-v` untuk named volume dan bind mount, dan bagaimana kamu membuktikan perubahan di host langsung terlihat di container?

**3. tmpfs untuk Sensitive Data**

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — B3. tmpfs untuk Sensitive Data".
>
> Pertanyaan pemandu: flag apa yang membuat direktori hidup hanya di memori, dan bagaimana kamu membuktikan isinya tidak ada di disk?

**4. Volume Backup& Restore**

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — B4. Volume Backup & Restore".
>
> Pertanyaan pemandu: container sementara apa yang bisa me-mount volume dan folder host sekaligus untuk membuat arsip, dan bagaimana arah sebaliknya untuk restore?

### Bagian C — Environment Variables (20 menit)

**1. ENV vs ARG vs .env**

| Type | Build Time | Runtime | Secure | Use Case |
|------|-----------|---------|--------|----------|
| `ARG` | Yes | No | No | Build flags, version numbers |
| `ENV` | Yes | Yes | No | Defaults, non-sensitive config |
| `.env` file | No | Yes | Some | Development config |
| Docker Secrets | No | Yes | Yes | Passwords, API keys |

**2. ENV in Dockerfile**

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — C2. ENV in Dockerfile".
>
> Pertanyaan pemandu: instruksi Dockerfile apa untuk nilai default, dan bagaimana menimpanya saat container dijalankan?

**3. Environment File (.env)**

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — C3. Environment File (.env)".
>
> Pertanyaan pemandu: format file `.env` itu bagaimana, dan flag apa yang memuatnya ke container?

**4. Security: Secrets vs ENV**

Demonstrasikan security concern:

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — C4. Security: Secrets vs ENV".
>
> Pertanyaan pemandu: lewat perintah apa nilai ENV bisa dibaca orang lain, dan alternatif apa yang tidak meninggalkan jejak itu?

**5. Production Environment Checklist**

Buat checklist untuk production deployment:

| Item | Implementation | Security Level |
|------|---------------|----------------|
| No hardcoded secrets in image | Use runtime ENV | High |
| .env file tidak di-commit | .gitignore | High |
| Secrets tidak visible di inspect | tmpfs/docker secrets | Critical |
| Default credentials changed | ENV override | High |
| Debug mode disabled | ENV NODE_ENV=production | High |

### Bagian D — Docker Compose Integration (15 menit)

**1. Convert CLI ke docker-compose.yml**

Dari semua command di atas, buat `docker-compose.yml`:

```yaml
# TODO: Implementasikan di soal 04
# code/04-docker-compose.yml
```

**2. Test dengan docker-compose**

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — D2. Test dengan docker-compose".
>
> Pertanyaan pemandu: perintah compose apa untuk menyalakan, memeriksa status, menjalankan perintah di service, melihat log, dan mematikan semuanya?

**3. Volume dalam docker-compose**

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — D3. Volume dalam docker-compose".
>
> Pertanyaan pemandu: di bagian mana volume dideklarasikan, dan di bagian mana service memakainya?

### Bagian E — Troubleshooting (20 menit)

**1. Network Issues**

Simulasikan dan debug masalah:

**Issue 1: "Could not resolve host"**

Penyebab: container tidak di network yang sama.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — E1. Could not resolve host".
>
> Pertanyaan pemandu: gejalanya error `could not translate host name "backend" to address`. Container yang tidak berada di network yang sama tidak bisa memakai nama satu sama lain, jadi perintah `docker network` apa yang memperbaikinya?

**Issue 2: "Connection refused"**

Penyebab: port tidak cocok, atau service belum siap.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — E2. Connection refused".
>
> Pertanyaan pemandu: dua hal apa yang harus kamu periksa kalau koneksi ditolak, dan lewat perintah apa kamu memeriksanya?

**2. Volume Issues**

**Issue: "Permission denied"**

Penyebab: pemilik file tidak cocok.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — E3. Permission denied pada volume".
>
> Pertanyaan pemandu: bagaimana melihat pemilik file di dalam volume, dan siapa yang seharusnya memilikinya?

**Issue: "Volume mount failed"**

Penyebab: path host tidak ada atau tidak punya izin.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — E4. Volume mount failed".
>
> Pertanyaan pemandu: kenapa path yang tidak ada gagal di-mount, dan apa alternatif yang tidak bergantung pada path host?

**3. ENV Issues**

**Issue: "Variable not set"**

Gejala: aplikasi tidak menemukan variabel yang diharapkan.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "03-volume-networking — E5. Variable not set".
>
> Pertanyaan pemandu: perintah apa untuk melihat daftar environment di dalam container yang sedang jalan, dan apa untuk melihat konfigurasi `Env` dari container?

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Docker networking setup | 20% |
| Volume management (named, bind, tmpfs) | 25% |
| Environment variable security | 20% |
| docker-compose conversion | 15% |
| Troubleshooting capabilities | 20% |

---

## Reference

- [Docker Networking](https://docs.docker.com/network/)
- [Docker Volumes](https://docs.docker.com/storage/volumes/)
- [Dockerfile ENV vs ARG](https://docs.docker.com/engine/reference/builder/#env)
- [Docker Secrets](https://docs.docker.com/engine/swarm/secrets/)
- [ Twelve-Factor App](https://12factor.net/config)
