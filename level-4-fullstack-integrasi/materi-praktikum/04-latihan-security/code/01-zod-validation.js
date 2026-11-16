// ============================================================
// 01 — VALIDASI INPUT DENGAN ZOD
// ============================================================
// Starter ini sengaja berisi kerangka + TODO(human). Tulis isinya sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install : npm install zod
// Catatan : API Zod berubah antar versi mayor (misalnya cara menulis validasi
//           email). Cek `npm ls zod` lalu baca dokumentasi di zod.dev untuk
//           versi yang terpasang, jangan menebak dari contoh lama.
// File ini hanya berisi fungsi/skema; uji lewat skrip kecil atau server buatanmu.
// ============================================================

const { z } = require('zod');

// TODO(human): skema registrasi user.
// Petunjuk : email berformat valid; password minimal 8 karakter dan wajib
//            mengandung huruf besar DAN angka; name 2-100 karakter tanpa spasi
//            di tepi.
// Selesai kalau: "a@b.com" + "Abcdefg1" + "Budi" lolos; password tanpa angka,
//            tanpa huruf besar, atau terlalu pendek ditolak, masing-masing
//            dengan pesan yang jelas.
const userRegistrationSchema = z.object({});

// TODO(human): skema login.
// Petunjuk : Kenapa aturan password di login boleh lebih longgar daripada di
//            registrasi? (Jawab di jurnal.)
// Selesai kalau: email salah format ditolak, password kosong ditolak.
const userLoginSchema = z.object({});

// TODO(human): skema membuat post.
// Petunjuk : title 3-255 karakter; content minimal 10 karakter; tags opsional
//            (array string, tiap tag maks 50 karakter, maks 10 tag); status
//            hanya draft | published, default draft.
// Selesai kalau: tanpa `status` hasilnya draft; 11 tag ditolak.
const postSchema = z.object({});

// TODO(human): skema order dengan objek bersarang.
// Petunjuk : productId bilangan bulat positif; quantity bilangan bulat 1-99;
//            shippingAddress berisi street (min 5), city (min 2), postalCode
//            (tepat 5 digit, berupa string).
// Selesai kalau: quantity 1.5, 0, dan 100 ditolak; postalCode "1234a" ditolak.
const orderSchema = z.object({});

// TODO(human): fungsi validate(schema, data).
// Petunjuk : Pakai varian parse yang TIDAK melempar exception (cek dokumentasi
//            Zod). Kembalikan { success: true, data } atau
//            { success: false, errors } dengan errors per field.
// Selesai kalau: input salah tidak membuat program crash dan pesan error
//            dikelompokkan per field.
function validate(schema, data) {}

// TODO(human): validateBody(schema) — middleware pabrik untuk Express.
// Petunjuk : Pakai validate() di atas. Gagal -> 400 + daftar error. Berhasil ->
//            simpan data bersih di sebuah properti req dan lanjut. Kenapa
//            handler sebaiknya memakai data hasil validasi, bukan req.body
//            mentah?
// Selesai kalau: handler tidak pernah jalan untuk body tidak valid.
function validateBody(schema) {}

// TODO(human): validatePagination(query) — page dan limit dari query string.
// Petunjuk : Query string selalu string. page default 1 (min 1), limit default
//            10 (1-100). Apa yang terjadi pada "abc", "-5", "1e9", ""?
// Selesai kalau: semua input aneh menghasilkan angka aman, bukan NaN.
function validatePagination(query) {}

// TODO(human): sanitizeInput(input) — bersihkan string sebelum validasi.
// Petunjuk : Bukan string -> kembalikan apa adanya. Buang spasi tepi, karakter
//            null (\0), dan batasi panjang (misalnya 10.000). Pikirkan kenapa
//            batas panjang itu penting (hint: DoS).
// Selesai kalau: "  hai\0  " menjadi "hai"; string 1 juta karakter dipotong.
function sanitizeInput(input) {}

module.exports = {
  userRegistrationSchema,
  userLoginSchema,
  postSchema,
  orderSchema,
  validate,
  validateBody,
  validatePagination,
  sanitizeInput,
};
