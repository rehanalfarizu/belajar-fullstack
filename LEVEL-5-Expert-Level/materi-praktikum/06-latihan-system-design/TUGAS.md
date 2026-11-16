# TUGAS — System Design

Folder ini beda dari yang lain: **tidak ada kode starter dan tidak ada soal**.
Hasilnya berupa dokumen keputusan yang bisa diuji. Tugasmu diturunkan dari
[README folder ini](README.md).

Inti system design: bukan menggambar kotak dan panah sebanyak mungkin, tapi
menjawab "kenapa begini, apa yang terjadi kalau gagal, dan bagaimana aku tahu?"

## Hasil Akhir yang Diharapkan

Satu dokumen (misalnya `design.md` di `latihan-saya/` atau repo proyekmu) untuk
**satu sistem** pilihanmu: checkout, chat, task manager kolaboratif, atau
notification platform. Dokumen itu memuat 10 bagian dari README:

1. Requirement, non-goal, dan estimasi traffic/storage.
2. Kontrak API/event dan semantik error.
3. Skema data, invariant, batas transaksi, dan index.
4. Diagram container + satu sequence diagram untuk alur kritis.
5. Tabel minimal delapan failure mode (dampak, deteksi, mitigasi, recovery).
6. SLO, metric, log, trace, alert, runbook.
7. Threat model keamanan dan klasifikasi data.
8. Rencana load test (hipotesis, batas lulus, rollback).
9. Rencana evolusi dari modular monolith.
10. Tiga architecture decision record (ADR).

---

## Daftar Tugas dan Berkas Kerja

Tidak ada starter. Kamu menulis berkas baru.

| No | Deliverable (dari README) | Kamu menulis di | Estimasi |
| --- | --- | --- | --- |
| 0 | Pilih sistem + tulis satu paragraf tujuan | `design.md` bagian 0 | 20 menit |
| 1 | Requirement, non-goal, estimasi | `design.md` bagian 1 | 60 menit |
| 2 | Kontrak API/event + error | `design.md` bagian 2 | 60 menit |
| 3 | Skema data dan invariant | `design.md` bagian 3 | 75 menit |
| 4 | Diagram container + sequence | `design.md` bagian 4 (Mermaid atau gambar) | 60 menit |
| 5 | Tabel 8 failure mode | `design.md` bagian 5 | 60 menit |
| 6 | SLO dan observability | `design.md` bagian 6 | 60 menit |
| 7 | Threat model + klasifikasi data | `design.md` bagian 7 | 60 menit |
| 8 | Rencana load test | `design.md` bagian 8 | 45 menit |
| 9 | Rencana evolusi | `design.md` bagian 9 | 30 menit |
| 10 | Tiga ADR | `design.md` bagian 10 atau folder `adr/` | 45 menit |
| 11 | Review diri dengan "Review checklist" README | `design.md` penutup | 30 menit |

Total sekitar 10 jam. Bagi menjadi 4–5 sesi.

### Catatan

- Tidak ada file di `code/` atau `soal/`, jadi tidak ada yang bisa dijalankan.
  Verifikasi dilakukan dengan **membaca ulang dan menguji dokumenmu sendiri**.
- Kamu tidak harus membangun sistemnya. Kalau ingin, jadikan sistem ini dasar
  [final project](../../final-project/README.md).

---

## Cara Mengerjakan

Alat yang cukup: editor Markdown, kertas, dan (opsional) Mermaid
(didukung di preview Markdown GitHub dan VS Code lewat ekstensi) atau draw.io.

Template kerangka (isi sendiri):

```markdown
# Design: <nama sistem>
## 1. Requirement
- Fungsional:
- Non-goal:
- Asumsi angka (pengguna, request/detik, ukuran data):
## 2. Kontrak API / event
## 3. Data
## 4. Diagram
## 5. Failure modes
| Komponen | Gagal bagaimana | Dampak | Deteksi | Mitigasi | Recovery |
## 6. SLO dan observability
## 7. Threat model
## 8. Load test
## 9. Evolusi
## 10. ADR
```

---

## Langkah Pengerjaan

1. **Pilih sistem yang kamu paling paham alur bisnisnya.** Menggambar sistem
   yang tidak kamu mengerti hasilnya diagram kosong.
2. **Requirement dulu, selalu.** Tulis apa yang **tidak** akan dibuat. Dari
   non-goal, desainmu jadi jauh lebih sederhana.
3. **Hitung angka dengan asumsi tertulis.** Contoh pola: pengguna aktif →
   request per detik puncak → ukuran data per hari → ukuran data per tahun. Setiap
   angka punya alasan. Rumus dan hasilnya kamu tulis sendiri.
