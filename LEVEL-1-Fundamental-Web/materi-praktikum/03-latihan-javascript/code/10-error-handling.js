// ============================================================
// SOAL 10 — ERROR HANDLING
// ============================================================
// Tujuan: try/catch, custom errors, async error handling

// ============================================================
// TODO 1: Custom Error Classes
// ============================================================
// class ValidationError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "ValidationError";
//   }
// }
//
// class NotFoundError extends Error {
//   constructor(resource) {
//     super(`${resource} tidak ditemukan`);
//     this.name = "NotFoundError";
//   }
// }


// ============================================================
// TODO 2: Validation Functions
// ============================================================
// function validasiUsia(usia) {
//   if (typeof usia !== "number" || isNaN(usia)) {
//     throw new ValidationError("Usia harus angka");
//   }
//   if (usia < 0 || usia > 150) {
//     throw new ValidationError(`Usia tidak valid: ${usia}`);
//   }
//   return true;
// }
//
// function validasiEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!regex.test(email)) {
//     throw new ValidationError(`Email tidak valid: ${email}`);
//   }
//   return true;
// }
//
// function validasiPassword(password) {
//   if (password.length < 8) throw new ValidationError("Minimal 8 karakter");
//   if (!/[0-9]/.test(password)) throw new ValidationError("Harus ada angka");
//   if (!/[a-zA-Z]/.test(password)) throw new ValidationError("Harus ada huruf");
//   return true;
// }


// ============================================================
// TODO 3: validasiRegistrasi({ nama, email, password, usia })
// ============================================================
// function validasiRegistrasi(data) {
//   // TODO: jalankan semua validasi, kumpulkan error
//   // throw ValidationError jika ada yang gagal
// }


// ============================================================
// TODO 4: Async Error Handling
// ============================================================
// async function fetchUser(id) {
//   try {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//     if (response.status === 404) {
//       throw new NotFoundError(`User id ${id}`);
//     }
//     return await response.json();
//   } catch (error) {
//     if (error instanceof NotFoundError) {
//       console.error(`404: ${error.message}`);
//     } else {
//       console.error(`Error: ${error.message}`);
//     }
//     throw error;
//   }
// }


// ============================================================
// TODO 5: try/catch/finally pattern
// ============================================================
// async function processWithLogging(fn) {
//   console.log("Memulai proses...");
//   try {
//     const result = await fn();
//     console.log("Berhasil!");
//     return result;
//   } catch (error) {
//     console.error(`Gagal: ${error.message}`);
//   } finally {
//     console.log("Proses selesai."); // selalu jalan
//   }
// }


// ============================================================
// TEST
// ============================================================
// Valid cases
// validasiUsia(25);       // true
// validasiEmail("a@b.com"); // true
// validasiPassword("pass1234"); // true

// Invalid cases — akan throw
// validasiUsia(200);     // throw ValidationError
// validasiEmail("bukan-email"); // throw ValidationError
// validasiPassword("short");   // throw ValidationError

// Async test
// fetchUser(1).then(console.log).catch(console.error);


// ============================================================
// CONTOH OUTPUT:
// Memulai proses...
// Berhasil!
// Proses selesai.
// ============================================================