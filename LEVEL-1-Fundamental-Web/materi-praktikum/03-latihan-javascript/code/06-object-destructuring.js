// ============================================================
// SOAL 06 — OBJECT & DESTRUCTURING
// ============================================================
// Tujuan: Object, nested object, spread, destructuring

// ============================================================
// DATA
// ============================================================
const karyawan = {
  id: "EMP001",
  nama: "Andi Wijaya",
  posisi: "Software Engineer",
  gajihbulanan: 15000000,
  tunjangan: {
    kesehatan: 2000000,
    transport: 1000000,
    makan: 500000,
  },
  skills: ["JavaScript", "Python", "SQL"],
  isActive: true,
};

// ============================================================
// TODO 1: Akses Biasa
// ============================================================
// - Access nama: karyawan.nama
// - Access nested: karyawan.tunjangan.kesehatan
// - Access array: karyawan.skills[0]


// ============================================================
// TODO 2: Destructuring Sederhana
// ============================================================
// const { nama, posisi, gajihbulanan } = karyawan;
// console.log(`${nama} - ${posisi} - Rp${gajihbulanan}`);


// ============================================================
// TODO 3: Destructuring Nested
// ============================================================
// const { kesehatan, transport } = karyawan.tunjangan;
// console.log(`Tunjangan: Kesehatan=${kesehatan}, Transport=${transport}`);


// ============================================================
// TODO 4: Destructuring dengan Alias & Default
// ============================================================
// - Ambil nama dengan alias: fullName
// - Ambil bonus dengan default: 0


// ============================================================
// TODO 5: Spread Operator
// ============================================================
// Buat object baru dengan gajihbulanan + 2jt
// const karyawanNaik = { ...karyawan, gajihbulanan: 17000000 };
// console.log("Asli:", karyawan.gajihbulanan);  // tidak berubah
// console.log("Baru:", karyawanNaik.gajihbulanan); // 17000000


// ============================================================
// TODO 6: hitungGajiTotal(karyawan)
// ============================================================
// Return gajihbulanan + jumlah semua tunjangan
// function hitungGajiTotal(k) {
//   const tunjanganTotal = Object.values(k.tunjangan).reduce(/* TODO */);
//   return /* TODO */;
// }
// console.log("Gaji Total:", hitungGajiTotal(karyawan));


// ============================================================
// TODO 7: getSkillsTeratas(karyawan, n)
// ============================================================
// Return n skill pertama
// function getSkillsTeratas(k, n) {
//   // return k.skills.slice(0, n);
// }


// ============================================================
// TODO 8: Array of Objects + chaining
// ============================================================
// const karyawanList = [ ... ]; // 5 karyawan
// Filter yang gaji > 10jt
// Map jadi array nama saja
// Reduce jadi total gaji


// ============================================================
// CONTOH OUTPUT:
// Andi Wijaya - Software Engineer - Rp15000000
// Tunjangan: Kesehatan=2000000, Transport=1000000
// Gaji Total: 18500000
// ============================================================