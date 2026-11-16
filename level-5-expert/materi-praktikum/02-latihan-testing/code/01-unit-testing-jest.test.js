// ============================================================
// SOAL 01 — Unit Testing dengan Jest
// ============================================================
// Di latihan ini KAMU yang menulis test. Kode yang diuji sudah disediakan
// di bawah (bagian "KODE YANG DIUJI"). Tugasmu: ubah setiap `test.todo(...)`
// menjadi test sungguhan, jalankan, dan pastikan kamu pernah melihatnya MERAH
// sebelum HIJAU (rusak-kan kodenya sebentar untuk membuktikan test-mu bekerja).
//
// Install:
//   npm install --save-dev jest
//
// Jalankan (dari proyek latihanmu, sesuaikan path):
//   npx jest 01-unit-testing-jest.test.js
//   npx jest 01-unit-testing-jest.test.js --watch
//
// Kunci jawaban ada di ../solusi-jangan-dibuka-dulu.md. Jangan dibuka dulu.
// ============================================================

// ============================================================
// KODE YANG DIUJI (jangan diubah, kecuali untuk uji mutasi)
// ============================================================

function calculateGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function fizzBuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}

function filterActiveUsers(users) {
  return users.filter((u) => u.status === "active");
}

function getTotalRevenue(orders) {
  return orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.amount, 0);
}

function groupByCategory(products) {
  return products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});
}

function fetchUserById(id) {
  return new Promise((resolve, reject) => {
    if (id === 1) resolve({ id: 1, name: "Andi" });
    else if (id === 2) resolve({ id: 2, name: "Budi" });
    else reject(new Error("User not found"));
  });
}

function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// Objek layanan cuaca. Di dunia nyata ini memanggil API eksternal.
// Di test, kamu tidak boleh benar-benar memanggilnya.
const weatherService = {
  async getWeather(city) {
    const res = await fetch(`https://api.example.com/weather?city=${city}`);
    return res.json();
  },
};

function debounce(callback, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(this, args), wait);
  };
}

// ============================================================
// A. PURE FUNCTIONS — matcher dasar
// ============================================================
// Pola Arrange-Act-Assert. Untuk tiap fungsi, tulis dulu daftar kasus di
// kertas: normal, batas (boundary), nilai aneh. Baru tulis test-nya.

describe("A1 — calculateGrade()", () => {
  // TODO(human): Tulis test untuk kelima nilai huruf (A-F).
  // Petunjuk: tentukan sendiri angka di sekitar batas, misalnya tepat di batas
  //           dan satu angka di bawahnya. Di situlah bug biasanya bersembunyi.
  // Selesai kalau: ada test untuk tiap batas, dan kamu bisa menjelaskan kenapa
  //                memilih angka-angka itu.
  test.todo("setiap rentang nilai menghasilkan huruf yang benar");
  test.todo("angka tepat di batas masuk ke huruf yang lebih tinggi");
  test.todo("input aneh (negatif, di atas 100): apa yang SEHARUSNYA terjadi?");
});

describe("A2 — fizzBuzz()", () => {
  // TODO(human): Tulis test untuk kelipatan 3, kelipatan 5, kelipatan keduanya,
  //              dan angka biasa. Coba test.each agar tidak menulis berulang.
  // Selesai kalau: minimal satu test memakai test.each (test parametrik).
  test.todo("kelipatan 3");
  test.todo("kelipatan 5");
  test.todo("kelipatan 3 dan 5");
  test.todo("bilangan lain");
});

// ============================================================
// B. ARRAY & OBJECT MATCHERS
// ============================================================

describe("B1 — filterActiveUsers()", () => {
  // TODO(human): Siapkan data user sendiri. Perhatikan beda toBe vs toEqual.
  // Selesai kalau: ada test yang membuktikan array asli TIDAK berubah.
  test.todo("hanya user aktif yang lolos");
  test.todo("array asli tidak dimutasi");
  test.todo("array kosong");
});

describe("B2 — getTotalRevenue()", () => {
  // TODO(human): Hitung hasil yang diharapkan dengan tanganmu sendiri,
  //              jangan menyalin dari output fungsinya.
  test.todo("order cancelled tidak dihitung");
  test.todo("semua cancelled");
  test.todo("array kosong");
});

describe("B3 — groupByCategory()", () => {
  // TODO(human): Pilih matcher yang tepat untuk objek: toHaveProperty,
  //              toMatchObject, atau toEqual. Apa bedanya?
  test.todo("produk dikelompokkan per kategori");
  test.todo("satu kategori saja");
});

// ============================================================
// C. ASYNC / PROMISE
// ============================================================

describe("C1 — fetchUserById()", () => {
  // TODO(human): Test promise yang resolve DAN yang reject.
  // Petunjuk: lihat `.resolves` dan `.rejects` di dokumentasi Jest,
  //           atau pakai async/await. Jangan lupa test-nya harus menunggu.
  // Selesai kalau: kasus reject benar-benar diuji (bukan lulus karena
  //                test selesai sebelum promise-nya).
  test.todo("id yang ada menghasilkan user");
  test.todo("id yang tidak ada ditolak dengan pesan yang jelas");
});

describe("C2 — delay()", () => {
  // TODO(human): Ada dua cara menguji waktu: menunggu sungguhan (lambat,
  //              rapuh) atau fake timers (cepat, deterministik).
  //              Coba keduanya, tulis di jurnal mana yang kamu pilih.
  test.todo("resolve dengan nilai yang diberikan setelah waktunya habis");
  test.todo("jika value tidak diberikan, resolve dengan apa?");
});

// ============================================================
// D. MOCKING
// ============================================================

describe("D1 — mock weatherService.getWeather()", () => {
  // TODO(human): Gunakan jest.spyOn (atau jest.fn) agar test TIDAK menyentuh
  //              jaringan. Mock mengembalikan data cuaca buatanmu sendiri.
  // Petunjuk: jangan lupa membersihkan mock setelah tiap test
  //           (lihat jest.restoreAllMocks).
  // Selesai kalau: test lulus saat internet dimatikan, dan kamu memastikan
  //                getWeather dipanggil dengan argumen yang benar.
  test.todo("mengembalikan data stub");
  test.todo("dipanggil dengan nama kota yang benar");
});

describe("D2 — debounce()", () => {
  // TODO(human): Pakai jest.useFakeTimers() di beforeEach dan
  //              jest.useRealTimers() di afterEach. Majukan waktu dengan
  //              jest.advanceTimersByTime(...).
  // Selesai kalau: kamu bisa menjelaskan kenapa panggilan berulang di dalam
  //                jeda hanya memicu callback satu kali.
  test.todo("callback belum dipanggil sebelum jeda habis");
  test.todo("callback dipanggil setelah jeda habis");
  test.todo("panggilan berulang mereset timer");
  test.todo("argumen diteruskan ke callback");
});

// ============================================================
// UJI MUTASI MANUAL (wajib)
// ============================================================
// Setelah semua test hijau, ubah satu operator di kode yang diuji
// (misalnya `>=` jadi `>` di calculateGrade). Minimal satu test harus gagal.
// Kalau tidak ada yang gagal, test-mu belum menjaga apa-apa.
