// ============================================================
// SOAL 03 — FIZZBUZZ
// ============================================================
// Tujuan: Loop, multiple conditions, return array

// ============================================================
// TODO: fizzBuzz(limit = 100)
// ============================================================
// Return array berisi hasil FizzBuzz dari 1 sampai limit
//
// Aturan:
// - Kelipatan 15 → "FizzBuzz"
// - Kelipatan 3  → "Fizz"
// - Kelipatan 5  → "Buzz"
// - Lainnya      → angka itu sendiri (string)
//
// Hint: cek % 15 duluan (not % 3 or % 5)


// ============================================================
// TEST
// ============================================================
const hasil = fizzBuzz(30);

// tampilkan 1 per baris
// hasil.forEach(item => console.log(item));

// atau tampilkan dalam satu line (array)
console.log(hasil);

// ============================================================
// CONTOH OUTPUT (limit 30):
// [ 1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz',
//   11, 'Fizz', 13, 14, 'FizzBuzz', 16, 17, 'Fizz', 19, 'Buzz',
//   'Fizz', 22, 23, 'Fizz', 'Buzz', 26, 'Fizz', 28, 29, 'FizzBuzz' ]
// ============================================================


// ============================================================
// BONUS: Command line argument
// ============================================================
// node 03-fizzbuzz.js 50 → fizzBuzz(50)


// ============================================================
// BONUS: versi String biasa (tanpa array)
// ============================================================
// function fizzBuzzString(limit = 100) {
//   let output = "";
//   for (let i = 1; i <= limit; i++) {
//     // TODO: tambahkan ke output
//   }
//   return output;
// }
// ============================================================