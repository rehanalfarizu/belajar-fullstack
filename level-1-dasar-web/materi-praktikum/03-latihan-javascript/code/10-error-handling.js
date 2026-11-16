// ============================================================
// SOAL 10 — ERROR HANDLING
// ============================================================
// Tujuan: try/catch, custom errors, async error handling

// ============================================================
// TODO 1: Custom Error Classes
// ============================================================
//

// ============================================================
// TODO 2: Validation Functions
// ============================================================
//
//

// ============================================================
// TODO 3: validasiRegistrasi({ nama, email, password, usia })
// ============================================================
// TODO: jalankan semua validasi, kumpulkan error

// ============================================================
// TODO 4: Async Error Handling
// ============================================================

// ============================================================
// TODO 5: try/catch/finally pattern
// ============================================================

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