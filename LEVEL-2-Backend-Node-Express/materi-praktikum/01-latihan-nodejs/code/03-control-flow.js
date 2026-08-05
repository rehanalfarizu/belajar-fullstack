/**
 * ============================================================
 * LATIHAN 1.3: Control Flow
 * ============================================================
 * Materi  : Node.js Dasar
 * Tujuan  : Mempraktikkan struktur kontrol: if/else, switch,
 *           forEach, for...of untuk memproses array dan object.
 *
 * Requirements:
 * - Array minimal 5 objek mahasiswa (nama, nim, jurusan, ipk)
 * - forEach untuk menampilkan semua data
 * - for...of untuk menghitung rata-rata IPK
 * - switch untuk menampilkan nama jurusan
 * - if/else untuk menentukan predikat IPK
 * ============================================================
 */

// TODO(human): Buat array mahasiswa dengan minimal 5 objek
// Struktur: { nama: string, nim: string, jurusan: string, ipk: number }
// Gunakan kode jurusan: 'TI' = Teknik Informatika, 'SI' = Sistem Informasi,
// 'TK' = Teknik Komputer, 'MI' = Manajemen Informatika
// const mahasiswa = [ ... ];

function getPredikat(ipk) {
  // TODO(human): Tentukan predikat berdasarkan IPK
  // IPK >= 3.5 -> "Cumlaude"
  // IPK >= 3.0 -> "Sangat Memuaskan"
  // IPK >= 2.5 -> "Memuaskan"
  // lainnya -> "Cukup"
  if (false /* TODO(human): ganti dengan kondisi ipk >= 3.5 */) {
    return 'Cumlaude';
  } else if (false /* TODO(human): ganti dengan kondisi ipk >= 3.0 */) {
    return 'Sangat Memuaskan';
  } else if (false /* TODO(human): ganti dengan kondisi ipk >= 2.5 */) {
    return 'Memuaskan';
  } else {
    return 'Cukup';
  }
}

function getJurusan(kode) {
  // TODO(human): Gunakan switch untuk mengembalikan nama jurusan
  // TI -> "Teknik Informatika", SI -> "Sistem Informasi"
  // TK -> "Teknik Komputer", MI -> "Manajemen Informatika"
  switch (kode /* TODO(human): gunakan kode jurusan */) {
    // TODO(human): case 'TI': return 'Teknik Informatika';
    // TODO(human): case 'SI': return 'Sistem Informasi';
    // TODO(human): case 'TK': return 'Teknik Komputer';
    // TODO(human): case 'MI': return 'Manajemen Informatika';
    default: return 'Jurusan Tidak Dikenal';
  }
}

// Tampilkan daftar mahasiswa
console.log('Daftar Mahasiswa:');
// TODO(human): Gunakan forEach untuk menampilkan data
// mahasiswa.forEach((mhs, index) => { ... });
// Format: "${index+1}. ${mhs.nama} - NIM ${mhs.nim} - ${jurusan} - IPK ${mhs.ipk} (${predikat})"

// Hitung rata-rata IPK
// TODO(human): Gunakan for...of untuk menjumlahkan semua IPK
// let totalIpk = 0;
// for (const mhs of mahasiswa) { ... }
// const rataRata = totalIpk / mahasiswa.length;
console.log(`\nRata-rata IPK: ${undefined /* TODO(human): tampilkan rata-rata IPK */}`);

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// Daftar Mahasiswa:
// 1. Budi Santoso - NIM 21001 - Teknik Informatika - IPK 3.8 (Cumlaude)
// 2. Siti Aminah - NIM 21002 - Sistem Informasi - IPK 3.2 (Sangat Memuaskan)
// 3. Andi Wijaya - NIM 21003 - Teknik Komputer - IPK 2.8 (Memuaskan)
// ...
//
// Rata-rata IPK: 3.26
// ============================================================
