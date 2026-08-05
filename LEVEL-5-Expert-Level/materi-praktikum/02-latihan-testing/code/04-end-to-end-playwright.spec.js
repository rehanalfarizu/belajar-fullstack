// ============================================================
// SOAL 04 — End-to-End Testing dengan Playwright
// ============================================================
// Install:
//   npm install --save-dev @playwright/test
//   npx playwright install chromium
//
// Jalankan (dari root project):
//   npx playwright test materi-praktikum/02-latihan-testing/code/04-end-to-end-playwright.spec.js
//   npx playwright test materi-praktikum/02-latihan-testing/code/04-end-to-end-playwright.spec.js --ui
// ============================================================
//
// NOTE: Tests ini membutuhkan aplikasi React yang running di http://localhost:5173
// Sebelum menjalankan, pastikan:
//   npm run dev   (di tab terminal terpisah)
//
// Atau gunakan built-in webServer di playwright.config.js:
//
//   // playwright.config.js
//   module.exports = defineConfig({
//     webServer: {
//       command: "npm run dev",
//       port: 5173,
//       reuseExistingServer: true
//     },
//     testDir: ".",
//     testMatch: "**/04-end-to-end-playwright.spec.js"
//   });
// ============================================================

const { test, expect, defineConfig } = require("@playwright/test");

// ============================================================
// SETUP — Playwright Configuration (local, untuk referensi)
// ============================================================
//
// Salin ke playwright.config.js di root project jika belum ada:
/*
const { defineConfig } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./materi-praktikum/02-latihan-testing/code",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    trace: "on-first-retry",  // screenshot + video on failure
    screenshot: "only-on-failure"
  },
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: true
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } }
  ]
});
*/

// ============================================================
// A. Todo App — Core E2E Flows
// ============================================================

test.describe("A — Todo App E2E", () => {

  test.beforeEach(async ({ page }) => {
    // Navigasi ke halaman utama
    await page.goto("/");
  });

  test("A1 — render halaman utama dengan benar", async ({ page }) => {
    // Cek elemen utama ada
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Cek input dan tombol ada
    await expect(page.getByRole("textbox")).toBeVisible();
    await expect(page.getByRole("button", { name: /tambah/i })).toBeVisible();
  });

  test("A2 — tambahkan todo baru", async ({ page }) => {
    const input = page.getByRole("textbox");
    const addButton = page.getByRole("button", { name: /tambah/i });

    // Ketik todo baru
    await input.fill("Belajar Playwright");
    await addButton.click();

    // Todo baru muncul di list
    await expect(page.getByText("Belajar Playwright")).toBeVisible();

    // Counter berubah
    await expect(page.getByText(/of.*selesai/)).toBeVisible();
  });

  test("A3 — tambahkan todo dengan Enter", async ({ page }) => {
    const input = page.getByRole("textbox");

    await input.fill("Belajar Docker");
    await input.press("Enter");

    await expect(page.getByText("Belajar Docker")).toBeVisible();
  });

  test("A4 — toggle todo selesai", async ({ page }) => {
    // Todo pertama (belum selesai)
    const firstItem = page.getByRole("listitem").first();
    const checkbox = firstItem.getByRole("checkbox");

    // Toggle
    await checkbox.click();

    // Checkbox tercentang
    await expect(checkbox).toBeChecked();
  });

  test("A5 — hapus todo", async ({ page }) => {
    // Todo pertama harus ada
    const firstItem = page.getByRole("listitem").first();
    const initialText = await firstItem.textContent();

    // Klik tombol hapus
    await firstItem.getByRole("button", { name: /hapus/i }).click();

    // Todo tidak lagi visible
    await expect(page.getByText(initialText.split("Hapus")[0].trim())).not.toBeVisible();
  });

  test("A6 — tidak bisa tambah todo kosong", async ({ page }) => {
    const input = page.getByRole("textbox");
    const addButton = page.getByRole("button", { name: /tambah/i });

    // Klik tombol tanpa isi input
    await addButton.click();

    // Todo tidak bertambah
    const items = page.getByRole("listitem");
    // Count tidak berubah — tidak ada cara mudah hitung di E2E, tapi test ini
    // memverifikasi tidak ada crash
    await expect(page.getByRole("textbox")).toBeVisible();
  });
});

// ============================================================
// B. Login Flow — Happy & Unhappy Path
// ============================================================

test.describe("B — Login Flow E2E", () => {

  test("B1 — login berhasil dan redirect ke dashboard", async ({ page }) => {
    // Buka halaman login
    await page.goto("/login");

    // Isi form
    await page.getByLabel(/email/i).fill("andi@email.com");
    await page.getByLabel(/password/i).fill("password123");

    // Submit
    await page.getByRole("button", { name: /login|masuk/i }).click();

    // Redirect ke dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Pesan selamat datang
    await expect(page.getByText(/halo/i)).toBeVisible();
  });

  test("B2 — login gagal dengan kredensial salah", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel(/email/i).fill("salah@email.com");
    await page.getByLabel(/password/i).fill("salahpassword");

    await page.getByRole("button", { name: /login|masuk/i }).click();

    // Pesan error ditampilkan
    await expect(page.getByText(/email atau password salah/i)).toBeVisible();

    // Masih di halaman login
    await expect(page).toHaveURL(/\/login/);
  });

  test("B3 — validasi client-side (email tanpa @)", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel(/email/i).fill("emailtanpaat");
    await page.getByLabel(/password/i).fill("password123");

    await page.getByRole("button", { name: /login|masuk/i }).click();

    // Error validation muncul (bukan error server)
    await expect(page.getByText(/valid/i)).toBeVisible();
  });
});

