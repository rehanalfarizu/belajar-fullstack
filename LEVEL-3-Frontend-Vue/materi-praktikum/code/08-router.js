import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // TODO: home route.
  // TODO: lazy-loaded dashboard route dengan meta.requiresAuth.
  // TODO: login route.
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const isAuthenticated = false; // TODO: baca dari auth state.

  // TODO: redirect ke login dan simpan to.fullPath sebagai query redirect.
  if (to.meta.requiresAuth && !isAuthenticated) return true;

  return true;
});