4. **Mulai dari satu server dan satu database.** Tambah komponen hanya jika ada
   angka yang membuktikan perlu. Setiap komponen punya alasan dan pemilik.
5. **Pilih satu alur kritis** (misalnya "user menekan bayar") dan gambar urutan
   panggilannya. Di tiap panah tanyakan: bagaimana kalau ini gagal? Itu bahan
   tabel failure mode.
6. **Failure mode:** jangan hanya "server mati". Pikirkan: request datang dua
   kali, database lambat, pihak ketiga timeout, antrean menumpuk, disk penuh,
   deploy rusak.
7. **SLO:** tentukan angka yang berarti bagi user (misalnya persen request
   sukses, latensi p95), lalu tentukan sinyal untuk mengukurnya.
8. **Threat model:** daftar aset (data apa yang paling berharga), aktor (siapa
   yang mungkin menyerang), dan jalur serangan (di mana input masuk).
9. **ADR:** untuk tiga keputusan terbesar, tulis konteks, pilihan yang
   dipertimbangkan, pilihan yang diambil, dan konsekuensinya (termasuk yang
   buruk).
10. **Review akhir** memakai "Review checklist" di README.

Teori: [System Design](../../materi-teori/06-system-design/README.md),
[Observability dan Reliability](../../materi-teori/07-observability-reliability/README.md),
[Advanced Security](../../materi-teori/08-advanced-security/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Tidak tahu mulai dari mana

- Tulis satu kalimat: "Sistem ini membantu [siapa] untuk [melakukan apa]."
- Tulis tiga hal yang **harus** bisa dilakukan user, dan tiga yang **tidak**
  akan dibuat.
- Tulis alur normal sebagai daftar langkah bernomor, belum perlu diagram.

### Level 2 — Angka terasa mengarang

- Memang asumsi. Yang dinilai bukan kebenaran angkanya, tapi **keterlacakan**:
  orang lain bisa mengubah satu asumsi dan menghitung ulang.
- Cari pembanding nyata: berapa pengguna aplikasi serupa yang kamu kenal? Tulis
  sumbernya, atau tulis "perkiraan kasar".
- Cek akal: apakah satu database biasa sanggup? Banyak sistem kecil ya.

### Level 3 — Bingung menentukan komponen

- Untuk tiap komponen (cache, queue, service terpisah), jawab tiga hal: masalah
  apa yang ia selesaikan, angka apa yang membuktikan masalah itu ada, dan apa
  yang terjadi kalau komponen itu mati. Kalau tidak ada jawaban, hapus.
- Cache bukan sumber kebenaran. Kalau cache hilang, apa yang terjadi?
- Retry bukan gratis. Kalau satu request diulang tiga kali, apa efek
  sampingnya? Bagaimana membuatnya aman diulang?

### Bacaan

- Teori Level 5 yang ditautkan di atas.
- Dokumentasi ADR (cari "architecture decision record" dan format Michael
  Nygard).
- Google SRE Book bab "Service Level Objectives".
- OWASP → "Threat Modeling Cheat Sheet".
- Mermaid → dokumentasi `flowchart` dan `sequenceDiagram`.

---

## Cara Mengecek Hasil Sendiri

Gunakan "Review checklist" di [README](README.md), lalu uji lebih keras:

- [ ] **Uji angka:** ubah satu asumsi menjadi 10 kali lebih besar. Apakah
      desainmu masih masuk akal? Apa yang pecah pertama kali?
- [ ] **Uji sebaliknya:** kalau skala turun 10 kali, bagian mana yang bisa
      dihapus?
- [ ] **Uji konsistensi:** nama endpoint di diagram, kontrak API, dan tabel
      failure mode sama persis.
- [ ] **Uji failure:** pilih tiga failure mode dan telusuri dari deteksi sampai
      recovery. Apakah runbook-mu cukup untuk orang yang belum pernah melihat
      sistemnya, jam 3 pagi?
- [ ] **Uji retry:** untuk setiap operasi yang bisa diulang, jelaskan kenapa tidak
      menimbulkan efek ganda.
- [ ] **Uji backup:** ada target RPO/RTO dan cara menguji restore.
- [ ] **Uji keamanan:** data apa yang bocor kalau satu komponen dibobol?
- [ ] **Uji orang lain:** minta teman membaca 15 menit, lalu minta ia
      menjelaskan ulang sistemmu. Bagian yang ia salah paham adalah bagian yang
      perlu ditulis ulang.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md). Level 5 selesai. Lanjut ke
[Final Project](../../final-project/README.md) dan
[Self Problem Solving Level 5](../../SELF_PROBLEM_SOLVING.md).
