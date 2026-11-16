// ============================================================
// SOAL 04 — End-to-End Testing dengan Playwright (kerangka)
// ============================================================
// Tulis alur E2E untuk aplikasi React kecil buatanmu (todo, login, navigasi).
// Setiap `test.fixme` di bawah adalah kerangka: ganti jadi `test` dan isi
// langkahnya. (`test.fixme` membuat test dilewati dan dicatat sebagai "perlu
// diperbaiki", bukan lulus palsu.)
//
// Install:
//   npm install --save-dev @playwright/test
//   npx playwright install chromium
//
// Jalankan (aplikasimu harus hidup di http://localhost:5173, misalnya
// `npm run dev`, atau atur `webServer` di playwright.config.js):
//   npx playwright test
//   npx playwright test --ui
//   npx playwright show-trace <file-trace>
//
// Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
// ============================================================

const { test, expect } = require("@playwright/test");

// TODO(human): Buat playwright.config.js di proyekmu.
//   Isi minimal: baseURL aplikasi, trace saat retry pertama, screenshot saat
//   gagal, dan webServer agar aplikasi dinyalakan otomatis. Lihat bagian
//   "Configuration" di playwright.dev.

// Aturan emas E2E:
//   - Cari elemen lewat role/label/teks seperti user, bukan class CSS.
//   - Jangan sleep (`waitForTimeout`). Playwright sudah auto-wait; gunakan
//     assertion web-first (`await expect(locator).toBeVisible()`).
//   - Setiap test berdiri sendiri dan menyiapkan datanya sendiri.
//   - Jangan pakai password/akun asli. Buat akun uji khusus.
//   - E2E mahal: pakai hanya untuk alur kritis.

test.describe("A — Todo App", () => {
  // TODO(human): Isi beforeEach (buka halaman awal).
  // Selesai kalau: tiap test di grup ini bisa dijalankan sendirian.
  test.fixme("A1 — halaman utama tampil dengan benar", async ({ page }) => {});
  test.fixme("A2 — menambah todo baru", async ({ page }) => {});
  test.fixme("A3 — menambah todo dengan tombol Enter", async ({ page }) => {});
  test.fixme("A4 — menandai todo selesai", async ({ page }) => {});
  test.fixme("A5 — menghapus todo", async ({ page }) => {});
  test.fixme("A6 — todo kosong tidak bisa ditambahkan", async ({ page }) => {});
});

test.describe("B — Alur Login", () => {
  // TODO(human): Alur paling kritis: tulis ini dulu.
  // Petunjuk: untuk jalur gagal, periksa PESAN error yang user lihat, bukan
  //           hanya bahwa URL tidak berubah.
  test.fixme("B1 — login berhasil lalu masuk dashboard", async ({ page }) => {});
  test.fixme("B2 — kredensial salah menampilkan pesan error", async ({ page }) => {});
  test.fixme("B3 — validasi di sisi klien (email tanpa @)", async ({ page }) => {});
});

test.describe("C — Navigasi", () => {
  test.fixme("C1 — dari beranda ke halaman About", async ({ page }) => {});
  test.fixme("C2 — menu navigasi berfungsi", async ({ page }) => {});
  test.fixme("C3 — rute tidak dikenal menampilkan halaman 404", async ({ page }) => {});
});

test.describe("D — Fitur real-time", () => {
  // TODO(human): Butuh dua pengguna sekaligus. Cari cara membuat dua browser
  //              context terpisah di dokumentasi ("Isolation", "Multiple
  //              contexts") agar sesi keduanya tidak tercampur.
  test.fixme("D1 — pesan muncul tanpa refresh", async ({ page }) => {});
  test.fixme("D2 — pesan dari pengguna lain muncul di tab pertama", async ({ browser }) => {});
  test.fixme("D3 — pengguna yang putus ditangani dengan baik", async ({ browser }) => {});
});

test.describe("E — Aksesibilitas", () => {
  test.fixme("E1 — halaman bisa dipakai dengan keyboard saja", async ({ page }) => {});
  test.fixme("E2 — semua gambar punya teks alternatif", async ({ page }) => {});
  test.fixme("E3 — judul halaman ada dan tidak kosong", async ({ page }) => {});
});

test.describe("F — Loading dan error", () => {
  // Petunjuk: untuk memaksa keadaan lambat atau gagal, lihat `page.route`
  //           (mencegat request jaringan).
  test.fixme("F1 — indikator loading tampil saat data diambil", async ({ page }) => {});
  test.fixme("F2 — tidak ada error di console saat halaman dimuat", async ({ page }) => {});
});

// Selesai kalau:
//   [ ] minimal alur login dan satu alur belanja/todo lulus
//   [ ] tidak ada `waitForTimeout` dan tidak ada selector class CSS
//   [ ] laporan (`playwright-report/`) dan trace bisa dibuka
//   [ ] semua test.fixme yang kamu pilih untuk dikerjakan sudah jadi test

void expect; // hapus baris ini setelah kamu memakai `expect`
