// ============================================================
// SOAL 07 — CALLBACK & HIGHER-ORDER FUNCTIONS
// ============================================================
// Tujuan: Callback, higher-order, arrow functions, closures

// ============================================================
// TODO 1: filterDengan(fn, array)
// ============================================================
// Higher-order function: terima function sebagai argument
// function filterDengan(predikat, arr) {
//   const result = [];
//   for (const item of arr) {
//     if (/* panggil predikat(item) */) {
//       result.push(item);
//     }
//   }
//   return result;
// }
// Contoh: filterDengan(n => n > 5, [1, 7, 3, 9]) → [7, 9]


// ============================================================
// TODO 2: mapDengan(fn, array)
// ============================================================
// Higher-order function: transformasi array
// Contoh: mapDengan(n => n * 2, [1, 2, 3]) → [2, 4, 6]


// ============================================================
// TODO 3: buatCounter(start = 0, step = 1)
// ============================================================
// Return function counter
// Closure: count "terjebak" di dalam function
// function buatCounter(start = 0, step = 1) {
//   let count = start;
//   return function() {
//     count += step;
//     return count;
//   };
// }
// const counter = buatCounter(10, 5);
// counter(); // 15
// counter(); // 20


// ============================================================
// TODO 4: buatGreeting(sapaan)
// ============================================================
// Return function yang greet
// function buatGreeting(sapaan) {
//   return function(nama) {
//     return `${sapaan}, ${nama}!`;
//   };
// }
// const selamatPagi = buatGreeting("Selamat Pagi");
// selamatPagi("Andi"); // "Selamat Pagi, Andi!"


// ============================================================
// TODO 5: compose(fn1, fn2)
// ============================================================
// Return function baru: (x) => fn1(fn2(x))
// compose(n => n * 2, n => n + 1)(5); // (5+1)*2 = 12


// ============================================================
// TODO 6: processMahasiswa(mahasiswas, cb)
// ============================================================
// Jalankan cb untuk setiap mahasiswa
// cb bisa: calculateGrade, isLulus, dll


// ============================================================
// TODO 7: Chaining Array Methods
// ============================================================
// const data = [
//   { nama: "Andi", nilai: 85 },
//   { nama: "Budi", nilai: 55 },
//   { nama: "Citra", nilai: 90 },
// ];
// Chain: filter(nilai>60) → map(nama) → sort


// ============================================================
// CONTOH OUTPUT:
// filterDengan: [7, 9]
// mapDengan: [2, 4, 6]
// buatCounter: 15, 20
// buatGreeting: Selamat Pagi, Andi!
// compose: 12
// ============================================================