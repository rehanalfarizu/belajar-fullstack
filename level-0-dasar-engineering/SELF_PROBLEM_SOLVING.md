# Self Problem Solving — Level 0

Tujuan: membangun kebiasaan observasi, hipotesis, eksperimen kecil, dan recovery.
Kerjakan tanpa solusi/AI selama 45 menit pertama. Jangan menjalankan perintah
destruktif pada repository penting; gunakan folder latihan sementara.

## Artefak wajib

Untuk setiap kasus, kumpulkan expected/actual, minimal reproduction, dua hipotesis,
bukti yang membedakan hipotesis, fix, regression proof, dan recovery.

## Kasus

### 1. Path dan working directory

Sebuah script membaca `./data/users.json` dan bekerja dari satu terminal tetapi
gagal dari terminal lain. Temukan penyebab tanpa mengganti path secara acak.

Acceptance:

- dapat menjelaskan working directory versus lokasi script;
- solusi bekerja dari dua lokasi;
- error file-not-found memberi konteks path yang diperiksa.

### 2. Process dan environment

Aplikasi membutuhkan `API_PORT` integer 1024–65535. Buat parser yang gagal cepat
untuk missing, string, pecahan, dan nilai di luar rentang. Jangan memakai fallback
diam-diam.

### 3. Git recovery lab

Di repository latihan, buat tiga commit, perubahan belum di-stage, satu branch,
dan satu konflik. Tunjukkan cara:

- melihat tiga jenis perubahan;
- memulihkan file tanpa menghapus pekerjaan lain;
- membatalkan commit publik dengan `revert`;
- menyelesaikan konflik dan menjelaskan hasil final.

### 4. Prediksi event loop

Buat program berisi synchronous log, Promise, timer, dan file I/O. Prediksi urutan,
jalankan 10 kali, lalu jelaskan mana yang dijamin dan mana yang bergantung runtime.

### 5. Algoritma

Temukan duplicate pertama dari satu juta ID. Bandingkan nested loop dan `Set`.
Ukur waktu/memory pada input yang sama dan jelaskan trade-off.

### 6. Secret incident

Simulasikan API key dummy ter-commit. Tulis incident procedure: contain, rotate,
history assessment, detection, notification, prevention. Menghapus commit saja
tidak dianggap selesai.

### 7. Threat model catatan CLI

Gambar data flow aplikasi catatan lokal. Identifikasi asset, trust boundary,
malicious input, permission, symlink/path traversal, backup, dan audit.

### 8. Requirement ambiguity

Requirement: “buat sistem login aman dan cepat.” Tulis minimal 15 pertanyaan
klarifikasi, acceptance criteria terukur, non-goal, risiko, dan eksperimen awal.

## Rubrik lulus

- Tidak menebak sebelum membaca bukti.
- Satu eksperimen mengubah satu variabel.
- Perintah recovery diuji di repo sementara.
- Klaim performa mempunyai angka dan kondisi.
- Security mencakup pencegahan, deteksi, serta recovery.
- Minimal enam kasus bernilai ≥2 dari rubrik root.
