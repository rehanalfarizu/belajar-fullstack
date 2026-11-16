import { createRouter, createWebHistory } from 'vue-router';

// TODO(human): Import view yang dipakai langsung (Home, Login) dan auth store
//   buatanmu sendiri. Dashboard JANGAN di-import di sini, karena ia akan
//   dimuat belakangan (lazy).

const routes = [
  // TODO(human): Route home di path '/', beri name supaya bisa dipanggil pakai nama.
  // TODO(human): Route dashboard. Komponennya dimuat lazy (pakai dynamic import),
  //   dan tandai lewat meta bahwa halaman ini butuh login.
  // TODO(human): Route login di path '/login'.
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const isAuthenticated = false; // TODO(human): Baca status login dari auth store, bukan hardcode.

  // TODO(human): Baris di bawah masih salah: user belum login tetap diizinkan
  //   masuk (return true). Ganti nilai kembaliannya menjadi lokasi tujuan
  //   halaman login, dan sertakan alamat lengkap halaman yang tadi diminta
  //   sebagai query (misal bernama "redirect") supaya setelah login user
  //   bisa dikembalikan ke sana.
  if (to.meta.requiresAuth && !isAuthenticated) return true;

  return true;
});