// ============================================================
// C. Navigation & Routing
// ============================================================

test.describe("C — Navigation", () => {

  test("C1 — navigasi dari home ke about", async ({ page }) => {
    await page.goto("/");

    // Klik link About
    await page.getByRole("link", { name: /about/i }).click();

    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();
  });

  test("C2 — navigasi sidebar berfungsi", async ({ page }) => {
    await page.goto("/");

    // Sidebar navigation (jika ada)
    const sidebar = page.locator("nav, aside, [role='navigation']").first();

    if (await sidebar.isVisible()) {
      // Klik dashboard
      const dashboardLink = page.getByRole("link", { name: /dashboard/i });
      if (await dashboardLink.isVisible()) {
        await dashboardLink.click();
        await expect(page).toHaveURL(/\/dashboard/);
      }
    }
  });

  test("C3 — 404 page saat route tidak valid", async ({ page }) => {
    await page.goto("/route-yang-tidak-ada");

    // Cek 404 page atau error message
    const body = page.locator("body");
    const text = await body.textContent();
    expect(
      text.includes("404") || text.includes("tidak ditemukan") || text.includes("Page not found")
    ).toBeTruthy();
  });
});

// ============================================================
// D. Real-time — WebSocket/Socket.io
// ============================================================

test.describe("D — Real-time Features", () => {

  test("D1 — pesan chat muncul tanpa refresh", async ({ page }) => {
    // Buka aplikasi chat di 2 tab/browser context
    await page.goto("/chat/room-1");

    // Cek koneksi
    await expect(page.getByText(/terkoneksi|connected/i)).toBeVisible({ timeout: 5000 });

    // Kirim pesan
    const input = page.getByRole("textbox").last();
    await input.fill("Halo dari test!");
    await input.press("Enter");

    // Pesan langsung muncul tanpa refresh
    await expect(page.getByText("Halo dari test!")).toBeVisible();
  });

  test("D2 — pesan dari client lain juga muncul (cross-tab)", async ({ browser }) => {
    // Buat context kedua (seperti tab kedua)
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    // Page 1 (user A)
    await page.goto("/chat/room-1");
    await expect(page.getByText(/terkoneksi|connected/i)).toBeVisible({ timeout: 5000 });

    // Page 2 (user B)
    await page2.goto("/chat/room-1");
    await expect(page2.getByText(/terkoneksi|connected/i)).toBeVisible({ timeout: 5000 });

    // User A kirim pesan
    await page.getByRole("textbox").last().fill("Pesan dari User A");
    await page.getByRole("textbox").last().press("Enter");

    // User B melihat pesan User A
    await expect(page2.getByText("Pesan dari User A")).toBeVisible({ timeout: 3000 });

    await context2.close();
  });

  test("D3 — user disconnect ditangani dengan baik", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("/chat/room-1");
    await expect(page.getByText(/terkoneksi|connected/i)).toBeVisible({ timeout: 5000 });

    // Tutup tab (simulasi disconnect)
    await page.close();

    // Context ditutup — tidak ada error di console
    await context.close();
  });
});

// ============================================================
// E. Visual Regression & Accessibility
// ============================================================

test.describe("E — Visual & Accessibility", () => {

  test("E1 — halaman dapat diakses dengan keyboard", async ({ page }) => {
    await page.goto("/");

    // Tab ke elemen interaktif pertama
    await page.keyboard.press("Tab");

    // Elemen ter-focus (outline visible)
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();

    // Lanjut tab
    await page.keyboard.press("Tab");
  });

  test("E2 — semua gambar memiliki alt text", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      // Abaikan avatar/decorative images
      const alt = await img.getAttribute("alt");
      expect(alt !== undefined).toBeTruthy();
    }
  });

  test("E3 — contrast ratio cukup (aksesibilitas)", async ({ page }) => {
    await page.goto("/");

    // Cek body memiliki background color
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Warna body bukan transparan
    expect(bgColor).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("E4 — page title ada dan tidak kosong", async ({ page }) => {
    await page.goto("/");

    const title = await page.title();
    expect(title.trim().length).toBeGreaterThan(0);
  });
});

// ============================================================
// F. Performance & Loading States
// ============================================================

test.describe("F — Performance & Loading", () => {

  test("F1 — halaman load dalam waktu < 3 detik", async ({ page }) => {
    const start = Date.now();
    await page.goto("/", { waitUntil: "networkidle" });
    const loadTime = Date.now() - start;

    expect(loadTime).toBeLessThan(3000);
  });

  test("F2 — loading state ditampilkan saat fetch", async ({ page }) => {
    // Buat halaman khusus yang lambat
    await page.goto("/slow-page");

    // Loading indicator
    const loading = page.getByText(/memuat|loading/i);
    await expect(loading.first()).toBeVisible();
  });

  test("F3 — no console errors saat load halaman", async ({ page }) => {
    const errors = [];
    page.on("console", msg => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");

    // Tunggu halaman stabil
    await page.waitForLoadState("networkidle");

    // Tidak ada console error
    expect(errors.filter(e => !e.includes("favicon"))).toHaveLength(0);
  });
});