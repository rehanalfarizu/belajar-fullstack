# Prinsip Software Engineering dan Problem Solving

Coding adalah bagian kecil dari engineering. Hasil yang baik harus benar, dapat
diubah, aman, teruji, dapat diamati, dan sesuai kebutuhan pengguna.

## 1. Mulai dari masalah, bukan framework

Sebelum menulis kode, tulis:

- siapa pengguna dan tujuan mereka;
- input, output, aturan bisnis, dan kasus batas;
- batasan waktu, keamanan, biaya, dan compatibility;
- acceptance criteria yang dapat diuji;
- hal yang belum diketahui.

Ubah permintaan besar menjadi vertical slice kecil. Contoh “buat e-commerce”
dipecah menjadi melihat produk, memasukkan keranjang, checkout idempotent, dan
melihat status pesanan.

## 2. Kontrak dan pemisahan tanggung jawab

Kontrak menjelaskan input, output, error, dan invariant. Pisahkan:

- UI: presentasi dan interaksi;
- application/service: use case dan aturan bisnis;
- infrastructure: HTTP, database, queue, filesystem;
- domain: konsep dan aturan inti.

Hindari abstraksi sebelum ada pola berulang. Duplikasi kecil lebih murah daripada
abstraksi salah yang mengikat banyak modul.

## 3. Debugging ilmiah

Gunakan siklus berikut:

1. **Reproduce** — buat kegagalan konsisten dengan input terkecil.
2. **Observe** — baca pesan error, stack trace, network, log, dan state.
3. **Hypothesize** — tulis penyebab yang dapat dibuktikan salah.
4. **Isolate** — ubah satu variabel; cari batas terakhir yang masih benar.
5. **Fix cause** — perbaiki akar penyebab, bukan gejalanya.
6. **Verify** — jalankan kasus gagal, regression test, dan kasus batas.
7. **Explain** — catat mengapa bug terjadi dan mengapa perbaikan benar.

Jangan mengubah banyak hal sekaligus. Jika hipotesis tidak punya prediksi yang
dapat dites, hipotesis itu terlalu kabur.

## 4. Strategi testing

- Static checks menangkap masalah bentuk: parser, type checker, lint.
- Unit test memeriksa logika murni dan cepat.
- Integration test memeriksa kontrak antarbagian nyata.
- End-to-end test memeriksa alur pengguna kritis.
- Manual exploratory testing mencari perilaku yang belum terpikirkan.

Piramida bukan target jumlah absolut. Pilih level terendah yang memberi keyakinan
tanpa memalsukan interaksi penting.

## 5. Review, Git, dan perubahan aman

Satu commit idealnya punya satu alasan perubahan. Pull request harus menjelaskan
masalah, solusi, trade-off, cara menguji, risiko, dan rollback. Reviewer menilai
correctness terlebih dahulu, lalu keamanan, data, test, readability, dan style.

Perubahan database dan public API membutuhkan kompatibilitas bertahap:
**expand → migrate → contract**. Jangan menghapus field ketika consumer lama
masih menggunakannya.

## 6. Operasi adalah bagian dari desain

Sebelum deploy, tentukan:

- health/readiness check;
- structured log dan correlation/request ID;
- metric untuk traffic, error, latency, dan saturation;
- backup serta uji restore;
- timeout, retry dengan backoff, dan idempotency;
- alarm yang dapat ditindaklanjuti;
- rollback dan incident owner.

Postmortem yang baik tidak mencari kambing hitam. Ia menyusun timeline, dampak,
faktor teknis dan organisasi, hal yang bekerja, serta action item dengan pemilik.

## Rubrik kualitas solusi

Nilai setiap proyek 0–3 pada: requirement, correctness, readability, testing,
security, accessibility, performance, observability, documentation, dan Git
history. Skor 0 berarti belum ada; 1 bekerja pada happy path; 2 menangani kasus
batas; 3 memiliki bukti otomatis dan alasan trade-off.
