// ============================================================
// SOAL 04 — ARRAY MANIPULATION
// ============================================================
// Tujuan: push, pop, map, filter, reduce, find, some, every, sort

// ============================================================
// DATA
// ============================================================
const mahasiswa = [
  { nama: "Andi",   nilai: 85 },
  { nama: "Budi",   nilai: 72 },
  { nama: "Citra",  nilai: 90 },
  { nama: "Dewi",   nilai: 65 },
  { nama: "Eko",    nilai: 78 },
  { nama: "Fira",   nilai: 95 },
];

// ============================================================
// TODO 1: push & pop
// ============================================================
// Tambahkan mahasiswa baru dengan push
// Hapus mahasiswa terakhir dengan pop

// ============================================================
// TODO 2: map — extract nama saja
// ============================================================
// const namaList = mahasiswa.map(/* TODO */);
// console.log("Nama-nama:", namaList);

// ============================================================
// TODO 3: map — nilai dikali 2
// ============================================================
// const nilaiGanda = mahasiswa.map(/* TODO */);

// ============================================================
// TODO 4: filter — nilai > 75
// ============================================================
// const lulus = mahasiswa.filter(/* TODO */);
// console.log("Lulus (>75):", lulus);

// ============================================================
// TODO 5: filter — cumlaude (nilai >= 90)
// ============================================================
// const cumlaude = mahasiswa.filter(/* TODO */);

// ============================================================
// TODO 6: find — cari mahasiswa bernama "Eko"
// ============================================================
// const eko = mahasiswa.find(/* TODO */);

// ============================================================
// TODO 7: reduce — total semua nilai
// ============================================================
// const total = mahasiswa.reduce(/* TODO */);
// console.log("Total nilai:", total);

// ============================================================
// TODO 8: reduce — rata-rata
// ============================================================
// const rata2 = /* TODO */;
// console.log("Rata-rata:", rata2.toFixed(2));

// ============================================================
// TODO 9: some — ada yang remidi (nilai < 60)?
// ============================================================
// const adaRemidi = mahasiswa.some(/* TODO */);
// console.log("Ada remidi:", adaRemidi);

// ============================================================
// TODO 10: every — semua lulus (nilai >= 60)?
// ============================================================
// const semuaLulus = mahasiswa.every(/* TODO */);
// console.log("Semua lulus:", semuaLulus);

// ============================================================
// TODO 11: sort — urutkan berdasarkan nilai (descending)
// ============================================================
// const terurut = [...mahasiswa].sort(/* TODO */);
// console.log("Urut descending:", terurut);

// ============================================================
// CONTOH OUTPUT:
// Nama-nama: ['Andi', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fira']
// Lulus (>75): [{ nama: 'Andi', nilai: 85 }, ...]
// Total nilai: 485
// Rata-rata: 80.83
// Ada remidi: false
// Semua lulus: true
// ============================================================