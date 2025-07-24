import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'LoginPage' }
      // component: () => import('@/views/404Page/404Page.vue')
    },
    MainRoutes,
    AuthRoutes
  ]
});
router.beforeEach(async (to, from, next) => {
  Object.keys(from.params).forEach((key) => {
    // If the key does not exist in `to.params`, set it to '-'
    if (to.params[key] === undefined) {
      to.params[key] = ' ';
    }
  });
  const ls = localStorage.getItem('AccessToken');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!ls) next({ name: 'LoginPage' });
    else next();
  } else {
    // NOTE เมื่อไม่ Require
    if (to.name === 'LoginPage' && ls) next({ name: 'FullLayout' });
    else next();
  }
});
