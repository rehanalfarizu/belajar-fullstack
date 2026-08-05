// ============================================================
// SOAL 08 — ASYNC/AWAIT & FETCH
// ============================================================
// Tujuan: Promise, async/await, fetch API, error handling

// ============================================================
// TODO 1: Promise dengan resolve/reject
// ============================================================
// function cekAngkaGenap(n) {
//   return new Promise((resolve, reject) => {
//     if (n % 2 === 0) {
//       resolve(`${n} adalah genap`);
//     } else {
//       reject(new Error(`${n} adalah ganjil`));
//     }
//   });
// }
// cekAngkaGenap(4).then(console.log).catch(console.error);


// ============================================================
// TODO 2: Promise.all()
// ============================================================
// Jalankan 3 promises sekaligus, wait semua selesai
// function delay(ms) {
//   return new Promise(resolve => setTimeout(() => resolve(ms), ms));
// }
// Promise.all([delay(1000), delay(2000), delay(500)])
//   .then(results => console.log("Semua selesai!", results));


// ============================================================
// TODO 3: Async/Await function
// ============================================================
// async function fetchUser(id) {
//   const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//   // TODO: parse JSON dan return
// }


// ============================================================
// TODO 4: Async function dengan try/catch/finally
// ============================================================
// async function fetchAllUsers() {
//   console.log("Memuat...");
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const users = await response.json();
//     console.log(`Ditemukan ${users.length} users`);
//     // TODO: filter user yang di "London"
//     // TODO: map jadi { nama, email }
//     return users;
//   } catch (error) {
//     console.error("Gagal:", error.message);
//   } finally {
//     console.log("Selesai memuat");
//   }
// }


// ============================================================
// TODO 5: Async Arrow Function
// ============================================================
// const fetchUsersAsync = async () => {
//   // TODO: fetch + parse + return
// };


// ============================================================
// TEST (uncomment untuk jalankan)
// ============================================================
// cekAngkaGenap(4).then(console.log).catch(console.error);
// fetchAllUsers();


// ============================================================
// CONTOH OUTPUT:
// 4 adalah genap
// Memuat...
// Ditemukan 10 users
// Selesai memuat
// ============================================================


// ============================================================
// BONUS: async processUserData(users)
// ============================================================
// Filter aktif (isActive === true)
// Map: nama + email + company name
// Sort berdasarkan nama
// Throw error jika array kosong
// ============================================================