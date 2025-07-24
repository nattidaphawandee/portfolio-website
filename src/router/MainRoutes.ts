const MainRoutes = {
  path: '/home',
  name: 'FullLayout',
  meta: {
    requiresAuth: true
  },
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Default',
      path: 'default',
      component: () => import('@/views/404Page/404Page.vue')
    },
  ]
};

export default MainRoutes;
