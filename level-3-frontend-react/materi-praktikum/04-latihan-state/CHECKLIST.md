# CHECKLIST — State Management

Centang dengan jujur. Yang belum, tandai dan ulangi minggu depan.

---

## Pemahaman Konsep

- [ ] Aku bisa membedakan local state, shared state, server state, dan
      persisted state
- [ ] Aku paham kenapa satu context besar bikin banyak komponen render ulang
- [ ] Aku paham kenapa objek `value` Provider perlu identitas yang stabil
- [ ] Aku bisa menjelaskan ide selector: komponen hanya "berlangganan" bagian
      state yang ia butuhkan
- [ ] Aku paham middleware reducer itu fungsi yang membungkus reducer
- [ ] Aku bisa menjelaskan cara kerja undo/redo dengan past/present/future
- [ ] Aku paham data di localStorage **tidak** membuktikan user benar-benar login
- [ ] Aku paham kenapa token autentikasi tidak boleh disimpan di localStorage
      (bisa dicuri lewat XSS)

---

## Kemampuan Praktis

- [ ] Aku bisa membuat AuthContext dengan `useReducer` dari nol
- [ ] Aku bisa membaca state awal dari localStorage dengan lazy initialization
- [ ] Aku bisa menangani JSON rusak di localStorage tanpa crash
- [ ] Aku bisa memecah context jadi beberapa Provider
- [ ] Aku bisa menulis hook `useContextSelector` sederhana
- [ ] Aku bisa menulis persist middleware dan undo/redo
- [ ] Aku bisa membuktikan perbaikan performa dengan rekaman Profiler

---

## Kebiasaan Baik

- [ ] Aku memetakan state (siapa baca, siapa ubah) sebelum menulis kode
- [ ] Aku mengukur dulu, baru mengoptimasi
- [ ] Yang aku simpan di localStorage hanya data UI (tema, filter, draft), bukan
      token atau password
      (baca [Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md)
      dan [XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md))
- [ ] Aku menulis reducer sebagai fungsi murni dan mengetesnya tanpa React
- [ ] Aku tidak percaya nama file. Aku membaca isi soal dulu

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[05-latihan-form](../05-latihan-form/TUGAS.md).
